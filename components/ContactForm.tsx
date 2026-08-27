"use client";

import { FormEvent, useState } from "react";

export default function ContactForm() {
  const [error, setError] = useState("");

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const name = String(form.get("name") ?? "").trim();
    const email = String(form.get("email") ?? "").trim();
    const subject = String(form.get("subject") ?? "").trim();
    const message = String(form.get("message") ?? "").trim();
    if (!name || !email || !subject || !message) {
      setError("Merci de remplir tous les champs avant de continuer.");
      return;
    }
    setError("");
    const body = `Bonjour Rehema,\n\n${message}\n\n— ${name}\n${email}`;
    window.location.href = `mailto:paparehemasaongo@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  }

  return (
    <form className="contact-form" onSubmit={handleSubmit} noValidate>
      <div className="field-row">
        <label><span>Votre nom</span><input name="name" type="text" autoComplete="name" placeholder="Nom complet" /></label>
        <label><span>Votre email</span><input name="email" type="email" autoComplete="email" placeholder="vous@entreprise.com" /></label>
      </div>
      <label><span>Sujet</span><input name="subject" type="text" placeholder="Décrivez votre besoin en quelques mots" /></label>
      <label><span>Votre message</span><textarea name="message" rows={6} placeholder="Contexte, objectif, délais…" /></label>
      {error ? <p className="form-error" role="alert">{error}</p> : null}
      <div className="form-footer">
        <p>Le bouton ouvrira votre application email avec le message préparé.</p>
        <button type="submit" className="button">Préparer l’email <span aria-hidden="true">↗</span></button>
      </div>
    </form>
  );
}
