import { Footer } from "@/components/layout/footer";
import { Navbar } from "@/components/layout/navbar";
import { PageTransition } from "@/components/motion/page-transition";
import { AdsterraResponsiveBanner } from "@/features/ads/components/adsterra-units";
import { getPublicProfile } from "@/features/content/queries";
import { PageTracker } from "@/features/analytics/page-tracker";

export const dynamic = "force-dynamic";

export default async function PublicLayout({ children }: LayoutProps<"/">) {
  const profile = await getPublicProfile();
  return (
    <div className="public-universe">
      <Navbar />
      {profile.adsEnabled ? <div className="page-container">
        <AdsterraResponsiveBanner />
      </div> : null}
      {profile.analyticsEnabled ? <PageTracker /> : null}
      <main id="contenu"><PageTransition>{children}</PageTransition></main>
      <Footer />
    </div>
  );
}
