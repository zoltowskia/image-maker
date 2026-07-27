"use client";

import { GeneratedAsset } from "@/lib/types";

interface ResultViewProps {
  asset: GeneratedAsset;
  onEdit: () => void;
  onStartOver: () => void;
}

export function ResultView({ asset, onEdit, onStartOver }: ResultViewProps) {
  function handleDownload() {
    const a = document.createElement("a");
    a.href = asset.image;
    a.download = `hillsdale-${asset.category.toLowerCase().replace(/\s+/g, "-")}-${asset.id}.png`;
    document.body.appendChild(a);
    a.click();
    a.remove();
  }

  return (
    <div>
      <h2 className="font-serif font-medium text-[24px] mb-[22px]">Your generated asset</h2>

      <div className="border border-borderSubtle rounded-xl overflow-hidden mb-5 bg-black">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={asset.image} alt={asset.category} className="block w-full h-auto" />
      </div>

      <div className="text-[12.5px] text-textDim mb-[22px] leading-relaxed">
        <b className="text-textMuted">Prompt sent to Gemini:</b> {asset.prompt}
      </div>

      <div className="flex gap-3 justify-center">
        <button
          onClick={onEdit}
          className="bg-transparent border border-borderSubtle text-textPrimary rounded-full px-[26px] py-[13px] text-[14.5px] font-semibold hover:border-white/40"
        >
          Edit &amp; regenerate
        </button>
        <button
          onClick={onStartOver}
          className="bg-transparent border border-borderSubtle text-textPrimary rounded-full px-[26px] py-[13px] text-[14.5px] font-semibold hover:border-white/40"
        >
          Start over
        </button>
        <button
          onClick={handleDownload}
          className="bg-white text-main rounded-full px-[30px] py-[13px] text-[14.5px] font-bold hover:bg-[#e9edf2]"
        >
          Download
        </button>
      </div>
    </div>
  );
}
