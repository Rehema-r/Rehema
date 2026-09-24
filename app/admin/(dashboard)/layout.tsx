import { AdminSidebar } from "@/components/layout/admin-sidebar";
import { requireAdmin } from "@/lib/auth/require-admin";

export const dynamic = "force-dynamic";
export const metadata = { robots: { index: false, follow: false } };

export default async function AdminLayout({ children }: LayoutProps<"/admin">) {
  const { user } = await requireAdmin();
  return <div className="admin-shell"><AdminSidebar /><main id="contenu" className="admin-content"><div className="admin-user"><span className="live-dot" /> Session sécurisée · {user.email}</div>{children}</main></div>;
}
