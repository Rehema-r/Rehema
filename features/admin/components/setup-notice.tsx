import Link from "next/link";

export function SetupNotice({ children }: { children: string }) {
  return <div className="setup-notice"><strong>Mode fondation</strong><p>{children}</p><Link href="/admin/settings">Voir la configuration requise</Link></div>;
}
