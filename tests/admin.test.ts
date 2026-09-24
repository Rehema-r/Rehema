import assert from "node:assert/strict";
import test from "node:test";
import { imagePathSchema, journeySchema, listSchema, postSchema, profileSchema, projectSchema, slugSchema, slugify, webUrlSchema } from "../features/admin/schemas";
import { eventSchema } from "../features/analytics/schema";

test("slug validation rejects traversal and script-like input", () => {
  assert.equal(slugSchema.safeParse("un-projet-2026").success, true);
  for (const value of ["../admin", "UPPER", "a/b", "", "<script>"]) assert.equal(slugSchema.safeParse(value).success, false);
  assert.equal(slugify("École & données"), "ecole-donnees");
});
test("outbound links accept only web URLs without credentials", () => {
  for (const value of ["javascript:alert(1)", "data:text/html,x", "file:///x", "https://user:pass@example.test"]) assert.equal(webUrlSchema.safeParse(value).success, false);
  assert.equal(webUrlSchema.safeParse("https://example.test/demo").success, true);
  assert.equal(webUrlSchema.safeParse("").success, true);
});
test("images are constrained to local image paths", () => {
  for (const value of ["//evil.test/a.png", "/images/../secret", "https://localhost/a.png", "/api/private"]) assert.equal(imagePathSchema.safeParse(value).success, false);
  assert.equal(imagePathSchema.safeParse("/images/rehema-profil.jpeg").success, true);
});
test("lists are trimmed, deduplicated and bounded", () => {
  assert.deepEqual(listSchema.parse("React, React, TypeScript, "), ["React", "TypeScript"]);
  assert.equal(listSchema.safeParse("x".repeat(101)).success, false);
});
test("project writes require valid publication flags and a category", () => {
  const project = { title: "Projet", slug: "projet", summary: "Résumé", description: "Description", outcome: "", status: "CONCEPT", published: false, featured: false, order: 0, categories: "Web", technologies: "React", repository: "", demoUrl: "", coverImage: "" };
  assert.equal(projectSchema.safeParse(project).success, true);
  assert.equal(projectSchema.safeParse({ ...project, published: "false" }).success, false);
  assert.equal(projectSchema.safeParse({ ...project, categories: "" }).success, false);
  assert.equal(projectSchema.safeParse({ ...project, order: -1 }).success, false);
});
test("publication and journey dates reject impossible dates", () => {
  const post = { title: "Article", slug: "article", excerpt: "Résumé", content: "Texte", category: "Web", status: "DRAFT", publishedAt: "", coverImage: "" };
  assert.equal(postSchema.safeParse(post).success, true);
  assert.equal(postSchema.safeParse({ ...post, publishedAt: "2026-02-31" }).success, false);
  const item = { title: "Étape", organization: "", description: "Description", startDate: "2026-05-01", endDate: "2026-04-01", current: false, visible: true, order: 0, technologies: "Web" };
  assert.equal(journeySchema.safeParse(item).success, false);
  assert.equal(journeySchema.safeParse({ ...item, current: true }).success, true);
});
test("profile changes cannot include authentication fields", () => {
  const parsed = profileSchema.parse({ email: "public@example.test", phone: "+243992623141", location: "Kolwezi", github: "https://github.com/Rehema-r", description: "Profil", adsEnabled: true, analyticsEnabled: false, passwordHash: "not-allowed" });
  assert.equal("passwordHash" in parsed, false);
});
test("analytics exclude admin routes, query strings and arbitrary metadata", () => {
  for (const path of ["/admin/settings", "/api/auth", "/contact?email=private", "//other.test"]) assert.equal(eventSchema.safeParse({ type: "PAGE_VIEW", path }).success, false);
  const parsed = eventSchema.parse({ type: "PAGE_VIEW", path: "/projects/mon-projet", metadata: { email: "private" }, sessionId: "private" });
  assert.deepEqual(parsed, { type: "PAGE_VIEW", path: "/projects/mon-projet" });
});
