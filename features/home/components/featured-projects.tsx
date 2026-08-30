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
      <SectionTitle eyebrow="Project Explorer / Sélection" title={<>Réalisations et <em>projets</em></>} copy="Les réalisations sont présentées en premier. Les projets techniques et les concepts sont explicitement distingués, avec leurs preuves et leurs limites." />
      <div className="projects-grid">{featured.map((project, index) => <RevealOnScroll key={project.slug} delay={index * 0.07}><ProjectCard project={project} index={index} /></RevealOnScroll>)}</div>
      <Link href="/projects" className="section-link">Ouvrir le Project Explorer complet <ArrowUpRight size={17} /></Link>
    </section>
  );
}
