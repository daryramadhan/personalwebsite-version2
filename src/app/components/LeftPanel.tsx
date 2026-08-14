import { useState, useEffect } from "react";
import { portfolioInfo, clients, socialLinks } from "../data/portfolioData";
import AvailableDot from "./AvailableDot";

interface LeftPanelProps {
  activeTab: "showcase" | "shots";
  setActiveTab: (tab: "showcase" | "shots") => void;
}

export default function LeftPanel({ activeTab, setActiveTab }: LeftPanelProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [showCoachMark, setShowCoachMark] = useState(false);
  const [showMobileDot, setShowMobileDot] = useState(false);

  useEffect(() => {
    const hasSeen = localStorage.getItem("has_seen_shots_coachmark");
    if (!hasSeen) {
      // 1200ms delay to let initial entry animations complete first
      const timer = setTimeout(() => {
        setShowCoachMark(true);
      }, 1200);
      setShowMobileDot(true);
      return () => clearTimeout(timer);
    }
  }, []);

  // Dismiss if user switches tab to shots elsewhere
  useEffect(() => {
    if (activeTab === "shots") {
      localStorage.setItem("has_seen_shots_coachmark", "true");
      setShowCoachMark(false);
      setShowMobileDot(false);
    }
  }, [activeTab]);

  const handleCloseCoachMark = () => {
    localStorage.setItem("has_seen_shots_coachmark", "true");
    setShowCoachMark(false);
    setShowMobileDot(false);
  };

  const handleSeeShots = () => {
    localStorage.setItem("has_seen_shots_coachmark", "true");
    setShowCoachMark(false);
    setShowMobileDot(false);
    setActiveTab("shots");
  };

  const renderHeadline = () => {
    const headline = portfolioInfo.headline;
    const dotIndex = headline.indexOf(".");
    if (dotIndex !== -1) {
      const part1 = headline.slice(0, dotIndex);
      const part2 = headline.slice(dotIndex + 1).trim();
      return (
        <p className="font-['Manrope',sans-serif] font-medium text-[32px] lg:text-[36px] leading-[1.1] tracking-[-1.4px] text-black w-full">
          {part1}👋
          <span className="block mt-[6px]">{part2}</span>
        </p>
      );
    }
    return (
      <p className="font-['Manrope',sans-serif] font-medium text-[32px] lg:text-[36px] leading-[1.1] tracking-[-1.4px] text-black w-full">
        {headline}
      </p>
    );
  };

  return (
    <div
      className="lg:fixed lg:top-0 lg:left-0 lg:h-screen lg:w-[480px] relative w-full min-h-screen flex flex-col justify-between px-[24px] py-[32px] md:pl-[50px] lg:py-[32px] left-panel-bg z-10"
    >
      {/* Top bar */}
      <div className="flex items-center justify-between w-full relative z-20 shrink-0 animate-reveal-right delay-100">
        <p className="font-['Manrope',sans-serif] font-normal text-[12px] leading-[1.4] text-black whitespace-nowrap">
          {portfolioInfo.author} © {portfolioInfo.year}
        </p>

        {/* Tab switch control (Desktop Only) */}
        <div className="relative hidden lg:flex bg-[#F4F4F5] p-[2px] rounded-[8px] border border-black/[0.03]">
          <button
            onClick={() => setActiveTab("showcase")}
            className={`px-[10px] py-[4px] text-[12px] font-regular rounded-[6px] transition-all duration-200 cursor-pointer ${activeTab === "showcase"
              ? "bg-white text-black shadow-sm"
              : "text-[#717182] hover:text-black"
              }`}
          >
            Showcase
          </button>
          <button
            onClick={() => setActiveTab("shots")}
            className={`px-[10px] py-[4px] text-[12px] font-regular rounded-[6px] transition-all duration-200 cursor-pointer ${activeTab === "shots"
              ? "bg-white text-black shadow-sm"
              : "text-[#717182] hover:text-black"
              }`}
          >
            Shots
          </button>

          {/* Coach Mark Tooltip */}
          {showCoachMark && (
            <div className="absolute right-[2px] top-full mt-[12px] w-[220px] bg-white border border-black/[0.08] shadow-[0_10px_30px_rgba(0,0,0,0.08)] rounded-[12px] p-[12px] z-50 animate-reveal-scale flex flex-col gap-[4px]">
              {/* Arrow pointing directly up to the Shots button */}
              <div className="absolute top-0 right-[24px] w-[10px] h-[10px] bg-white border-t border-l border-black/[0.08] -translate-y-1/2 rotate-45" />

              {/* Close Button 'x' */}
              <button
                onClick={handleCloseCoachMark}
                aria-label="Close tooltip"
                className="absolute top-[10px] right-[10px] text-[#717182] hover:text-black transition-colors cursor-pointer"
              >
                <svg className="w-[12px] h-[12px]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>

              <div className="flex flex-col gap-[2px]">
                <p className="font-['Manrope',sans-serif] font-medium text-[13px] leading-[1.4] text-black pr-[16px]">
                  View design explorations
                </p>
                <button
                  onClick={handleSeeShots}
                  className="font-['Manrope',sans-serif] font-medium text-[12px] text-[#F25C0C] hover:text-[#e0540b] underline transition-colors cursor-pointer self-start"
                >
                  See shots
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Middle content (Bio & CTAs) */}
      <div className="flex flex-col gap-[24px] relative z-10 w-full lg:my-auto py-[48px] lg:py-0 shrink-0">
        {/* Available badge */}
        <div className="flex gap-[12px] items-center mb-4 animate-reveal-right delay-200">
          <AvailableDot />
          <p className="font-['Manrope',sans-serif] font-light text-[14px] leading-[1.4] text-black whitespace-nowrap">
            {portfolioInfo.availability}
          </p>
        </div>

        {/* Headline + description */}
        <div className="flex flex-col gap-[16px] w-full animate-reveal-right delay-300">
          {renderHeadline()}
          <p className="font-['Manrope',sans-serif] font-light text-[14px] leading-[1.4] tracking-[0.1px] text-black w-full">
            {portfolioInfo.description}
          </p>
        </div>

        {/* CTA buttons */}
        <div className="flex gap-[24px] items-center animate-reveal-right delay-400">
          <a
            href={portfolioInfo.ctas.primary.url || "#"}
            className="btn-primary"
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
                  src="/potrait.png"
                  alt="Dary Ramadhan"
                  className="size-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Group: Client Logos and Social Links */}
      <div className="flex flex-col gap-[40px] lg:gap-[48px] w-full relative z-10 shrink-0 animate-reveal-right delay-500">
        {/* Client Logos Grid */}
        <div className="w-full mb-4">
          <div className="grid grid-cols-4 gap-x-[2px] gap-y-[8px] items-center justify-center">
            {clients.map((c) => (
              <div key={c.id} className="flex items-center justify-center h-[32px] w-full">
                <img
                  src={c.logo}
                  alt={c.name}
                  className="h-full w-auto max-w-full object-contain opacity-50 grayscale hover:opacity-100 transition-opacity duration-300"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Bottom Bar: Social Links */}
        <div className="flex flex-wrap gap-[24px] items-center font-['Manrope',sans-serif] font-light text-[13px] text-[#8e8e8e] w-full">
          {socialLinks.map((link) => (
            <a
              key={link.label}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:underline hover:text-black transition-colors"
            >
              {link.label}
            </a>
          ))}
        </div>
      </div>

      {/* Tab switch control (Mobile Floating - Outside animated Top Bar container to prevent stacking context bug) */}
      <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-40 flex lg:hidden bg-[#F4F4F5] p-[2px] rounded-[8px] border border-black/[0.03] shadow-lg">
        <button
          onClick={() => setActiveTab("showcase")}
          className={`px-[10px] py-[4px] text-[12px] font-regular rounded-[6px] transition-all duration-200 cursor-pointer ${activeTab === "showcase"
            ? "bg-white text-black shadow-sm"
            : "text-[#717182] hover:text-black"
            }`}
        >
          Showcase
        </button>
        <button
          onClick={() => setActiveTab("shots")}
          className={`relative px-[10px] py-[4px] text-[12px] font-regular rounded-[6px] transition-all duration-200 cursor-pointer ${activeTab === "shots"
            ? "bg-white text-black shadow-sm"
            : "text-[#717182] hover:text-black"
            }`}
        >
          Shots
          {showMobileDot && (
            <>
              <span className="absolute top-[4px] right-[2px] w-[5px] h-[5px] bg-[#F25C0C] rounded-full animate-ping" style={{ animationDuration: "1.5s" }} />
              <span className="absolute top-[4px] right-[2px] w-[5px] h-[5px] bg-[#F25C0C] rounded-full" />
            </>
          )}
        </button>
      </div>
    </div>
  );
}

