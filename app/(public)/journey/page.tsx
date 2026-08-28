import type { Metadata } from "next";
import { PageContainer } from "@/components/layout/page-container";
import { PageHeader } from "@/components/layout/page-header";
import { RevealOnScroll } from "@/components/motion/reveal-on-scroll";
import { journey } from "@/features/journey/data/journey";

export const metadata: Metadata = { title: "Parcours", description: "La trajectoire d’apprentissage, d’entrepreneuriat et de construction de Rehema Kasongo." };

export default function JourneyPage() {
  return <PageContainer className="route-page"><PageHeader index="03" eyebrow="Journey Log" title={<>Une trajectoire construite par <em>itérations.</em></>} copy="Chaque étape ajoute un contexte, une responsabilité et de nouvelles questions — pas seulement une ligne de CV." /><section className="journey-log">{journey.map((item, index) => <RevealOnScroll key={item.title}><article><div className="journey-index"><span>{String(index + 1).padStart(2, "0")}</span><time>{item.period}</time></div><div><p>{item.organization}</p><h2>{item.title}</h2><p>{item.description}</p><ul>{item.technologies.map((technology) => <li key={technology}>{technology}</li>)}</ul></div></article></RevealOnScroll>)}</section></PageContainer>;
}
