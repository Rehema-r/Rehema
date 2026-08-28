"use client";

import { useEffect } from "react";

export default function ErrorPage({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  useEffect(() => console.error(error), [error]);
  return <main id="contenu" className="route-page page-container"><p className="system-label accent">Anomalie système</p><h1>Une erreur inattendue a interrompu cette vue.</h1><button type="button" className="primary-action" onClick={reset}>Réessayer</button></main>;
}
