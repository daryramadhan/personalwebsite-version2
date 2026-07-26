import { projects, portfolioInfo } from "../data/portfolioData";
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

      {/* Thank you / CTA Footer */}
      <div className="flex flex-col items-center justify-center text-center px-[24px] py-[80px] md:py-[100px] bg-[white] gap-[16px] font-['Manrope',sans-serif]">
        {/* Avatar circle */}
        <div className="size-[120px] rounded-full overflow-hidden">
          <img
            src="/avatar.png"
            alt="Dary Ramadhan"
            className="size-full object-cover"
          />
        </div>

        {/* Text content */}
        <div className="flex flex-col gap-[12px] max-w-[500px]">
          <h2 className="text-[20px] md:text-[24px] font-regular tracking-[-0.8px] text-black">
            Thanks for exploring my work!
          </h2>
          <p className="font-light text-[14px] md:text-[15px] leading-[1.4] text-black">
            Have a project or opportunity in mind? Book a free 30-minute discovery call, or send the details through the project form.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-[20px] items-center mt-[8px]">
          <a
            href={portfolioInfo.ctas.primary.url || "#"}
            className="bg-[#f25c0c] text-white font-medium text-[14px] leading-[1.4] px-[24px] py-[12px] rounded-[8px] whitespace-nowrap cursor-pointer hover:bg-[#e0540b] transition-colors"
          >
            {portfolioInfo.ctas.primary.label}
          </a>
          <a
            href="#resume"
            className="text-black font-medium text-[14px] leading-[1.4] whitespace-nowrap cursor-pointer hover:underline"
          >
            Download Resume
          </a>
        </div>
      </div>
    </div>
  );
}
