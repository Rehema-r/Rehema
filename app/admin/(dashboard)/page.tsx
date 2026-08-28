import { AdminPageHeader } from "@/features/admin/components/admin-page-header";
import { SetupNotice } from "@/features/admin/components/setup-notice";
import { projects } from "@/features/projects/data";
import { posts } from "@/features/blog/data/posts";
import { getPrisma, isDatabaseConfigured } from "@/lib/db/prisma";

export default async function AdminDashboardPage() {
  const db = getPrisma();
  const persisted = isDatabaseConfigured() && db;
  const [messages, events] = persisted ? await Promise.all([db.message.count({ where: { status: "NEW" } }), db.visitorEvent.count()]) : [0, 0];
  const stats = [
    ["Projets", projects.length], ["Articles publiés", posts.length], ["Nouveaux messages", messages], ["Événements", events],
  ];
  return <><AdminPageHeader eyebrow="Dashboard / Overview" title="Vue d’ensemble" copy="État actuel de Rehema Digital Universe" />{!persisted ? <SetupNotice>Les contenus publics utilisent les données de secours versionnées. Connectez PostgreSQL pour activer les messages, les analytics et les opérations persistantes.</SetupNotice> : null}<section className="admin-stat-grid">{stats.map(([label, value], index) => <article key={String(label)}><span>0{index + 1}</span><strong>{value}</strong><p>{label}</p></article>)}</section><section className="admin-panel"><h2>État des systèmes</h2><div className="system-status-list"><p><span className="status-dot online" /> Interface publique <strong>Opérationnelle</strong></p><p><span className={`status-dot ${persisted ? "online" : "waiting"}`} /> PostgreSQL <strong>{persisted ? "Connecté" : "À configurer"}</strong></p><p><span className="status-dot online" /> Validation et API <strong>Opérationnelles</strong></p></div></section></>;
}
