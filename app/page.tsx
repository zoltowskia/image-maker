"use client";

import { useState } from "react";
import { Sidebar, NavKey } from "@/components/Sidebar";
import { GeneratorWizard } from "@/components/GeneratorWizard";
import { AssetGrid } from "@/components/AssetGrid";
import { SiteFooter } from "@/components/SiteFooter";
import { GeneratedAsset } from "@/lib/types";

export default function Home() {
  const [nav, setNav] = useState<NavKey>("generator");
  const [history, setHistory] = useState<GeneratedAsset[]>([]);
  const [favorites, setFavorites] = useState<Set<number>>(new Set());

  function toggleFavorite(id: number) {
    setFavorites((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }

  return (
    <div className="flex flex-col min-h-screen">
      <div className="flex flex-1">
        <Sidebar active={nav} onNavigate={setNav} />

        <main className="flex-1 min-w-0 px-14 pt-11 pb-16">
          {nav === "generator" && (
            <>
              <div className="mb-[34px]">
                <h1 className="font-serif font-medium text-[34px] mb-2">Hillsdale Image generator</h1>
                <p className="text-textMuted text-[14.5px]">
                  Make an asset for a website, campaign, newsletter, or other channel.
                </p>
              </div>
              <GeneratorWizard onAssetCreated={(asset) => setHistory((h) => [asset, ...h])} />
            </>
          )}

          {nav === "assets" && (
            <>
              <div className="mb-[34px]">
                <h1 className="font-serif font-medium text-[34px] mb-2">Assets</h1>
                <p className="text-textMuted text-[14.5px]">Everything you&apos;ve generated this session.</p>
              </div>
              <AssetGrid
                assets={history}
                favorites={favorites}
                onToggleFavorite={toggleFavorite}
                emptyMessage="Nothing generated yet — head to the Generator to make your first asset."
              />
            </>
          )}

          {nav === "favorites" && (
            <>
              <div className="mb-[34px]">
                <h1 className="font-serif font-medium text-[34px] mb-2">Favorites</h1>
                <p className="text-textMuted text-[14.5px]">Assets you&apos;ve starred for quick access.</p>
              </div>
              <AssetGrid
                assets={history.filter((a) => favorites.has(a.id))}
                favorites={favorites}
                onToggleFavorite={toggleFavorite}
                emptyMessage="No favorites yet — star an asset from the Assets tab."
              />
            </>
          )}
        </main>
      </div>

      <SiteFooter />
    </div>
  );
}
