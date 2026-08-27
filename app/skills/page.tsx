import type { Metadata } from "next";
import Link from "next/link";
import { skillGroups } from "@/data/portfolio";

export const metadata: Metadata = { title: "Compétences", description: "Compétences techniques et méthode de travail de Rehema Kasongo." };

const workflow = [
  ["01", "Comprendre", "Clarifier le problème, le public et la valeur attendue avant de choisir la technologie."],
  ["02", "Structurer", "Découper le produit, modéliser les données et poser une architecture proportionnée."],
  ["03", "Prototyper", "Livrer rapidement une première expérience testable pour apprendre du réel."],
  ["04", "Améliorer", "Corriger, documenter et rendre la solution plus robuste à chaque itération."],
];

export default function SkillsPage() {
  return (
    <div className="section-shell page-shell">
      <header className="page-intro page-intro-grid">
        <div><p className="eyebrow">Compétences & méthode</p><h1>Une boîte à outils au service du <em>produit.</em></h1></div>
        <p>Je préfère montrer ce que je sais mobiliser plutôt que m’attribuer des pourcentages arbitraires. Mes compétences évoluent avec les problèmes que je résous.</p>
      </header>

      <section className="skills-grid">
        {skillGroups.map((group, index) => (
          <article key={group.title} className="skill-card">
            <div className="skill-card-head"><span>{String(index + 1).padStart(2, "0")}</span><h2>{group.title}</h2></div>
            <p>{group.description}</p>
            <ul className="skill-list">{group.skills.map((skill) => <li key={skill}>{skill}</li>)}</ul>
          </article>
        ))}
      </section>

      <section className="process-section">
        <div className="section-heading split-heading"><div><p className="eyebrow">Ma méthode</p><h2>Du besoin à une base solide.</h2></div><p>Une démarche simple pour éviter de construire beaucoup avant d’avoir appris suffisamment.</p></div>
        <div className="process-list">
          {workflow.map(([number, title, text]) => (
            <article key={number} className="process-item"><span>{number}</span><h3>{title}</h3><p>{text}</p></article>
          ))}
        </div>
      </section>

      <div className="inline-cta"><div><p className="eyebrow">Continuer</p><h2>Voir ces compétences en contexte.</h2></div><Link href="/projects" className="button">Explorer les projets <span aria-hidden="true">↗</span></Link></div>
    </div>
  );
}
