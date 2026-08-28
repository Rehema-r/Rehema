import { AdminPageHeader } from "@/features/admin/components/admin-page-header";
import { SetupNotice } from "@/features/admin/components/setup-notice";
import { journey } from "@/features/journey/data/journey";

export default function AdminJourneyPage() {
  return <><AdminPageHeader eyebrow="Content / Journey" title="Parcours" copy={`${journey.length} étapes visibles`} /><SetupNotice>Les étapes seront persistées via le modèle JourneyItem lors du premier seed.</SetupNotice><section className="admin-card-list">{journey.map((item) => <article key={item.title}><div><h2>{item.title}</h2><span>{item.period}</span></div><p>{item.description}</p><small>{item.organization}</small></article>)}</section></>;
}
