"use client";

import Link from "next/link";
import { Grid2X2, Orbit, Search } from "lucide-react";
import { useMemo, useState } from "react";
import { ProjectCard } from "@/features/projects/components/project-card";
import { projectCategories, projects } from "@/features/projects/data";

export function ProjectExplorer() {
  const [category, setCategory] = useState("Tous");
  const [query, setQuery] = useState("");
  const [view, setView] = useState<"grid" | "universe">("grid");

  const visible = useMemo(() => projects.filter((project) => {
    const matchesCategory = category === "Tous" || project.category === category;
    const normalized = `${project.title} ${project.summary} ${project.tags.join(" ")}`.toLowerCase();
    return matchesCategory && normalized.includes(query.trim().toLowerCase());
  }), [category, query]);

  return (
    <section aria-label="Project Explorer">
      <div className="explorer-toolbar">
        <label className="search-field"><Search size={17} aria-hidden="true" /><span className="sr-only">Rechercher un projet</span><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Rechercher un système…" /></label>
        <div className="view-switch" aria-label="Mode d’affichage">
          <button type="button" className={view === "grid" ? "active" : ""} aria-pressed={view === "grid"} onClick={() => setView("grid")}><Grid2X2 size={16} /> Grille</button>
          <button type="button" className={view === "universe" ? "active" : ""} aria-pressed={view === "universe"} onClick={() => setView("universe")}><Orbit size={16} /> Univers</button>
        </div>
      </div>
      <div className="category-filters" aria-label="Catégories de projets">
        {projectCategories.map((item) => <button type="button" key={item} className={category === item ? "active" : ""} aria-pressed={category === item} onClick={() => setCategory(item)}>{item}</button>)}
      </div>
      <p className="result-count" aria-live="polite">{visible.length} signal{visible.length > 1 ? "s" : ""} détecté{visible.length > 1 ? "s" : ""}</p>
      {view === "grid" ? (
        <div className="projects-grid">{visible.map((project) => <ProjectCard key={project.slug} project={project} index={projects.indexOf(project)} />)}</div>
      ) : (
        <div className="project-universe" aria-label="Carte interactive simplifiée des projets">
          <div className="universe-core"><span>RK</span><strong>REHEMA</strong></div>
          {visible.slice(0, 8).map((project, index) => (
            <Link key={project.slug} href={`/projects/${project.slug}`} className={`universe-node node-${index + 1}`} title={project.summary}><span>{String(index + 1).padStart(2, "0")}</span>{project.title}</Link>
          ))}
          {visible.length === 0 ? <p className="empty-signal">Aucun projet ne correspond à cette recherche.</p> : null}
        </div>
      )}
    </section>
  );
}
