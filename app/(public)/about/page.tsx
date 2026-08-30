import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { PageContainer } from "@/components/layout/page-container";
import { PageHeader } from "@/components/layout/page-header";

export const metadata: Metadata = { title: "À propos", description: "Profil, vision et démarche de Rehema Kasongo, développeur à Kolwezi." };

export default function AboutPage() {
  return (
    <PageContainer className="route-page about-page">
      <PageHeader index="04" eyebrow="Creator Profile" title={<>Curieux par nature. <em>Bâtisseur par choix.</em></>} copy="Étudiant en Génie Logiciel et développeur logiciel en progression, basé à Kolwezi. Des projets concrets, des limites explicites et un apprentissage continu." />
      <section className="creator-profile">
        <div className="about-portrait"><Image src="/images/rehema-profil.jpeg" alt="Rehema Kasongo à Kolwezi" fill priority sizes="(max-width: 800px) 100vw, 42vw" /></div>
        <div className="profile-copy"><p className="system-label accent">Profil / Rehema Kasongo</p><h2>Créer depuis Kolwezi, avec les standards du monde et les réalités du terrain.</h2><p>Je suis Rehema Kasongo Mbayo, étudiant en Bac 3 Informatique, filière Génie Logiciel. J’ai obtenu mon Diplôme d’État en 2024. Je développe des projets logiciels et je progresse en documentant ce qui fonctionne, ce qui reste expérimental et ce que je dois encore apprendre.</p><p>Mes réalisations comprennent RM Study, le site et un système de gestion Union Company, ainsi que le site et l’identité numérique RM Tech. Le web, le mobile, les API et les bases de données orientent mes projets ; l’intelligence artificielle reste un domaine d’exploration.</p><dl><div><dt>Base</dt><dd>Kolwezi, RDC</dd></div><div><dt>Focus</dt><dd>Web · Mobile · IA</dd></div><div><dt>Approche</dt><dd>Produit · Systèmes · Impact local</dd></div></dl><Link href="/resume" className="primary-action">Consulter mon CV web <ArrowUpRight size={17} /></Link></div>
      </section>
      <section className="manifesto-panel"><p className="system-label">Manifeste / 001</p><blockquote>« La technologie prend tout son sens lorsqu’elle résout un problème concret et reste accessible à ceux qui doivent l’utiliser. »</blockquote></section>
    </PageContainer>
  );
}
