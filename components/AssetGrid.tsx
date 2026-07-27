"use client";

import { GeneratedAsset } from "@/lib/types";

interface AssetGridProps {
  assets: GeneratedAsset[];
  favorites: Set<number>;
  onToggleFavorite: (id: number) => void;
  emptyMessage: string;
}

export function AssetGrid({ assets, favorites, onToggleFavorite, emptyMessage }: AssetGridProps) {
  if (assets.length === 0) {
    return <div className="text-textMuted text-[14px] py-10">{emptyMessage}</div>;
  }

  return (
    <div className="grid gap-4 max-w-[900px]" style={{ gridTemplateColumns: "repeat(auto-fill, minmax(180px, 1fr))" }}>
      {assets.map((item) => {
        const isFav = favorites.has(item.id);
        return (
          <div key={item.id} className="border border-borderSubtle rounded-[10px] overflow-hidden bg-white/[0.02]">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={item.image}
              alt={item.category}
              className="block w-full aspect-square object-cover"
            />
            <div className="px-[11px] py-[9px] flex items-center justify-between gap-1.5">
              <span
                title={item.prompt}
                className="text-[11.5px] text-textMuted overflow-hidden text-ellipsis whitespace-nowrap"
              >
                {item.property} · {item.category}
              </span>
              <button
                onClick={() => onToggleFavorite(item.id)}
                className={"text-[15px] px-0.5 " + (isFav ? "text-[#ffd166]" : "text-textDim")}
                aria-label={isFav ? "Remove from favorites" : "Add to favorites"}
              >
                ★
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
}
