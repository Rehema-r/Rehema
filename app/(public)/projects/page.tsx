import type { Metadata } from "next";
import { getPublicProjects } from "@/features/content/queries";
import { PageContainer } from "@/components/layout/page-container";
import { PageHeader } from "@/components/layout/page-header";
import { ProjectExplorer } from "@/features/projects/components/project-explorer";

export const metadata: Metadata = { title: "Project Explorer", description: "Explorer les réalisations et projets de Rehema, avec leur état et leurs preuves disponibles." };

export default async function ProjectsPage() {
  const projects = await getPublicProjects();
  return <PageContainer className="route-page"><PageHeader index="01" eyebrow="Project Explorer" title={<>Des projets. <em>Des preuves.</em></>} copy={`${projects.length} réalisations, projets en développement et concepts connus. Chaque fiche indique son état et les éléments disponibles ; les domaines d’exploration ne sont pas présentés comme des compétences maîtrisées.`} /><ProjectExplorer projects={projects} /></PageContainer>;
}
