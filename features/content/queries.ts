import { cache } from "react";
import { getPrisma } from "@/lib/db/prisma";
import { projects as fallbackProjects } from "@/features/projects/data";
import { posts as fallbackPosts, type BlogPost } from "@/features/blog/data/posts";
import { journey as fallbackJourney } from "@/features/journey/data/journey";
import { skillGroups as fallbackSkills } from "@/features/skills/data/skills";
import { siteConfig } from "@/lib/constants/site";
import { profileSchema } from "@/features/admin/schemas";
import type { PortfolioProject, ProjectStatus } from "@/features/projects/types/project.types";

export const projectStatusLabels = { CONCEPT: "Concept", PROTOTYPE: "Prototype", IN_PROGRESS: "En développement", ACTIVE: "Activité", COMPLETED: "Terminé", ARCHIVED: "Archivé" } as const;
export const skillLevelLabels = { EXPLORING: "Exploration", PRACTICING: "En pratique", AUTONOMOUS: "Autonome", ADVANCED: "Avancé" } as const;

// Fallback is for local development without a database, never for hidden/deleted records.
export const getPublicProjects = cache(async (): Promise<PortfolioProject[]> => {
  const db = getPrisma();
  if (!db) return fallbackProjects;
  const records = await db.project.findMany({ where: { published: true, status: { not: "ARCHIVED" } }, orderBy: [{ order: "asc" }, { title: "asc" }], include: { categories: { include: { category: true } }, technologies: { include: { technology: true }, orderBy: { order: "asc" } } } });
  return records.map((project, index) => ({
    id: index + 1, slug: project.slug, title: project.title, category: project.categories.map(item => item.category.name).join(" · ") || "Projet",
    status: projectStatusLabels[project.status] as ProjectStatus, summary: project.summary, description: project.description, outcome: project.outcome ?? "",
    tags: project.technologies.map(item => item.technology.name), image: project.coverImage || undefined, featured: project.featured,
    repository: project.repository || undefined, demoUrl: project.demoUrl || undefined,
  }));
});
export const getPublicPosts = cache(async (): Promise<BlogPost[]> => {
  const db = getPrisma();
  if (!db) return fallbackPosts;
  const records = await db.blogPost.findMany({ where: { status: "PUBLISHED", publishedAt: { lte: new Date() } }, orderBy: { publishedAt: "desc" }, include: { category: true } });
  return records.map(post => ({ slug: post.slug, title: post.title, excerpt: post.excerpt, content: post.content.split(/\n\s*\n/).filter(Boolean), category: post.category?.name ?? "Journal", publishedAt: post.publishedAt!.toISOString(), readingTime: post.readingTime, coverImage: post.coverImage || undefined }));
});
export const getPublicSkills = cache(async () => {
  const db = getPrisma();
  if (!db) return fallbackSkills;
  const records = await db.skillCategory.findMany({ orderBy: { order: "asc" }, include: { skills: { where: { visible: true }, orderBy: { order: "asc" } } } });
  return records.filter(group => group.skills.length > 0).map(group => ({ title: group.name, description: group.description ?? "", skills: group.skills.map(skill => `${skill.name} · ${skillLevelLabels[skill.level]}`), level: "Niveaux par compétence" }));
});
export const getPublicJourney = cache(async () => {
  const db = getPrisma();
  if (!db) return fallbackJourney;
  const records = await db.journeyItem.findMany({ where: { visible: true }, orderBy: { order: "asc" } });
  return records.map(item => ({ title: item.title, organization: item.organization ?? "", description: item.description, technologies: item.technologies,
    period: `${item.startDate.getUTCFullYear()}${item.current ? " — Aujourd’hui" : item.endDate ? ` — ${item.endDate.getUTCFullYear()}` : ""}` }));
});
export const getPublicProfile = cache(async () => {
  const defaults = { ...siteConfig, adsEnabled: true, analyticsEnabled: true };
  const db = getPrisma();
  if (!db) return defaults;
  const setting = await db.siteSetting.findUnique({ where: { key: "public.profile" } });
  const parsed = profileSchema.safeParse(setting?.value);
  return parsed.success ? { ...defaults, ...parsed.data } : defaults;
});
