import { z } from "zod";

export const recordKinds = ["projects", "blog", "skills", "categories", "journey"] as const;
export type RecordKind = (typeof recordKinds)[number];
export const recordKindSchema = z.enum(recordKinds);
export const slugSchema = z.string().trim().min(1).max(120).regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, "Utilisez des minuscules, chiffres et tirets.");
const text = (max: number) => z.string().trim().min(1, "Ce champ est obligatoire.").max(max);
const optionalText = (max: number) => z.string().trim().max(max).default("");
export const webUrlSchema = z.string().trim().max(2000).refine(value => !value || (() => {
  try { const url = new URL(value); return ["https:", "http:"].includes(url.protocol) && !url.username && !url.password; } catch { return false; }
})(), "Indiquez une URL http:// ou https:// valide.").default("");
// Images remain local to avoid arbitrary server-side image fetching.
export const imagePathSchema = z.string().trim().max(500).refine(value => !value || /^\/images\/[a-zA-Z0-9_./-]+$/.test(value) && !value.includes(".."), "Utilisez le chemin d’une image existante dans /images/.").default("");
const order = z.coerce.number().int().min(0).max(10000);
export const listSchema = z.string().trim().max(2000).transform(value => [...new Set(value.split(",").map(item => item.trim()).filter(Boolean))]).refine(items => items.length <= 30 && items.every(item => item.length <= 100), "Maximum 30 éléments de 100 caractères.");
const date = z.string().regex(/^\d{4}-\d{2}-\d{2}$/, "Date requise.").refine(value => !Number.isNaN(Date.parse(value)) && new Date(value).toISOString().slice(0, 10) === value, "Date invalide.");

export const projectSchema = z.object({
  title: text(180), slug: slugSchema, summary: text(500), description: text(20000), outcome: optionalText(5000),
  status: z.enum(["CONCEPT", "PROTOTYPE", "IN_PROGRESS", "ACTIVE", "COMPLETED", "ARCHIVED"]),
  published: z.boolean(), featured: z.boolean(), order, categories: listSchema, technologies: listSchema,
  repository: webUrlSchema, demoUrl: webUrlSchema, coverImage: imagePathSchema,
}).refine(value => value.categories.length > 0, { path: ["categories"], message: "Ajoutez au moins une catégorie." });
export const postSchema = z.object({
  title: text(180), slug: slugSchema, excerpt: text(600), content: text(50000), category: text(100),
  status: z.enum(["DRAFT", "PUBLISHED", "ARCHIVED"]), coverImage: imagePathSchema,
  publishedAt: z.union([date, z.literal("")]),
});
export const categorySchema = z.object({ name: text(100), slug: slugSchema, description: optionalText(1000), order });
export const skillSchema = z.object({
  name: text(100), slug: slugSchema, description: optionalText(1000), categoryId: z.string().uuid(),
  level: z.enum(["EXPLORING", "PRACTICING", "AUTONOMOUS", "ADVANCED"]), visible: z.boolean(), order,
});
export const journeySchema = z.object({
  title: text(180), organization: optionalText(180), description: text(10000), startDate: date,
  endDate: z.union([date, z.literal("")]), current: z.boolean(), visible: z.boolean(), order, technologies: listSchema,
}).refine(value => value.current || !value.endDate || value.endDate >= value.startDate, { path: ["endDate"], message: "La fin doit suivre le début." });
export const profileSchema = z.object({
  email: z.string().trim().email().max(160), phone: z.string().trim().regex(/^\+?[\d ()-]{7,30}$/, "Numéro invalide."),
  location: text(180), github: webUrlSchema, description: text(1000), adsEnabled: z.boolean(), analyticsEnabled: z.boolean(),
});
export const messageStatusSchema = z.enum(["NEW", "READ", "REPLIED", "ARCHIVED"]);
export function slugify(value: string) {
  return value.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "").slice(0, 120).replace(/-$/, "");
}
