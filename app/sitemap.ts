import type { MetadataRoute } from "next";
import { getPublicPosts, getPublicProjects } from "@/features/content/queries";
export const dynamic = "force-dynamic";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [posts, projects] = await Promise.all([getPublicPosts(), getPublicProjects()]);
  const base = process.env.NEXT_PUBLIC_SITE_URL ?? "https://rehema-gules.vercel.app";
  const routes = ["", "/about", "/projects", "/services", "/skills", "/journey", "/blog", "/playground", "/contact", "/resume"];
  return [
    ...routes.map((route) => ({ url: `${base}${route}`, lastModified: new Date(), changeFrequency: route === "" ? "weekly" as const : "monthly" as const, priority: route === "" ? 1 : .7 })),
    ...projects.map((project) => ({ url: `${base}/projects/${project.slug}`, lastModified: new Date(), changeFrequency: "monthly" as const, priority: .65 })),
    ...posts.map((post) => ({ url: `${base}/blog/${post.slug}`, lastModified: new Date(post.publishedAt), changeFrequency: "yearly" as const, priority: .6 })),
  ];
}
