export function LoadingView() {
  return (
    <div className="text-center">
      <div className="w-[34px] h-[34px] mx-auto mt-[60px] mb-[22px] rounded-full border-[3px] border-borderSubtle border-t-textPrimary animate-spin" />
      <div className="text-textMuted text-[14px]">Generating a few options with Gemini…</div>
    </div>
  );
}
