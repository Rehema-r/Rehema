import { getPublicProjects } from "@/features/content/queries";
import { isDatabaseConfigured } from "@/lib/db/prisma";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    return Response.json({ data: await getPublicProjects(), source: isDatabaseConfigured() ? "database" : "portfolio-fallback" });
  } catch {
    return Response.json({ message: "Projets temporairement indisponibles." }, { status: 503 });
  }
}
