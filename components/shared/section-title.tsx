import type { ReactNode } from "react";

export function SectionTitle({ eyebrow, title, copy }: { eyebrow: string; title: ReactNode; copy?: string }) {
  return (
    <header className="section-title">
      <div>
        <p className="system-label">{eyebrow}</p>
        <h2>{title}</h2>
      </div>
      {copy ? <p>{copy}</p> : null}
    </header>
  );
}
