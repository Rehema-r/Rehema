import Link from "next/link";
import { AdminPageHeader } from "@/features/admin/components/admin-page-header";
import { SetupNotice } from "@/features/admin/components/setup-notice";
import { projects } from "@/features/projects/data";

export default function AdminProjectsPage() {
  return <><AdminPageHeader eyebrow="Content / Projects" title="Projets" copy={`${projects.length} initiatives documentées`} /><SetupNotice>Cette vue reflète le contenu versionné. Le schéma Prisma et les API sont prêts pour brancher les formulaires CRUD après la première migration.</SetupNotice><div className="admin-table-wrap"><table><thead><tr><th>Projet</th><th>Catégorie</th><th>Statut</th><th>Visibilité</th></tr></thead><tbody>{projects.map((project) => <tr key={project.slug}><td><Link href={`/projects/${project.slug}`}>{project.title}</Link></td><td>{project.category}</td><td>{project.status}</td><td>{project.featured ? "Mis en avant" : "Publié"}</td></tr>)}</tbody></table></div></>;
}
