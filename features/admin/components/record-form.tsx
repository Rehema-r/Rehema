"use client";

import { useId, useState, useTransition, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import type { EditorField, EditorValues, SaveResult } from "../types";

export function RecordForm({ fields, values, action, submitLabel = "Enregistrer" }: { fields: EditorField[]; values: EditorValues; action: (data: FormData) => Promise<SaveResult>; submitLabel?: string }) {
  const prefix = useId();
  const router = useRouter();
  const [result, setResult] = useState<SaveResult | null>(null);
  const [pending, startTransition] = useTransition();
  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    startTransition(async () => {
      try {
        const next = await action(data);
        setResult(next);
        if (next.ok && next.redirectTo) router.push(next.redirectTo);
      } catch {
        setResult({ ok: false, message: "La session ou la connexion a expiré. Rechargez la page puis réessayez." });
      }
    });
  }
  return <form className="admin-editor" onSubmit={submit}>
    <fieldset disabled={pending} className="editor-fields">
      {fields.map(field => {
        const id = `${prefix}-${field.name}`;
        const error = result?.fields?.[field.name];
        const value = String(values[field.name] ?? "");
        const props = { id, name: field.name, required: field.required, "aria-invalid": !!error, "aria-describedby": `${id}-help`, maxLength: field.maxLength };
        return <div key={field.name} className={`editor-field ${field.type === "textarea" ? "editor-wide" : ""}`}>
          {field.type === "checkbox" ? <label className="editor-checkbox"><input {...props} type="checkbox" defaultChecked={values[field.name] === true} />{field.label}</label> : <><label htmlFor={id}>{field.label}{field.required ? " *" : ""}</label>
            {field.type === "textarea" ? <textarea {...props} defaultValue={value} rows={field.name === "content" ? 16 : 5} /> : field.type === "select" ? <select {...props} defaultValue={value}>{field.options?.map(option => <option key={option.value} value={option.value}>{option.label}</option>)}</select> : <input {...props} type={field.type ?? "text"} defaultValue={value} min={field.type === "number" ? 0 : undefined} max={field.type === "number" ? 10000 : undefined} />}</>}
          <small id={`${id}-help`} className={error ? "field-error" : "field-hint"}>{error ?? field.hint}</small>
        </div>;
      })}
    </fieldset>
    {result ? <p className={`form-notice ${result.ok ? "success" : "error"}`} role={result.ok ? "status" : "alert"}>{result.message}</p> : null}
    <button className="primary-action" type="submit" disabled={pending}>{pending ? "Enregistrement…" : submitLabel}</button>
  </form>;
}
