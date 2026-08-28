import { AdminPageHeader } from "@/features/admin/components/admin-page-header";
import { SetupNotice } from "@/features/admin/components/setup-notice";
import { getPrisma } from "@/lib/db/prisma";

export default async function AdminMessagesPage() {
  const db = getPrisma();
  const messages = db ? await db.message.findMany({ orderBy: { createdAt: "desc" }, take: 50 }) : [];
  return <><AdminPageHeader eyebrow="Inbox / Transmissions" title="Messages" copy={`${messages.length} message(s) chargé(s)`} />{!db ? <SetupNotice>Connectez PostgreSQL pour enregistrer et consulter les transmissions du formulaire.</SetupNotice> : messages.length === 0 ? <div className="admin-empty">Aucun message reçu pour le moment.</div> : <div className="admin-table-wrap"><table><thead><tr><th>Expéditeur</th><th>Sujet</th><th>Statut</th><th>Date</th></tr></thead><tbody>{messages.map((message) => <tr key={message.id}><td>{message.name}<small>{message.email}</small></td><td>{message.subject}</td><td>{message.status}</td><td>{new Intl.DateTimeFormat("fr-FR", { dateStyle: "medium" }).format(message.createdAt)}</td></tr>)}</tbody></table></div>}</>;
}
