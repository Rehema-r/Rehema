import type { Metadata } from "next";
import { Mail, MapPin, Phone } from "lucide-react";
import { PageContainer } from "@/components/layout/page-container";
import { PageHeader } from "@/components/layout/page-header";
import { ContactForm } from "@/features/contact/components/contact-form";
import { siteConfig } from "@/lib/constants/site";

export const metadata: Metadata = { title: "Contact", description: "Contacter Rehema Kasongo pour un projet, une collaboration ou une opportunité." };

export default function ContactPage() {
  return <PageContainer className="route-page"><PageHeader index="07" eyebrow="Transmission Channel" title={<>Une idée à construire ? <em>Ouvrons le canal.</em></>} copy="Décrivez le problème et le contexte. Si la base de données n’est pas encore connectée, le formulaire propose automatiquement l’email direct." /><section className="contact-layout"><aside className="contact-channels"><div><Mail /><span>Email</span><a href={`mailto:${siteConfig.email}`}>{siteConfig.email}</a></div><div><Phone /><span>Téléphone</span><a href={`tel:${siteConfig.phone}`}>+243 992 623 141</a></div><div><MapPin /><span>Position</span><p>{siteConfig.location}</p></div><p className="availability-note"><span className="live-dot" /> Disponible pour les projets sérieux, collaborations et opportunités d’apprentissage.</p></aside><ContactForm /></section></PageContainer>;
}
