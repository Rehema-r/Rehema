"use server";

import { revalidatePath } from "next/cache";
import { requireAdmin } from "@/lib/auth/require-admin";
import { runPortfolioAgent } from "./portfolio-agent";

export async function runPortfolioAgentNow() {
  const { db } = await requireAdmin();
  await runPortfolioAgent(db);
  revalidatePath("/admin/agent");
}
