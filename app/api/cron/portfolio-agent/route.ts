import type { NextRequest } from "next/server";
import { getPrisma } from "@/lib/db/prisma";
import { runPortfolioAgent } from "@/features/automation/portfolio-agent";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";
export const maxDuration = 60;

export async function GET(request: NextRequest) {
  const secret = process.env.CRON_SECRET;
  if (!secret || request.headers.get("authorization") !== `Bearer ${secret}`) {
    return Response.json({ ok: false, message: "Non autorisé." }, { status: 401 });
  }
  const db = getPrisma();
  if (!db) return Response.json({ ok: false, message: "Base de données indisponible." }, { status: 503 });

  const result = await runPortfolioAgent(db);
  return Response.json({
    ok: result.status === "success" || result.skipped === true,
    status: result.status,
    skipped: result.skipped ?? false,
    repositoriesChecked: result.repositoriesChecked,
    projectsCreated: result.projectsCreated,
    newsCreated: result.newsCreated,
    linkedInPostsCreated: result.linkedInPostsCreated,
  }, { status: result.status === "error" ? 500 : 200 });
}
