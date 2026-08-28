import { AdminPageHeader } from "@/features/admin/components/admin-page-header";

export default function AdminSettingsPage() {
  const checks = [
    ["Structure Next.js", true, "App Router et groupes de routes"],
    ["Client Prisma", true, "Schéma et génération configurés"],
    ["PostgreSQL", Boolean(process.env.DATABASE_URL), "Variable DATABASE_URL"],
    ["Secret Auth.js", Boolean(process.env.AUTH_SECRET), "Variable AUTH_SECRET"],
    ["URL publique", Boolean(process.env.NEXT_PUBLIC_SITE_URL), "Variable NEXT_PUBLIC_SITE_URL"],
  ] as const;
  return <><AdminPageHeader eyebrow="System / Configuration" title="Paramètres" copy="Préparation de l’environnement de production" /><section className="settings-checklist">{checks.map(([label, ready, detail]) => <article key={label}><span className={`status-dot ${ready ? "online" : "waiting"}`} /><div><h2>{label}</h2><p>{detail}</p></div><strong>{ready ? "Prêt" : "À configurer"}</strong></article>)}</section><div className="admin-panel"><h2>Initialisation sécurisée</h2><ol><li>Copier `.env.example` vers `.env.local`.</li><li>Renseigner PostgreSQL et un secret Auth.js robuste.</li><li>Exécuter `npm run db:migrate`.</li><li>Renseigner ADMIN_EMAIL et ADMIN_PASSWORD, puis exécuter `npm run db:seed`.</li></ol></div></>;
}
