import { Footer } from "@/components/layout/footer";
import { Navbar } from "@/components/layout/navbar";
import { PageTransition } from "@/components/motion/page-transition";

export default function PublicLayout({ children }: LayoutProps<"/">) {
  return (
    <div className="public-universe">
      <Navbar />
      <main id="contenu"><PageTransition>{children}</PageTransition></main>
      <Footer />
    </div>
  );
}
