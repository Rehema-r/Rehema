"use client";

import { Printer } from "lucide-react";

export function PrintResumeButton() {
  return <button type="button" className="primary-action no-print" onClick={() => window.print()}>Imprimer ou enregistrer en PDF <Printer size={17} /></button>;
}
