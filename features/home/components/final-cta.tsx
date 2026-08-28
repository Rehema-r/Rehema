import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

export function FinalCta() {
  return <section className="final-transmission"><p className="system-label accent">Prochaine mission</p><h2>Une idée mérite mieux qu’un simple écran.</h2><p>Parlons du problème, des utilisateurs et du système nécessaire pour construire une première version utile.</p><Link href="/contact" className="primary-action">Démarrer une transmission <ArrowUpRight size={17} /></Link></section>;
}
