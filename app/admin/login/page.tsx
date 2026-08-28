import type { Metadata } from "next";
import Link from "next/link";
import { Suspense } from "react";
import { LoginForm } from "@/features/admin/components/login-form";

export const metadata: Metadata = { title: "Connexion administration" };

export default function AdminLoginPage() {
  const ready = Boolean(process.env.AUTH_SECRET && process.env.DATABASE_URL);
  return <main id="contenu" className="admin-login"><div className="admin-login-panel"><Link href="/" className="system-label">← Rehema Digital Universe</Link><p className="system-label accent">Accès restreint / Administrateur</p><h1>Control Center</h1><p>Authentifiez-vous pour gérer les projets, le journal, les messages et les paramètres du site.</p>{ready ? <Suspense fallback={<p>Chargement du canal sécurisé…</p>}><LoginForm /></Suspense> : <div className="setup-notice"><strong>Configuration requise</strong><p>Ajoutez `DATABASE_URL` et `AUTH_SECRET`, exécutez les migrations puis le seed administrateur. Aucun identifiant par défaut n’est exposé.</p></div>}</div></main>;
}
