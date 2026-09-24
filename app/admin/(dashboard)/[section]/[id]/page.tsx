import Link from "next/link";
import { AdminPageHeader } from "@/features/admin/components/admin-page-header";
import { RecordForm } from "@/features/admin/components/record-form";
import { loadEditor, editorTitles } from "@/features/admin/editor";
import { saveRecord } from "@/features/admin/actions";

export default async function EditRecordPage({ params }: { params: Promise<{ section: string; id: string }> }) {
  const { section, id } = await params;
  const { kind, fields, values } = await loadEditor(section, id);
  return <><Link className="back-link" href={`/admin/${kind === "categories" ? "skills" : kind}`}>← Retour à la liste</Link><AdminPageHeader eyebrow={id === "new" ? "Création" : "Édition"} title={`${id === "new" ? "Créer" : "Modifier"} · ${editorTitles[kind]}`} copy="Les contenus masqués ou archivés restent conservés et modifiables dans l’administration." /><RecordForm fields={fields} values={values} action={saveRecord.bind(null, kind, id)} /></>;
}
