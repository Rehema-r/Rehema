import type { ReactNode } from "react";

export function PageHeader({ index, eyebrow, title, copy }: { index: string; eyebrow: string; title: ReactNode; copy: string }) {
  return (
    <header className="page-header">
      <div className="page-header-meta"><span>{index}</span><p className="system-label accent">{eyebrow}</p></div>
      <h1>{title}</h1>
      <p>{copy}</p>
    </header>
  );
}
