import { z } from "zod";

export const contactSchema = z.object({
  name: z.string().trim().min(2, "Indiquez votre nom.").max(80),
  email: z.string().trim().email("Indiquez une adresse email valide.").max(160),
  subject: z.string().trim().min(4, "Précisez le sujet en quelques mots.").max(140),
  message: z.string().trim().min(20, "Ajoutez un peu de contexte (20 caractères minimum).").max(4000),
  website: z.string().max(0).optional().or(z.literal("")),
});

export type ContactInput = z.infer<typeof contactSchema>;
