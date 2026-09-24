import Link from "next/link";
import { requireAdmin } from "@/lib/auth/require-admin";
import { projectStatusLabels, skillLevelLabels } from "@/features/content/queries";
import { AdminPageHeader } from "./admin-page-header";

type Kind = "projects" | "blog" | "skills" | "journey";
const titles: Record<Kind, string> = { projects: "Projets", blog: "Articles", skills: "Compétences", journey: "Parcours" };
export async function ContentList({ kind, query = "" }: { kind: Kind; query?: string }) {
  const { db } = await requireAdmin();
  const q = typeof query === "string" ? query.trim().slice(0, 100) : "";
  const search = q ? { contains: q, mode: "insensitive" as const } : undefined;
  let rows: { id: string; title: string; detail: string; status: string; publicUrl?: string }[] = [];
  if (kind === "projects") {
    const records = await db.project.findMany({ where: { title: search }, orderBy: { order: "asc" }, take: 100 });
    rows = records.map(item => ({ id: item.id, title: item.title, detail: projectStatusLabels[item.status], status: item.published && item.status !== "ARCHIVED" ? "Publié" : "Masqué", publicUrl: item.published && item.status !== "ARCHIVED" ? `/projects/${item.slug}` : undefined }));
  } else if (kind === "blog") {
    const records = await db.blogPost.findMany({ where: { title: search }, orderBy: { updatedAt: "desc" }, take: 100 });
    rows = records.map(item => ({ id: item.id, title: item.title, detail: `${item.readingTime} min de lecture`, status: item.status === "DRAFT" ? "Brouillon" : item.status === "ARCHIVED" ? "Archivé" : item.publishedAt && item.publishedAt > new Date() ? "Programmé" : "Publié", publicUrl: item.status === "PUBLISHED" && item.publishedAt && item.publishedAt <= new Date() ? `/blog/${item.slug}` : undefined }));
  } else if (kind === "skills") {
    const records = await db.skill.findMany({ where: { name: search }, include: { category: true }, orderBy: [{ category: { order: "asc" } }, { order: "asc" }], take: 100 });
    rows = records.map(item => ({ id: item.id, title: item.name, detail: `${item.category.name} · ${skillLevelLabels[item.level]}`, status: item.visible ? "Visible" : "Masquée" }));
  } else {
    const records = await db.journeyItem.findMany({ where: { title: search }, orderBy: { order: "asc" }, take: 100 });
    rows = records.map(item => ({ id: item.id, title: item.title, detail: item.organization ?? "", status: item.visible ? "Visible" : "Masquée" }));
  }
  const categories = kind === "skills" ? await db.skillCategory.findMany({ orderBy: { order: "asc" }, include: { _count: { select: { skills: true } } } }) : [];
  return <><AdminPageHeader eyebrow="Gestion du contenu" title={titles[kind]} copy="Les modifications enregistrées sont partagées avec le site public. Masquez un élément pour le retirer sans le perdre." />
    <div className="admin-toolbar"><form method="get" className="admin-search"><label className="sr-only" htmlFor="admin-query">Rechercher</label><input id="admin-query" name="q" defaultValue={q} placeholder="Rechercher par nom…" maxLength={100} /><button type="submit">Rechercher</button>{q ? <Link href={`/admin/${kind}`}>Effacer</Link> : null}</form><Link className="primary-action" href={`/admin/${kind}/new`}>+ Ajouter</Link></div>
    <p className="result-count">{rows.length} élément(s) affiché(s) · maximum 100, affinez la recherche si nécessaire</p>
    {rows.length ? <div className="admin-table-wrap"><table><thead><tr><th>Nom</th><th>Détails</th><th>Visibilité</th><th>Actions</th></tr></thead><tbody>{rows.map(row => <tr key={row.id}><td>{row.title}</td><td>{row.detail}</td><td>{row.status}</td><td className="row-actions"><Link href={`/admin/${kind}/${row.id}`} aria-label={`Modifier ${row.title}`}>Modifier</Link>{row.publicUrl ? <Link href={row.publicUrl}>Voir</Link> : null}</td></tr>)}</tbody></table></div> : <p className="admin-empty">Aucun contenu trouvé. Ajoutez un élément ou modifiez votre recherche.</p>}
    {kind === "skills" ? <section className="admin-panel"><div className="admin-toolbar"><h2>Catégories de compétences</h2><Link href="/admin/categories/new">+ Nouvelle catégorie</Link></div><ul className="admin-category-list">{categories.map(category => <li key={category.id}><Link href={`/admin/categories/${category.id}`}>{category.name}</Link><span>{category._count.skills} compétence(s)</span></li>)}</ul></section> : null}
  </>;
}
