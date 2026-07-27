import { Property, Tone } from "./types";

export const DEFAULT_TONES: Tone[] = ["Dramatic", "Inspiring", "Joyful", "Personal"];

/**
 * Tone options per property. Properties without an entry here just fall back
 * to DEFAULT_TONES. K-12 and Academics each use the exact attribute list from
 * their official style guides, ordered high-priority first.
 */
const TONES_BY_PROPERTY: Partial<Record<Property, Tone[]>> = {
  "K-12": ["Curious", "Thoughtful", "Academic", "Disciplined", "Joyful", "Playful", "Competitive"],
  "Academics": [
    "Intellectual",
    "Thoughtful",
    "Driven",
    "Connected",
    "Composed",
    "Curious",
    "Joyful",
    "Reverent",
    "Playful",
  ],
};

export function getAvailableTones(property: Property): Tone[] {
  return TONES_BY_PROPERTY[property] || DEFAULT_TONES;
}
