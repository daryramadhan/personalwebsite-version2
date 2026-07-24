import { useState } from "react";
import { 
  projects as initialProjects, 
  portfolioInfo as initialInfo, 
  socialLinks as initialSocialLinks, 
  clients as initialClients, 
  Project, 
  CaseStudySection
} from "../data/portfolioData";
import ProjectDetails from "./ProjectDetails";

const optimizeAndUploadImage = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (event) => {
      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement("canvas");
        const ctx = canvas.getContext("2d");
        if (!ctx) {
          reject(new Error("Could not get 2D canvas context"));
          return;
        }

        const maxW = 1600;
        let w = img.width;
        let h = img.height;
        if (w > maxW) {
          h = Math.round((h * maxW) / w);
          w = maxW;
        }

        canvas.width = w;
        canvas.height = h;
        ctx.drawImage(img, 0, 0, w, h);

        canvas.toBlob(
          async (blob) => {
            if (!blob) {
              reject(new Error("Image conversion failed"));
              return;
            }

            const filename = `uploaded_${Date.now()}.webp`;
            try {
              const response = await fetch(`/api/upload-image?filename=${filename}`, {
                method: "POST",
                headers: {
                  "Content-Type": "image/webp"
                },
                body: blob
              });
              const result = await response.json();
              if (result.success && result.filePath) {
                resolve(result.filePath);
              } else {
                reject(new Error(result.error || "Upload failed"));
              }
            } catch (err) {
              reject(err);
            }
          },
          "image/webp",
          0.8
        );
      };
      img.onerror = () => reject(new Error("Image rendering failed"));
      img.src = event.target?.result as string;
    };
    reader.onerror = () => reject(new Error("File reading failed"));
    reader.readAsDataURL(file);
  });
};

