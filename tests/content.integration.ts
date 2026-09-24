import assert from "node:assert/strict";
import test from "node:test";
import { randomUUID } from "node:crypto";
import { getPrisma } from "../lib/db/prisma";
import { getPublicProjects, getPublicPosts, getPublicJourney, getPublicSkills } from "../features/content/queries";

const url = new URL(process.env.DATABASE_URL ?? "http://invalid");
if (!["localhost", "127.0.0.1"].includes(url.hostname) || url.port !== "51214") throw new Error("Integration tests require the isolated local database on port 51214. Never run on production.");
const db = getPrisma()!;
test("database publication boundaries and related content", async () => {
  const slug = `test-${randomUUID()}`;
  const project = await db.project.create({ data: { slug, title: "Local test project", summary: "Test", description: "Test", published: false } });
  const post = await db.blogPost.create({ data: { slug, title: "Local test post", excerpt: "Test", content: "One\n\nTwo", status: "DRAFT" } });
  const category = await db.skillCategory.create({ data: { name: slug, slug } });
  const skill = await db.skill.create({ data: { name: slug, slug, categoryId: category.id, visible: false } });
  const journey = await db.journeyItem.create({ data: { title: slug, description: "Test", startDate: new Date("2026-01-01"), visible: false, technologies: [] } });
  try {
    assert.equal((await getPublicProjects()).some(p => p.slug === slug), false);
    await db.project.update({ where: { id: project.id }, data: { published: true } });
    assert.equal((await getPublicProjects()).some(p => p.slug === slug), true);
    await db.project.update({ where: { id: project.id }, data: { status: "ARCHIVED" } });
    assert.equal((await getPublicProjects()).some(p => p.slug === slug), false);
    assert.equal((await getPublicPosts()).some(p => p.slug === slug), false);
    await db.blogPost.update({ where: { id: post.id }, data: { status: "PUBLISHED", publishedAt: new Date("2099-01-01") } });
    assert.equal((await getPublicPosts()).some(p => p.slug === slug), false);
    await db.blogPost.update({ where: { id: post.id }, data: { publishedAt: new Date("2020-01-01") } });
    const published = (await getPublicPosts()).find(p => p.slug === slug);
    assert.deepEqual(published?.content, ["One", "Two"]);
    assert.equal((await getPublicSkills()).some(g => g.title === slug), false);
    await db.skill.update({ where: { id: skill.id }, data: { visible: true } });
    assert.equal((await getPublicSkills()).some(g => g.title === slug), true);
    assert.equal((await getPublicJourney()).some(j => j.title === slug), false);
    await db.journeyItem.update({ where: { id: journey.id }, data: { visible: true } });
    assert.equal((await getPublicJourney()).some(j => j.title === slug), true);
  } finally {
    // Only the test records created above, in the explicitly isolated local database.
    await db.project.delete({ where: { id: project.id } });
    await db.blogPost.delete({ where: { id: post.id } });
    await db.skill.delete({ where: { id: skill.id } });
    await db.skillCategory.delete({ where: { id: category.id } });
    await db.journeyItem.delete({ where: { id: journey.id } });
    await db.$disconnect();
  }
});
