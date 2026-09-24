import Link from "next/link";
import { AdminPageHeader } from "@/features/admin/components/admin-page-header";
import { requireAdmin } from "@/lib/auth/require-admin";

export default async function AdminDashboardPage() {
  const { db } = await requireAdmin();
  const [projects, posts, messages, events] = await Promise.all([db.project.count(), db.blogPost.count({ where: { status: "PUBLISHED", publishedAt: { lte: new Date() } } }), db.message.count({ where: { status: "NEW" } }), db.visitorEvent.count()]);
  const stats = [["Projets", projects, "/admin/projects"], ["Articles publiés", posts, "/admin/blog"], ["Nouveaux messages", messages, "/admin/messages"], ["Événements", events, "/admin/analytics"]] as const;
  return <><AdminPageHeader eyebrow="Tableau de bord" title="Vue d’ensemble" copy="Données réelles de votre portfolio, actualisées depuis PostgreSQL." /><section className="admin-stat-grid">{stats.map(([label, value, href], index) => <article key={label}><span>0{index + 1}</span><strong>{value}</strong><Link href={href}>{label} ↗</Link></article>)}</section><section className="admin-panel"><h2>Accès rapides</h2><div className="admin-toolbar"><Link className="primary-action" href="/admin/projects/new">Ajouter un projet</Link><Link href="/admin/blog/new">Rédiger un article</Link><Link href="/admin/settings">Modifier mes coordonnées</Link></div><p>Les brouillons et éléments masqués restent privés. Les changements publiés apparaissent sur le portfolio immédiatement.</p></section></>;
}
