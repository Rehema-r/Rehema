import { ContentList } from "@/features/admin/components/content-list";
export default async function AdminProjectsPage({ searchParams }: { searchParams: Promise<{ q?: string }> }) {
  return <ContentList kind="projects" query={(await searchParams).q} />;
}