export default function AdminDashboard() {
  const [projectsList, setProjectsList] = useState<Project[]>(initialProjects);
  const [info, setInfo] = useState(initialInfo);
  const [socials, setSocials] = useState(initialSocialLinks);
  const [clients] = useState(initialClients);

  // Editing state
  const [selectedProjectId, setSelectedProjectId] = useState<string | number>(
    initialProjects.find(p => p.caseStudy)?.id || ""
  );
  const [saveStatus, setSaveStatus] = useState<"idle" | "saving" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const activeProject = projectsList.find(p => p.id === selectedProjectId);

  // Save edits back to the local file
  const handleSave = async () => {
    setSaveStatus("saving");
    try {
      const payload = {
        portfolioInfo: info,
        socialLinks: socials,
        clients,
        projects: projectsList
      };

      const response = await fetch("/api/save-portfolio", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(payload)
      });

      const result = await response.json();
      if (result.success) {
        setSaveStatus("success");
        setTimeout(() => setSaveStatus("idle"), 3000);
      } else {
        throw new Error(result.error || "Failed to save portfolio data");
      }
    } catch (err: any) {
      setSaveStatus("error");
      setErrorMessage(err.message || "An unexpected error occurred");
    }
  };

  // Helper to update specific active project fields
  const updateProjectField = (field: keyof Project, value: any) => {
    setProjectsList(prev =>
      prev.map(p => (p.id === selectedProjectId ? { ...p, [field]: value } : p))
    );
  };

  // Helper to update case study fields
  const updateCaseStudyField = (field: string, value: any) => {
    setProjectsList(prev =>
      prev.map(p => {
        if (p.id === selectedProjectId) {
          const cs = p.caseStudy || { challenge: "", solution: "" };
          return {
            ...p,
            caseStudy: {
              ...cs,
              [field]: value
            }
          };
        }
        return p;
      })
    );
  };

  // Case Study Sections array helpers
  const getActiveProjectSections = (): CaseStudySection[] => {
    const cs = activeProject?.caseStudy;
    if (!cs) return [];
    if (cs.sections && cs.sections.length > 0) return cs.sections;

    // Return the default mapped sections
    return [
      {
        id: "overview",
        heading: "Overview",
        paragraphs: [cs.overviewText || cs.challenge],
        image: activeProject.src,
      },
      {
        id: "problem",
        heading: cs.problemHeading || "The Problem Framework",
        paragraphs: cs.problemText || [cs.challenge, cs.solution],
        image: cs.gallery && cs.gallery.length > 1 ? cs.gallery[1] : undefined,
        caption: cs.gallery && cs.gallery.length > 1 ? `A preview of the ${activeProject.title} Dashboard Screen` : undefined,
      },
      {
        id: "post-launch",
        heading: cs.postLaunchHeading || "Post-launch Impact",
        paragraphs: cs.postLaunchText || [
          "Following deployment, the platform saw significant user engagement and high phrase generation success rates. The solution delivered robust performance across core templates, resulting in optimized workflow times."
        ],
      }
    ];
  };

  const handleUpdateSections = (newSections: CaseStudySection[]) => {
    updateCaseStudyField("sections", newSections);
  };

  const addSection = () => {
    const sections = getActiveProjectSections();
    const newSec: CaseStudySection = {
      id: `section-${Date.now()}`,
      heading: "New Section",
      paragraphs: ["Write section paragraphs here..."]
    };
    handleUpdateSections([...sections, newSec]);
  };

  const removeSection = (secId: string) => {
    const sections = getActiveProjectSections();
    handleUpdateSections(sections.filter(s => s.id !== secId));
  };

  const moveSection = (index: number, direction: "up" | "down") => {
    const sections = [...getActiveProjectSections()];
    const targetIndex = direction === "up" ? index - 1 : index + 1;
    if (targetIndex < 0 || targetIndex >= sections.length) return;
    
    // Swap elements
    const temp = sections[index];
    sections[index] = sections[targetIndex];
    sections[targetIndex] = temp;
    handleUpdateSections(sections);
  };

  const updateSectionField = (secId: string, field: keyof CaseStudySection, value: any) => {
    const sections = getActiveProjectSections().map(s =>
      s.id === secId ? { ...s, [field]: value } : s
    );
    handleUpdateSections(sections);
  };

  const updateSectionFields = (secId: string, fields: Partial<CaseStudySection>) => {
    const sections = getActiveProjectSections().map(s =>
      s.id === secId ? { ...s, ...fields } : s
    );
    handleUpdateSections(sections);
  };

  return (
    <div className="bg-[#fafafa] min-h-screen text-black flex flex-col font-['Manrope',sans-serif]">
      {/* Top Banner Control Header */}
      <header className="bg-white border-b border-[#f0f0f0] px-[24px] py-[16px] flex justify-between items-center z-10 shadow-sm shrink-0">
        <div className="flex items-center gap-[24px]">
          <a
            href="#/"
            className="text-[13px] font-medium text-[#8e8e8e] hover:text-black flex items-center gap-[4px] transition-colors"
          >
            ← Back to Portfolio
          </a>
          <div className="h-[20px] w-[1px] bg-[#f0f0f0]" />
          <h1 className="text-[16px] font-semibold tracking-[-0.2px]">Admin CMS Dashboard</h1>
        </div>

        <div className="flex items-center gap-[12px]">
          {saveStatus === "success" && (
            <span className="text-[12px] text-green-600 font-medium animate-fade-in">
              Changes persisted successfully!
            </span>
          )}
          {saveStatus === "error" && (
            <span className="text-[12px] text-red-600 font-medium">
              Error: {errorMessage}
            </span>
          )}
          <button
            onClick={handleSave}
            disabled={saveStatus === "saving"}
            className="bg-[#f25c0c] hover:bg-[#e0540b] text-white text-[13px] font-medium px-[20px] py-[10px] rounded-[8px] transition-all cursor-pointer disabled:opacity-50"
          >
            {saveStatus === "saving" ? "Saving..." : "Save Changes"}
          </button>
        </div>
      </header>

      {/* Main Workspace Layout */}
      <div className="flex flex-1 overflow-hidden h-[calc(100vh-69px)]">
        
        {/* Left Side: CMS Form controls */}
        <aside className="w-[45%] bg-white border-r border-[#f0f0f0] overflow-y-auto p-[32px] flex flex-col gap-[36px]">
          
          {/* Select Project to Edit */}
          <div className="flex flex-col gap-[8px]">
            <label className="text-[12px] font-semibold text-[#8e8e8e] uppercase tracking-[1px]">
              Select Project to Edit
            </label>
            <select
              value={selectedProjectId}
              onChange={(e) => setSelectedProjectId(e.target.value)}
              className="w-full bg-white border border-[#e0e0e0] rounded-[8px] px-[12px] py-[10px] text-[14px] outline-none focus:border-black transition-colors"
            >
              {projectsList
                .filter(p => !p.isEmpty)
                .map(p => (
                  <option key={p.id} value={p.id}>
                    {p.title} {p.caseStudy ? "(Case Study)" : ""}
                  </option>
                ))}
            </select>
          </div>

          <hr className="border-[#f0f0f0]" />

          {/* Project Details Forms */}
          {activeProject && (
            <div className="flex flex-col gap-[32px]">
              <h2 className="text-[18px] font-bold tracking-[-0.3px]">Project Metadata</h2>
              
              <div className="grid grid-cols-2 gap-[16px]">
                <div className="flex flex-col gap-[6px]">
                  <label className="text-[11px] font-semibold text-[#8e8e8e] uppercase tracking-[0.5px]">
                    Role
                  </label>
                  <input
                    type="text"
                    value={activeProject.role || ""}
                    onChange={(e) => updateProjectField("role", e.target.value)}
                    className="border border-[#e0e0e0] rounded-[8px] px-[12px] py-[8px] text-[13px] outline-none focus:border-black transition-colors"
                  />
                </div>
                <div className="flex flex-col gap-[6px]">
                  <label className="text-[11px] font-semibold text-[#8e8e8e] uppercase tracking-[0.5px]">
                    Year
                  </label>
                  <input
                    type="text"
                    value={activeProject.year || ""}
                    onChange={(e) => updateProjectField("year", e.target.value)}
                    className="border border-[#e0e0e0] rounded-[8px] px-[12px] py-[8px] text-[13px] outline-none focus:border-black transition-colors"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-[16px]">
                <div className="flex flex-col gap-[6px]">
                  <label className="text-[11px] font-semibold text-[#8e8e8e] uppercase tracking-[0.5px]">
                    Timeline
                  </label>
                  <input
                    type="text"
                    value={activeProject.caseStudy?.timeline || ""}
                    onChange={(e) => updateCaseStudyField("timeline", e.target.value)}
                    className="border border-[#e0e0e0] rounded-[8px] px-[12px] py-[8px] text-[13px] outline-none focus:border-black transition-colors"
                  />
                </div>
                <div className="flex flex-col gap-[6px]">
                  <label className="text-[11px] font-semibold text-[#8e8e8e] uppercase tracking-[0.5px]">
                    Platform / Category
                  </label>
                  <input
                    type="text"
                    value={activeProject.category || ""}
                    onChange={(e) => updateProjectField("category", e.target.value)}
                    className="border border-[#e0e0e0] rounded-[8px] px-[12px] py-[8px] text-[13px] outline-none focus:border-black transition-colors"
                  />
                </div>
              </div>

              <div className="flex flex-col gap-[6px]">
                <label className="text-[11px] font-semibold text-[#8e8e8e] uppercase tracking-[0.5px]">
                  Project Cover Image (Auto-Optimized WebP)
                </label>
                <div className="flex items-center gap-[12px]">
                  {activeProject.src && (
                    <img src={activeProject.src} alt="Cover" className="h-[40px] w-[60px] object-cover rounded-[4px] border border-[#e0e0e0]" />
                  )}
                  <input
                    type="file"
                    accept="image/*"
                    onChange={async (e) => {
                      const file = e.target.files?.[0];
                      if (!file) return;
                      try {
                        const filePath = await optimizeAndUploadImage(file);
                        updateProjectField("src", filePath);
                      } catch (err: any) {
                        alert(`Upload failed: ${err.message}`);
                      }
                    }}
                    className="text-[13px] file:bg-[#f25c0c] file:text-white file:border-none file:px-[12px] file:py-[6px] file:rounded-[6px] file:cursor-pointer file:hover:bg-[#e0540b] file:transition-colors cursor-pointer"
                  />
                </div>
              </div>

              <hr className="border-[#f0f0f0]" />

              {/* Dynamic H2-linked Case Study Sections */}
              <div className="flex flex-col gap-[20px]">
                <div className="flex justify-between items-center">
                  <h2 className="text-[18px] font-bold tracking-[-0.3px]">Case Study Sections</h2>
                  <button
                    onClick={addSection}
                    className="text-[12px] font-semibold text-[#f25c0c] hover:underline cursor-pointer"
                  >
                    + Add Section
                  </button>
                </div>

                <div className="flex flex-col gap-[24px]">
                  {getActiveProjectSections().map((sec, secIdx) => (
                    <div key={sec.id} className="border border-[#e0e0e0] rounded-[12px] p-[20px] flex flex-col gap-[16px] bg-[#fafafa]">
                      
                      {/* Section Header Controls */}
                      <div className="flex justify-between items-center">
                        <span className="text-[11px] font-bold text-[#f25c0c] uppercase">
                          Section #{secIdx + 1} ({sec.id})
                        </span>
                        <div className="flex items-center gap-[8px]">
                          <button
                            onClick={() => moveSection(secIdx, "up")}
                            disabled={secIdx === 0}
                            className="text-[12px] text-gray-500 hover:text-black cursor-pointer disabled:opacity-30"
                          >
                            ▲
                          </button>
                          <button
                            onClick={() => moveSection(secIdx, "down")}
                            disabled={secIdx === getActiveProjectSections().length - 1}
                            className="text-[12px] text-gray-500 hover:text-black cursor-pointer disabled:opacity-30"
                          >
                            ▼
                          </button>
                          <button
                            onClick={() => removeSection(sec.id)}
                            className="text-[12px] text-red-500 hover:text-red-700 font-semibold cursor-pointer ml-[8px]"
                          >
                            Delete
                          </button>
                        </div>
                      </div>

                      {/* Heading (Linked directly to left navbar) */}
                      <div className="flex flex-col gap-[6px]">
                        <label className="text-[11px] font-semibold text-[#8e8e8e] uppercase tracking-[0.5px]">
                          Heading (H2 / Nav Label)
                        </label>
                        <input
                          type="text"
                          value={sec.heading}
                          onChange={(e) => updateSectionField(sec.id, "heading", e.target.value)}
                          className="border border-[#e0e0e0] rounded-[8px] px-[12px] py-[8px] text-[13px] outline-none focus:border-black bg-white transition-colors"
                        />
                      </div>

                      {/* Paragraphs Editor */}
                      <div className="flex flex-col gap-[8px]">
                        <label className="text-[11px] font-semibold text-[#8e8e8e] uppercase tracking-[0.5px]">
                          Paragraphs
                        </label>
                        {sec.paragraphs.map((pText, pIdx) => (
                          <div key={pIdx} className="flex gap-[8px] items-start">
                            <textarea
                              value={pText}
                              rows={3}
                              onChange={(e) => {
                                const nextParas = [...sec.paragraphs];
                                nextParas[pIdx] = e.target.value;
                                updateSectionField(sec.id, "paragraphs", nextParas);
                              }}
                              className="flex-1 border border-[#e0e0e0] rounded-[8px] px-[12px] py-[8px] text-[13px] outline-none focus:border-black bg-white transition-colors resize-none"
                            />
                            <button
                              onClick={() => {
                                const nextParas = sec.paragraphs.filter((_, idx) => idx !== pIdx);
                                updateSectionField(sec.id, "paragraphs", nextParas.length > 0 ? nextParas : [""]);
                              }}
                              className="text-red-500 hover:text-red-700 text-[12px] font-semibold mt-[8px] cursor-pointer"
                            >
                              Remove
                            </button>
                          </div>
                        ))}
                        <button
                          onClick={() => {
                            updateSectionField(sec.id, "paragraphs", [...sec.paragraphs, ""]);
                          }}
                          className="text-[11px] font-semibold text-[#f25c0c] hover:underline cursor-pointer self-start"
                        >
                          + Add Paragraph
                        </button>
                      </div>

                      {/* Image Layout Column Picker */}
                      <div className="flex flex-col gap-[6px]">
                        <label className="text-[11px] font-semibold text-[#8e8e8e] uppercase tracking-[0.5px]">
                          Layout Columns
                        </label>
                        <div className="flex gap-[24px]">
                          <label className="flex items-center gap-[6px] text-[13px] font-medium cursor-pointer">
                            <input
                              type="radio"
                              name={`layout-${sec.id}`}
                              checked={sec.layout !== "2-column"}
                              onChange={() => updateSectionField(sec.id, "layout", "1-column")}
                              className="cursor-pointer accent-[#f25c0c]"
                            />
                            1 Column
                          </label>
                          <label className="flex items-center gap-[6px] text-[13px] font-medium cursor-pointer">
                            <input
                              type="radio"
                              name={`layout-${sec.id}`}
                              checked={sec.layout === "2-column"}
                              onChange={() => updateSectionField(sec.id, "layout", "2-column")}
                              className="cursor-pointer accent-[#f25c0c]"
                            />
                            2 Columns
                          </label>
                        </div>
                      </div>

                      {/* Mockup Images List & Uploader */}
                      {(() => {
                        const secImages = sec.images && sec.images.length > 0
                          ? sec.images
                          : (sec.image ? [sec.image] : []);
                        const isTwoColumn = sec.layout === "2-column";

                        return (
                          <div className="flex flex-col gap-[12px]">
                            <div className="flex justify-between items-center">
                              <label className="text-[11px] font-semibold text-[#8e8e8e] uppercase tracking-[0.5px]">
                                Mockup Images (WebP Auto-Optimized)
                              </label>
                            </div>

                            {/* Reorderable image cards list */}
                            {secImages.length > 0 && (
                              <div className="flex flex-col gap-[8px]">
                                {secImages.map((imgSrc, imgIdx) => (
                                  <div key={imgIdx} className="flex flex-col gap-[8px] p-[12px] border border-[#e8e8e8] rounded-[8px] bg-white">
                                    <div className="flex items-center gap-[12px]">
                                      <img src={imgSrc} alt={`Mockup ${imgIdx + 1}`} className="h-[40px] w-[60px] object-cover rounded-[4px] border border-[#f0f0f0]" />
                                      <span className="text-[12px] font-semibold text-gray-500 flex-1">Mockup #{imgIdx + 1}</span>
                                      <div className="flex items-center gap-[4px]">
                                        <button
                                          onClick={() => {
                                            if (imgIdx === 0) return;
                                            const next = [...secImages];
                                            const nextCaps = sec.captions ? [...sec.captions] : [];
                                            const tempImg = next[imgIdx];
                                            next[imgIdx] = next[imgIdx - 1];
                                            next[imgIdx - 1] = tempImg;
                                            const tempCap = nextCaps[imgIdx];
                                            nextCaps[imgIdx] = nextCaps[imgIdx - 1];
                                            nextCaps[imgIdx - 1] = tempCap;
                                            
                                            updateSectionFields(sec.id, {
                                              images: next,
                                              image: next[0],
                                              captions: nextCaps,
                                              caption: nextCaps[0] || undefined
                                            });
                                          }}
                                          disabled={imgIdx === 0}
                                          className="text-[11px] text-gray-500 hover:text-black cursor-pointer disabled:opacity-30 p-[4px]"
                                          title="Move Up"
                                        >
                                          ▲
                                        </button>
                                        <button
                                          onClick={() => {
                                            if (imgIdx === secImages.length - 1) return;
                                            const next = [...secImages];
                                            const nextCaps = sec.captions ? [...sec.captions] : [];
                                            const tempImg = next[imgIdx];
                                            next[imgIdx] = next[imgIdx + 1];
                                            next[imgIdx + 1] = tempImg;
                                            const tempCap = nextCaps[imgIdx];
                                            nextCaps[imgIdx] = nextCaps[imgIdx + 1];
                                            nextCaps[imgIdx + 1] = tempCap;
                                            
                                            updateSectionFields(sec.id, {
                                              images: next,
                                              image: next[0],
                                              captions: nextCaps,
                                              caption: nextCaps[0] || undefined
                                            });
                                          }}
                                          disabled={imgIdx === secImages.length - 1}
                                          className="text-[11px] text-gray-500 hover:text-black cursor-pointer disabled:opacity-30 p-[4px]"
                                          title="Move Down"
                                        >
                                          ▼
                                        </button>
                                        <button
                                          onClick={() => {
                                            const next = secImages.filter((_, idx) => idx !== imgIdx);
                                            const nextCaps = sec.captions ? sec.captions.filter((_, idx) => idx !== imgIdx) : [];
                                            updateSectionFields(sec.id, {
                                              images: next,
                                              image: next[0] || undefined,
                                              captions: nextCaps,
                                              caption: nextCaps[0] || undefined
                                            });
                                          }}
                                          className="text-[11px] text-red-500 hover:text-red-700 font-semibold cursor-pointer ml-[8px]"
                                        >
                                          Delete
                                        </button>
                                      </div>
                                    </div>
                                    
                                    {/* Specific Caption Input Field */}
                                    <div className="flex flex-col gap-[4px] mt-[4px]">
                                      <label className="text-[10px] font-semibold text-[#8e8e8e] uppercase">
                                        Mockup Caption
                                      </label>
                                      <input
                                        type="text"
                                        value={sec.captions?.[imgIdx] || (imgIdx === 0 ? sec.caption : "")}
                                        onChange={(e) => {
                                          const nextCaps = sec.captions ? [...sec.captions] : [];
                                          while (nextCaps.length <= imgIdx) {
                                            nextCaps.push("");
                                          }
                                          nextCaps[imgIdx] = e.target.value;
                                          updateSectionFields(sec.id, {
                                            captions: nextCaps,
                                            caption: imgIdx === 0 ? e.target.value : (sec.caption || undefined)
                                          });
                                        }}
                                        placeholder="Enter caption for this mockup..."
                                        className="border border-[#e0e0e0] rounded-[6px] px-[10px] py-[6px] text-[12px] outline-none focus:border-black bg-white transition-colors"
                                      />
                                    </div>
                                  </div>
                                ))}
                              </div>
                            )}

                            {/* Add Mockup Image Button */}
                            <div className="flex flex-col gap-[6px] border-t border-[#f0f0f0] pt-[12px] mt-[4px]">
                              <label className="text-[11px] font-semibold text-[#8e8e8e] uppercase tracking-[0.5px]">
                                + Add Mockup Image
                              </label>
                              <input
                                type="file"
                                accept="image/*"
                                multiple
                                onChange={async (e) => {
                                  const files = Array.from(e.target.files || []);
                                  if (files.length === 0) return;
                                  
                                  updateSectionField(sec.id, "caption", "Optimizing and uploading mockup...");
                                  try {
                                    const uploadedPaths: string[] = [];
                                    for (const file of files) {
                                      const filePath = await optimizeAndUploadImage(file);
                                      uploadedPaths.push(filePath);
                                    }
                                    const nextImages = [...secImages, ...uploadedPaths];
                                    const nextCaps = sec.captions ? [...sec.captions] : [];
                                    while (nextCaps.length < nextImages.length) {
                                      nextCaps.push("");
                                    }
                                    updateSectionFields(sec.id, {
                                      images: nextImages,
                                      image: nextImages[0],
                                      captions: nextCaps,
                                      caption: nextCaps[0] || undefined
                                    });
                                  } catch (err: any) {
                                    alert(`Upload failed: ${err.message}`);
                                    updateSectionField(sec.id, "caption", "");
                                  }
                                }}
                                className="text-[13px] file:bg-[#f25c0c] file:text-white file:border-none file:px-[12px] file:py-[6px] file:rounded-[6px] file:cursor-pointer file:hover:bg-[#e0540b] file:transition-colors cursor-pointer"
                              />
                            </div>
                          </div>
                        );
                      })()}

                    </div>
                  ))}
                </div>
              </div>

            </div>
          )}

        </aside>

        {/* Right Side: Split-screen visual live preview */}
        <main className="flex-1 bg-[#fdfdfd] overflow-y-auto">
          {activeProject ? (
            <div className="pointer-events-none scale-[0.95] origin-top p-[16px] select-none">
              <div className="border border-[#e0e0e0] rounded-[12px] overflow-hidden shadow-2xl bg-white">
                <div className="bg-[#fafafa] border-b border-[#f0f0f0] px-[16px] py-[8px] flex items-center gap-[6px]">
                  <div className="size-[10px] rounded-full bg-red-400" />
                  <div className="size-[10px] rounded-full bg-yellow-400" />
                  <div className="size-[10px] rounded-full bg-green-400" />
                  <span className="text-[11px] font-medium text-gray-400 ml-[12px]">
                    Visual Live Preview
                  </span>
                </div>
                <ProjectDetails 
                  project={{
                    ...activeProject,
                    caseStudy: {
                      ...activeProject.caseStudy,
                      sections: getActiveProjectSections()
                    }
                  }} 
                />
              </div>
            </div>
          ) : (
            <div className="h-full flex items-center justify-center text-[#b4b4b4] text-[14px]">
              Select a project to load preview.
            </div>
          )}
        </main>

      </div>
    </div>
  );
}
