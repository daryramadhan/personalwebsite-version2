import { Project } from "../data/portfolioData";
import LuxuryImage from "./LuxuryImage";

interface ProjectCardProps {
  project: Project;
}

export default function ProjectCard({ project }: ProjectCardProps) {
  if (project.isEmpty) {
    return <div className="hidden lg:block bg-[#f4f4f4] aspect-[336/250] rounded-[4px] w-full" />;
  }

  return (
    <a
      href={project.url || "#"}
      className="group block bg-[#f4f4f4] aspect-[336/250] overflow-hidden relative rounded-[4px] w-full cursor-pointer"
    >
      {project.src && (
        <LuxuryImage
          src={project.src}
          alt={project.title || ""}
          className="size-full object-cover pointer-events-none p-[8px] rounded-[12px]"
          style={{ 
            position: "absolute",
            inset: 0,
            objectPosition: project.fit === "top" ? "top center" : "center" 
          }}
        />
      )}

      {project.badge && (
        <div className="absolute left-[12px] bottom-[12px] bg-[#f25c0c] px-[8px] py-[4px] rounded-[6px] group-hover:opacity-0 transition-opacity duration-200">
          <p className="font-['Manrope',sans-serif] font-medium text-[12px] leading-[1.4] text-white whitespace-nowrap">
            Case Study
          </p>
        </div>
      )}

      {/* Hover Info Overlay */}
      {project.title && (
        <div className="absolute bottom-0 left-0 w-full h-[40%] bg-[#f25c0c] translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-in-out flex flex-col justify-between p-[12px] text-white">
          {/* Info Section */}
          <div className="flex justify-between items-start w-full gap-[8px]">
            <div className="flex flex-col gap-[4px] min-w-0 flex-1">
              <p className="font-['Manrope',sans-serif] font-regular text-[18px] leading-[1.2] line-clamp-2">
                {project.title}
              </p>
              <p className="font-['Manrope',sans-serif] font-normal text-[14px] leading-[1.4] line-clamp-1">
                {project.role}
              </p>
            </div>
            <div className="flex items-center gap-[4px] font-['Manrope',sans-serif] font-light text-[12px] leading-[1.4] mt-[2px] shrink-0 whitespace-nowrap">
              <span>{project.category}</span>
              <span style={{ opacity: 0.3 }}>•</span>
              <span>{project.year}</span>
            </div>
          </div>

          {/* Action Row */}
          <div className="flex justify-between items-end w-full">
            <p className="font-['Manrope',sans-serif] font-light text-[14px] leading-[1.4]">
              See Work Details
            </p>
            <div className="size-[16px] shrink-0">
              <svg viewBox="0 0 20 20" fill="none" className="size-full" stroke="currentColor">
                <path
                  d="M4.16669 15.8333L15.8334 4.16663M15.8334 4.16663H6.66669M15.8334 4.16663V13.3333"
                  strokeWidth="1"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
          </div>
        </div>
      )}
    </a>
  );
}
