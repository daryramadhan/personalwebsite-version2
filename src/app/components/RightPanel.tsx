import { projects } from "../data/portfolioData";
import ProjectCard from "./ProjectCard";

export default function RightPanel() {
  return (
    <div className="lg:ml-[480px] min-h-screen bg-white">
      {/* Projects Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-[4px] p-[4px] md:p-[8px]">
        {projects.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </div>
    </div>
  );
}
