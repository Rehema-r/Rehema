import Image from "next/image";
import type { Project } from "@/data/portfolio";

export default function ProjectCard({ project, index }: { project: Project; index: number }) {
  return (
    <article className="project-card">
      <div className={project.image ? "project-visual has-image" : `project-visual tone-${(index % 4) + 1}`}>
        {project.image ? (
          <Image src={project.image} alt={`Aperçu du projet ${project.title}`} fill sizes="(max-width: 760px) 100vw, 50vw" className="project-image" />
        ) : (
          <>
            <span className="project-index">{String(index + 1).padStart(2, "0")}</span>
            <span className="project-monogram" aria-hidden="true">
              {project.title.split(" ").map((word) => word[0]).join("").slice(0, 3)}
            </span>
          </>
        )}
        <span className={`status status-${project.status.toLowerCase().replaceAll(" ", "-")}`}>{project.status}</span>
      </div>
      <div className="project-body">
        <p className="project-category">{project.category}</p>
        <h3>{project.title}</h3>
        <p>{project.summary}</p>
        <p className="project-outcome">{project.outcome}</p>
        <ul className="tag-list" aria-label="Technologies et thèmes">
          {project.tags.map((tag) => <li key={tag}>{tag}</li>)}
        </ul>
      </div>
    </article>
  );
}
