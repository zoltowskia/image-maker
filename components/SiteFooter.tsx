import { HillsdaleLogo } from "./HillsdaleLogo";

export function SiteFooter() {
  return (
    <footer className="bg-footer px-14 pt-10 pb-6">
      <div className="mb-[26px]">
        <HillsdaleLogo width={200} />
      </div>

      <div className="flex gap-20 mb-[22px] flex-wrap">
        <div>
          <h4 className="text-[12.5px] mb-2 text-[#e7edf6]">Address</h4>
          <div className="text-[12.5px] text-[#b7c6dd]">33 E College St, Hillsdale, MI 49242</div>
        </div>
        <div>
          <h4 className="text-[12.5px] mb-2 text-[#e7edf6]">Other sites</h4>
          <a href="#" className="text-[12.5px] text-[#b7c6dd] block mb-1">
            Hillsdale College ↗
          </a>
          <a href="#" className="text-[12.5px] text-[#b7c6dd] block mb-1">
            Hillsdale K-12 ↗
          </a>
        </div>
        <div>
          <h4 className="text-[12.5px] mb-2 text-[#e7edf6]">About this tool</h4>
          <div className="text-[12.5px] text-[#b7c6dd]">Internal image generator, powered by Gemini.</div>
        </div>
      </div>

      <hr className="border-t border-white/10 my-[18px]" />

      <div className="flex justify-between items-center flex-wrap gap-4">
        <div className="flex gap-[22px] flex-wrap">
          <a href="#" className="text-[11.5px] text-[#b7c6dd]">Privacy Policy</a>
          <a href="#" className="text-[11.5px] text-[#b7c6dd]">Video Privacy Policy</a>
          <a href="#" className="text-[11.5px] text-[#b7c6dd]">Mobile Messaging Terms and Conditions</a>
          <a href="#" className="text-[11.5px] text-[#b7c6dd]">Cookies Settings</a>
        </div>
        <div className="text-[#e7edf6] text-sm tracking-widest">in 𝕏 ◎ ▶ ⌁ f</div>
      </div>
    </footer>
  );
}
