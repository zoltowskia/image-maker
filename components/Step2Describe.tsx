"use client";

import { Chip } from "./Chip";
import { Category, GeneratorState, Style } from "@/lib/types";
import { getAvailableTones } from "@/lib/toneOptions";

const CATEGORIES: Category[] = [
  "Classroom",
  "Mentorship/Teacher",
  "Faith",
  "Athletics",
  "Arts & Culture",
  "Campus & Community",
];
const STYLES: Style[] = ["Candid", "Composed", "Hero shot", "Landscape"];

interface Step2Props {
  state: GeneratorState;
  onChange: (patch: Partial<GeneratorState>) => void;
  onBack: () => void;
  onGenerate: () => void;
  generating: boolean;
  error: string | null;
}

export function Step2Describe({
  state,
  onChange,
  onBack,
  onGenerate,
  generating,
  error,
}: Step2Props) {
  const availableTones = getAvailableTones(state.property);

  return (
    <div>
      <h2 className="font-serif font-medium text-[24px] mb-[22px]">Describe your image</h2>

      {error && (
        <div className="bg-[rgba(255,90,90,0.08)] border border-[rgba(255,90,90,0.35)] text-[#ff8080] rounded-chip px-[14px] py-3 text-[13px] mb-5">
          {error}
        </div>
      )}

      <Field label="What is the category?">
        <div className="flex flex-wrap gap-2.5">
          {CATEGORIES.map((c) => (
            <Chip
              key={c}
              label={c}
              selected={state.category === c}
              onClick={() => onChange({ category: c })}
            />
          ))}
        </div>
      </Field>

      <Field label="What style?">
        <div className="flex flex-wrap gap-2.5">
          {STYLES.map((s) => (
            <Chip
              key={s}
              label={s}
              selected={state.style === s}
              onClick={() => onChange({ style: s })}
            />
          ))}
        </div>
      </Field>

      <Field label="What is the tone of the image you want to make?">
        <div className="flex flex-wrap gap-2.5">
          {availableTones.map((t) => (
            <Chip
              key={t}
              label={t}
              selected={state.tone === t}
              onClick={() => onChange({ tone: t })}
            />
          ))}
        </div>
      </Field>

      <div className="mb-[26px]">
        <textarea
          value={state.description}
          onChange={(e) => onChange({ description: e.target.value })}
          placeholder="Describe your image *"
          className="w-full min-h-[120px] bg-transparent border border-borderSubtle rounded-chip p-[14px] text-[14.5px] font-interactive font-medium leading-relaxed placeholder:text-textDim focus:outline-none focus:border-[#6d8cff] resize-y"
        />
      </div>

      <div className="flex gap-3 justify-center mt-2">
        <button
          onClick={onBack}
          className="bg-transparent border border-borderSubtle text-textPrimary rounded-full px-[26px] py-[13px] text-[14.5px] font-interactive font-medium hover:border-white/40"
        >
          Back
        </button>
        <button
          onClick={onGenerate}
          disabled={generating}
          className="bg-white text-main rounded-full px-[30px] py-[13px] text-[14.5px] font-interactive font-medium disabled:opacity-45 disabled:cursor-not-allowed hover:enabled:bg-[#e9edf2]"
        >
          {generating ? "Generating…" : "Generate"}
        </button>
      </div>
    </div>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="mb-[26px]">
      <div className="text-[13.5px] mb-2.5">
        {label} <span className="text-textMuted">*</span>
      </div>
      {children}
    </div>
  );
}
