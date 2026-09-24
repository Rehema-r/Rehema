import type { Metadata } from "next";
import { getPublicSkills } from "@/features/content/queries";
import { PageContainer } from "@/components/layout/page-container";
import { PageHeader } from "@/components/layout/page-header";
import { SkillsFilter } from "@/features/skills/components/skills-filter";

export const metadata: Metadata = { title: "Compétences", description: "Compétences techniques et modules de pratique de Rehema Kasongo." };

export default async function SkillsPage() {
  const skillGroups = await getPublicSkills();
  return <PageContainer className="route-page"><PageHeader index="02" eyebrow="Capabilities" title={<>Des compétences reliées à des <em>problèmes réels.</em></>} copy="Pas de pourcentages arbitraires : chaque niveau décrit la manière dont la compétence est actuellement mobilisée dans les projets." /><SkillsFilter skillGroups={skillGroups} /></PageContainer>;
}
