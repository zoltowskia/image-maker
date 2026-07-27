"use client";

import { ShieldLogo } from "./ShieldLogo";

export type NavKey = "generator" | "assets" | "favorites";

interface SidebarProps {
  active: NavKey;
  onNavigate: (key: NavKey) => void;
}

const NAV_ITEMS: { key: NavKey; label: string }[] = [
  { key: "generator", label: "Generator" },
  { key: "assets", label: "Assets" },
  { key: "favorites", label: "Favorites" },
];

export function Sidebar({ active, onNavigate }: SidebarProps) {
  return (
    <aside className="w-[270px] shrink-0 bg-sidebar border-r border-borderFaint px-6 py-7 flex flex-col gap-7">
      <div className="flex items-center gap-2.5">
        <ShieldLogo />
        <div className="leading-tight">
          <div className="font-bold text-[13px] tracking-wide">HILLSDALE COLLEGE</div>
          <div className="text-[9.5px] tracking-[0.12em] text-textMuted mt-0.5">
            ACADEMICS&nbsp;&nbsp;|&nbsp;&nbsp;K-12&nbsp;&nbsp;|&nbsp;&nbsp;MEDIA
          </div>
        </div>
      </div>

      <div>
        <div className="font-serif text-[19px] mb-1">My Assets</div>
        <nav className="flex flex-col gap-1">
          {NAV_ITEMS.map((item) => (
            <button
              key={item.key}
              onClick={() => onNavigate(item.key)}
              className={
                "text-left text-[14.5px] font-semibold px-3 py-2.5 rounded-lg transition-colors " +
                (active === item.key
                  ? "bg-[#1c2634] text-textPrimary"
                  : "text-textMuted hover:text-textPrimary")
              }
            >
              {item.label}
            </button>
          ))}
        </nav>
      </div>
    </aside>
  );
}
