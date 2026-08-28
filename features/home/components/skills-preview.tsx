import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { SectionTitle } from "@/components/shared/section-title";
import { skillGroups } from "@/features/skills/data/skills";

export function SkillsPreview() {
  return (
    <section className="capabilities-section">
      <div className="content-section">
        <SectionTitle eyebrow="Capabilities / Modules" title={<>Une boîte à outils au service du <em>produit.</em></>} copy="Les niveaux décrivent une pratique actuelle et modifiable, pas une vérité absolue en pourcentage." />
        <div className="capability-radar">{skillGroups.slice(0, 6).map((group, index) => <article key={group.title}><span>0{index + 1}</span><h3>{group.title}</h3><p>{group.description}</p><small>{group.level}</small></article>)}</div>
        <Link href="/skills" className="section-link light">Explorer toutes les compétences <ArrowUpRight size={17} /></Link>
      </div>
    </section>
  );
}
