import { AdminPageHeader } from "@/features/admin/components/admin-page-header";
import { runPortfolioAgentNow } from "@/features/automation/actions";
import { getPortfolioAgentConfig, getPortfolioAgentState } from "@/features/automation/portfolio-agent";
import { requireAdmin } from "@/lib/auth/require-admin";

const statusLabels = { idle: "En attente", running: "Exécution en cours", success: "Opérationnel", error: "À vérifier" } as const;

function formatDate(value: string | null) {
  if (!value) return "Aucune exécution";
  return new Intl.DateTimeFormat("fr-CD", { dateStyle: "medium", timeStyle: "short", timeZone: "Africa/Lubumbashi" }).format(new Date(value));
}

export default async function PortfolioAgentPage() {
  const { db } = await requireAdmin();
  const [config, state] = await Promise.all([getPortfolioAgentConfig(db), getPortfolioAgentState(db)]);
  const linkedInReady = Boolean(process.env.LINKEDIN_ACCESS_TOKEN && process.env.LINKEDIN_AUTHOR_URN);

  return <>
    <AdminPageHeader eyebrow="Automatisation interne" title="Agent Portfolio" copy="Hébergé avec le site, sans modèle d’IA et sans consommation de jetons Codex." />
    <section className="admin-stat-grid">
      <article><span>01</span><strong>{statusLabels[state.status]}</strong><p>État actuel</p></article>
      <article><span>02</span><strong>{state.repositoriesChecked}</strong><p>Dépôts vérifiés</p></article>
      <article><span>03</span><strong>{state.projectsCreated}</strong><p>Projets ajoutés au dernier passage</p></article>
      <article><span>04</span><strong>{state.newsCreated}</strong><p>Actualités publiées au dernier passage</p></article>
    </section>
    <section className="admin-panel">
      <h2>Contrôle</h2>
      <div className="system-status-list">
        <p><span className={`status-dot ${config.enabled ? "online" : "waiting"}`} />Agent <strong>{config.enabled ? "Actif" : "En pause"}</strong></p>
        <p><span className="status-dot online" />GitHub <strong>@{config.githubUsername}</strong></p>
        <p><span className={`status-dot ${linkedInReady ? "online" : "waiting"}`} />LinkedIn <strong>{linkedInReady ? "Publication connectée" : "Autorisation API requise"}</strong></p>
        <p>Dernier passage <strong>{formatDate(state.lastRunAt)}</strong></p>
        <p>Dernier succès <strong>{formatDate(state.lastSuccessAt)}</strong></p>
      </div>
      {state.lastError ? <p className="form-error">Dernière erreur : {state.lastError}</p> : null}
      <form action={runPortfolioAgentNow} className="admin-toolbar"><button type="submit" className="primary-action">Lancer maintenant</button><span>La tâche automatique s’exécute aussi chaque jour sur Vercel.</span></form>
    </section>
    <section className="admin-panel">
      <h2>Dernières actions</h2>
      {state.lastActions.length ? <ul className="agent-action-list">{state.lastActions.map(action => <li key={action}>{action}</li>)}</ul> : <p>Aucune nouveauté publiée pour le moment.</p>}
      <p>Les dépôts privés, forks, archives, dépôts sans description, le dépôt du portfolio et le dépôt de profil sont ignorés automatiquement.</p>
    </section>
  </>;
}
