import { useState, useEffect } from "react";
import LeftPanel from "./components/LeftPanel";
import RightPanel from "./components/RightPanel";
import ProjectDetails from "./components/ProjectDetails";
import AdminDashboard from "./components/AdminDashboard";
import { projects } from "./data/portfolioData";

export default function App() {
  const [browserHash, setBrowserHash] = useState(window.location.hash);
  const [activeHash, setActiveHash] = useState(window.location.hash);
  const [curtainState, setCurtainState] = useState<"idle" | "sliding-in" | "sliding-out">("idle");

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

  // Check if hash matches project details page route format: #/project/:id
  const projectPrefix = "#/project/";
  const isProjectRoute = activeHash.startsWith(projectPrefix);
  const projectId = isProjectRoute ? activeHash.slice(projectPrefix.length) : null;
  const activeProject = projectId ? projects.find((p) => p.id === projectId && !p.isEmpty) : null;
  const isAdminRoute = activeHash === "#/admin" && import.meta.env.DEV;

  return (
    <div className={`bg-white min-h-screen font-['Manrope',sans-serif] relative ${activeProject || isAdminRoute ? "" : "overflow-x-hidden"}`}>
      {isAdminRoute ? (
        <AdminDashboard />
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
