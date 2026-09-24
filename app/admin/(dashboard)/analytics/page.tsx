import Link from "next/link";
import { AdminPageHeader } from "@/features/admin/components/admin-page-header";
import { getPublicProfile } from "@/features/content/queries";
import { requireAdmin } from "@/lib/auth/require-admin";

export default async function AdminAnalyticsPage() {
  const { db } = await requireAdmin();
  const since = new Date();
  since.setUTCDate(since.getUTCDate() - 30);
  const [profile, groups, pages] = await Promise.all([
    getPublicProfile(),
    db.visitorEvent.groupBy({ by: ["type"], where: { createdAt: { gte: since } }, _count: { _all: true }, orderBy: { _count: { type: "desc" } } }),
    db.visitorEvent.groupBy({ by: ["path"], where: { type: "PAGE_VIEW", createdAt: { gte: since } }, _count: { _all: true }, orderBy: { _count: { path: "desc" } }, take: 20 }),
  ]);
  const labels: Record<string, string> = { PAGE_VIEW: "Pages consultées", PROJECT_VIEW: "Projets consultés", CONTACT_SENT: "Messages reçus", BLOG_READ: "Articles consultés", PROJECT_DEMO_CLICK: "Démonstrations", REPOSITORY_CLICK: "Code source", CV_DOWNLOAD: "CV", QUIZ_COMPLETED: "Quiz terminés" };
  return <><AdminPageHeader eyebrow="Statistiques internes" title="Audience" copy="Consultations et événements des 30 derniers jours. Ce ne sont ni des visiteurs uniques, ni des impressions publicitaires facturables." /><p>Collecte {profile.analyticsEnabled ? "active" : "désactivée"} · <Link href="/admin/settings">Gérer les préférences</Link></p>
    {groups.length ? <section className="admin-stat-grid">{groups.map((group, index) => <article key={group.type}><span>{String(index + 1).padStart(2, "0")}</span><strong>{group._count._all}</strong><p>{labels[group.type] ?? group.type}</p></article>)}</section> : <p className="admin-empty">Aucun événement sur cette période. Les consultations apparaîtront ici au fil des visites.</p>}
    <section className="admin-panel"><h2>Pages les plus consultées</h2>{pages.length ? <div className="admin-table-wrap"><table><thead><tr><th>Page</th><th>Consultations</th></tr></thead><tbody>{pages.map(page => <tr key={page.path}><td>{page.path}</td><td>{page._count._all}</td></tr>)}</tbody></table></div> : <p>Aucune consultation enregistrée pour le moment.</p>}<p>Comptage sans identifiant de visiteur, sans cookie d’analyse ni adresse IP conservée dans les événements. Les bloqueurs et Do Not Track peuvent limiter les mesures. Les gains publicitaires se consultent directement dans Adsterra.</p></section></>;
}
