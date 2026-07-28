import { NextRequest, NextResponse } from "next/server";
import { buildPrompt } from "@/lib/buildPrompt";
import { getReferenceImages } from "@/lib/referenceImages";
import { GenerateImageRequest, GenerateImageResponse } from "@/lib/types";

// Server-only. This value is read from the environment and is never sent to the browser.
const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
const GEMINI_MODEL = process.env.GEMINI_IMAGE_MODEL || "gemini-3.1-flash-image";
const GEMINI_URL = `https://generativelanguage.googleapis.com/v1beta/models/${GEMINI_MODEL}:generateContent`;

// Gemini's image models don't support returning multiple candidates from a
// single request (candidateCount/number_of_images both error out on image
// models as of this writing). To offer a picker of options, we instead fire
// this many independent requests in parallel with the same prompt. Each one
// is a full billed generation — tune down if quota/cost is a concern.
const NUM_CANDIDATES = Number(process.env.GEMINI_CANDIDATE_COUNT) || 4;

export async function POST(req: NextRequest) {
  if (!GEMINI_API_KEY) {
    return NextResponse.json(
      { error: "Server is missing GEMINI_API_KEY. Add it to .env.local and restart the dev server." },
      { status: 500 }
    );
  }

  let body: GenerateImageRequest;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body." }, { status: 400 });
  }

  if (!body.description || !body.description.trim()) {
    return NextResponse.json({ error: "A description is required." }, { status: 400 });
  }

  const prompt = buildPrompt(body);

  // Pull reference images matching the selected property + category (e.g.
  // "K-12" + "Faith"), preferring a category-specific subfolder if one exists
  // and filling the rest from the property's general pool. Falls back to an
  // empty array (text-only prompting) if no matching images exist at all.
  // Read once and reused across all N parallel requests below.
  const referenceImages = getReferenceImages(body.property, body.category, body.style, 6);

  const parts: Record<string, unknown>[] = [];

  if (referenceImages.length > 0) {
    for (const img of referenceImages) {
      parts.push({ inlineData: { mimeType: img.mimeType, data: img.data } });
    }
    parts.push({
      text:
        `The images above are official brand reference photos for ${body.property}. ` +
        `Treat them as required visual ground truth, not loose inspiration: match their exact ` +
        `architecture, building materials, and structural details (not just general style), along ` +
        `with their lighting, color grading, and overall photographic feel, as closely as possible ` +
        `in the new image you generate below. If none of the reference images show the specific ` +
        `subject or location described below, still strictly follow their architectural material, ` +
        `color palette, and lighting style rather than inventing a generic or different building.`,
    });
  }

  parts.push({ text: prompt });

  const requestBody = JSON.stringify({
    contents: [{ parts }],
    generationConfig: {
      responseModalities: ["TEXT", "IMAGE"],
      imageConfig: { aspectRatio: body.aspectRatio },
    },
  });

  async function generateOne(): Promise<{ image?: string; error?: string }> {
    try {
      const geminiRes = await fetch(GEMINI_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-goog-api-key": GEMINI_API_KEY!,
        },
        body: requestBody,
      });

      const data = await geminiRes.json().catch(() => null);

      if (!geminiRes.ok) {
        return { error: data?.error?.message || `Gemini request failed with status ${geminiRes.status}` };
      }

      const responseParts = data?.candidates?.[0]?.content?.parts || [];
      const imgPart = responseParts.find((p: any) => p.inlineData);

      if (!imgPart) {
        const textPart = responseParts.find((p: any) => p.text)?.text;
        return { error: textPart || "No image was returned." };
      }

      return { image: `data:${imgPart.inlineData.mimeType};base64,${imgPart.inlineData.data}` };
    } catch (err: any) {
      return { error: err?.message || "Unexpected error calling Gemini." };
    }
  }

  const results = await Promise.all(
    Array.from({ length: NUM_CANDIDATES }, () => generateOne())
  );

  const images = results.map((r) => r.image).filter((img): img is string => Boolean(img));
  const firstError = results.find((r) => r.error)?.error;

  if (images.length === 0) {
    return NextResponse.json(
      { error: firstError || "No images were generated. Try adjusting the prompt." },
      { status: 502 }
    );
  }

  const responseBody: GenerateImageResponse = { images, prompt };
  return NextResponse.json(responseBody);
}
