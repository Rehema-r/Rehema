import type { Metadata } from "next";
import { PageContainer } from "@/components/layout/page-container";
import { PrintResumeButton } from "@/features/resume/print-resume-button";
import { journey } from "@/features/journey/data/journey";
import { skillGroups } from "@/features/skills/data/skills";
import { siteConfig } from "@/lib/constants/site";

export const metadata: Metadata = { title: "CV", description: "CV web imprimable de Rehema Kasongo." };

export default function ResumePage() {
  return <PageContainer className="route-page resume-page"><header><p className="system-label accent">Resume / Version web</p><h1>Rehema Kasongo</h1><p>Développeur full-stack · Étudiant en informatique · Cofondateur RM Tech</p><div><a href={`mailto:${siteConfig.email}`}>{siteConfig.email}</a><span>{siteConfig.location}</span><a href={siteConfig.github}>GitHub</a></div><PrintResumeButton /></header><section><h2>Profil</h2><p>Je conçois des applications, des systèmes et des expériences numériques en reliant les besoins du terrain, l’architecture et l’exécution technique.</p></section><section><h2>Expérience & parcours</h2>{journey.map((item) => <article key={item.title}><time>{item.period}</time><div><h3>{item.title}</h3><strong>{item.organization}</strong><p>{item.description}</p></div></article>)}</section><section><h2>Compétences</h2><div className="resume-skills">{skillGroups.map((group) => <div key={group.title}><h3>{group.title}</h3><p>{group.skills.join(" · ")}</p></div>)}</div></section></PageContainer>;
}
