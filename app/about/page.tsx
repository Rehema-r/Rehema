import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

export const metadata: Metadata = { title: "À propos", description: "Parcours, vision et démarche de Rehema Kasongo." };

export default function AboutPage() {
  return (
    <>
      <div className="section-shell page-shell">
        <header className="about-hero">
          <div className="about-title"><p className="eyebrow">Derrière les projets</p><h1>Curieux par nature, <em>bâtisseur</em> par choix.</h1></div>
          <div className="about-photo"><Image src="/images/rehema-profil.jpeg" alt="Rehema Kasongo à Kolwezi" fill priority sizes="(max-width: 800px) 92vw, 45vw" className="portrait-image" /></div>
          <div className="about-lead"><p>Je suis Rehema Kasongo, étudiant en deuxième année d’informatique à l’Université de Kolwezi et développeur full-stack en construction constante.</p><p>Je m’intéresse à l’ensemble du cycle produit : comprendre un besoin, structurer une solution, créer l’interface, développer les services et préparer le déploiement.</p></div>
        </header>

        <section className="story-section">
          <div><p className="eyebrow">Mon parcours</p><h2>Une progression guidée par la pratique.</h2></div>
          <div className="timeline">
            <article><span>2022 — 2023</span><h3>Premiers apprentissages</h3><p>Découverte autonome de la programmation, du web, du mobile et des possibilités offertes par l’intelligence artificielle.</p></article>
            <article><span>2023 — Aujourd’hui</span><h3>Cofondation de RM Tech</h3><p>Création d’une micro-entreprise pour relier apprentissage technique, services numériques et besoins locaux.</p></article>
            <article><span>2024 — Aujourd’hui</span><h3>Informatique à l’UNIKOL</h3><p>Consolidation des fondamentaux en développement logiciel, bases de données et architecture à l’Université de Kolwezi.</p></article>
          </div>
        </section>
      </div>

      <section className="manifesto">
        <div className="section-shell manifesto-inner"><p className="eyebrow eyebrow-light">Ma vision</p><blockquote>Créer depuis Kolwezi, avec les standards du monde et les réalités du terrain.</blockquote><p>Je veux contribuer à des produits accessibles, utiles aux communautés locales et assez solides pour évoluer au-delà de leur point de départ.</p></div>
      </section>

      <div className="section-shell section-block">
        <section className="rm-section">
          <div className="rm-logo"><Image src="/images/rm_logo.png" alt="Logo RM Tech" fill sizes="(max-width: 700px) 80vw, 34vw" className="cover-image" /></div>
          <div><p className="eyebrow">Entrepreneuriat</p><h2>RM Tech, apprendre en servant.</h2><p>Avec mon cofondateur, nous développons une initiative technologique de proximité autour du développement web et mobile, du conseil et de la formation.</p><ul className="plain-list"><li>Solutions numériques sur mesure</li><li>Accompagnement technique</li><li>Formation et transmission</li><li>Attention portée aux PME et initiatives locales</li></ul><Link href="/contact" className="button button-outline">Parler d’une collaboration <span aria-hidden="true">↗</span></Link></div>
        </section>
      </div>
    </>
  );
}
