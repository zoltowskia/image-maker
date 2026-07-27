import fs from "fs";
import path from "path";

const REFERENCE_ROOT = path.join(process.cwd(), "public", "reference-images");

const MIME_TYPES: Record<string, string> = {
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".png": "image/png",
  ".webp": "image/webp",
};

export interface ReferenceImage {
  mimeType: string;
  data: string; // base64
}

/**
 * Turns a property name like "Hillsdale College" or "K-12" into the matching
 * folder name under public/reference-images/ (e.g. "hillsdale-college", "k-12").
 */
function slugify(value: string): string {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

/**
 * Picks up to `count` random reference images from the folder matching the
 * given property (e.g. public/reference-images/academics/). Returns an empty
 * array if no matching folder exists or it's empty — callers should treat
 * that as "no references available" and fall back to text-only prompting.
 */
export function getReferenceImages(property: string, count = 3): ReferenceImage[] {
  const dir = path.join(REFERENCE_ROOT, slugify(property));

  if (!fs.existsSync(dir)) return [];

  const files = fs
    .readdirSync(dir)
    .filter((file) => MIME_TYPES[path.extname(file).toLowerCase()]);

  if (files.length === 0) return [];

  const shuffled = [...files].sort(() => Math.random() - 0.5);
  const picked = shuffled.slice(0, Math.min(count, shuffled.length));

  return picked.map((file) => {
    const ext = path.extname(file).toLowerCase();
    const buffer = fs.readFileSync(path.join(dir, file));
    return {
      mimeType: MIME_TYPES[ext],
      data: buffer.toString("base64"),
    };
  });
}
