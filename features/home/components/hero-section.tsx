import Image from "next/image";
import Link from "next/link";
import { ArrowDown, ArrowUpRight } from "lucide-react";
import { UniverseBackground } from "@/components/background/universe-background";

export function HeroSection() {
  return (
    <section className="universe-hero">
      <UniverseBackground />
      <div className="hero-coordinates"><span>10°43&apos;S / 25°28&apos;E</span><span>SYSTÈME / KOLWEZI</span></div>
      <div className="hero-content">
        <p className="system-label accent"><span className="live-dot" /> Système actif · Disponible pour collaborer</p>
        <h1>Bienvenue dans mon <em>univers numérique.</em></h1>
        <p className="hero-copy">Je conçois des applications, des systèmes et des expériences numériques — du problème concret à une architecture capable d’évoluer.</p>
        <div className="hero-actions">
          <Link href="/projects" className="primary-action">Explorer les projets <ArrowUpRight size={17} aria-hidden="true" /></Link>
          <Link href="/about" className="secondary-action">Découvrir mon parcours</Link>
        </div>
      </div>
      <div className="creator-orbit">
        <div className="creator-image"><Image src="/images/rehema-profil.jpeg" alt="Portrait de Rehema Kasongo" fill priority sizes="(max-width: 800px) 72vw, 32vw" /></div>
        <span className="creator-tag tag-one">FULL-STACK</span><span className="creator-tag tag-two">SYSTEMS</span><span className="creator-tag tag-three">PRODUCT</span>
        <div className="creator-identity"><small>CRÉATEUR / 001</small><strong>Rehema Kasongo</strong><span>Étudiant en informatique · Cofondateur RM Tech</span></div>
      </div>
      <a href="#exploration" className="scroll-signal"><ArrowDown size={16} aria-hidden="true" /> DÉFILER POUR EXPLORER</a>
    </section>
  );
}
