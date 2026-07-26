import { useEffect, useState, useMemo } from "react";
import { Project, projects, socialLinks, portfolioInfo, CaseStudySection } from "../data/portfolioData";

interface ProjectDetailsProps {
  project: Project;
}

export default function ProjectDetails({ project }: ProjectDetailsProps) {
  const [activeSection, setActiveSection] = useState("overview");

  // Fallback case study structure if not defined
  const caseStudy = project.caseStudy || {
    challenge: `${project.title || "This project"} was designed to address high-friction user workflows by introducing visual simplicity, clear information hierarchy, and dynamic feedback systems. The key objective was to map user interactions and reduce cognitive load.`,
    solution: `We designed a clean, modular visual interface that leverages core typography grids and micro-interactions. The final product scales seamlessly across form factors and streamlines complex operations into accessible workflows.`,
    timeline: "May - June 2025",
    deliverables: ["UI/UX Design", "Figma Design System", "Interactive Prototype"],
    gallery: project.src ? [project.src] : []
  };

  // Compile section list dynamically, fall back to legacy properties if cs.sections is empty
  const projectSections = useMemo((): CaseStudySection[] => {
    if (caseStudy.sections && caseStudy.sections.length > 0) {
      return caseStudy.sections;
    }

    const defaultSections: CaseStudySection[] = [];

    // Overview Section
    defaultSections.push({
      id: "overview",
      heading: "Overview",
      paragraphs: [caseStudy.overviewText || caseStudy.challenge],
      image: project.src,
    });

    // Problem Section
    defaultSections.push({
      id: "problem",
      heading: caseStudy.problemHeading || "The Problem Framework",
      paragraphs: caseStudy.problemText || [caseStudy.challenge, caseStudy.solution],
      image: caseStudy.gallery && caseStudy.gallery.length > 1 ? caseStudy.gallery[1] : undefined,
      caption: caseStudy.gallery && caseStudy.gallery.length > 1 ? `A preview of the ${project.title} Dashboard Screen` : undefined,
    });

    // Post-launch Section
    defaultSections.push({
      id: "post-launch",
      heading: caseStudy.postLaunchHeading || "Post-launch Impact",
      paragraphs: caseStudy.postLaunchText || [
        "Following deployment, the platform saw significant user engagement and high phrase generation success rates. The solution delivered robust performance across core templates, resulting in optimized workflow times."
      ],
    });

    return defaultSections;
  }, [project, caseStudy]);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 200; // offset to trigger active state earlier
      for (const section of projectSections) {
        const el = document.getElementById(section.id);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(section.id);
            break;
          }
        }
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [projectSections]);

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
      setActiveSection(id);
    }
  };

  // Convert url strings like www.domain.com into clickable html anchors
  const formatText = (text: string) => {
    const urlRegex = /(www\.[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+)/g;
    if (!urlRegex.test(text)) return text;

    const parts = text.split(urlRegex);
    return parts.map((part, index) => {
      if (urlRegex.test(part)) {
        return (
          <a
            key={index}
            href={`https://${part}`}
            target="_blank"
            rel="noopener noreferrer"
            className="underline hover:text-[#f25c0c] transition-colors"
          >
            {part}
          </a>
        );
      }
      return part;
    });
  };

  return (
    <div className="bg-white min-h-screen font-['Manrope',sans-serif] text-black flex flex-col justify-between">
      {/* Main Column Container */}
      <div className="max-w-[1000px] mx-auto px-[24px] md:px-[50px] py-[64px] flex flex-col lg:flex-row gap-[48px] lg:gap-[64px] items-start w-full flex-1">

        {/* Left Sticky Sidebar */}
        <div className="w-full lg:w-[100px] shrink-0 lg:sticky lg:top-[64px] lg:self-start flex flex-col items-start gap-[40px] h-fit">
          <a
            href="#/"
            className="bg-[#f25c0c] hover:bg-[#e0540b] text-white font-regular text-[14px] leading-[1.4] px-[20px] py-[8px] rounded-full inline-flex items-center gap-[6px] transition-colors cursor-pointer"
          >
            <span className="text-[14px]">←</span> Back
          </a>

          <nav className="hidden lg:flex flex-col gap-[16px] w-full">
            {projectSections.map((sec) => (
              <button
                key={sec.id}
                onClick={() => scrollToSection(sec.id)}
                className={`font-regular text-[14px] leading-[1.4] text-left transition-colors cursor-pointer ${activeSection === sec.id ? "text-black font-regular" : "text-[#b4b4b4] hover:text-black"
                  }`}
              >
                {sec.navTitle || sec.heading}
              </button>
            ))}
          </nav>
        </div>

        {/* Right Content Stream */}
        <div className="flex-1 flex flex-col gap-[24px] w-full">
          {projectSections.map((sec, idx) => (
            <section key={sec.id} id={sec.id} className="flex flex-col gap-[16px] scroll-mt-[64px]">
              {idx === 0 ? (
                <h1 className="font-medium text-[36px] leading-[1.1] tracking-[-1px] text-black">
                  {project.title}
                </h1>
              ) : (
                <h2 className="font-medium text-[24px] leading-[1.2] tracking-[-0.5px] text-black">
                  {sec.heading}
                </h2>
              )}

              <div className="flex flex-col gap-[16px] mb-4">
                {sec.paragraphs.map((para, pIdx) => (
                  <p key={pIdx} className="font-light text-[16px] text-black text-justify">
                    {formatText(para)}
                  </p>
                ))}
              </div>

              {(() => {
                const secImages = sec.images && sec.images.length > 0
                  ? sec.images
                  : (sec.image ? [sec.image] : []);
                const isTwoColumn = sec.layout === "2-column";

                if (secImages.length === 0) return null;

                return (
                  <div className="flex flex-col gap-[8x] w-full">
                    <div className={`grid gap-[8px] w-full ${isTwoColumn ? "grid-cols-1 md:grid-cols-2" : "grid-cols-1"}`}>
                      {secImages.map((imgSrc, imgIdx) => {
                        const specificCaption = sec.captions?.[imgIdx] || (imgIdx === 0 ? sec.caption : undefined);
                        return (
                          <div key={imgIdx} className="flex flex-col gap-[16px] w-full animate-fade-in">
                            <div className="w-full rounded-[8px] bg-[#f9f9f9] flex items-center justify-center p-[16px] md:p-[24px]">
                              <img
                                src={imgSrc}
                                alt={`${sec.heading} mockup ${imgIdx + 1}`}
                                className="w-full h-auto rounded-[6px] block"
                              />
                            </div>
                            {specificCaption && (
                              <p className="font-light text-[14px] leading-[1.4] text-[#b4b4b4] mt-[4px] text-center mb-[24px]">
                                {specificCaption}
                              </p>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  </div>
                );
              })()}

              {sec.postImageParagraphs && sec.postImageParagraphs.length > 0 && (
                <div className="flex flex-col gap-[16px] mt-6 mb-4">
                  {sec.postImageParagraphs.map((para, pIdx) => (
                    <p key={pIdx} className="font-light text-[16px] text-black text-justify animate-fade-in">
                      {formatText(para)}
                    </p>
                  ))}
                </div>
              )}

              {/* Render metadata row inside the first section (Overview) */}
              {idx === 0 && (
                <>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-[24px] pt-[24px] mt-[16px]">
                    <div>
                      <p className="font-normal text-[14px] leading-[1.4] text-[#8e8e8e] mb-[4px]">
                        Company/Client
                      </p>
                      <p className="font-medium text-[14px] leading-[1.4] text-black">
                        {project.client || project.title}
                      </p>
                    </div>
                    <div>
                      <p className="font-normal text-[14px] leading-[1.4] text-[#8e8e8e] mb-[4px]">
                        Role
                      </p>
                      <p className="font-medium text-[14px] leading-[1.4] text-black">
                        {project.role || "Product Designer"}
                      </p>
                    </div>
                    <div>
                      <p className="font-normal text-[14px] leading-[1.4] text-[#8e8e8e] mb-[4px]">
                        Timeline
                      </p>
                      <p className="font-medium text-[14px] leading-[1.4] text-black">
                        {caseStudy.timeline || "May - June 2025"}
                      </p>
                    </div>
                    <div>
                      <p className="font-normal text-[14px] leading-[1.4] text-[#8e8e8e] mb-[4px]">
                        Platform
                      </p>
                      <p className="font-medium text-[14px] leading-[1.4] text-black">
                        {project.category || "Responsive"}
                      </p>
                    </div>
                  </div>
                  <div className="h-[1px] w-full bg-[#f4f4f4] mt-[20px]" />
                </>
              )}
            </section>
          ))}
        </div>
      </div>

      {/* Footer */}
      <footer className="w-full border-t border-[#f4f4f4] py-[32px] px-[24px] md:px-[50px] bg-white">
        <div className="max-w-[1000px] mx-auto flex flex-col md:flex-row justify-between items-center gap-[24px] w-full">
          <p className="font-normal text-[14px] leading-[1.4] text-black whitespace-nowrap">
            {portfolioInfo.author} © {portfolioInfo.year}
          </p>
          <div className="flex flex-wrap justify-center md:justify-end gap-[16px] md:gap-[24px] items-center font-normal text-[14px] leading-[1.4] text-black">
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
            <a
              href="#resume"
              className="hover:underline"
            >
              Download Resume
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
