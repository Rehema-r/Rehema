import { AdminPageHeader } from "@/features/admin/components/admin-page-header";
import { SetupNotice } from "@/features/admin/components/setup-notice";
import { getPrisma } from "@/lib/db/prisma";

export default async function AdminAnalyticsPage() {
  const db = getPrisma();
  const groups = db ? await db.visitorEvent.groupBy({ by: ["type"], _count: { _all: true }, orderBy: { _count: { type: "desc" } } }) : [];
  return <><AdminPageHeader eyebrow="Telemetry / Privacy first" title="Analytics" copy="Événements agrégés sans profilage inutile" />{!db ? <SetupNotice>Connectez PostgreSQL pour agréger les vues, lectures et interactions. Aucun identifiant personnel sensible n’est prévu dans le modèle.</SetupNotice> : <section className="admin-stat-grid">{groups.map((group, index) => <article key={group.type}><span>{String(index + 1).padStart(2, "0")}</span><strong>{group._count._all}</strong><p>{group.type}</p></article>)}</section>}</>;
}
