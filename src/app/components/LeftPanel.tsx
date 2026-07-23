import { useState, useEffect } from "react";
import { portfolioInfo, socialLinks, clients } from "../data/portfolioData";
import AvailableDot from "./AvailableDot";

const getJakartaTime = () => {
  const options: Intl.DateTimeFormatOptions = {
    timeZone: "Asia/Jakarta",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false,
  };
  return new Intl.DateTimeFormat("en-US", options).format(new Date());
};

export default function LeftPanel() {
  const [time, setTime] = useState(getJakartaTime());

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(getJakartaTime());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div
      className="lg:fixed lg:top-0 lg:left-0 lg:h-screen lg:w-[480px] relative w-full h-auto flex flex-col justify-between px-[24px] py-[40px] md:px-[50px] lg:py-[32px] bg-white gap-12 lg:gap-0"
    >
      {/* Top bar */}
      <div className="flex items-center justify-between w-full">
        <p className="font-['Manrope',sans-serif] font-normal text-[12px] leading-[1.4] text-black whitespace-nowrap">
          {portfolioInfo.author} © {portfolioInfo.year}
        </p>
        <p className="font-['Manrope',sans-serif] font-normal text-[12px] leading-[1.4] text-[#605E59] whitespace-nowrap tabular-nums">
          {time} JKT
        </p>
      </div>

      {/* Middle content */}
      <div className="flex flex-col gap-[33px] flex-1 justify-center">
        {/* Available badge */}
        <div className="flex gap-[12px] items-center">
          <AvailableDot />
          <p className="font-['Manrope',sans-serif] font-normal text-[12px] leading-[1.4] text-black whitespace-nowrap">
            {portfolioInfo.availability}
          </p>
        </div>

        {/* Headline + description */}
        <div className="flex flex-col gap-[16px] w-full">
          <p className="font-['Manrope',sans-serif] font-medium text-[36px] leading-[1.1] tracking-[-1.44px] text-black w-full">
            {portfolioInfo.headline}
          </p>
          <p className="font-['Manrope',sans-serif] font-normal text-[14px] leading-[1.5] text-black w-full">
            {portfolioInfo.description}{" "}
            <a
              href="#about"
              className="text-[#F25C0C] hover:underline"
            >
              Learn About Me
            </a>
          </p>
        </div>

        {/* CTA buttons */}
        <div className="flex gap-[8px] items-center">
          <button className="bg-black text-white font-['Manrope',sans-serif] font-medium text-[14px] leading-[1.4] px-[16px] py-[8px] rounded-[8px] whitespace-nowrap cursor-pointer">
            {portfolioInfo.ctas.primary.label}
          </button>
          <button className="bg-[#f4f4f4] text-[#1e1e1e] font-['Manrope',sans-serif] font-medium text-[14px] leading-[1.4] px-[16px] py-[8px] rounded-[8px] whitespace-nowrap cursor-pointer">
            {portfolioInfo.ctas.secondary.label}
          </button>
        </div>

        {/* Social links */}
        <div className="flex gap-[17px] items-center font-['Manrope',sans-serif] font-normal text-[12px] leading-[1.4] text-[#1e1e1e]">
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

      {/* Clients section */}
      <div className="flex flex-col gap-[24px] w-full">
        <p className="font-['Manrope',sans-serif] font-normal text-[12px] leading-[1.4] text-[#b4b4b4] whitespace-nowrap">
          Selected clients and collaborators,
        </p>
        <div className="flex flex-wrap gap-[16px] items-center">
          {clients.map((client) => (
            <div
              key={client.id}
              className="h-[22px] w-[100px] relative shrink-0"
              style={client.opacity ? { opacity: client.opacity / 100 } : undefined}
            >
              <img
                src={client.logo}
                alt={client.name}
                className="absolute inset-0 size-full object-cover pointer-events-none max-w-none"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
