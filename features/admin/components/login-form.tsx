"use client";

import { signIn } from "next-auth/react";
import { useSearchParams } from "next/navigation";
import { useState } from "react";
import { LockKeyhole } from "lucide-react";

export function LoginForm() {
  const searchParams = useSearchParams();
  const [error, setError] = useState("");
  const [pending, setPending] = useState(false);

  async function submit(formData: FormData) {
    setPending(true);
    setError("");
    const result = await signIn("credentials", {
      email: formData.get("email"),
      password: formData.get("password"),
      redirect: false,
    });
    setPending(false);
    if (result?.error) {
      setError("Identifiants invalides ou base de données non configurée.");
      return;
    }
    window.location.href = searchParams.get("callbackUrl") || "/admin";
  }

  return (
    <form className="admin-login-form" action={submit}>
      <label><span>Email administrateur</span><input type="email" name="email" required autoComplete="email" /></label>
      <label><span>Mot de passe</span><input type="password" name="password" required minLength={8} autoComplete="current-password" /></label>
      {error ? <p className="form-error" role="alert">{error}</p> : null}
      <button className="primary-action" type="submit" disabled={pending}>{pending ? "Vérification…" : "Ouvrir la console"}<LockKeyhole size={17} /></button>
    </form>
  );
}
