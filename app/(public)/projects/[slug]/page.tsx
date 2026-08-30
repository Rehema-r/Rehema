import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import { PageContainer } from "@/components/layout/page-container";
import { ProjectCard } from "@/features/projects/components/project-card";
import { getProjectBySlug, projects } from "@/features/projects/data";

export function generateStaticParams() { return projects.map(({ slug }) => ({ slug })); }

export async function generateMetadata({ params }: PageProps<"/projects/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  return project ? { title: project.title, description: project.summary } : { title: "Projet introuvable" };
}

export default async function ProjectDetailPage({ params }: PageProps<"/projects/[slug]">) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) notFound();
  const related = projects.filter((item) => item.slug !== project.slug && (item.category === project.category || item.tags.some((tag) => project.tags.includes(tag)))).slice(0, 2);
  return (
    <PageContainer className="route-page project-detail">
      <Link href="/projects" className="back-link"><ArrowLeft size={16} /> Retour au Project Explorer</Link>
      <header className="project-detail-hero">
        <div><p className="system-label accent">{project.category} / {project.status}</p><h1>{project.title}</h1><p>{project.summary}</p></div>
        <div className={`project-detail-visual visual-${(project.id % 4) + 1}`}>{project.image ? <Image src={project.image} alt={`Aperçu de ${project.title}`} fill priority sizes="(max-width: 800px) 100vw, 48vw" /> : <span>{project.title.split(" ").map((word) => word[0]).join("").slice(0, 3)}</span>}</div>
      </header>
      <section className="project-detail-grid"><div><p className="system-label">Mission</p><h2>Ce que le système cherche à résoudre.</h2></div><div><p>{project.description}</p><blockquote>{project.outcome}</blockquote><p className="availability-note">Technologies vérifiées ou domaines de travail, selon la description ci-dessus.</p><ul className="tech-list">{project.tags.map((tag) => <li key={tag}>{tag}</li>)}</ul>{project.demoUrl ? <a className="primary-action" href={project.demoUrl} target="_blank" rel="noreferrer">Consulter le site public <ArrowUpRight size={17} /></a> : <p className="availability-note">Aucun lien de démonstration vérifié n’est référencé sur cette fiche.</p>}{project.repository ? <p><a className="section-link" href={project.repository} target="_blank" rel="noreferrer">Code et documentation <ArrowUpRight size={17} /></a></p> : null}</div></section>
      {related.length ? <section className="related-section"><h2>Signaux voisins</h2><div className="projects-grid">{related.map((item) => <ProjectCard key={item.slug} project={item} index={projects.indexOf(item)} />)}</div></section> : null}
    </PageContainer>
  );
}
