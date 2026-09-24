import Link from "next/link";
import { AdminPageHeader } from "@/features/admin/components/admin-page-header";
import { RecordForm } from "@/features/admin/components/record-form";
import { updateMessage } from "@/features/admin/actions";
import { messageStatusSchema } from "@/features/admin/schemas";
import { requireAdmin } from "@/lib/auth/require-admin";

export default async function AdminMessagesPage({ searchParams }: { searchParams: Promise<{ status?: string; page?: string }> }) {
  const { db } = await requireAdmin();
  const params = await searchParams;
  const status = messageStatusSchema.safeParse(params.status);
  const page = Math.max(1, Math.min(10000, Number.parseInt(params.page ?? "1", 10) || 1));
  const where = status.success ? { status: status.data } : {};
  const [messages, count] = await Promise.all([db.message.findMany({ where, orderBy: { createdAt: "desc" }, skip: (page - 1) * 20, take: 20 }), db.message.count({ where })]);
  const statuses = [{ value: "NEW", label: "Nouveau" }, { value: "READ", label: "Lu" }, { value: "REPLIED", label: "Répondu" }, { value: "ARCHIVED", label: "Archivé" }];
  const suffix = status.success ? `&status=${status.data}` : "";
  return <><AdminPageHeader eyebrow="Boîte de réception" title="Messages" copy={`${count} message(s). Consultez le texte complet et classez les échanges sans les supprimer.`} /><nav className="category-filters"><Link href="/admin/messages">Tous</Link>{statuses.map(item => <Link key={item.value} href={`/admin/messages?status=${item.value}`}>{item.label}</Link>)}</nav>
    {messages.length ? <div className="message-list">{messages.map(message => <article className="admin-panel" key={message.id}><h2>{message.subject}</h2><p>{message.name} · {message.email} · {message.createdAt.toLocaleDateString("fr-FR", { timeZone: "UTC" })}</p><p className="message-body">{message.body}</p><a className="section-link" href={`mailto:${message.email}?subject=${encodeURIComponent(`Re: ${message.subject}`)}`}>Répondre dans votre messagerie ↗</a><RecordForm fields={[{ name: "status", label: "Statut", type: "select", options: statuses }]} values={{ status: message.status }} action={updateMessage.bind(null, message.id)} submitLabel="Mettre à jour le statut" /></article>)}</div> : <p className="admin-empty">Aucun message dans cette vue.</p>}
    <nav className="admin-toolbar" aria-label="Pagination des messages">{page > 1 ? <Link href={`/admin/messages?page=${page - 1}${suffix}`}>← Précédente</Link> : <span />}<span>Page {page} / {Math.max(1, Math.ceil(count / 20))}</span>{page * 20 < count ? <Link href={`/admin/messages?page=${page + 1}${suffix}`}>Suivante →</Link> : null}</nav></>;
}
