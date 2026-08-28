import type { Metadata } from "next";
import { PageContainer } from "@/components/layout/page-container";
import { PageHeader } from "@/components/layout/page-header";
import { AdsterraResponsiveBanner } from "@/features/ads/components/adsterra-units";
import { ProjectExplorer } from "@/features/projects/components/project-explorer";

export const metadata: Metadata = { title: "Project Explorer", description: "Explorer les projets de Rehema en grille ou dans une carte d’univers interactive." };

export default function ProjectsPage() {
  return <PageContainer className="route-page"><PageHeader index="01" eyebrow="Project Explorer" title={<>Quatorze initiatives. <em>Un seul univers.</em></>} copy="Filtrez, recherchez et ouvrez chaque projet. Le mode Univers propose une cartographie légère sans bloquer l’accès à la grille." /><ProjectExplorer /><AdsterraResponsiveBanner /></PageContainer>;
}
