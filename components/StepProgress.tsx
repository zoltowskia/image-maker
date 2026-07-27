"use client";

interface StepProgressProps {
  step: 1 | 2 | "result";
}

export function StepProgress({ step }: StepProgressProps) {
  const step2Done = step === 2 || step === "result";

  return (
    <div className="mb-[10px]">
      <div className="flex gap-3">
        <div className="flex-1 h-[5px] rounded-[3px] border border-borderSubtle overflow-hidden">
          <div className="h-full bg-textPrimary w-full" />
        </div>
        <div className="flex-1 h-[5px] rounded-[3px] border border-borderSubtle overflow-hidden">
          <div
            className={
              "h-full bg-textPrimary transition-all duration-200 " +
              (step2Done ? "w-full" : "w-0")
            }
          />
        </div>
      </div>
      <div className="flex gap-3 mt-2.5">
        <span className="flex-1 text-[12.5px] flex items-center gap-1.5 text-textPrimary">
          <span className="w-[15px] h-[15px] rounded-full border border-textPrimary inline-flex items-center justify-center text-[9px]">
            ✓
          </span>
          Step 1
        </span>
        <span
          className={
            "flex-1 text-[12.5px] flex items-center gap-1.5 " +
            (step2Done ? "text-textPrimary" : "text-textMuted")
          }
        >
          {step2Done && (
            <span className="w-[15px] h-[15px] rounded-full border border-textPrimary inline-flex items-center justify-center text-[9px]">
              ✓
            </span>
          )}
          Step 2
        </span>
      </div>
    </div>
  );
}
