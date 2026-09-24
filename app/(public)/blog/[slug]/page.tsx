import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { PageContainer } from "@/components/layout/page-container";
import { getPublicPosts } from "@/features/content/queries";



export async function generateMetadata({ params }: PageProps<"/blog/[slug]">): Promise<Metadata> {
  const slug = (await params).slug;
  const post = (await getPublicPosts()).find(item => item.slug === slug);
  return post ? { title: post.title, description: post.excerpt, alternates: { canonical: `/blog/${post.slug}` }, openGraph: { title: post.title, description: post.excerpt, type: "article", url: `/blog/${post.slug}`, publishedTime: post.publishedAt, images: post.coverImage ? [post.coverImage] : undefined } } : { title: "Note introuvable", robots: { index: false } };
}

export default async function BlogPostPage({ params }: PageProps<"/blog/[slug]">) {
  const slug = (await params).slug;
  const post = (await getPublicPosts()).find(item => item.slug === slug);
  if (!post) notFound();
  return <PageContainer className="route-page article-page"><Link href="/blog" className="back-link"><ArrowLeft size={16} /> Retour au journal</Link><article><header><p className="system-label accent">{post.category} / {post.readingTime} MIN</p><h1>{post.title}</h1><p>{post.excerpt}</p><time dateTime={post.publishedAt}>{new Intl.DateTimeFormat("fr-FR", { dateStyle: "long" }).format(new Date(post.publishedAt))}</time></header>{post.coverImage ? <Image className="article-cover" src={post.coverImage} alt={post.title} width={1200} height={675} sizes="(max-width: 800px) 100vw, 800px" /> : null}<div className="article-content">{post.content.map((paragraph, index) => <p key={index}>{paragraph}</p>)}</div></article></PageContainer>;
}
