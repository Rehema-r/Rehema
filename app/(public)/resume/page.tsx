import type { Metadata } from "next";
import { PageContainer } from "@/components/layout/page-container";
import { PrintResumeButton } from "@/features/resume/print-resume-button";
import { projects } from "@/features/projects/data";
import { journey } from "@/features/journey/data/journey";
import { skillGroups } from "@/features/skills/data/skills";
import { siteConfig } from "@/lib/constants/site";

export const metadata: Metadata = { title: "CV", description: "CV web imprimable de Rehema Kasongo." };

export default function ResumePage() {
  return <PageContainer className="route-page resume-page"><header><p className="system-label accent">Resume / Version web</p><h1>Rehema Kasongo Mbayo</h1><p>Software Engineering Student &amp; Software Developer</p><div><a href={`mailto:${siteConfig.email}`}>{siteConfig.email}</a><span>{siteConfig.location}</span><a href={siteConfig.github}>GitHub</a></div><PrintResumeButton /></header><section><h2>Profil</h2><p>Étudiant en Bac 3 Informatique, filière Génie Logiciel. Je construis des solutions logicielles pour des besoins concrets et je progresse par les projets, la documentation et l’apprentissage. Je recherche des stages, du mentorat et des collaborations techniques.</p></section><section><h2>Projets sélectionnés</h2>{projects.filter((project) => project.featured).map((project) => <article key={project.slug}><span>{project.status}</span><div><h3><a href={`/projects/${project.slug}`}>{project.title}</a></h3><p>{project.summary}</p></div></article>)}</section><section><h2>Formation et parcours</h2>{journey.map((item) => <article key={item.title}><time>{item.period}</time><div><h3>{item.title}</h3><strong>{item.organization}</strong><p>{item.description}</p></div></article>)}</section><section><h2>Pratique et apprentissage</h2><div className="resume-skills">{skillGroups.map((group) => <div key={group.title}><h3>{group.title}</h3><p>{group.skills.join(" · ")}</p><p>{group.level} — {group.description}</p></div>)}</div></section><section><h2>Projets secondaires</h2><p>Rehema Langue : développement et expérimentation. Rehema API, Rehema Beats, Rechat et MathForge : développement déclaré par l’auteur. REHEMA Chain : recherche et conception. Leurs fonctionnalités et technologies restent à démontrer dans une documentation dédiée.</p></section></PageContainer>;
}
