"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowUpRight, CheckCircle2, Send } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { contactSchema, type ContactInput } from "@/features/contact/schemas/contact.schema";
import { siteConfig } from "@/lib/constants/site";

type FormState = { type: "idle" | "success" | "error"; message?: string; databaseMissing?: boolean };

export function ContactForm() {
  const [state, setState] = useState<FormState>({ type: "idle" });
  const { register, handleSubmit, reset, formState: { errors, isSubmitting } } = useForm<ContactInput>({
    resolver: zodResolver(contactSchema),
    defaultValues: { name: "", email: "", subject: "", message: "", website: "" },
  });

  async function submit(values: ContactInput) {
    setState({ type: "idle" });
    try {
      const response = await fetch("/api/contact", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(values) });
      const payload = await response.json() as { message?: string; code?: string };
      if (!response.ok) {
        setState({ type: "error", message: payload.message ?? "Le message n’a pas pu être envoyé.", databaseMissing: payload.code === "DATABASE_NOT_CONFIGURED" });
        return;
      }
      reset();
      setState({ type: "success", message: "Message reçu. Merci — je vous répondrai dès que possible." });
    } catch {
      setState({ type: "error", message: "Le service est momentanément indisponible. Vous pouvez utiliser l’email direct.", databaseMissing: true });
    }
  }

  return (
    <form className="contact-console" onSubmit={handleSubmit(submit)} noValidate>
      <div className="console-head"><span /> TRANSMISSION / NOUVEAU MESSAGE <small>CHIFFREMENT HTTPS</small></div>
      <div className="form-grid">
        <label><span>Identité</span><input {...register("name")} autoComplete="name" placeholder="Votre nom" />{errors.name ? <small role="alert">{errors.name.message}</small> : null}</label>
        <label><span>Adresse de réponse</span><input {...register("email")} type="email" autoComplete="email" placeholder="vous@exemple.com" />{errors.email ? <small role="alert">{errors.email.message}</small> : null}</label>
      </div>
      <label><span>Objet de la transmission</span><input {...register("subject")} placeholder="Projet, collaboration, question…" />{errors.subject ? <small role="alert">{errors.subject.message}</small> : null}</label>
      <label><span>Message</span><textarea {...register("message")} rows={7} placeholder="Décrivez le contexte, l’objectif et les délais éventuels." />{errors.message ? <small role="alert">{errors.message.message}</small> : null}</label>
      <label className="honeypot" aria-hidden="true"><span>Site web</span><input {...register("website")} tabIndex={-1} autoComplete="off" /></label>
      {state.type !== "idle" ? (
        <div className={`form-notice ${state.type}`} role="status">
          {state.type === "success" ? <CheckCircle2 aria-hidden="true" /> : null}<p>{state.message}</p>
          {state.databaseMissing ? <a href={`mailto:${siteConfig.email}`}><span>Écrire directement par email</span><ArrowUpRight size={16} /></a> : null}
        </div>
      ) : null}
      <button type="submit" className="primary-action" disabled={isSubmitting}>{isSubmitting ? "Transmission…" : "Transmettre le message"}<Send size={17} aria-hidden="true" /></button>
    </form>
  );
}
