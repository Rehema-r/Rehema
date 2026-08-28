import { AdminPageHeader } from "@/features/admin/components/admin-page-header";
import { SetupNotice } from "@/features/admin/components/setup-notice";
import { skillGroups } from "@/features/skills/data/skills";

export default function AdminSkillsPage() {
  return <><AdminPageHeader eyebrow="Content / Capabilities" title="Compétences" copy={`${skillGroups.length} catégories actives`} /><SetupNotice>Les niveaux sont descriptifs et seront modifiables depuis PostgreSQL après initialisation.</SetupNotice><section className="admin-card-list">{skillGroups.map((group) => <article key={group.title}><div><h2>{group.title}</h2><span>{group.level}</span></div><p>{group.description}</p><small>{group.skills.join(" · ")}</small></article>)}</section></>;
}
