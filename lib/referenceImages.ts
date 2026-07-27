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
 * Turns a name like "Hillsdale College" or "K-12" into the matching folder
 * name under public/reference-images/ (e.g. "hillsdale-college", "k-12").
 */
function slugify(value: string): string {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function listImageFiles(dir: string): string[] {
  if (!fs.existsSync(dir)) return [];
  return fs.readdirSync(dir).filter((file) => MIME_TYPES[path.extname(file).toLowerCase()]);
}

function shuffle<T>(arr: T[]): T[] {
  return [...arr].sort(() => Math.random() - 0.5);
}

function readImage(dir: string, file: string): ReferenceImage {
  const ext = path.extname(file).toLowerCase();
  const buffer = fs.readFileSync(path.join(dir, file));
  return { mimeType: MIME_TYPES[ext], data: buffer.toString("base64") };
}

/**
 * Picks up to `count` reference images for the given property + category.
 *
 * Prefers images from a category-specific subfolder
 * (public/reference-images/<property>/<category>/) if one exists, filling
 * any remaining slots from the property's general pool
 * (public/reference-images/<property>/). Falls back entirely to the general
 * pool if no category subfolder exists yet -- so this works immediately with
 * a flat, non-categorized image set, and automatically gets more precise as
 * category subfolders are added over time (e.g. .../k-12/faith/ for chapel
 * photos specifically, so "Faith" category generations reliably see the
 * actual chapel rather than a random unrelated K-12 photo).
 */
export function getReferenceImages(property: string, category: string, count = 6): ReferenceImage[] {
  const propertyDir = path.join(REFERENCE_ROOT, slugify(property));
  const categoryDir = path.join(propertyDir, slugify(category));

  const categoryFiles = shuffle(listImageFiles(categoryDir));
  const picked: { dir: string; file: string }[] = categoryFiles
    .slice(0, count)
    .map((file) => ({ dir: categoryDir, file }));

  if (picked.length < count) {
    const generalFiles = shuffle(listImageFiles(propertyDir));
    for (const file of generalFiles) {
      if (picked.length >= count) break;
      picked.push({ dir: propertyDir, file });
    }
  }

  return picked.map(({ dir, file }) => readImage(dir, file));
}
