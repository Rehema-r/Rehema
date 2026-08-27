import type { Metadata } from "next";
import ProjectsGrid from "@/components/ProjectsGrid";

export const metadata: Metadata = { title: "Projets", description: "Projets, prototypes et explorations numériques de Rehema Kasongo." };

export default function ProjectsPage() {
  return (
    <div className="section-shell page-shell">
      <header className="page-intro">
        <p className="eyebrow">Travaux sélectionnés</p>
        <h1>Des idées ambitieuses, présentées avec leur <em>vrai niveau d’avancement.</em></h1>
        <p>Cette collection réunit produits en développement, prototypes, activités et concepts de recherche. Le statut de chaque initiative permet de distinguer clairement le livré de l’exploratoire.</p>
      </header>
      <ProjectsGrid />
    </div>
  );
}
