import { z } from "zod";
import { slugify } from "@/features/admin/schemas";

const githubRepositorySchema = z.object({
  id: z.number().int().positive(),
  name: z.string().min(1),
  description: z.string().nullable(),
  html_url: z.string().url(),
  homepage: z.string().nullable(),
  language: z.string().nullable(),
  topics: z.array(z.string()).default([]),
  fork: z.boolean(),
  archived: z.boolean(),
  disabled: z.boolean(),
  private: z.boolean(),
  is_template: z.boolean().default(false),
  created_at: z.string().datetime(),
  updated_at: z.string().datetime(),
});

const githubRepositoriesSchema = z.array(githubRepositorySchema);

export type GitHubRepository = z.infer<typeof githubRepositorySchema>;

export function isPublishableRepository(repository: GitHubRepository, username: string, excludedNames: string[]) {
  const exclusions = new Set([...excludedNames, username].map(value => value.trim().toLowerCase()).filter(Boolean));
  return !repository.private
    && !repository.fork
    && !repository.archived
    && !repository.disabled
    && !repository.is_template
    && Boolean(repository.description?.trim())
    && !exclusions.has(repository.name.toLowerCase());
}

export function titleFromRepository(name: string) {
  return name
    .replace(/[._-]+/g, " ")
    .trim()
    .split(/\s+/)
    .filter(Boolean)
    .map(word => word.length <= 3 && word === word.toUpperCase() ? word : `${word.charAt(0).toUpperCase()}${word.slice(1)}`)
    .join(" ");
}

export function projectSlugFromRepository(repository: GitHubRepository) {
  return slugify(repository.name) || `github-${repository.id}`;
}

export function buildProjectDescription(repository: GitHubRepository) {
  const description = repository.description!.trim();
  const technology = repository.language ? ` La technologie principale déclarée est ${repository.language}.` : "";
  return `${description}\n\nCette réalisation est synchronisée depuis son dépôt GitHub public.${technology}`;
}

export function buildNewsCopy(repository: GitHubRepository, projectSlug: string, siteUrl: string) {
  const title = titleFromRepository(repository.name);
  const projectUrl = `${siteUrl.replace(/\/$/, "")}/projects/${projectSlug}`;
  const language = repository.language ? ` Le dépôt utilise principalement ${repository.language}.` : "";
  return {
    slug: `nouveau-projet-${projectSlug}`.slice(0, 120),
    title: `Nouveau projet : ${title}`.slice(0, 180),
    excerpt: `${repository.description!.trim()}${language}`.slice(0, 600),
    content: [
      `Une nouvelle réalisation rejoint le portfolio : ${title}.`,
      repository.description!.trim(),
      `${language.trim()} Le code source public et les informations vérifiées du projet sont disponibles sur sa fiche : ${projectUrl}`.trim(),
    ].join("\n\n"),
    projectUrl,
  };
}

export function buildLinkedInPost(repository: GitHubRepository, projectSlug: string, siteUrl: string) {
  const title = titleFromRepository(repository.name);
  const projectUrl = `${siteUrl.replace(/\/$/, "")}/projects/${projectSlug}`;
  const technology = repository.language ? `\n\nTechnologie principale : ${repository.language}.` : "";
  return `Nouveau projet dans mon portfolio : ${title}\n\n${repository.description!.trim()}${technology}\n\nDécouvrir le projet : ${projectUrl}\n\n#DeveloppementWeb #Portfolio #GenieLogiciel`;
}

export async function fetchGitHubRepositories(username: string) {
  const headers: HeadersInit = {
    Accept: "application/vnd.github+json",
    "User-Agent": "REHEMA-Portfolio-Agent",
    "X-GitHub-Api-Version": "2022-11-28",
  };
  if (process.env.GITHUB_TOKEN) headers.Authorization = `Bearer ${process.env.GITHUB_TOKEN}`;

  const response = await fetch(`https://api.github.com/users/${encodeURIComponent(username)}/repos?per_page=100&type=owner&sort=updated`, {
    headers,
    cache: "no-store",
    signal: AbortSignal.timeout(15_000),
  });
  if (!response.ok) throw new Error(`GitHub a répondu ${response.status}.`);
  return githubRepositoriesSchema.parse(await response.json());
}
