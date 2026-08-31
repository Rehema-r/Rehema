import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { PageContainer } from "@/components/layout/page-container";
import { PageHeader } from "@/components/layout/page-header";
import { SectionTitle } from "@/components/shared/section-title";
import { ProjectCard } from "@/features/projects/components/project-card";
import { projects } from "@/features/projects/data";

export const metadata: Metadata = {
  title: "Services & Work Samples — Rehema Kasongo",
  description: "Des prestations web à périmètre clair et des projets présentés selon leur état réel. Rehema Kasongo, étudiant en Génie Logiciel à Kolwezi.",
};

const services = [
  { title: "Web Development", status: "Périmètre à confirmer", text: "Pages de présentation et interfaces responsive à partir de contenus fournis. Structure, liens, affichage mobile et documentation courte.", limit: "Pas de paiement, d’espace client ni de promesse de référencement dans une simple page vitrine." },
  { title: "Bug Fixing", status: "Frontend ciblé", text: "Examen d’un défaut reproductible de mise en page ou d’une interaction simple. Correction limitée aux fichiers concernés et vérification des pages touchées.", limit: "Le diagnostic précède le devis. Backend, comptes et systèmes sensibles nécessitent une étude séparée." },
  { title: "Backend/API", status: "En développement", text: "Un domaine de projets et d’apprentissage. Toute demande d’API doit être confrontée à une démonstration technique et à un périmètre réalisable.", limit: "Aucune offre packagée de backend complexe ou de sécurité de production." },
  { title: "Mobile Development", status: "En développement", text: "Des projets Android et des explorations mobiles présentés dans le portfolio. Faisabilité à vérifier sur un cas reproductible avant engagement.", limit: "Pas de délai garanti pour une application complète ni de publication en store incluse par défaut." },
  { title: "Database", status: "À étudier", text: "Modélisation et intégration font partie de mon parcours. Une intervention commence par un environnement de test et des données fictives.", limit: "Pas de modification de base réelle, migration ou accès à des données sensibles sans validation préalable." },
  { title: "Deployment", status: "Projet simple, après examen", text: "Préparer un build, documenter la configuration et vérifier le résultat d’un projet web compatible avec mon expérience.", limit: "Hébergement et domaine séparés. Accès administrateur et mise en production soumis à validation." },
];

export default function ServicesPage() {
  const samples = projects.filter((project) => project.featured);
  return (
    <PageContainer className="route-page">
      <PageHeader index="07" eyebrow="Services / Freelance" title={<>Un besoin précis.<br /><em>Un périmètre clair.</em></>} copy="Je suis Rehema Kasongo, étudiant en Génie Logiciel à Kolwezi. Mon activité freelance se prépare autour de petites interventions web. Je confirme la faisabilité et mes disponibilités avant tout engagement." />
      <aside className="service-notice" aria-label="Conditions de travail">
        <p className="system-label accent">Avant de commencer</p>
        <p>Un besoin décrit, des fichiers accessibles sans secrets, un livrable écrit et un délai convenu. Les domaines en développement ne sont pas présentés comme des expertises acquises.</p>
      </aside>
      <section className="services-grid" aria-label="Services">
        {services.map((service) => (
          <article className="service-card" key={service.title}>
            <span className="service-status">{service.status}</span>
            <h2>{service.title}</h2>
            <p>{service.text}</p>
            <p className="service-limit">{service.limit}</p>
          </article>
        ))}
      </section>
      <section className="content-section" aria-labelledby="work-samples-title">
        <SectionTitle eyebrow="Work Samples / Projets" title={<span id="work-samples-title">Des réalisations et <em>des travaux en cours.</em></span>} copy="Union Company et RM Tech disposent de liens publics. RM Study est déclaré fonctionnel par son auteur ; sa démo reste à référencer. REHEMA OS et Codel Academy sont en développement, avec leurs limites documentées." />
        <div className="projects-grid">{samples.map((project, index) => <ProjectCard key={project.slug} project={project} index={index} />)}</div>
      </section>
      <section className="service-notice">
        <h2>Décrire votre besoin</h2>
        <p>Indiquez la page concernée, le résultat attendu, votre délai et votre budget. Ne transmettez ni mot de passe, ni données confidentielles. Une discussion ne constitue pas une acceptation de mission.</p>
        <Link href="/contact" className="section-link">Parler du projet <ArrowUpRight size={17} aria-hidden="true" /></Link>
      </section>
    </PageContainer>
  );
}
