import { useState } from "react";
import { portfolioInfo, socialLinks } from "../data/portfolioData";
import AvailableDot from "./AvailableDot";

export default function LeftPanel() {
  const [isHovered, setIsHovered] = useState(false);
  return (
    <div
      className="lg:fixed lg:top-0 lg:left-0 lg:h-screen lg:w-[480px] relative w-full min-h-screen flex flex-col justify-between px-[24px] py-[40px] md:px-[50px] lg:py-[32px] bg-white gap-12 lg:gap-0"
    >
      {/* Top bar */}
      <div className="flex items-center justify-between w-full">
        <p className="font-['Manrope',sans-serif] font-normal text-[12px] leading-[1.4] text-black whitespace-nowrap">
          {portfolioInfo.author} © {portfolioInfo.year}
        </p>
      </div>

      {/* Middle content */}
      <div className="flex flex-col gap-[33px] flex-1 justify-center">
        {/* Available badge */}
        <div className="flex gap-[12px] items-center">
          <AvailableDot />
          <p className="font-['Manrope',sans-serif] font-normal text-[14px] leading-[1.4] text-black whitespace-nowrap">
            {portfolioInfo.availability}
          </p>
        </div>

        {/* Headline + description */}
        <div className="flex flex-col gap-[16px] w-full">
          <p className="font-['Manrope',sans-serif] font-medium text-[36px] leading-[1.1] tracking-[-1.44px] text-black w-full">
            {portfolioInfo.headline}
          </p>
          <p className="font-['Manrope',sans-serif] font-light text-[14px] leading-[1.4] text-black w-full">
            {portfolioInfo.description}
          </p>
        </div>

        {/* CTA buttons */}
        <div className="flex gap-[24px] items-center">
          <a
            href={portfolioInfo.ctas.primary.url || "#"}
            className="bg-[#f25c0c] text-white font-['Manrope',sans-serif] font-medium text-[14px] leading-[1.4] px-[20px] py-[10px] rounded-[8px] whitespace-nowrap cursor-pointer hover:bg-[#e0540b] transition-colors"
          >
            {portfolioInfo.ctas.primary.label}
          </a>

          <div className="relative">
            <a
              href={portfolioInfo.ctas.secondary.url || "#"}
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
              className="text-black font-['Manrope',sans-serif] font-medium text-[14px] leading-[1.4] whitespace-nowrap cursor-pointer hover:underline py-[4px] block"
            >
              {portfolioInfo.ctas.secondary.label}
            </a>

            {/* Popover Circle Profile Image on Hover */}
            <div
              className={`absolute bottom-full left-1/2 -translate-x-1/2 mb-[12px] pointer-events-none transition-all duration-300 ease-out z-30 ${isHovered
                ? "opacity-100 translate-y-0 scale-100"
                : "opacity-0 translate-y-[8px] scale-95"
                }`}
            >
              <div className="size-[120px] rounded-full border-1 border-white shadow-lg overflow-hidden bg-gray-100">
                <img
                  src="/avatar.png"
                  alt="Dary Ramadhan"
                  className="size-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Social links at the bottom */}
      <div className="flex flex-wrap gap-[16px] items-center font-['Manrope',sans-serif] font-light text-[14px] leading-[1.4] text-black">
        {socialLinks.map((link) => (
          <a
            key={link.label}
            href={link.url}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:underline"
          >
            {link.label}
          </a>
        ))}
      </div>
    </div>
  );
}
