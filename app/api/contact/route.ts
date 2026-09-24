import { NextResponse } from "next/server";
import { contactSchema } from "@/features/contact/schemas/contact.schema";
import { getPrisma } from "@/lib/db/prisma";
import { checkRateLimit } from "@/lib/security/rate-limit";
import { getPublicProfile } from "@/features/content/queries";

export async function POST(request: Request) {
  const forwardedFor = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim();
  const key = forwardedFor || request.headers.get("x-real-ip") || "unknown";
  const rate = checkRateLimit(`contact:${key}`, 4, 10 * 60_000);

  if (!rate.allowed) {
    return NextResponse.json({ message: "Trop de tentatives. Réessayez dans quelques minutes." }, { status: 429 });
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ message: "Le contenu transmis est invalide." }, { status: 400 });
  }

  const parsed = contactSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ message: "Certains champs sont invalides.", issues: parsed.error.flatten().fieldErrors }, { status: 422 });
  }

  if (parsed.data.website) {
    return NextResponse.json({ message: "Message reçu." });
  }

  const db = getPrisma();
  if (!db) {
    return NextResponse.json({ code: "DATABASE_NOT_CONFIGURED", message: "Le canal base de données n’est pas encore connecté. Utilisez l’email direct." }, { status: 503 });
  }

  try {
    const profile = await getPublicProfile();
    await db.$transaction([
      db.message.create({ data: { name: parsed.data.name, email: parsed.data.email.toLowerCase(), subject: parsed.data.subject, body: parsed.data.message } }),
      ...(profile.analyticsEnabled && request.headers.get("dnt") !== "1" ? [db.visitorEvent.create({ data: { type: "CONTACT_SENT", path: "/contact" } })] : []),
    ]);
  } catch {
    return NextResponse.json({ code: "DATABASE_UNAVAILABLE", message: "Le message n’a pas pu être enregistré. Réessayez ou utilisez l’email direct." }, { status: 503 });
  }

  return NextResponse.json({ message: "Message enregistré." }, { status: 201 });
}
