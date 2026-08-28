import { z } from "zod";
import { getPrisma } from "@/lib/db/prisma";
import { checkRateLimit } from "@/lib/security/rate-limit";

const eventSchema = z.object({
  type: z.enum(["PAGE_VIEW", "PROJECT_VIEW", "PROJECT_DEMO_CLICK", "REPOSITORY_CLICK", "CV_DOWNLOAD", "BLOG_READ", "QUIZ_COMPLETED"]),
  path: z.string().max(300).optional(),
  projectId: z.string().uuid().optional(),
  metadata: z.record(z.string(), z.union([z.string(), z.number(), z.boolean()])).optional(),
});

export async function POST(request: Request) {
  const key = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "anonymous";
  if (!checkRateLimit(`event:${key}`, 30, 60_000).allowed) return Response.json({ message: "Rate limit" }, { status: 429 });

  const parsed = eventSchema.safeParse(await request.json().catch(() => null));
  if (!parsed.success) return Response.json({ message: "Événement invalide" }, { status: 422 });

  const db = getPrisma();
  if (!db) return Response.json({ accepted: true, persisted: false }, { status: 202 });

  await db.visitorEvent.create({ data: parsed.data });
  return Response.json({ accepted: true, persisted: true }, { status: 201 });
}
