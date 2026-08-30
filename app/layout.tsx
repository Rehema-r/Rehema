import type { Metadata } from "next";
import { IBM_Plex_Mono, Space_Grotesk } from "next/font/google";
import "./globals.css";

const bodyFont = Space_Grotesk({ subsets: ["latin"], variable: "--font-body" });
const monoFont = IBM_Plex_Mono({ subsets: ["latin"], weight: ["400", "500", "600"], variable: "--font-mono" });

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? "https://rehema-gules.vercel.app"),
  title: { default: "Rehema Digital Universe", template: "%s — Rehema Digital Universe" },
  description: "Rehema Kasongo — étudiant en Bac 3 Génie Logiciel à Kolwezi. Réalisations logicielles, code public et progression documentée.",
  keywords: ["Rehema Kasongo", "développeur", "Kolwezi", "Génie Logiciel", "portfolio", "RD Congo"],
  authors: [{ name: "Rehema Kasongo" }],
  openGraph: {
    title: "Rehema Digital Universe",
    description: "Étudiant en Génie Logiciel et développeur logiciel. Des réalisations concrètes, des prototypes identifiés et une progression documentée.",
    type: "website",
    locale: "fr_CD",
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="fr" data-scroll-behavior="smooth" className={`${bodyFont.variable} ${monoFont.variable}`}>
      <body>
        <a className="skip-link" href="#contenu">Aller au contenu</a>
        {children}
      </body>
    </html>
  );
}
