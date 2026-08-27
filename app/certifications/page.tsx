import type { Metadata } from "next";
import { learning } from "@/data/portfolio";

export const metadata: Metadata = { title: "Formations", description: "Formations et axes d’apprentissage de Rehema Kasongo." };

export default function LearningPage() {
  return (
    <div className="section-shell page-shell">
      <header className="page-intro page-intro-grid">
        <div><p className="eyebrow">Apprentissage continu</p><h1>Des formations qui complètent la <em>pratique.</em></h1></div>
        <p>Cette page présente les parcours déclarés dans le portfolio. Les liens de preuve individuels pourront être ajoutés dès que les attestations publiques seront disponibles.</p>
      </header>
      <section className="learning-list">
        {learning.map((item, index) => (
          <article key={item.title} className="learning-item">
            <span>{String(index + 1).padStart(2, "0")}</span>
            <div><p>{item.area}</p><h2>{item.title}</h2></div>
            <strong>{item.source}</strong>
            <span className="proof-note">Preuve à ajouter</span>
          </article>
        ))}
      </section>
    </div>
  );
}
