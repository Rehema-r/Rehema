import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { PageContainer } from "@/components/layout/page-container";
import { PageHeader } from "@/components/layout/page-header";
import { AdsterraNativeBanner } from "@/features/ads/components/adsterra-units";
import { posts } from "@/features/blog/data/posts";

export const metadata: Metadata = { title: "Journal", description: "Notes sur l’ingénierie, le produit et la construction numérique depuis Kolwezi." };

export default function BlogPage() {
  return <PageContainer className="route-page"><PageHeader index="05" eyebrow="System Journal" title={<>Notes, décisions et <em>retours d’expérience.</em></>} copy="Un journal concis sur l’ingénierie, le produit et la réalité de construire depuis Kolwezi." /><AdsterraNativeBanner /><section className="blog-grid">{posts.map((post, index) => <article key={post.slug}><span>ENTRY / {String(index + 1).padStart(3, "0")}</span><p>{post.category} · {new Intl.DateTimeFormat("fr-FR", { dateStyle: "long" }).format(new Date(post.publishedAt))}</p><h2>{post.title}</h2><p>{post.excerpt}</p><Link href={`/blog/${post.slug}`}>Lire la note · {post.readingTime} min <ArrowUpRight size={16} /></Link></article>)}</section></PageContainer>;
}
