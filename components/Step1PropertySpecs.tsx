"use client";

import { Chip } from "./Chip";
import { AspectRatio, GeneratorState, Property } from "@/lib/types";

const PROPERTIES: Property[] = ["Hillsdale College", "Academics", "K-12"];
const ASPECT_RATIOS: AspectRatio[] = ["16:9", "1:1", "9:16", "4:3", "3:2"];

interface Step1Props {
  state: GeneratorState;
  onChange: (patch: Partial<GeneratorState>) => void;
  onNext: () => void;
}

export function Step1PropertySpecs({ state, onChange, onNext }: Step1Props) {
  return (
    <div>
      <h2 className="font-serif font-medium text-[24px] mb-[22px]">Property and Asset Specs</h2>

      <div className="mb-[26px]">
        <div className="text-[13.5px] mb-2.5">
          What property is your image for? <span className="text-textMuted">*</span>
        </div>
        <div className="flex flex-wrap gap-2.5">
          {PROPERTIES.map((p) => (
            <Chip
              key={p}
              label={p}
              selected={state.property === p}
              onClick={() => onChange({ property: p })}
            />
          ))}
        </div>
      </div>

      <div className="mb-[26px]">
        <div className="text-[13.5px] mb-2.5">
          Aspect Ratio <span className="text-textMuted">*</span>
        </div>
        <div className="relative max-w-[340px]">
          <select
            value={state.aspectRatio}
            onChange={(e) => onChange({ aspectRatio: e.target.value as AspectRatio })}
            className="w-full appearance-none bg-transparent border border-borderSubtle rounded-chip px-[14px] py-[14px] pr-10 text-[14.5px] font-interactive font-medium cursor-pointer focus:outline-none focus:border-[#6d8cff]"
          >
            {ASPECT_RATIOS.map((ar) => (
              <option key={ar} value={ar} className="bg-[#0e1926] text-textPrimary">
                {ar}
              </option>
            ))}
          </select>
          <span className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-textMuted text-[13px]">
            ▾
          </span>
        </div>
      </div>

      <div className="flex justify-center mt-2">
        <button
          onClick={onNext}
          className="bg-white text-main rounded-full px-[30px] py-[13px] text-[14.5px] font-interactive font-medium hover:bg-[#e9edf2]"
        >
          Next
        </button>
      </div>
    </div>
  );
}
