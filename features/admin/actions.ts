"use server";

import { revalidatePath } from "next/cache";
import { z } from "zod";
import { requireAdmin } from "@/lib/auth/require-admin";
import { categorySchema, journeySchema, messageStatusSchema, postSchema, profileSchema, projectSchema, recordKindSchema, skillSchema, slugify } from "./schemas";
import type { SaveResult } from "./types";

function failure(error: unknown): SaveResult {
  if (error instanceof z.ZodError) return { ok: false, message: "Vérifiez les champs indiqués.", fields: Object.fromEntries(error.issues.map(issue => [String(issue.path[0]), issue.message])) };
  const code = typeof error === "object" && error && "code" in error ? error.code : undefined;
  if (code === "P2002") return { ok: false, message: "Ce nom ou cet identifiant est déjà utilisé. Choisissez une autre valeur." };
  if (code === "P2025" || code === "P2003") return { ok: false, message: "Cet élément ou sa catégorie n’existe plus. Rechargez la page." };
  return { ok: false, message: "Enregistrement impossible pour le moment. Vos saisies sont conservées ; réessayez." };
}
function invalidate() {
  revalidatePath("/", "layout");
  revalidatePath("/sitemap.xml");
}
function input(formData: FormData) {
  const values: Record<string, unknown> = Object.fromEntries(formData);
  for (const field of ["published", "featured", "visible", "current", "adsEnabled", "analyticsEnabled"]) values[field] = formData.get(field) === "on";
  return values;
}

export async function saveRecord(kindInput: string, idInput: string, formData: FormData): Promise<SaveResult> {
  const { db } = await requireAdmin();
  try {
    const kind = recordKindSchema.parse(kindInput);
    const id = idInput === "new" ? undefined : z.string().uuid().parse(idInput);
    const raw = input(formData);
    let savedId: string;
    switch (kind) {
      case "projects": {
        const { categories, technologies, ...data } = projectSchema.parse(raw);
        const record = await db.$transaction(async tx => {
          const project = id ? await tx.project.update({ where: { id }, data }) : await tx.project.create({ data });
          const categoryRecords = [];
          for (const name of categories) {
            const slug = slugify(name);
            if (!slug) throw new Error("Catégorie invalide");
            const category = await tx.category.upsert({ where: { name }, update: {}, create: { name, slug } });
            categoryRecords.push({ projectId: project.id, categoryId: category.id });
          }
          const technologyRecords = [];
          for (const [order, name] of technologies.entries()) {
            const slug = slugify(name);
            if (!slug) throw new Error("Technologie invalide");
            const technology = await tx.technology.upsert({ where: { name }, update: {}, create: { name, slug } });
            technologyRecords.push({ projectId: project.id, technologyId: technology.id, order });
          }
          await tx.projectCategory.deleteMany({ where: { projectId: project.id } });
          await tx.projectTechnology.deleteMany({ where: { projectId: project.id } });
          if (categoryRecords.length) await tx.projectCategory.createMany({ data: categoryRecords });
          if (technologyRecords.length) await tx.projectTechnology.createMany({ data: technologyRecords });
          return project;
        });
        savedId = record.id;
        break;
      }
      case "blog": {
        const { category: name, publishedAt, ...values } = postSchema.parse(raw);
        const record = await db.$transaction(async tx => {
          const category = await tx.blogCategory.upsert({ where: { name }, update: {}, create: { name, slug: slugify(name) } });
          const data = { ...values, categoryId: category.id, publishedAt: publishedAt ? new Date(`${publishedAt}T00:00:00.000Z`) : values.status === "PUBLISHED" ? new Date() : null, readingTime: Math.max(1, Math.ceil(values.content.split(/\s+/).length / 200)) };
          return id ? tx.blogPost.update({ where: { id }, data }) : tx.blogPost.create({ data });
        });
        savedId = record.id;
        break;
      }
      case "categories": {
        const data = categorySchema.parse(raw);
        savedId = (id ? await db.skillCategory.update({ where: { id }, data }) : await db.skillCategory.create({ data })).id;
        break;
      }
      case "skills": {
        const data = skillSchema.parse(raw);
        savedId = (id ? await db.skill.update({ where: { id }, data }) : await db.skill.create({ data })).id;
        break;
      }
      case "journey": {
        const values = journeySchema.parse(raw);
        const data = { ...values, startDate: new Date(`${values.startDate}T00:00:00.000Z`), endDate: !values.current && values.endDate ? new Date(`${values.endDate}T00:00:00.000Z`) : null };
        savedId = (id ? await db.journeyItem.update({ where: { id }, data }) : await db.journeyItem.create({ data })).id;
        break;
      }
    }
    invalidate();
    return { ok: true, message: "Enregistré. Le site public reflète maintenant vos choix de publication.", redirectTo: !id ? `/admin/${kind}/${savedId}` : undefined };
  } catch (error) { return failure(error); }
}

export async function saveProfile(formData: FormData): Promise<SaveResult> {
  const { db } = await requireAdmin();
  try {
    const value = profileSchema.parse(input(formData));
    await db.siteSetting.upsert({ where: { key: "public.profile" }, create: { key: "public.profile", value }, update: { value } });
    invalidate();
    return { ok: true, message: "Coordonnées et préférences mises à jour sur le site public." };
  } catch (error) { return failure(error); }
}

export async function updateMessage(idInput: string, formData: FormData): Promise<SaveResult> {
  const { db } = await requireAdmin();
  try {
    const id = z.string().uuid().parse(idInput);
    const status = messageStatusSchema.parse(formData.get("status"));
    await db.message.update({ where: { id }, data: { status } });
    revalidatePath("/admin", "layout");
    return { ok: true, message: "Statut du message enregistré." };
  } catch (error) { return failure(error); }
}
