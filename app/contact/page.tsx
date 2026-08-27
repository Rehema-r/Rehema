import type { Metadata } from "next";
import ContactForm from "@/components/ContactForm";

export const metadata: Metadata = { title: "Contact", description: "Contacter Rehema Kasongo pour un projet ou une collaboration." };

export default function ContactPage() {
  return (
    <div className="section-shell page-shell">
      <header className="contact-intro">
        <div><p className="eyebrow">Entrons en contact</p><h1>Une idée à construire ? <em>Parlons-en.</em></h1></div>
        <p>Décrivez-moi brièvement votre besoin. Je répondrai avec les premières questions utiles pour cadrer la suite.</p>
      </header>
      <div className="contact-layout">
        <aside className="contact-details">
          <div><span>Email</span><a href="mailto:paparehemasaongo@gmail.com">paparehemasaongo@gmail.com</a></div>
          <div><span>Téléphone</span><a href="tel:+243992623141">+243 992 623 141</a></div>
          <div><span>GitHub</span><a href="https://github.com/Rehema-r" target="_blank" rel="noreferrer">github.com/Rehema-r ↗</a></div>
          <div><span>Localisation</span><p>Kolwezi, République démocratique du Congo</p></div>
          <p className="response-note"><span /> Disponible pour les projets sérieux, collaborations et opportunités d’apprentissage.</p>
        </aside>
        <ContactForm />
      </div>
    </div>
  );
}
