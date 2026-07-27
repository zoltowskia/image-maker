"use client";

interface ChipProps {
  label: string;
  selected: boolean;
  onClick: () => void;
}

export function Chip({ label, selected, onClick }: ChipProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={
        "rounded-chip border px-[18px] py-[11px] text-sm font-medium transition-colors " +
        (selected
          ? "bg-white text-main border-white font-semibold"
          : "bg-transparent text-textPrimary border-borderSubtle hover:border-white/40")
      }
    >
      {label}
    </button>
  );
}
