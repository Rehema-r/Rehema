import Image from "next/image";
import Link from "next/link";
import ProjectCard from "@/components/ProjectCard";
import { projects, skillGroups } from "@/data/portfolio";

export default function Home() {
  const featuredProjects = projects.filter((project) => project.featured);

  return (
    <>
      <section className="hero section-shell">
        <div className="hero-copy">
          <p className="availability"><span /> Disponible pour collaborer</p>
          <h1>Je transforme des idées en <em>produits numériques</em> utiles.</h1>
          <p className="hero-lead">
            Étudiant en informatique et développeur full-stack à Kolwezi, je conçois des expériences web, mobile et des systèmes intelligents — du prototype à l’architecture.
          </p>
          <div className="hero-actions">
            <Link className="button" href="/projects">Explorer mes projets <span aria-hidden="true">↗</span></Link>
            <a className="text-link" href="mailto:paparehemasaongo@gmail.com">paparehemasaongo@gmail.com <span aria-hidden="true">↗</span></a>
          </div>
        </div>
        <div className="hero-portrait">
          <div className="portrait-frame">
            <Image src="/images/rehema-profil.jpeg" alt="Portrait de Rehema Kasongo" fill priority sizes="(max-width: 900px) 90vw, 40vw" className="portrait-image" />
          </div>
          <div className="portrait-card portrait-card-top"><span>Basé à</span><strong>Kolwezi, RDC</strong></div>
          <div className="portrait-card portrait-card-bottom"><span>Focus actuel</span><strong>Web · Mobile · IA</strong></div>
          <span className="scribble" aria-hidden="true">✦</span>
        </div>
      </section>

      <div className="marquee" aria-label="Domaines d’activité">
        <div>Architecture logicielle <span>✦</span> Développement full-stack <span>✦</span> Produits mobiles <span>✦</span> Intelligence artificielle <span>✦</span> Impact local</div>
      </div>

      <section className="section-shell section-block">
        <div className="section-heading split-heading">
          <div><p className="eyebrow">Sélection 01 — 03</p><h2>Projets à la une</h2></div>
          <div><p>Des produits à différents niveaux de maturité, présentés sans ambiguïté : ce qui est en cours, ce qui est prototypé et ce qui reste à explorer.</p><Link className="text-link" href="/projects">Voir les 14 initiatives <span aria-hidden="true">↗</span></Link></div>
        </div>
        <div className="project-grid featured-grid">
          {featuredProjects.map((project, index) => <ProjectCard key={project.id} project={project} index={index} />)}
        </div>
      </section>

      <section className="dark-section">
        <div className="section-shell capability-layout">
          <div className="capability-intro">
            <p className="eyebrow eyebrow-light">Ce que je fais</p>
            <h2>De la logique métier jusqu’à l’interface.</h2>
            <p>J’apprends en construisant. Chaque projet me permet de relier conception, code, infrastructure et besoins réels.</p>
            <Link className="button button-light" href="/skills">Voir mes compétences <span aria-hidden="true">↗</span></Link>
          </div>
          <div className="capability-list">
            {skillGroups.map((group, index) => (
              <article key={group.title} className="capability-item">
                <span>{String(index + 1).padStart(2, "0")}</span>
                <div><h3>{group.title}</h3><p>{group.description}</p></div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section-shell section-block about-preview">
        <div className="about-collage">
          <div className="collage-primary"><Image src="/images/rm-study.png" alt="Présentation du projet RM Study" fill sizes="(max-width: 800px) 80vw, 40vw" className="cover-image" /></div>
          <div className="collage-secondary"><Image src="/images/rm_logo.png" alt="Logo de RM Tech" fill sizes="220px" className="cover-image" /></div>
        </div>
        <div className="about-preview-copy">
          <p className="eyebrow">À propos</p>
          <h2>Apprendre vite. Construire juste. Rester proche du terrain.</h2>
          <p>Je suis en deuxième année d’informatique à l’Université de Kolwezi et cofondateur de RM Tech. Mon ambition est de créer des solutions accessibles, solides et adaptées aux réalités locales.</p>
          <blockquote>« La technologie prend tout son sens lorsqu’elle résout un problème concret. »</blockquote>
          <Link className="button button-outline" href="/about">Découvrir mon parcours <span aria-hidden="true">↗</span></Link>
        </div>
      </section>
    </>
  );
}
