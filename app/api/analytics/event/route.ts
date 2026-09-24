import { getPrisma } from "@/lib/db/prisma";
import { checkRateLimit } from "@/lib/security/rate-limit";
import { getPublicProfile } from "@/features/content/queries";
import { eventSchema } from "@/features/analytics/schema";

export async function POST(request: Request) {
  if (request.headers.get("dnt") === "1") return Response.json({ accepted: true, persisted: false }, { status: 202 });
  const key = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "anonymous";
  if (!checkRateLimit(`event:${key}`, 30, 60_000).allowed) return Response.json({ message: "Trop de requêtes." }, { status: 429 });
  const parsed = eventSchema.safeParse(await request.json().catch(() => null));
  if (!parsed.success) return Response.json({ message: "Événement invalide." }, { status: 422 });
  const db = getPrisma();
  if (!db) return Response.json({ accepted: true, persisted: false }, { status: 202 });
  try {
    if (!(await getPublicProfile()).analyticsEnabled) return Response.json({ accepted: true, persisted: false }, { status: 202 });
    await db.visitorEvent.create({ data: parsed.data });
    return Response.json({ accepted: true, persisted: true }, { status: 201 });
  } catch {
    return Response.json({ message: "Statistiques temporairement indisponibles." }, { status: 503 });
  }
}
