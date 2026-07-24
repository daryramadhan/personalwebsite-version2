import { Project, projects } from "../data/portfolioData";

interface ProjectDetailsProps {
  project: Project;
}

export default function ProjectDetails({ project }: ProjectDetailsProps) {
  // If the project doesn't have a case study, create a realistic fallback
  const caseStudy = project.caseStudy || {
    challenge: `${project.title || "This project"} was designed to address high-friction user workflows by introducing visual simplicity, clear information hierarchy, and dynamic feedback systems. The key objective was to map user interactions and reduce cognitive load.`,
    solution: `We designed a clean, modular visual interface that leverages core typography grids and micro-interactions. The final product scales seamlessly across form factors and streamlines complex operations into accessible workflows.`,
    timeline: "3 Months (2025)",
    deliverables: ["UI/UX Design", "Figma Design System", "Interactive Prototype"],
    gallery: project.src ? [project.src] : []
  };

  // Find next project link for navigation loop
  const currentIndex = projects.findIndex((p) => p.id === project.id);
  const nextProject = projects.find(
    (p, index) => index > currentIndex && !p.isEmpty && p.title
  );
  const fallbackNextProject = projects.find((p) => !p.isEmpty && p.title);
  const nextProjectToLink = nextProject || fallbackNextProject;
  const nextProjectUrl = nextProjectToLink ? `#/project/${nextProjectToLink.id}` : "#/";

  return (
    <div className="bg-white min-h-screen font-['Manrope',sans-serif] text-black">
      {/* Top Navbar */}
      <div className="max-w-[1200px] mx-auto px-[24px] py-[32px] flex justify-between items-center">
        <a
          href="#/"
          className="flex items-center gap-[8px] font-medium text-[14px] hover:text-[#f25c0c] transition-colors"
        >
          <svg
            viewBox="0 0 20 20"
            fill="none"
            className="size-[16px]"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path d="M15.8334 10H4.16669M4.16669 10L9.16669 15M4.16669 10L9.16669 5" />
          </svg>
          Back to Portfolio
        </a>
        <p className="text-[12px] opacity-60">Dary Ramadhan © 2026</p>
      </div>

      {/* Hero Section */}
      <div className="max-w-[1200px] mx-auto px-[24px] pb-[40px]">
        <div className="flex flex-col gap-[16px] md:gap-[24px] mb-[32px]">
          <h1 className="text-[40px] md:text-[64px] font-medium leading-[1.1] tracking-[-2px]">
            {project.title}
          </h1>
          <div className="flex flex-wrap gap-[16px] items-center text-[14px] opacity-80">
            <span className="bg-[#f4f4f4] px-[12px] py-[6px] rounded-[6px] text-black font-medium">
              {project.category}
            </span>
            <span className="text-[#605E59]">•</span>
            <span>{project.role}</span>
            <span className="text-[#605E59]">•</span>
            <span>{project.year}</span>
          </div>
        </div>

        {/* Large Cover Image */}
        {project.src && (
          <div className="w-full aspect-[16/9] md:aspect-[21/9] overflow-hidden rounded-[8px] bg-[#f4f4f4] relative shadow-sm">
            <img
              src={project.src}
              alt={project.title}
              className="absolute inset-0 size-full object-cover"
              style={{ objectPosition: project.fit === "top" ? "top center" : "center" }}
            />
          </div>
        )}
      </div>

      {/* Narrative Section & Metadata */}
      <div className="max-w-[1200px] mx-auto px-[24px] py-[40px] border-t border-[#f4f4f4]">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-[48px] items-start">
          {/* Main Case Study */}
          <div className="lg:col-span-2 flex flex-col gap-[36px]">
            <div className="flex flex-col gap-[12px]">
              <h2 className="text-[20px] font-semibold tracking-[-0.5px]">The Challenge</h2>
              <p className="text-[15px] leading-[1.6] opacity-80 text-justify">
                {caseStudy.challenge}
              </p>
            </div>
            <div className="flex flex-col gap-[12px]">
              <h2 className="text-[20px] font-semibold tracking-[-0.5px]">The Solution</h2>
              <p className="text-[15px] leading-[1.6] opacity-80 text-justify">
                {caseStudy.solution}
              </p>
            </div>
          </div>

          {/* Sidebar Metadata */}
          <div className="bg-[#f4f4f4] p-[20px] md:p-[24px] rounded-[8px] grid grid-cols-2 md:flex md:flex-col gap-[20px] md:gap-[24px] w-full">
            {caseStudy.timeline && (
              <div className="flex flex-col gap-[6px]">
                <p className="text-[11px] font-semibold text-[#605E59] uppercase tracking-[1px]">
                  Timeline
                </p>
                <p className="text-[13px] md:text-[14px] font-medium">{caseStudy.timeline}</p>
              </div>
            )}

            <div className="flex flex-col gap-[6px]">
              <p className="text-[11px] font-semibold text-[#605E59] uppercase tracking-[1px]">
                Role
              </p>
              <p className="text-[13px] md:text-[14px] font-medium">{project.role}</p>
            </div>

            {caseStudy.deliverables && (
              <div className="flex flex-col gap-[8px] col-span-2 md:col-span-1">
                <p className="text-[11px] font-semibold text-[#605E59] uppercase tracking-[1px]">
                  Deliverables
                </p>
                <div className="flex flex-wrap gap-[6px]">
                  {caseStudy.deliverables.map((deliv, index) => (
                    <span
                      key={index}
                      className="bg-white text-[11px] md:text-[12px] px-[10px] py-[4px] rounded-[4px] font-medium border border-black/5"
                    >
                      {deliv}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Image Gallery */}
      {caseStudy.gallery && caseStudy.gallery.length > 0 && (
        <div className="max-w-[1200px] mx-auto px-[24px] py-[40px] border-t border-[#f4f4f4]">
          <h2 className="text-[20px] font-semibold tracking-[-0.5px] mb-[24px]">Project Gallery</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-[16px]">
            {caseStudy.gallery.map((image, index) => (
              <div
                key={index}
                className="w-full aspect-[4/3] rounded-[8px] overflow-hidden bg-[#f4f4f4] relative shadow-sm"
              >
                <img src={image} alt={`Gallery ${index}`} className="absolute inset-0 size-full object-cover" />
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Bottom Footer Navigation */}
      <div className="border-t border-[#f4f4f4] bg-[#fdfdfd] py-[64px] px-[24px]">
        <div className="max-w-[1200px] mx-auto flex flex-col md:flex-row justify-between items-center gap-[24px]">
          <a
            href="#/"
            className="flex items-center gap-[8px] font-medium text-[15px] hover:text-[#f25c0c] transition-colors"
          >
            <svg
              viewBox="0 0 20 20"
              fill="none"
              className="size-[16px]"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M15.8334 10H4.16669M4.16669 10L9.16669 15M4.16669 10L9.16669 5" />
            </svg>
            Back to Portfolio
          </a>

          {nextProjectToLink && (
            <a
              href={nextProjectUrl}
              className="flex items-center gap-[8px] font-medium text-[15px] bg-black text-white px-[20px] py-[10px] rounded-[8px] hover:bg-[#f25c0c] hover:text-white transition-all shadow-sm w-full justify-center md:w-auto md:justify-start"
            >
              Next Project: {nextProjectToLink.title}
              <svg
                viewBox="0 0 20 20"
                fill="none"
                className="size-[16px]"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="M4.16663 10H15.8333M15.8333 10L10.8333 5M15.8333 10L10.8333 15" />
              </svg>
            </a>
          )}
        </div>
      </div>
    </div>
  );
}
