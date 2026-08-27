import type { Metadata } from "next";
import { Manrope, Syne } from "next/font/google";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import "./globals.css";

const bodyFont = Manrope({ subsets: ["latin"], variable: "--font-body" });
const displayFont = Syne({ subsets: ["latin"], variable: "--font-display" });

export const metadata: Metadata = {
  title: { default: "Rehema Kasongo — Développeur full-stack", template: "%s — Rehema Kasongo" },
  description: "Portfolio de Rehema Kasongo, étudiant en informatique et développeur full-stack à Kolwezi. Produits web, mobile, backend et intelligence artificielle.",
  keywords: ["Rehema Kasongo", "développeur", "Kolwezi", "full-stack", "portfolio", "RD Congo"],
  authors: [{ name: "Rehema Kasongo" }],
  openGraph: {
    title: "Rehema Kasongo — Développeur full-stack",
    description: "Je transforme des idées en produits numériques utiles, du prototype à l’architecture.",
    type: "website",
    locale: "fr_CD",
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="fr" data-scroll-behavior="smooth" className={`${bodyFont.variable} ${displayFont.variable}`}>
      <body>
        <a className="skip-link" href="#contenu">Aller au contenu</a>
        <Navbar />
        <main id="contenu">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
