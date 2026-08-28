import "dotenv/config";
import { hash } from "bcryptjs";
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "../generated/prisma/client";
import { posts } from "../features/blog/data/posts";
import { journey } from "../features/journey/data/journey";
import { projects } from "../features/projects/data";
import { skillGroups } from "../features/skills/data/skills";

const connectionString = process.env.DATABASE_URL;
if (!connectionString) throw new Error("DATABASE_URL est nécessaire pour exécuter le seed.");

const prisma = new PrismaClient({ adapter: new PrismaPg({ connectionString }) });

const statusMap = {
  "Concept": "CONCEPT",
  "Prototype": "PROTOTYPE",
  "En développement": "IN_PROGRESS",
  "Activité": "ACTIVE",
  "Terminé": "COMPLETED",
} as const;

async function seedAdmin() {
  const email = process.env.ADMIN_EMAIL?.toLowerCase();
  const password = process.env.ADMIN_PASSWORD;
  if (!email || !password || password.length < 12) {
    throw new Error("ADMIN_EMAIL et ADMIN_PASSWORD (12 caractères minimum) sont nécessaires pour le seed.");
  }
  await prisma.user.upsert({
    where: { email },
    update: { name: "Rehema Kasongo", passwordHash: await hash(password, 12) },
    create: { email, name: "Rehema Kasongo", passwordHash: await hash(password, 12), role: "ADMIN" },
  });
}

async function seedProjects() {
  for (const [order, project] of projects.entries()) {
    const category = await prisma.category.upsert({
      where: { slug: project.category.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "") },
      update: { name: project.category },
      create: { name: project.category, slug: project.category.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "") },
    });
    const saved = await prisma.project.upsert({
      where: { slug: project.slug },
      update: { title: project.title, summary: project.summary, description: project.description, outcome: project.outcome, status: statusMap[project.status], featured: Boolean(project.featured), coverImage: project.image, order },
      create: { slug: project.slug, title: project.title, summary: project.summary, description: project.description, outcome: project.outcome, status: statusMap[project.status], featured: Boolean(project.featured), coverImage: project.image, order },
    });
    await prisma.projectCategory.upsert({ where: { projectId_categoryId: { projectId: saved.id, categoryId: category.id } }, update: {}, create: { projectId: saved.id, categoryId: category.id } });
    for (const [technologyOrder, tag] of project.tags.entries()) {
      const slug = tag.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
      const technology = await prisma.technology.upsert({ where: { slug }, update: { name: tag }, create: { slug, name: tag } });
      await prisma.projectTechnology.upsert({ where: { projectId_technologyId: { projectId: saved.id, technologyId: technology.id } }, update: { order: technologyOrder }, create: { projectId: saved.id, technologyId: technology.id, order: technologyOrder } });
    }
  }
}

async function seedSkills() {
  for (const [categoryOrder, group] of skillGroups.entries()) {
    const categorySlug = group.title.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
    const category = await prisma.skillCategory.upsert({ where: { slug: categorySlug }, update: { name: group.title, description: group.description, order: categoryOrder }, create: { slug: categorySlug, name: group.title, description: group.description, order: categoryOrder } });
    for (const [order, name] of group.skills.entries()) {
      const slug = name.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
      await prisma.skill.upsert({ where: { slug }, update: { name, order, categoryId: category.id }, create: { slug, name, order, categoryId: category.id, level: "PRACTICING" } });
    }
  }
}

async function seedJourneyAndBlog() {
  for (const [order, item] of journey.entries()) {
    const existing = await prisma.journeyItem.findFirst({ where: { title: item.title } });
    const data = { title: item.title, organization: item.organization, description: item.description, startDate: new Date(`${2022 + Math.min(order, 3)}-01-01`), current: item.period.includes("Aujourd’hui") || item.period === "Maintenant", technologies: item.technologies, order };
    if (existing) await prisma.journeyItem.update({ where: { id: existing.id }, data });
    else await prisma.journeyItem.create({ data });
  }
  for (const post of posts) {
    const categorySlug = post.category.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
    const category = await prisma.blogCategory.upsert({ where: { slug: categorySlug }, update: { name: post.category }, create: { slug: categorySlug, name: post.category } });
    await prisma.blogPost.upsert({ where: { slug: post.slug }, update: { title: post.title, excerpt: post.excerpt, content: post.content.join("\n\n"), status: "PUBLISHED", publishedAt: new Date(post.publishedAt), readingTime: post.readingTime, categoryId: category.id }, create: { slug: post.slug, title: post.title, excerpt: post.excerpt, content: post.content.join("\n\n"), status: "PUBLISHED", publishedAt: new Date(post.publishedAt), readingTime: post.readingTime, categoryId: category.id } });
  }
}

async function main() {
  await seedAdmin();
  await Promise.all([
    prisma.siteSetting.upsert({ where: { key: "portfolio.seed" }, update: { value: { version: 1, source: "demo-and-real" } }, create: { key: "portfolio.seed", value: { version: 1, source: "demo-and-real" } } }),
    prisma.socialLink.upsert({ where: { platform_url: { platform: "GitHub", url: "https://github.com/Rehema-r" } }, update: { label: "GitHub" }, create: { platform: "GitHub", label: "GitHub", url: "https://github.com/Rehema-r" } }),
  ]);
  await seedProjects();
  await seedSkills();
  await seedJourneyAndBlog();
  console.info("Rehema Digital Universe: seed terminé.");
}

main().finally(() => prisma.$disconnect());
