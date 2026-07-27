import { GenerateImageRequest } from "./types";

/**
 * Permanent brand style guide.
 *
 * This is silently appended to every single generation request — the person
 * using the form never sees or edits it. Update the wording here any time
 * the brand direction changes; it's the one place that controls the visual
 * identity of everything this app generates.
 */
const BRAND_STYLE_GUIDE = `
Brand visual identity guidelines (apply to every image, always):
- Traditional collegiate architecture: limestone and red-brick buildings, white-trimmed windows,
  columned facades, Gothic and Classical Revival details reminiscent of a small Midwestern liberal
  arts college campus.
- Natural, warm lighting — golden hour or soft overcast daylight. Avoid harsh flash, neon, or
  artificial studio lighting.
- Color grading: warm neutral tones with occasional deep navy and burgundy accents. Timeless and
  editorial, not trendy or oversaturated.
- Subjects: genuine, unposed expressions; small group interactions rather than large staged crowds.
- Avoid: visible modern logos or trademarked apparel from other institutions or brands, futuristic
  or sci-fi styling, and generic stock-photo staginess.
- Overall mood: dignified, intellectual, warm, and rooted in tradition.
`.trim();

/**
 * Property-specific style notes, appended on top of the brand style guide
 * above whenever that property is selected. Not every property needs one —
 * properties without an entry here just get the general brand guide.
 */
const PROPERTY_STYLE_NOTES: Partial<Record<string, string>> = {
  "K-12": `
K-12 official style guide -- this section is authoritative for K-12 images and OVERRIDES the
general brand guidance above wherever the two conflict, especially on lighting and color: for
K-12, do NOT use golden-hour lighting, dramatic sun rays, or an orange color cast. Use the
lighting rules below instead.

Master style: Professional K-12 classical academy photography. Sunlit, soft lighting, filmic,
cinematic. Bright daylight and large window light. Low contrast, soft tonal transitions, natural
skin tones, muted colors. Documentary photography, shallow depth of field, softly blurred
background, premium educational storytelling.

Lighting (required): natural daylight, window light, open shade, soft directional lighting,
bright exposure, natural skin tones -- like a sunlit morning classroom. Avoid: harsh flash,
dramatic shadows, moody academic photography, overly warm golden-hour color casts, artificial
HDR processing.

Student age: must genuinely match the school level implied by the category and description.
Use kindergarten/elementary-age children (roughly 5-11) for early classroom, playground, and
elementary art scenes; middle-school-age students (roughly 11-14) for general classroom, chapel,
and mentorship scenes; high-school-age students (roughly 14-18) for athletics and advanced
arts/music scenes. Never depict college-age or adult-looking students as K-12 students.

Appearance: age-appropriate, healthy, approachable, naturally styled. Avoid fashion-photography
styling, heavy makeup, and trend-driven appearance. Uniforms: navy blazers, white shirts, ties,
khaki pants, and plaid uniforms for younger girls.

Subjects and action: students actively engaged -- doing, discovering, discussing, competing,
creating, worshiping. Document authentic moments; never staged "smiling at the camera" poses.
Typical actions by category -- Classroom: reading, writing, presenting, discussing, listening,
problem solving. Mentorship/Teacher: one-on-one mentoring, teacher-student interaction, guidance.
Arts & Culture: drawing, practicing an instrument, performing. Faith: prayer, quiet reflection,
chapel/worship/ceremony, reverent contemplative moments. Athletics: running, passing, practicing,
team discussion.

Tone: engaged, curious, thoughtful, academic, and disciplined (high priority); joyful and playful
(medium priority); competitive (lower priority, athletics only). Avoid performative, overly
serious, hyperactive, or corporate-feeling moods.

Composition: classical structure -- rule of thirds, leading lines, natural framing via doorways,
windows, or arches, and symmetry where the architecture invites it. Shallow-to-medium depth of
field lifting the subject from a soft background. Generous, intentional negative space with a
clear, single, uncluttered focal point and level horizons. For wide or hero-style images, keep
one third of the frame (commonly the lower third) calm and low-detail so text could sit legibly
over it, and shoot in a wide aspect ratio.

Photographing children: respectfully and non-intrusively. Faces are often natural and partially
turned away, secondary to the scene, softly out of focus, or shown from a distance, rather than
posed close-up portraits staring directly into the camera. If a scene calls for no visible
students at all (for example, an object-focused shot of a Bible or classroom still life), omit
people entirely rather than including partial figures.

Avoid throughout: visible logos, on-image text, AI artifacts, and stock-photo posing.
`.trim(),
};

export function buildPrompt(input: GenerateImageRequest): string {
  const { property, category, style, tone, description, aspectRatio } = input;

  const requestPrompt =
    `Create a ${tone.toLowerCase()}, ${style.toLowerCase()}-style photograph representing ${property}, ` +
    `in the "${category}" category. ${description.trim()} ` +
    `The image should look like professional marketing photography suitable for a college website, ` +
    `campaign, or newsletter. Aspect ratio ${aspectRatio}.`;

  const propertyNote = PROPERTY_STYLE_NOTES[property];

  return [requestPrompt, BRAND_STYLE_GUIDE, propertyNote]
    .filter(Boolean)
    .join("\n\n");
}
