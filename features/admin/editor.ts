import { notFound } from "next/navigation";
import { z } from "zod";
import { requireAdmin } from "@/lib/auth/require-admin";
import { projectStatusLabels, skillLevelLabels } from "@/features/content/queries";
import { recordKindSchema, type RecordKind } from "./schemas";
import type { EditorField, EditorValues } from "./types";

const title: EditorField = { name: "title", label: "Titre", required: true, maxLength: 180 };
const slug: EditorField = { name: "slug", label: "Identifiant dans l’URL", required: true, hint: "Exemple : mon-projet. Changer cet identifiant change le lien public.", maxLength: 120 };
const order: EditorField = { name: "order", label: "Ordre d’affichage", type: "number", required: true, hint: "Les nombres les plus petits apparaissent en premier." };
const visible: EditorField = { name: "visible", label: "Visible sur le site", type: "checkbox" };
const description: EditorField = { name: "description", label: "Description", type: "textarea", required: true, maxLength: 20000 };
const coverImage: EditorField = { name: "coverImage", label: "Image existante", type: "select", hint: "Images déjà présentes dans le projet. Aucun téléversement de fichier n’est nécessaire.", options: [{ value: "", label: "Visuel typographique (sans image)" }, { value: "/images/rm-study.png", label: "RM Study" }, { value: "/images/unoncompanysarl.jpg", label: "Union Company" }, { value: "/images/rm_logo.png", label: "Logo RM" }, { value: "/images/rehema-profil.jpeg", label: "Portrait Rehema" }, { value: "/images/medard-co-fondateur.jpeg", label: "Portrait Médard" }] };
const options = (values: Record<string, string>) => Object.entries(values).map(([value, label]) => ({ value, label }));
export const editorTitles: Record<RecordKind, string> = { projects: "Projet", blog: "Article", skills: "Compétence", categories: "Catégorie de compétences", journey: "Étape du parcours" };

export async function loadEditor(section: string, id: string) {
  const { db } = await requireAdmin();
  const parsed = recordKindSchema.safeParse(section);
  if (!parsed.success || (id !== "new" && !z.string().uuid().safeParse(id).success)) notFound();
  const kind = parsed.data;
  let fields: EditorField[] = [];
  let values: EditorValues = { order: 0, visible: false, published: false, featured: false, current: false, status: "CONCEPT" };
  switch (kind) {
    case "projects": {
      fields = [title, slug, { name: "summary", label: "Résumé", type: "textarea", required: true, maxLength: 500 }, description, { name: "outcome", label: "Résultat / prochaine étape", type: "textarea", maxLength: 5000 }, { name: "categories", label: "Catégories", required: true, hint: "Séparées par des virgules." }, { name: "technologies", label: "Technologies", hint: "Séparées par des virgules." }, { name: "status", label: "Avancement", type: "select", options: options(projectStatusLabels) }, { name: "published", label: "Publié sur le site", type: "checkbox" }, { name: "featured", label: "Mis en avant sur l’accueil", type: "checkbox" }, order, coverImage, { name: "repository", label: "Dépôt de code", type: "url" }, { name: "demoUrl", label: "Démonstration", type: "url" }];
      if (id !== "new") {
        const item = await db.project.findUnique({ where: { id }, include: { categories: { include: { category: true } }, technologies: { include: { technology: true }, orderBy: { order: "asc" } } } });
        if (!item) notFound();
        values = { title: item.title, slug: item.slug, summary: item.summary, description: item.description, outcome: item.outcome ?? "", status: item.status, published: item.published, featured: item.featured, order: item.order, coverImage: item.coverImage ?? "", repository: item.repository ?? "", demoUrl: item.demoUrl ?? "", categories: item.categories.map(c => c.category.name).join(", "), technologies: item.technologies.map(t => t.technology.name).join(", ") };
      }
      break;
    }
    case "blog": {
      fields = [title, slug, { name: "excerpt", label: "Résumé", type: "textarea", required: true, maxLength: 600 }, { name: "content", label: "Contenu", type: "textarea", required: true, hint: "Texte simple. Séparez les paragraphes par une ligne vide. Le temps de lecture est calculé automatiquement.", maxLength: 50000 }, { name: "category", label: "Catégorie", required: true }, { name: "status", label: "Publication", type: "select", options: options({ DRAFT: "Brouillon", PUBLISHED: "Publié", ARCHIVED: "Archivé" }) }, { name: "publishedAt", label: "Date de publication", type: "date", hint: "Vide : aujourd’hui lors de la publication. Une date future programme l’article." }, coverImage];
      values = { status: "DRAFT" };
      if (id !== "new") {
        const item = await db.blogPost.findUnique({ where: { id }, include: { category: true } });
        if (!item) notFound();
        values = { title: item.title, slug: item.slug, excerpt: item.excerpt, content: item.content, category: item.category?.name ?? "Journal", status: item.status, publishedAt: item.publishedAt?.toISOString().slice(0, 10) ?? "", coverImage: item.coverImage ?? "" };
      }
      break;
    }
    case "categories": {
      fields = [{ name: "name", label: "Nom", required: true, maxLength: 100 }, slug, { ...description, required: false, maxLength: 1000 }, order];
      if (id !== "new") {
        const item = await db.skillCategory.findUnique({ where: { id } }); if (!item) notFound();
        values = { name: item.name, slug: item.slug, description: item.description ?? "", order: item.order };
      }
      break;
    }
    case "skills": {
      const categories = await db.skillCategory.findMany({ orderBy: { order: "asc" } });
      fields = [{ name: "name", label: "Nom", required: true, maxLength: 100 }, slug, { ...description, required: false, maxLength: 1000 }, { name: "categoryId", label: "Catégorie", type: "select", required: true, options: [{ value: "", label: "Choisir une catégorie" }, ...categories.map(category => ({ value: category.id, label: category.name }))] }, { name: "level", label: "Niveau", type: "select", options: options(skillLevelLabels) }, visible, order];
      values = { ...values, level: "PRACTICING" };
      if (id !== "new") {
        const item = await db.skill.findUnique({ where: { id } }); if (!item) notFound();
        values = { name: item.name, slug: item.slug, description: item.description ?? "", categoryId: item.categoryId, level: item.level, visible: item.visible, order: item.order };
      }
      break;
    }
    case "journey": {
      fields = [title, { name: "organization", label: "Organisation", maxLength: 180 }, description, { name: "startDate", label: "Date de début", type: "date", required: true }, { name: "endDate", label: "Date de fin", type: "date" }, { name: "current", label: "Toujours en cours", type: "checkbox" }, { name: "technologies", label: "Technologies / domaines", hint: "Séparés par des virgules." }, visible, order];
      if (id !== "new") {
        const item = await db.journeyItem.findUnique({ where: { id } }); if (!item) notFound();
        values = { title: item.title, organization: item.organization ?? "", description: item.description, startDate: item.startDate.toISOString().slice(0, 10), endDate: item.endDate?.toISOString().slice(0, 10) ?? "", current: item.current, visible: item.visible, order: item.order, technologies: item.technologies.join(", ") };
      }
      break;
    }
  }
  return { kind, fields, values };
}
