import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { RevealOnScroll } from "@/components/motion/reveal-on-scroll";
import { SectionTitle } from "@/components/shared/section-title";
import { ProjectCard } from "@/features/projects/components/project-card";
import { projects } from "@/features/projects/data";

export function FeaturedProjects() {
  const featured = projects.filter((project) => project.featured);
  return (
    <section className="content-section" id="exploration">
      <SectionTitle eyebrow="Project Explorer / Sélection" title={<>Systèmes en <em>orbite</em></>} copy="Des projets présentés avec leur niveau réel d’avancement, leur intention et les choix techniques qui les structurent." />
      <div className="projects-grid">{featured.map((project, index) => <RevealOnScroll key={project.slug} delay={index * 0.07}><ProjectCard project={project} index={index} /></RevealOnScroll>)}</div>
      <Link href="/projects" className="section-link">Ouvrir le Project Explorer complet <ArrowUpRight size={17} /></Link>
    </section>
  );
}
