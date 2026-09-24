import { ContentList } from "@/features/admin/components/content-list";
export default async function AdminJourneyPage({ searchParams }: { searchParams: Promise<{ q?: string }> }) {
  return <ContentList kind="journey" query={(await searchParams).q} />;
}
