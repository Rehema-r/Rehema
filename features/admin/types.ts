export type EditorField = {
  name: string; label: string; type?: "text" | "textarea" | "email" | "url" | "number" | "date" | "checkbox" | "select";
  required?: boolean; hint?: string; options?: { value: string; label: string }[]; maxLength?: number;
};
export type EditorValues = Record<string, string | boolean | number>;
export type SaveResult = { ok: boolean; message: string; fields?: Record<string, string>; redirectTo?: string };
