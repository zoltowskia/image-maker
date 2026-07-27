"use client";

interface SelectionViewProps {
  images: string[];
  onSelect: (index: number) => void;
  onBack: () => void;
}

export function SelectionView({ images, onSelect, onBack }: SelectionViewProps) {
  return (
    <div>
      <h2 className="font-serif font-medium text-[24px] mb-2">Choose your favorite</h2>
      <p className="text-textMuted text-[13.5px] mb-[22px]">
        Gemini generated {images.length} option{images.length === 1 ? "" : "s"} — pick the one you
        want to keep.
      </p>

      <div className="grid grid-cols-2 gap-4 mb-[26px]">
        {images.map((img, i) => (
          <button
            key={i}
            onClick={() => onSelect(i)}
            className="group relative border border-borderSubtle rounded-xl overflow-hidden bg-black hover:border-white/60 transition-colors focus:outline-none focus:border-[#6d8cff]"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={img} alt={`Option ${i + 1}`} className="block w-full h-auto" />
            <div className="absolute inset-0 flex items-end justify-center pb-3 bg-black/0 group-hover:bg-black/25 transition-colors">
              <span className="opacity-0 group-hover:opacity-100 transition-opacity bg-white text-main text-[13px] font-semibold rounded-full px-4 py-1.5">
                Choose this one
              </span>
            </div>
          </button>
        ))}
      </div>

      <div className="flex justify-center">
        <button
          onClick={onBack}
          className="bg-transparent border border-borderSubtle text-textPrimary rounded-full px-[26px] py-[13px] text-[14.5px] font-semibold hover:border-white/40"
        >
          Back to edit
        </button>
      </div>
    </div>
  );
}
