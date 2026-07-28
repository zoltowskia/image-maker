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

/**
 * A couple of category folder names are shorter than the app's actual
 * category label, by request (e.g. the app category is "Mentorship/Teacher"
 * but the folder is just "mentorship"). Anything not listed here just uses
 * the plain slugified category name.
 */
const CATEGORY_FOLDER_ALIASES: Record<string, string> = {
  "mentorship-teacher": "mentorship",
  "campus-community": "campus-life",
};

function categoryFolderName(category: string): string {
  const slug = slugify(category);
  return CATEGORY_FOLDER_ALIASES[slug] || slug;
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
 * Picks up to `count` reference images for the given property + category + style.
 *
 * Folder layout: public/reference-images/<property>/<category>/<style>/
 * e.g. public/reference-images/k-12/faith/candid/
 *
 * Matching cascades from most to least specific, filling any remaining slots
 * from the next broader level, so it always works even if some folders are
 * thin or don't exist yet:
 *   1. property/category/style   (most specific)
 *   2. property/category         (same category, any style)
 *   3. property                  (general pool, any category/style)
 */
export function getReferenceImages(
  property: string,
  category: string,
  style: string,
  count = 6
): ReferenceImage[] {
  const propertyDir = path.join(REFERENCE_ROOT, slugify(property));
  const categoryDir = path.join(propertyDir, categoryFolderName(category));
  const styleDir = path.join(categoryDir, slugify(style));

  const picked: { dir: string; file: string }[] = [];
  const usedFiles = new Set<string>();

  function addFrom(dir: string) {
    if (picked.length >= count) return;
    const files = shuffle(listImageFiles(dir)).filter((f) => !usedFiles.has(`${dir}/${f}`));
    for (const file of files) {
      if (picked.length >= count) break;
      picked.push({ dir, file });
      usedFiles.add(`${dir}/${file}`);
    }
  }

  addFrom(styleDir);
  addFrom(categoryDir);
  addFrom(propertyDir);

  return picked.map(({ dir, file }) => readImage(dir, file));
}
