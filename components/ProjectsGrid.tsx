"use client";

import { useState } from "react";
import ProjectCard from "@/components/ProjectCard";
import { projects } from "@/data/portfolio";

const filters = ["Tous", "En développement", "Prototype", "Concept", "Activité"];

export default function ProjectsGrid() {
  const [filter, setFilter] = useState("Tous");
  const visibleProjects = filter === "Tous" ? projects : projects.filter((project) => project.status === filter);

  return (
    <>
      <div className="filter-bar" aria-label="Filtrer les projets">
        {filters.map((item) => (
          <button type="button" key={item} className={filter === item ? "filter-button active" : "filter-button"} aria-pressed={filter === item} onClick={() => setFilter(item)}>
            {item}
          </button>
        ))}
      </div>
      <p className="results-count" aria-live="polite">{visibleProjects.length} projet{visibleProjects.length > 1 ? "s" : ""}</p>
      <div className="project-grid">
        {visibleProjects.map((project) => <ProjectCard key={project.id} project={project} index={projects.indexOf(project)} />)}
      </div>
    </>
  );
}
