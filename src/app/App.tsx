import { useState, useEffect, lazy, Suspense } from "react";
import LeftPanel from "./components/LeftPanel";
import RightPanel from "./components/RightPanel";
import ProjectDetails from "./components/ProjectDetails";
import AboutPage from "./components/AboutPage";
import { projects } from "./data/portfolioData";

// Lazy load AdminDashboard to keep production bundle light and tree-shaken
const AdminDashboard = lazy(() => import("./components/AdminDashboard"));

export default function App() {
  const [browserHash, setBrowserHash] = useState(window.location.hash);
  const [activeHash, setActiveHash] = useState(window.location.hash);
  const [curtainState, setCurtainState] = useState<"idle" | "sliding-in" | "sliding-out">("idle");

  // Check if hash matches project details page route format: #/project/:id
  const projectPrefix = "#/project/";
  const isProjectRoute = activeHash.startsWith(projectPrefix);
  const projectId = isProjectRoute ? activeHash.slice(projectPrefix.length) : null;
  const activeProject = projectId ? projects.find((p) => p.id === projectId && !p.isEmpty) : null;
  const isAdminRoute = activeHash === "#/admin" && import.meta.env.DEV;
  const isAboutRoute = activeHash === "#/about" || activeHash === "#/resume" || activeHash === "#about" || activeHash === "#resume";

  useEffect(() => {
    const handleHashChange = () => {
      setBrowserHash(window.location.hash);
    };
    window.addEventListener("hashchange", handleHashChange);
    return () => window.removeEventListener("hashchange", handleHashChange);
  }, []);

  useEffect(() => {
    if (browserHash !== activeHash) {
      setCurtainState("sliding-in");

      const timer1 = setTimeout(() => {
        setActiveHash(browserHash);
        window.scrollTo(0, 0);
        setCurtainState("sliding-out");
      }, 400);

      return () => clearTimeout(timer1);
    }
  }, [browserHash, activeHash]);

  useEffect(() => {
    if (curtainState === "sliding-out") {
      const timer2 = setTimeout(() => {
        setCurtainState("idle");
      }, 400);

      return () => clearTimeout(timer2);
    }
  }, [curtainState]);

  // Dynamic SEO Document Title & Description Meta tags
  useEffect(() => {
    let title = "Dary Ramadhan — Product Designer";
    let desc = "Product designer based in Jakarta, helping startups and enterprise teams turn complex requirements into clear, scalable product experiences.";

    if (isAdminRoute) {
      title = "Admin CMS Dashboard | Dary Ramadhan";
      desc = "Secure content management editor.";
    } else if (isAboutRoute) {
      title = "About | Dary Ramadhan";
      desc = "Learn about Dary Ramadhan, Lead Product Designer based in Jakarta. Specializing in enterprise workflows, Figma design systems, and UI/UX solutions.";
    } else if (activeProject) {
      title = `${activeProject.title} — Case Study by Dary Ramadhan`;
      if (activeProject.caseStudy?.challenge) {
        desc = activeProject.caseStudy.challenge;
      }
    }

    // Set document title
    document.title = title;

    // Set meta description
    const descMeta = document.querySelector('meta[name="description"]');
    if (descMeta) {
      descMeta.setAttribute("content", desc);
    }
    
    // Set Open Graph description
    const ogDescMeta = document.querySelector('meta[property="og:description"]');
    if (ogDescMeta) {
      ogDescMeta.setAttribute("content", desc);
    }

    // Set Open Graph title
    const ogTitleMeta = document.querySelector('meta[property="og:title"]');
    if (ogTitleMeta) {
      ogTitleMeta.setAttribute("content", title);
    }
  }, [activeHash, activeProject, isAdminRoute, isAboutRoute]);

  return (
    <div className={`bg-white min-h-screen font-['Manrope',sans-serif] relative ${activeProject || isAdminRoute || isAboutRoute ? "" : "overflow-x-hidden"}`}>
      {isAdminRoute ? (
        <Suspense fallback={null}>
          <AdminDashboard />
        </Suspense>
      ) : isAboutRoute ? (
        <AboutPage />
      ) : activeProject ? (
        <ProjectDetails project={activeProject} />
      ) : (
        <>
          <LeftPanel />
          <RightPanel />
        </>
      )}

      {/* Page Transition Curtain (slides right-to-left) */}
      <div
        className={`fixed inset-0 bg-[#f25c0c] z-50 transition-transform duration-400 ease-in-out ${
          curtainState === "idle"
            ? "translate-x-full !transition-none"
            : curtainState === "sliding-in"
            ? "translate-x-0"
            : "-translate-x-full"
        }`}
        style={{ pointerEvents: curtainState === "idle" ? "none" : "auto" }}
      />
    </div>
  );
}
