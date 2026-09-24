import { AdminPageHeader } from "@/features/admin/components/admin-page-header";
import { RecordForm } from "@/features/admin/components/record-form";
import { saveProfile } from "@/features/admin/actions";
import { getPublicProfile } from "@/features/content/queries";
import { requireAdmin } from "@/lib/auth/require-admin";
import type { EditorField } from "@/features/admin/types";

export default async function AdminSettingsPage() {
  const { db, user } = await requireAdmin();
  const [profile] = await Promise.all([getPublicProfile(), db.$queryRaw`SELECT 1`]);
  const fields: EditorField[] = [
    { name: "email", label: "E-mail public de contact", type: "email", required: true, hint: "Contact, pied de page et CV. Ne change pas l’identifiant de connexion." },
    { name: "phone", label: "Téléphone public", required: true }, { name: "location", label: "Localisation publique", required: true },
    { name: "github", label: "Lien GitHub", type: "url" }, { name: "description", label: "Présentation courte", type: "textarea", required: true, maxLength: 1000 },
    { name: "adsEnabled", label: "Afficher les publicités sur les pages publiques", type: "checkbox" },
    { name: "analyticsEnabled", label: "Activer les statistiques internes de consultation", type: "checkbox", hint: "Comptage agrégé, sans cookie ni identifiant de visiteur. Respecte Do Not Track." },
  ];
  return <><AdminPageHeader eyebrow="Configuration" title="Paramètres" copy="Gérez les informations publiques et les fonctionnalités du portfolio." /><RecordForm fields={fields} values={profile} action={saveProfile} />
    <section className="admin-panel"><h2>État de production</h2><div className="system-status-list"><p>PostgreSQL <strong>Connexion vérifiée</strong></p><p>Authentification <strong>Session administrateur active</strong></p><p>Identifiant de connexion <strong>{user.email}</strong></p><p>URL publique <a href={process.env.NEXT_PUBLIC_SITE_URL ?? "https://rehema-gules.vercel.app"}>Ouvrir le portfolio</a></p></div><p>Les secrets restent gérés dans Vercel. Le mot de passe de connexion n’est jamais affiché ici.</p><p>Les annonces et revenus effectifs sont suivis dans votre compte Adsterra ; les statistiques internes ne calculent pas vos gains.</p></section></>;
}
