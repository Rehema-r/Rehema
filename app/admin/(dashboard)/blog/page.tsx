import { ContentList } from "@/features/admin/components/content-list";
export default async function AdminBlogPage({ searchParams }: { searchParams: Promise<{ q?: string }> }) {
  return <ContentList kind="blog" query={(await searchParams).q} />;
}
