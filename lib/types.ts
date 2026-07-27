export type Property = "Hillsdale College" | "Academics" | "K-12" | "Media" | "Studios";
export type AspectRatio = "16:9" | "1:1" | "9:16" | "4:3" | "3:2";
export type Category =
  | "Classroom"
  | "Mentorship/Teacher"
  | "Faith"
  | "Athletics"
  | "Arts & Culture"
  | "Campus & Community";
export type Style = "Candid" | "Composed" | "Hero shot" | "Landscape";
export type Tone =
  | "Dramatic"
  | "Inspiring"
  | "Joyful"
  | "Personal"
  | "Curious"
  | "Thoughtful"
  | "Academic"
  | "Disciplined"
  | "Playful"
  | "Competitive"
  | "Intellectual"
  | "Driven"
  | "Connected"
  | "Composed"
  | "Reverent";

export interface GeneratorState {
  property: Property;
  aspectRatio: AspectRatio;
  category: Category;
  style: Style;
  tone: Tone;
  description: string;
}

export interface GeneratedAsset {
  id: number;
  image: string; // data URL
  prompt: string;
  property: Property;
  category: Category;
}

export interface GenerateImageRequest {
  property: Property;
  aspectRatio: AspectRatio;
  category: Category;
  style: Style;
  tone: Tone;
  description: string;
}

export interface GenerateImageResponse {
  images: string[]; // data URLs returned from the server, one per candidate
  prompt: string;
}
