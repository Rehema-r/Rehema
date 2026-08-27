"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

const links = [
  { href: "/", label: "Accueil" },
  { href: "/projects", label: "Projets" },
  { href: "/skills", label: "Compétences" },
  { href: "/about", label: "À propos" },
  { href: "/certifications", label: "Formations" },
];

export default function Navbar() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="site-header">
      <div className="nav-shell">
        <Link href="/" className="brand" aria-label="Accueil — Rehema Kasongo">
          <span className="brand-mark">RK</span>
          <span className="brand-name">Rehema Kasongo</span>
        </Link>
        <nav className="desktop-nav" aria-label="Navigation principale">
          {links.map((link) => (
            <Link key={link.href} href={link.href} className={pathname === link.href ? "nav-link active" : "nav-link"}>
              {link.label}
            </Link>
          ))}
        </nav>
        <Link href="/contact" className="button button-small nav-cta">
          Me contacter <span aria-hidden="true">↗</span>
        </Link>
        <button
          type="button"
          className="menu-button"
          aria-label={isOpen ? "Fermer le menu" : "Ouvrir le menu"}
          aria-expanded={isOpen}
          aria-controls="mobile-navigation"
          onClick={() => setIsOpen((open) => !open)}
        >
          <span />
          <span />
        </button>
      </div>
      <nav id="mobile-navigation" className={isOpen ? "mobile-nav open" : "mobile-nav"} aria-label="Navigation mobile">
        {[...links, { href: "/contact", label: "Contact" }].map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className={pathname === link.href ? "mobile-link active" : "mobile-link"}
            onClick={() => setIsOpen(false)}
          >
            {link.label}<span aria-hidden="true">↗</span>
          </Link>
        ))}
      </nav>
    </header>
  );
}
