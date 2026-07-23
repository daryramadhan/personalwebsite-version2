import { Project } from "../data/portfolioData";

interface ProjectCardProps {
  project: Project;
}

export default function ProjectCard({ project }: ProjectCardProps) {
  if (project.isEmpty) {
    return <div className="hidden lg:block bg-[#f4f4f4] aspect-[336/250] rounded-[4px] w-full" />;
  }

  return (
    <div className="bg-[#f4f4f4] aspect-[336/250] overflow-hidden relative rounded-[4px] w-full">
      {project.src && (
        <img
          src={project.src}
          alt=""
          className="absolute inset-0 size-full object-cover pointer-events-none"
          style={{ objectPosition: project.fit === "top" ? "top center" : "center" }}
        />
      )}
      {project.badge && (
        <div className="absolute left-[12px] bottom-[12px] bg-[#f25c0c] px-[8px] py-[4px] rounded-[6px]">
          <p className="font-['Manrope',sans-serif] font-medium text-[12px] leading-[1.4] text-white whitespace-nowrap">
            Case Study
          </p>
        </div>
      )}
    </div>
  );
}
