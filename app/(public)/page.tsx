import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { PageContainer } from "@/components/layout/page-container";
import { SectionTitle } from "@/components/shared/section-title";
import { posts } from "@/features/blog/data/posts";
import { FinalCta } from "@/features/home/components/final-cta";
import { FeaturedProjects } from "@/features/home/components/featured-projects";
import { HeroSection } from "@/features/home/components/hero-section";
import { SkillsPreview } from "@/features/home/components/skills-preview";
import { StatsSection } from "@/features/home/components/stats-section";
import { journey } from "@/features/journey/data/journey";

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <PageContainer><StatsSection /><FeaturedProjects /></PageContainer>
      <SkillsPreview />
      <PageContainer>
        <section className="content-section dual-preview">
          <div>
            <SectionTitle eyebrow="Journey / Trajectoire" title={<>Apprendre en <em>construisant.</em></>} />
            <div className="mini-timeline">{journey.slice(0, 3).map((item) => <article key={item.title}><span>{item.period}</span><div><h3>{item.title}</h3><p>{item.description}</p></div></article>)}</div>
            <Link href="/journey" className="section-link">Voir toute la trajectoire <ArrowUpRight size={17} /></Link>
          </div>
          <div>
            <SectionTitle eyebrow="Journal / Dernières notes" title={<>Penser le <em>système.</em></>} />
            <div className="post-list">{posts.slice(0, 3).map((post) => <Link href={`/blog/${post.slug}`} key={post.slug}><span>{post.category}</span><h3>{post.title}</h3><small>{post.readingTime} min de lecture</small></Link>)}</div>
            <Link href="/blog" className="section-link">Entrer dans le journal <ArrowUpRight size={17} /></Link>
          </div>
        </section>
      </PageContainer>
      <FinalCta />
    </>
  );
}
