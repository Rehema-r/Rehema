import type { Metadata } from "next";
import { Mail, MapPin, Phone } from "lucide-react";
import { PageContainer } from "@/components/layout/page-container";
import { PageHeader } from "@/components/layout/page-header";
import { ContactForm } from "@/features/contact/components/contact-form";
import { getPublicProfile } from "@/features/content/queries";

export const metadata: Metadata = { title: "Contact", description: "Contacter Rehema Kasongo pour un projet, une collaboration ou une opportunité." };

export default async function ContactPage() {
  const siteConfig = await getPublicProfile();
  return <PageContainer className="route-page"><PageHeader index="07" eyebrow="Transmission Channel" title={<>Une idée à construire ? <em>Ouvrons le canal.</em></>} copy="Décrivez votre projet et son contexte. Votre message arrive directement dans ma boîte de réception du portfolio." /><section className="contact-layout"><aside className="contact-channels"><div><Mail /><span>Email</span><a href={`mailto:${siteConfig.email}`}>{siteConfig.email}</a></div><div><Phone /><span>Téléphone</span><a href={`tel:${siteConfig.phone}`}>{siteConfig.phone}</a></div><div><MapPin /><span>Position</span><p>{siteConfig.location}</p></div><p className="availability-note"><span className="live-dot" /> Disponible pour les projets sérieux, collaborations et opportunités d’apprentissage.</p></aside><ContactForm email={siteConfig.email} /></section></PageContainer>;
}
