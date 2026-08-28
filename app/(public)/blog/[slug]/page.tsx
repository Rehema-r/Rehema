import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { PageContainer } from "@/components/layout/page-container";
import { getPostBySlug, posts } from "@/features/blog/data/posts";

export function generateStaticParams() { return posts.map(({ slug }) => ({ slug })); }

export async function generateMetadata({ params }: PageProps<"/blog/[slug]">): Promise<Metadata> {
  const post = getPostBySlug((await params).slug);
  return post ? { title: post.title, description: post.excerpt } : { title: "Note introuvable" };
}

export default async function BlogPostPage({ params }: PageProps<"/blog/[slug]">) {
  const post = getPostBySlug((await params).slug);
  if (!post) notFound();
  return <PageContainer className="route-page article-page"><Link href="/blog" className="back-link"><ArrowLeft size={16} /> Retour au journal</Link><article><header><p className="system-label accent">{post.category} / {post.readingTime} MIN</p><h1>{post.title}</h1><p>{post.excerpt}</p><time dateTime={post.publishedAt}>{new Intl.DateTimeFormat("fr-FR", { dateStyle: "long" }).format(new Date(post.publishedAt))}</time></header><div className="article-content">{post.content.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}</div></article></PageContainer>;
}
