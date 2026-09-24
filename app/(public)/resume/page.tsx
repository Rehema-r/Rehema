import type { Metadata } from "next";
import Link from "next/link";
import { PageContainer } from "@/components/layout/page-container";
import { PrintResumeButton } from "@/features/resume/print-resume-button";
import { getPublicJourney, getPublicProfile, getPublicProjects, getPublicSkills } from "@/features/content/queries";

export const metadata: Metadata = { title: "CV", description: "CV web imprimable de Rehema Kasongo." };

export default async function ResumePage() {
  const [journey, projects, skillGroups, siteConfig] = await Promise.all([getPublicJourney(), getPublicProjects(), getPublicSkills(), getPublicProfile()]);
  return <PageContainer className="route-page resume-page"><header><p className="system-label accent">Resume / Version web</p><h1>Rehema Kasongo Mbayo</h1><p>Software Engineering Student &amp; Software Developer</p><div><a href={`mailto:${siteConfig.email}`}>{siteConfig.email}</a><span>{siteConfig.location}</span>{siteConfig.github ? <a href={siteConfig.github}>GitHub</a> : null}</div><PrintResumeButton /></header><section><h2>Profil</h2><p>{siteConfig.description}</p></section><section><h2>Projets sélectionnés</h2>{projects.filter((project) => project.featured).map((project) => <article key={project.slug}><span>{project.status}</span><div><h3><Link href={`/projects/${project.slug}`}>{project.title}</Link></h3><p>{project.summary}</p></div></article>)}</section><section><h2>Formation et parcours</h2>{journey.map((item, index) => <article key={`${item.title}-${index}`}><time>{item.period}</time><div><h3>{item.title}</h3><strong>{item.organization}</strong><p>{item.description}</p></div></article>)}</section><section><h2>Pratique et apprentissage</h2><div className="resume-skills">{skillGroups.map((group) => <div key={group.title}><h3>{group.title}</h3><p>{group.skills.join(" · ")}</p><p>{group.level} — {group.description}</p></div>)}</div></section><section><h2>Autres projets documentés</h2><p>Retrouvez l’ensemble des réalisations, développements, expérimentations et concepts avec leur état réel dans le Project Explorer.</p><Link className="section-link" href="/projects">Voir tous les projets</Link></section></PageContainer>;
}
