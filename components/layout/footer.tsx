import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { siteConfig } from "@/lib/constants/site";

export function Footer() {
  return (
    <footer className="site-footer">
      <div className="footer-grid">
        <div>
          <p className="system-label accent">Canal ouvert</p>
          <h2>Construisons un système qui compte.</h2>
        </div>
        <Link href="/contact" className="round-action" aria-label="Démarrer une conversation">
          <ArrowUpRight aria-hidden="true" />
        </Link>
      </div>
      <div className="footer-meta">
        <p>© {new Date().getFullYear()} {siteConfig.creator}</p>
        <div><a href={`mailto:${siteConfig.email}`}>Email</a><a href={siteConfig.github} target="_blank" rel="noreferrer">GitHub</a><Link href="/admin/login">Administration</Link></div>
        <p>{siteConfig.location}</p>
      </div>
    </footer>
  );
}
