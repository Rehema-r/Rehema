import { ContentList } from "@/features/admin/components/content-list";
export default async function AdminSkillsPage({ searchParams }: { searchParams: Promise<{ q?: string }> }) {
  return <ContentList kind="skills" query={(await searchParams).q} />;
}
