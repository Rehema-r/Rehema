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
      <PageHeader index="04" eyebrow="Creator Profile" title={<>Curieux par nature. <em>Bâtisseur par choix.</em></>} copy="Je relie conception produit, développement et architecture pour transformer des problèmes concrets en systèmes compréhensibles." />
      <section className="creator-profile">
        <div className="about-portrait"><Image src="/images/rehema-profil.jpeg" alt="Rehema Kasongo à Kolwezi" fill priority sizes="(max-width: 800px) 100vw, 42vw" /></div>
        <div className="profile-copy"><p className="system-label accent">Profil / Rehema Kasongo</p><h2>Créer depuis Kolwezi, avec les standards du monde et les réalités du terrain.</h2><p>Je suis étudiant en informatique à l’Université de Kolwezi, développeur full-stack et cofondateur de RM Tech. J’apprends en construisant des produits, des architectures et des expériences qui répondent à des besoins observables.</p><p>Mes centres d’intérêt vont du produit web aux systèmes distribués, en passant par le mobile, les données et l’intelligence artificielle locale.</p><dl><div><dt>Base</dt><dd>Kolwezi, RDC</dd></div><div><dt>Focus</dt><dd>Web · Mobile · IA</dd></div><div><dt>Approche</dt><dd>Produit · Systèmes · Impact local</dd></div></dl><Link href="/resume" className="primary-action">Consulter mon CV web <ArrowUpRight size={17} /></Link></div>
      </section>
      <section className="manifesto-panel"><p className="system-label">Manifeste / 001</p><blockquote>« La technologie prend tout son sens lorsqu’elle résout un problème concret et reste accessible à ceux qui doivent l’utiliser. »</blockquote></section>
    </PageContainer>
  );
}
