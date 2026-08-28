import Link from "next/link";

export default function NotFound() {
  return <main id="contenu" className="route-page page-container"><p className="system-label accent">Erreur / 404</p><h1>Ce signal n’existe pas dans cet univers.</h1><Link href="/" className="primary-action">Revenir au noyau</Link></main>;
}
