export function AdminPageHeader({ eyebrow, title, copy }: { eyebrow: string; title: string; copy: string }) {
  return <header className="admin-page-header"><div><p>{eyebrow}</p><h1>{title}</h1></div><span>{copy}</span></header>;
}
