import { cache } from "react";
import { redirect } from "next/navigation";
import { auth } from "@/lib/auth/auth";
import { getPrisma } from "@/lib/db/prisma";

export const requireAdmin = cache(async () => {
  const session = await auth();
  if (!session?.user?.id) redirect("/admin/login");
  const db = getPrisma();
  if (!db) throw new Error("La base de données est indisponible.");
  const user = await db.user.findUnique({ where: { id: session.user.id }, select: { id: true, email: true, name: true, role: true } });
  if (!user || user.role !== "ADMIN") throw new Error("Accès administrateur requis.");
  return { db, user };
});
