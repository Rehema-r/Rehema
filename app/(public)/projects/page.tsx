import type { Metadata } from "next";
import { PageContainer } from "@/components/layout/page-container";
import { PageHeader } from "@/components/layout/page-header";
import { ProjectExplorer } from "@/features/projects/components/project-explorer";

export const metadata: Metadata = { title: "Project Explorer", description: "Explorer les projets de Rehema en grille ou dans une carte d’univers interactive." };

export default function ProjectsPage() {
  return <PageContainer className="route-page"><PageHeader index="01" eyebrow="Project Explorer" title={<>Des projets. <em>Des preuves.</em></>} copy="Réalisations, projets en développement et concepts : chaque fiche indique son état et les éléments disponibles. Les domaines d’exploration ne sont pas des compétences maîtrisées." /><ProjectExplorer /></PageContainer>;
}
