import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import type { PortfolioProject } from "@/features/projects/types/project.types";

export function ProjectCard({ project, index }: { project: PortfolioProject; index: number }) {
  return (
    <article className="universe-card">
      <Link href={`/projects/${project.slug}`} aria-label={`Découvrir ${project.title}`} className="project-card-link">
        <div className={`project-card-visual visual-${(index % 4) + 1}`}>
          {project.image ? <Image src={project.image} alt={`Aperçu de ${project.title}`} fill sizes="(max-width: 760px) 100vw, 50vw" className="project-cover" /> : <span className="project-glyph" aria-hidden="true">{project.title.split(" ").map((word) => word[0]).join("").slice(0, 3)}</span>}
          <span className="project-number">{String(index + 1).padStart(2, "0")}</span>
          <span className="project-status">{project.status}</span>
        </div>
        <div className="project-card-content">
          <div><p>{project.category}</p><h3>{project.title}</h3></div>
          <ArrowUpRight aria-hidden="true" />
          <p className="project-summary">{project.summary}</p>
          <ul>{project.tags.slice(0, 4).map((tag) => <li key={tag}>{tag}</li>)}</ul>
        </div>
      </Link>
    </article>
  );
}
