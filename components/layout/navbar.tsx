"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ArrowUpRight, Menu, X } from "lucide-react";
import { useState } from "react";
import { publicNavigation } from "@/lib/constants/navigation";

export function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <header className="site-header">
      <div className="nav-frame">
        <Link href="/" className="universe-brand" aria-label="Accueil — Rehema Digital Universe">
          <span className="brand-core">R</span>
          <span><strong>REHEMA</strong><small>DIGITAL UNIVERSE</small></span>
        </Link>
        <nav className="desktop-nav" aria-label="Navigation principale">
          {publicNavigation.map((item) => (
            <Link key={item.href} href={item.href} className={pathname === item.href ? "nav-item active" : "nav-item"} onClick={() => setOpen(false)}>
              {item.label}
            </Link>
          ))}
        </nav>
        <Link href="/contact" className="nav-contact">Contact <ArrowUpRight size={15} aria-hidden="true" /></Link>
        <button className="menu-toggle" type="button" aria-label={open ? "Fermer le menu" : "Ouvrir le menu"} aria-expanded={open} onClick={() => setOpen((value) => !value)}>
          {open ? <X aria-hidden="true" /> : <Menu aria-hidden="true" />}
        </button>
      </div>
      <nav className={open ? "mobile-panel open" : "mobile-panel"} aria-label="Navigation mobile">
        {publicNavigation.map((item, index) => (
          <Link key={item.href} href={item.href} onClick={() => setOpen(false)}><span>0{index + 1}</span>{item.label}<ArrowUpRight size={17} aria-hidden="true" /></Link>
        ))}
        <Link href="/contact" onClick={() => setOpen(false)}><span>07</span>Contact<ArrowUpRight size={17} aria-hidden="true" /></Link>
      </nav>
    </header>
  );
}
