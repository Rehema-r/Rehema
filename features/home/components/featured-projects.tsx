import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { RevealOnScroll } from "@/components/motion/reveal-on-scroll";
import { SectionTitle } from "@/components/shared/section-title";
import { ProjectCard } from "@/features/projects/components/project-card";
import { getPublicProjects } from "@/features/content/queries";

export async function FeaturedProjects() {
  const projects = await getPublicProjects();
  const verifiedSlugs = ["rm-study", "union-company-sarl", "rm-tech"];
  const featured = projects
    .filter((project) => project.featured || verifiedSlugs.includes(project.slug))
    .sort((a, b) => {
      const aRank = verifiedSlugs.indexOf(a.slug);
      const bRank = verifiedSlugs.indexOf(b.slug);
      if (aRank >= 0 || bRank >= 0) return (aRank < 0 ? verifiedSlugs.length : aRank) - (bRank < 0 ? verifiedSlugs.length : bRank);
      return projects.indexOf(a) - projects.indexOf(b);
    })
    .slice(0, 5);
  return (
    <section className="content-section" id="exploration">
      <SectionTitle eyebrow="Project Explorer / Sélection" title={<>Réalisations et <em>projets</em></>} copy="Les réalisations sont présentées en premier. Les projets techniques et les concepts sont explicitement distingués, avec leurs preuves et leurs limites." />
      <div className="projects-grid">{featured.map((project, index) => <RevealOnScroll key={project.slug} delay={index * 0.07}><ProjectCard project={project} index={index} /></RevealOnScroll>)}</div>
      <Link href="/projects" className="section-link">Ouvrir le Project Explorer complet <ArrowUpRight size={17} /></Link>
    </section>
  );
}
