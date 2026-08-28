"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ArrowLeft, Orbit } from "lucide-react";
import { adminNavigation } from "@/lib/constants/navigation";

export function AdminSidebar() {
  const pathname = usePathname();
  return (
    <aside className="admin-sidebar">
      <Link href="/admin" className="admin-brand"><Orbit /><span><strong>RDU</strong><small>CONTROL CENTER</small></span></Link>
      <nav aria-label="Navigation administration">{adminNavigation.map((item, index) => <Link key={item.href} href={item.href} className={pathname === item.href ? "active" : ""}><span>{String(index + 1).padStart(2, "0")}</span>{item.label}</Link>)}</nav>
      <Link href="/" className="admin-back"><ArrowLeft size={16} /> Retour au portfolio</Link>
    </aside>
  );
}
