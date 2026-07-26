import { projects, portfolioInfo, clients } from "../data/portfolioData";
import ProjectCard from "./ProjectCard";

export default function RightPanel() {
  return (
    <div className="lg:ml-[480px] min-h-screen bg-white flex flex-col justify-between">
      {/* Projects Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-[4px] p-[4px] md:p-[8px]">
        {projects.map((project) => (
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
                src="/avatar.png"
                alt="Dary Ramadhan"
                className="size-full object-cover"
              />
            </div>
            <div className="flex flex-col gap-[6px]">
              <h2 className="text-[20px] md:text-[22px] font-medium tracking-[-0.5px] text-black">
                Thanks for exploring my work!
              </h2>
              <p className="font-light text-[13px] md:text-[14px] leading-[1.5] text-gray-600 max-w-[480px]">
                Have a project or opportunity in mind? Book a free 30-minute discovery call or send me the project details.
              </p>

              {/* Bottom block (Selected companies and logos) */}
              {clients && clients.length > 0 && (
                <div className="flex flex-col gap-[20px] w-full pt-[24px]">
                  <p className="text-[11px] font-medium text-gray-400 uppercase tracking-[0.5px]">
                    Selected companies and teams I've worked with
                  </p>
                  <div className="flex flex-wrap items-center gap-x-[48px] gap-y-[24px]">
                    {clients.map((c) => (
                      <img
                        key={c.id}
                        src={c.logo}
                        alt={c.name || "Client logo"}
                        className="h-[20px] md:h-[24px] w-auto object-contain opacity-20 filter grayscale hover:opacity-40 transition-all duration-300"
                      />
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Right Sub-block: CTA buttons */}
          <div className="flex flex-row items-center gap-[20px] sm:gap-[24px] shrink-0">
            <a
              href={portfolioInfo.ctas.primary.url || "#"}
              className="bg-[#f25c0c] text-white font-medium text-[13px] md:text-[14px] leading-[1.4] px-[20px] py-[10px] rounded-[8px] whitespace-nowrap cursor-pointer hover:bg-[#e0540b] transition-colors"
            >
              {portfolioInfo.ctas.primary.label}
            </a>
            <a
              href="#resume"
              className="text-black font-medium text-[13px] md:text-[14px] leading-[1.4] whitespace-nowrap cursor-pointer hover:underline"
            >
              Download Resume
            </a>
          </div>
        </div>


      </div>
    </div>
  );
}
