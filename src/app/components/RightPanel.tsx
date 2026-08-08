import { useState } from "react";
import { projects, portfolioInfo } from "../data/portfolioData";
import ProjectCard from "./ProjectCard";

interface RightPanelProps {
  activeTab: "showcase" | "shots";
}

export default function RightPanel({ activeTab }: RightPanelProps) {
  const [cols, setCols] = useState<2 | 3>(2);

  const filteredProjects = projects.filter((project) => {
    if (activeTab === "showcase") return true; // Showcase displays all projects, unfiltered
    const isShot = project.category === "Exploration Design" || project.client === "Exploration Design";
    return isShot;
  });

  return (
    <div className="lg:ml-[480px] min-h-screen bg-white flex flex-col justify-between relative">
      {/* Projects Grid */}
      <div className={`grid grid-cols-1 gap-[8px] p-[8px] md:p-[8px] transition-all duration-300 ease-in-out ${cols === 2 ? "lg:grid-cols-2" : "lg:grid-cols-3"
        }`}>
        {filteredProjects.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </div>

      {/* Wide Thank you / CTA Footer */}
      <div className="w-full px-[24px] md:px-[48px] py-[64px] bg-white flex flex-col gap-[48px] font-['Manrope',sans-serif]">

        {/* Top block (Avatar + Text + Buttons) */}
        <div className="flex flex-col md:flex-row justify-between items-start gap-[48px] w-full">
          {/* Left Sub-block: Avatar + text info */}
          <div className="flex flex-row items-start gap-[20px] max-w-[650px]">
            <div className="size-[64px] md:size-[72px] rounded-full overflow-hidden shrink-0 mt-[4px]">
              <img
                src="/avatar.webp"
                alt="Dary Ramadhan"
                className="size-full object-cover"
              />
            </div>
            <div className="flex flex-col gap-[6px]">
              <h2 className="text-[20px] md:text-[22px] font-medium tracking-[-0.5px] text-black">
                Thanks for exploring my work!
              </h2>
              <p className="font-light text-[14px] md:text-[14px] leading-[1.5] max-w-[480px]">
                Have a project or opportunity in mind? Book a free 30-minute discovery call or send me the project details.
              </p>
            </div>
          </div>

          {/* Right Sub-block: CTA buttons */}
          <div className="flex flex-row items-center gap-[20px] sm:gap-[24px] shrink-0">
            <a
              href={portfolioInfo.ctas.primary.url || "#"}
              className="btn-primary text-[13px] md:text-[14px]"
            >
              {portfolioInfo.ctas.primary.label}
            </a>
            <a
              href="/resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="text-black font-medium text-[13px] md:text-[14px] leading-[1.4] whitespace-nowrap cursor-pointer hover:underline"
            >
              Download Resume
            </a>
          </div>
        </div>

      </div>

      {/* Grid columns switcher (floating at bottom right) */}
      <div className="hidden lg:flex fixed bottom-6 right-6 z-40 bg-[#F4F4F5]/90 backdrop-blur-md p-[2px] rounded-[8px] border border-black/[0.03] shadow-sm items-center">
        <button
          onClick={() => setCols(2)}
          className={`px-[10px] py-[4px] text-[12px] font-regular rounded-[6px] transition-all duration-200 cursor-pointer ${cols === 2
            ? "bg-white text-black shadow-sm"
            : "text-[#717182] hover:text-black"
            }`}
        >
          2 Columns
        </button>
        <button
          onClick={() => setCols(3)}
          className={`px-[10px] py-[4px] text-[12px] font-regular rounded-[6px] transition-all duration-200 cursor-pointer ${cols === 3
            ? "bg-white text-black shadow-sm"
            : "text-[#717182] hover:text-black"
            }`}
        >
          3 Columns
        </button>
      </div>
    </div>
  );
}
