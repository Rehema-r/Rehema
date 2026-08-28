import { redirect } from "next/navigation";
import { AdminSidebar } from "@/components/layout/admin-sidebar";
import { auth } from "@/lib/auth/auth";

export const dynamic = "force-dynamic";

export default async function AdminLayout({ children }: LayoutProps<"/admin">) {
  const session = await auth();
  if (!session?.user) redirect("/admin/login");
  return <div className="admin-shell"><AdminSidebar /><main id="contenu" className="admin-content"><div className="admin-user"><span className="live-dot" /> Session sécurisée · {session.user.email}</div>{children}</main></div>;
}
