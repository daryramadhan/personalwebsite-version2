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
  const [adminTab, setAdminTab] = useState<"case-studies" | "home-layout">("case-studies");

  // Create Project Modal state
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [newProjTitle, setNewProjTitle] = useState("");
  const [newProjRole, setNewProjRole] = useState("Product Designer");
  const [newProjCategory, setNewProjCategory] = useState("AI SaaS");
  const [newProjTimeline, setNewProjTimeline] = useState("2 Months (Q4 2025)");
  const [newProjFit, setNewProjFit] = useState<"center" | "top">("center");
  const [newProjCoverFile, setNewProjCoverFile] = useState<File | null>(null);
  const [newProjCoverPreview, setNewProjCoverPreview] = useState("");
  const [isCreating, setIsCreating] = useState(false);

  const slugify = (text: string): string => {
    return text
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "");
  };

  const handleCreateProject = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newProjTitle.trim()) {
      alert("Project Title is required");
      return;
    }

    setIsCreating(true);
    try {
      let coverPath = "";
      if (newProjCoverFile) {
        coverPath = await optimizeAndUploadImage(newProjCoverFile);
      }

      const generatedId = slugify(newProjTitle);
      let finalId = generatedId;
      let counter = 1;
      while (projectsList.some(p => p.id === finalId)) {
        finalId = `${generatedId}-${counter}`;
        counter++;
      }

      const newProject: Project = {
        id: finalId,
        title: newProjTitle,
        category: newProjCategory,
        role: newProjRole,
        year: new Date().getFullYear().toString(),
        url: `#/project/${finalId}`,
        src: coverPath || undefined,
        badge: false,
        fit: newProjFit,
        isEmpty: false,
        caseStudy: {
          challenge: "",
          solution: "",
          timeline: newProjTimeline,
          sections: [
            {
              id: "overview",
              heading: "Overview",
              paragraphs: [
                `An overview of the design challenges and results for the ${newProjTitle} project.`
              ]
            }
          ]
        }
      };

      setProjectsList(prev => [...prev, newProject]);
      setSelectedProjectId(finalId);
      setIsCreateModalOpen(false);

      setNewProjTitle("");
      setNewProjRole("Product Designer");
      setNewProjCategory("AI SaaS");
      setNewProjTimeline("2 Months (Q4 2025)");
      setNewProjFit("center");
      setNewProjCoverFile(null);
      setNewProjCoverPreview("");
    } catch (err: any) {
      alert(`Failed to create project: ${err.message}`);
    } finally {
      setIsCreating(false);
    }
  };

  const handleDeleteProject = () => {
    if (!activeProject) return;
    const confirmDelete = window.confirm(
      `Are you sure you want to delete the project "${activeProject.title}"? This cannot be undone.`
    );
    if (!confirmDelete) return;

    const remaining = projectsList.filter(p => p.id !== selectedProjectId);
    setProjectsList(remaining);

    if (remaining.length > 0) {
      setSelectedProjectId(remaining[0].id);
    } else {
      setSelectedProjectId("");
    }
  };

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

        <div className="flex bg-[#f5f5f5] p-[3px] rounded-[8px] border border-[#e8e8e8]">
          <button
            onClick={() => setAdminTab("case-studies")}
            className={`text-[12px] font-semibold px-[16px] py-[6px] rounded-[6px] transition-all cursor-pointer ${
              adminTab === "case-studies"
                ? "bg-white text-black shadow-sm"
                : "text-gray-500 hover:text-black"
            }`}
          >
            Case Study Editor
          </button>
          <button
            onClick={() => setAdminTab("home-layout")}
            className={`text-[12px] font-semibold px-[16px] py-[6px] rounded-[6px] transition-all cursor-pointer ${
              adminTab === "home-layout"
                ? "bg-white text-black shadow-sm"
                : "text-gray-500 hover:text-black"
            }`}
          >
            Home Layout Manager
          </button>
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
        
        {adminTab === "case-studies" ? (
          <>
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
              <option value="" disabled>-- Select a Project --</option>
              {projectsList
                .filter(p => !p.isEmpty)
                .map(p => (
                  <option key={p.id} value={p.id}>
                    {p.title} {p.caseStudy ? "(Case Study)" : ""}
                  </option>
                ))}
            </select>

            <div className="flex gap-[8px] mt-[4px]">
              <button
                onClick={() => setIsCreateModalOpen(true)}
                className="flex-1 bg-[#f25c0c] hover:bg-[#e0540b] text-white font-semibold text-[12px] py-[8px] px-[12px] rounded-[6px] transition-colors cursor-pointer text-center"
              >
                + Create Project
              </button>
              {activeProject && (
                <button
                  onClick={handleDeleteProject}
                  className="bg-white hover:bg-red-50 text-red-600 border border-red-200 font-semibold text-[12px] py-[8px] px-[12px] rounded-[6px] transition-colors cursor-pointer"
                >
                  Delete Project
                </button>
              )}
            </div>

            {activeProject && (
              <div className="flex items-center gap-[8px] mt-[8px] border-t border-[#f0f0f0] pt-[8px]">
                <span className="text-[11px] font-semibold text-[#8e8e8e] uppercase tracking-[0.5px] mr-auto">Home Page Layout:</span>
                <button
                  onClick={() => {
                    const idx = projectsList.findIndex(p => p.id === selectedProjectId);
                    if (idx <= 0) return;
                    const next = [...projectsList];
                    const temp = next[idx];
                    next[idx] = next[idx - 1];
                    next[idx - 1] = temp;
                    setProjectsList(next);
                  }}
                  disabled={projectsList.findIndex(p => p.id === selectedProjectId) === 0}
                  className="bg-white border border-[#e0e0e0] hover:bg-gray-50 text-black text-[12px] font-medium py-[4px] px-[10px] rounded-[4px] disabled:opacity-30 cursor-pointer"
                  title="Move Up on Home Page"
                >
                  ▲ Move Up
                </button>
                <button
                  onClick={() => {
                    const idx = projectsList.findIndex(p => p.id === selectedProjectId);
                    if (idx < 0 || idx === projectsList.length - 1) return;
                    const next = [...projectsList];
                    const temp = next[idx];
                    next[idx] = next[idx + 1];
                    next[idx + 1] = temp;
                    setProjectsList(next);
                  }}
                  disabled={projectsList.findIndex(p => p.id === selectedProjectId) === projectsList.length - 1}
                  className="bg-white border border-[#e0e0e0] hover:bg-gray-50 text-black text-[12px] font-medium py-[4px] px-[10px] rounded-[4px] disabled:opacity-30 cursor-pointer"
                  title="Move Down on Home Page"
                >
                  ▼ Move Down
                </button>
              </div>
            )}
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

              {/* Cover Aspect Fit & Show Case Study Tag */}
              <div className="grid grid-cols-2 gap-[16px]">
                <div className="flex flex-col gap-[6px]">
                  <label className="text-[11px] font-semibold text-[#8e8e8e] uppercase tracking-[0.5px]">
                    Cover Fit Aspect
                  </label>
                  <select
                    value={activeProject.fit || "center"}
                    onChange={(e) => updateProjectField("fit", e.target.value)}
                    className="border border-[#e0e0e0] rounded-[8px] px-[12px] py-[8px] text-[13px] outline-none focus:border-black bg-white cursor-pointer transition-colors"
                  >
                    <option value="center">Center (Fill)</option>
                    <option value="top">Top (Aligned)</option>
                  </select>
                </div>
                <div className="flex flex-col gap-[6px]">
                  <label className="text-[11px] font-semibold text-[#8e8e8e] uppercase tracking-[0.5px]">
                    Case Study Tag Badge
                  </label>
                  <label className="flex items-center gap-[8px] text-[13px] font-medium cursor-pointer h-[38px]">
                    <input
                      type="checkbox"
                      checked={!!activeProject.badge}
                      onChange={(e) => updateProjectField("badge", e.target.checked)}
                      className="size-[16px] rounded-[4px] border-[#e0e0e0] checked:bg-[#f25c0c] checked:border-transparent accent-[#f25c0c] cursor-pointer"
                    />
                    Show "Case Study" Badge
                  </label>
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
                          Heading (H2)
                        </label>
                        <input
                          type="text"
                          value={sec.heading}
                          onChange={(e) => updateSectionField(sec.id, "heading", e.target.value)}
                          className="border border-[#e0e0e0] rounded-[8px] px-[12px] py-[8px] text-[13px] outline-none focus:border-black bg-white transition-colors"
                        />
                      </div>

                      {/* Navigation Title Alias (Optional) */}
                      <div className="flex flex-col gap-[6px]">
                        <label className="text-[11px] font-semibold text-[#8e8e8e] uppercase tracking-[0.5px]">
                          Navigation Title Alias (Optional Sidebar Alias)
                        </label>
                        <input
                          type="text"
                          value={sec.navTitle || ""}
                          onChange={(e) => updateSectionField(sec.id, "navTitle", e.target.value || undefined)}
                          placeholder="e.g. Problem (falls back to H2 Heading if empty)"
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
      </>
    ) : (
      /* Visual Home Page Mock */
      <div className="flex-1 flex overflow-hidden">
        {/* Left branding panel preview */}
        <aside className="w-[320px] bg-white border-r border-[#f0f0f0] p-[24px] flex flex-col justify-between shrink-0 select-none pointer-events-none opacity-60">
          <div className="text-[12px] text-gray-400 font-semibold uppercase">Branding Panel Preview</div>
          <div className="flex flex-col gap-[16px] my-auto">
            <div className="size-[12px] rounded-full bg-green-500 mb-[4px]" />
            <h2 className="text-[24px] font-bold tracking-tight text-black">{info.headline || "Dary Ramadhan"}</h2>
            <p className="text-[12px] text-gray-500 leading-relaxed">{info.description}</p>
          </div>
          <div className="text-[11px] text-gray-400">© {info.year} {info.author}</div>
        </aside>

        {/* Right project cards grid preview with inline layout arrangement tools */}
        <main className="flex-1 overflow-y-auto p-[32px] bg-[#fafafa]">
          <div className="max-w-[1000px] mx-auto flex flex-col gap-[24px]">
            <div className="flex justify-between items-center border-b border-[#e0e0e0] pb-[12px]">
              <div>
                <h2 className="text-[20px] font-bold text-black tracking-[-0.3px]">Home Page Layout Grid</h2>
                <p className="text-[12px] text-gray-400 mt-[2px]">Rearrange project card positioning by shifting them left or right.</p>
              </div>
              <button
                onClick={() => setIsCreateModalOpen(true)}
                className="bg-[#f25c0c] hover:bg-[#e0540b] text-white font-semibold text-[13px] px-[16px] py-[8px] rounded-[6px] transition-colors cursor-pointer"
              >
                + Create Project
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[20px]">
              {projectsList
                .filter(p => !p.isEmpty)
                .map((project, index) => {
                  return (
                    <div
                      key={project.id}
                      className="relative group border border-[#e8e8e8] rounded-[10px] overflow-hidden bg-white shadow-sm flex flex-col aspect-[4/3] transition-all hover:shadow-md"
                    >
                      {/* Project card preview */}
                      {project.src ? (
                        <img
                          src={project.src}
                          alt={project.title}
                          className="size-full object-cover bg-gray-50 flex-1"
                          style={{ objectPosition: project.fit === "top" ? "top center" : "center" }}
                        />
                      ) : (
                        <div className="flex-1 bg-[#fafafa] flex items-center justify-center text-gray-300 text-[12px]">
                          No Cover Image
                        </div>
                      )}

                      {/* Card Footer Detail */}
                      <div className="bg-[#fafafa] border-t border-[#f0f0f0] p-[12px] flex justify-between items-center z-20">
                        <div className="min-w-0 flex-1 mr-[8px]">
                          <p className="text-[13px] font-bold text-black line-clamp-1">{project.title}</p>
                          <p className="text-[11px] text-gray-400 mt-[2px]">{project.category || "AI SaaS"}</p>
                        </div>
                        {project.badge && (
                          <span className="bg-[#f25c0c] text-white text-[9px] font-bold px-[6px] py-[2px] rounded whitespace-nowrap shrink-0">
                            Case Study
                          </span>
                        )}
                      </div>

                      {/* Hover Arrangement Controls Bar */}
                      <div className="absolute inset-0 bg-black/75 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex flex-col justify-center items-center gap-[12px] p-[16px] z-10 text-white">
                        <span className="text-[13px] font-bold tracking-tight text-center px-[8px] line-clamp-1">{project.title}</span>
                        
                        <div className="flex gap-[6px]">
                          <button
                            onClick={() => {
                              if (index === 0) return;
                              const next = [...projectsList];
                              const temp = next[index];
                              next[index] = next[index - 1];
                              next[index - 1] = temp;
                              setProjectsList(next);
                            }}
                            disabled={index === 0}
                            className="bg-white hover:bg-gray-100 text-black font-semibold text-[10px] py-[4px] px-[8px] rounded-[4px] transition-colors disabled:opacity-40 cursor-pointer"
                            title="Move Left / Up"
                          >
                            ◀ Move Left
                          </button>
                          <button
                            onClick={() => {
                              const activeProjects = projectsList.filter(p => !p.isEmpty);
                              if (index === activeProjects.length - 1) return;
                              const next = [...projectsList];
                              const temp = next[index];
                              next[index] = next[index + 1];
                              next[index + 1] = temp;
                              setProjectsList(next);
                            }}
                            disabled={index === projectsList.filter(p => !p.isEmpty).length - 1}
                            className="bg-white hover:bg-gray-100 text-black font-semibold text-[10px] py-[4px] px-[8px] rounded-[4px] transition-colors disabled:opacity-40 cursor-pointer"
                            title="Move Right / Down"
                          >
                            Move Right ▶
                          </button>
                        </div>

                        <div className="flex gap-[6px]">
                          <button
                            onClick={() => {
                              setSelectedProjectId(project.id);
                              setAdminTab("case-studies");
                            }}
                            className="bg-white/20 hover:bg-white/30 text-white border border-white/30 font-semibold text-[10px] py-[4px] px-[8px] rounded-[4px] transition-colors cursor-pointer"
                          >
                            Edit Case Study
                          </button>
                          <button
                            onClick={() => {
                              const confirmDelete = window.confirm(`Delete project "${project.title}"?`);
                              if (!confirmDelete) return;
                              setProjectsList(prev => prev.filter(p => p.id !== project.id));
                            }}
                            className="bg-red-600 hover:bg-red-700 text-white font-semibold text-[10px] py-[4px] px-[8px] rounded-[4px] transition-colors cursor-pointer"
                          >
                            Delete
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })}
            </div>
          </div>
        </main>
      </div>
    )}
  </div>

      {/* Create Project Modal */}
      {isCreateModalOpen && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-[16px]">
          <div className="bg-white border border-[#e0e0e0] rounded-[16px] max-w-[480px] w-full shadow-2xl overflow-hidden flex flex-col font-['Manrope',sans-serif]">
            {/* Modal Header */}
            <div className="bg-white border-b border-[#f0f0f0] px-[24px] py-[16px] flex justify-between items-center">
              <h3 className="text-[16px] font-bold tracking-[-0.2px] text-black">Create New Project</h3>
              <button
                type="button"
                onClick={() => setIsCreateModalOpen(false)}
                className="text-gray-400 hover:text-black text-[18px] cursor-pointer"
              >
                ✕
              </button>
            </div>

            {/* Modal Form */}
            <form onSubmit={handleCreateProject} className="p-[24px] flex flex-col gap-[16px] overflow-y-auto max-h-[80vh]">
              <div className="flex flex-col gap-[6px]">
                <label className="text-[11px] font-semibold text-[#8e8e8e] uppercase tracking-[0.5px]">
                  Project Title *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Resumify, DescAd"
                  value={newProjTitle}
                  onChange={(e) => setNewProjTitle(e.target.value)}
                  className="border border-[#e0e0e0] rounded-[8px] px-[12px] py-[8px] text-[13px] outline-none focus:border-black bg-white transition-colors"
                />
              </div>

              <div className="grid grid-cols-2 gap-[12px]">
                <div className="flex flex-col gap-[6px]">
                  <label className="text-[11px] font-semibold text-[#8e8e8e] uppercase tracking-[0.5px]">
                    Role
                  </label>
                  <input
                    type="text"
                    value={newProjRole}
                    onChange={(e) => setNewProjRole(e.target.value)}
                    className="border border-[#e0e0e0] rounded-[8px] px-[12px] py-[8px] text-[13px] outline-none focus:border-black bg-white transition-colors"
                  />
                </div>
                <div className="flex flex-col gap-[6px]">
                  <label className="text-[11px] font-semibold text-[#8e8e8e] uppercase tracking-[0.5px]">
                    Platform / Category
                  </label>
                  <input
                    type="text"
                    value={newProjCategory}
                    onChange={(e) => setNewProjCategory(e.target.value)}
                    className="border border-[#e0e0e0] rounded-[8px] px-[12px] py-[8px] text-[13px] outline-none focus:border-black bg-white transition-colors"
                  />
                </div>
              </div>

              <div className="flex flex-col gap-[6px]">
                <label className="text-[11px] font-semibold text-[#8e8e8e] uppercase tracking-[0.5px]">
                  Case Study Timeline
                </label>
                <input
                  type="text"
                  value={newProjTimeline}
                  onChange={(e) => setNewProjTimeline(e.target.value)}
                  className="border border-[#e0e0e0] rounded-[8px] px-[12px] py-[8px] text-[13px] outline-none focus:border-black bg-white transition-colors"
                />
              </div>

              {/* Cover Image Upload */}
              <div className="flex flex-col gap-[6px]">
                <label className="text-[11px] font-semibold text-[#8e8e8e] uppercase tracking-[0.5px]">
                  Card Cover Image (WebP Auto-Optimized)
                </label>
                {newProjCoverPreview ? (
                  <div className="relative group h-[120px] w-full border border-[#e0e0e0] rounded-[8px] overflow-hidden bg-[#fafafa]">
                    <img src={newProjCoverPreview} alt="Cover Preview" className="size-full object-cover" />
                    <button
                      type="button"
                      onClick={() => {
                        setNewProjCoverFile(null);
                        setNewProjCoverPreview("");
                      }}
                      className="absolute inset-0 bg-black/50 text-white text-[11px] font-semibold flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer"
                    >
                      Remove Cover
                    </button>
                  </div>
                ) : (
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (!file) return;
                      setNewProjCoverFile(file);
                      
                      const reader = new FileReader();
                      reader.onload = (event) => {
                        setNewProjCoverPreview(event.target?.result as string);
                      };
                      reader.readAsDataURL(file);
                    }}
                    className="text-[12px] w-full cursor-pointer file:mr-[8px] file:py-[4px] file:px-[8px] file:rounded-[4px] file:border-0 file:text-[11px] file:font-semibold file:bg-[#f25c0c] file:text-white file:hover:bg-[#e0540b]"
                  />
                )}
              </div>

              {/* Fit Option */}
              <div className="flex flex-col gap-[6px]">
                <label className="text-[11px] font-semibold text-[#8e8e8e] uppercase tracking-[0.5px]">
                  Cover Image Aspect Fit
                </label>
                <div className="flex gap-[16px]">
                  <label className="flex items-center gap-[6px] text-[13px] font-medium cursor-pointer">
                    <input
                      type="radio"
                      name="fit"
                      checked={newProjFit === "center"}
                      onChange={() => setNewProjFit("center")}
                      className="cursor-pointer accent-[#f25c0c]"
                    />
                    Center (Fill)
                  </label>
                  <label className="flex items-center gap-[6px] text-[13px] font-medium cursor-pointer">
                    <input
                      type="radio"
                      name="fit"
                      checked={newProjFit === "top"}
                      onChange={() => setNewProjFit("top")}
                      className="cursor-pointer accent-[#f25c0c]"
                    />
                    Top (Aligned)
                  </label>
                </div>
              </div>

              {/* Actions */}
              <div className="flex gap-[12px] border-t border-[#f0f0f0] pt-[16px] mt-[8px]">
                <button
                  type="button"
                  onClick={() => setIsCreateModalOpen(false)}
                  className="flex-1 bg-white border border-[#e0e0e0] hover:bg-gray-50 text-black font-semibold text-[13px] py-[10px] rounded-[8px] transition-colors cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isCreating}
                  className="flex-1 bg-[#f25c0c] hover:bg-[#e0540b] text-white font-semibold text-[13px] py-[10px] rounded-[8px] transition-colors cursor-pointer disabled:opacity-50 text-center"
                >
                  {isCreating ? "Creating..." : "Create Project"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
