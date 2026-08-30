import Image from "next/image";
import Link from "next/link";
import { ArrowDown, ArrowUpRight } from "lucide-react";
import { UniverseBackground } from "@/components/background/universe-background";

export function HeroSection() {
  return (
    <section className="universe-hero">
      <UniverseBackground />
      <div className="hero-coordinates"><span>GÉNIE LOGICIEL / BAC 3</span><span>SYSTÈME / KOLWEZI</span></div>
      <div className="hero-content">
        <p className="system-label accent"><span className="live-dot" /> Étudiant · Développement logiciel · Projets concrets</p>
        <h1>Rehema <em>Kasongo.</em></h1>
        <p className="hero-copy">Software Engineering Student &amp; Software Developer. Je construis des solutions logicielles pour des besoins concrets ; le web, le mobile et le backend orientent mes projets, et l’IA reste un domaine d’exploration.</p>
        <div className="hero-actions">
          <Link href="/projects" className="primary-action">Explorer les projets <ArrowUpRight size={17} aria-hidden="true" /></Link>
          <Link href="/about" className="secondary-action">Découvrir mon parcours</Link>
        </div>
      </div>
      <div className="creator-orbit">
        <div className="creator-image"><Image src="/images/rehema-profil.jpeg" alt="Portrait de Rehema Kasongo" fill priority sizes="(max-width: 800px) 72vw, 32vw" /></div>
        <span className="creator-tag tag-one">WEB</span><span className="creator-tag tag-two">LEARNING</span><span className="creator-tag tag-three">PROJECTS</span>
        <div className="creator-identity"><small>CRÉATEUR / 001</small><strong>Rehema Kasongo</strong><span>Bac 3 Informatique · Génie Logiciel</span></div>
      </div>
      <a href="#exploration" className="scroll-signal"><ArrowDown size={16} aria-hidden="true" /> DÉFILER POUR EXPLORER</a>
    </section>
  );
}
