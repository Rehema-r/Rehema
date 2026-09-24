import { revalidatePath } from "next/cache";
import { z } from "zod";
import { getPrisma } from "@/lib/db/prisma";
import {
  buildLinkedInPost,
  buildNewsCopy,
  buildProjectDescription,
  fetchGitHubRepositories,
  isPublishableRepository,
  projectSlugFromRepository,
  titleFromRepository,
  type GitHubRepository,
} from "./github";

const CONFIG_KEY = "automation.portfolio-agent.config";
const STATE_KEY = "automation.portfolio-agent.state";

const configSchema = z.object({
  enabled: z.boolean().default(true),
  githubUsername: z.string().trim().min(1).max(100).default("Rehema-r"),
  excludedRepositories: z.array(z.string()).default(["Rehema", "Rehema-r"]),
  autoPublishProjects: z.boolean().default(true),
  autoPublishNews: z.boolean().default(true),
  autoShareLinkedIn: z.boolean().default(true),
});

const stateSchema = z.object({
  status: z.enum(["idle", "running", "success", "error"]).default("idle"),
  lastRunAt: z.string().datetime().nullable().default(null),
  lastSuccessAt: z.string().datetime().nullable().default(null),
  lastError: z.string().nullable().default(null),
  repositoriesChecked: z.number().int().min(0).default(0),
  projectsCreated: z.number().int().min(0).default(0),
  newsCreated: z.number().int().min(0).default(0),
  linkedInPostsCreated: z.number().int().min(0).default(0),
  lastActions: z.array(z.string()).max(20).default([]),
});

export type PortfolioAgentConfig = z.infer<typeof configSchema>;
export type PortfolioAgentState = z.infer<typeof stateSchema>;
export type PortfolioAgentResult = PortfolioAgentState & { skipped?: boolean };
type Database = NonNullable<ReturnType<typeof getPrisma>>;

const defaultConfig = configSchema.parse({});
const defaultState = stateSchema.parse({});

function settingValue(setting: { value: unknown } | null) {
  return setting?.value;
}

export async function getPortfolioAgentConfig(db: Database): Promise<PortfolioAgentConfig> {
  const setting = await db.siteSetting.findUnique({ where: { key: CONFIG_KEY } });
  const parsed = configSchema.safeParse(settingValue(setting));
  return parsed.success ? parsed.data : defaultConfig;
}

export async function getPortfolioAgentState(db: Database): Promise<PortfolioAgentState> {
  const setting = await db.siteSetting.findUnique({ where: { key: STATE_KEY } });
  const parsed = stateSchema.safeParse(settingValue(setting));
  return parsed.success ? parsed.data : defaultState;
}

async function saveState(db: Database, value: PortfolioAgentState) {
  await db.siteSetting.upsert({
    where: { key: STATE_KEY },
    create: { key: STATE_KEY, value },
    update: { value },
  });
}

async function publishOnLinkedIn(text: string) {
  const token = process.env.LINKEDIN_ACCESS_TOKEN;
  const author = process.env.LINKEDIN_AUTHOR_URN;
  if (!token || !author) return { published: false, reason: "Connexion LinkedIn non configurée." };

  const response = await fetch("https://api.linkedin.com/rest/posts", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
      "LinkedIn-Version": process.env.LINKEDIN_API_VERSION ?? "202609",
      "X-Restli-Protocol-Version": "2.0.0",
    },
    body: JSON.stringify({
      author,
      commentary: text,
      visibility: "PUBLIC",
      distribution: { feedDistribution: "MAIN_FEED", targetEntities: [], thirdPartyDistributionChannels: [] },
      lifecycleState: "PUBLISHED",
      isReshareDisabledByAuthor: false,
    }),
    signal: AbortSignal.timeout(15_000),
  });
  if (!response.ok) throw new Error(`LinkedIn a répondu ${response.status}.`);
  return { published: true, id: response.headers.get("x-restli-id") };
}

async function createProjectFromRepository(db: Database, repository: GitHubRepository, order: number, config: PortfolioAgentConfig, siteUrl: string) {
  const slug = projectSlugFromRepository(repository);
  const title = titleFromRepository(repository.name);
  const creation = await db.$transaction(async tx => {
    const existing = await tx.project.findFirst({ where: { OR: [{ slug }, { repository: repository.html_url }] } });
    if (existing) return { created: false, projectSlug: existing.slug, newsCreated: false };

    const category = await tx.category.upsert({
      where: { name: "Projets GitHub" },
      update: {},
      create: { name: "Projets GitHub", slug: "projets-github", description: "Réalisations synchronisées depuis un dépôt public vérifié." },
    });
    const technology = repository.language ? await tx.technology.upsert({
      where: { name: repository.language },
      update: {},
      create: { name: repository.language, slug: repository.language.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "") },
    }) : null;

    await tx.project.create({
      data: {
        slug,
        title,
        summary: repository.description!.trim().slice(0, 500),
        description: buildProjectDescription(repository),
        outcome: "Dépôt public disponible et informations synchronisées automatiquement depuis GitHub.",
        status: "ACTIVE",
        featured: false,
        published: config.autoPublishProjects,
        repository: repository.html_url,
        demoUrl: repository.homepage?.trim() || null,
        startedAt: new Date(repository.created_at),
        order,
        categories: { create: { categoryId: category.id } },
        technologies: technology ? { create: { technologyId: technology.id, order: 0 } } : undefined,
      },
    });

    let newsCreated = false;
    if (config.autoPublishNews) {
      const copy = buildNewsCopy(repository, slug, siteUrl);
      const blogCategory = await tx.blogCategory.upsert({
        where: { name: "Actualités" },
        update: {},
        create: { name: "Actualités", slug: "actualites", description: "Nouveautés vérifiées du portfolio." },
      });
      const existingPost = await tx.blogPost.findUnique({ where: { slug: copy.slug } });
      if (!existingPost) {
        await tx.blogPost.create({
          data: { slug: copy.slug, title: copy.title, excerpt: copy.excerpt, content: copy.content, status: "PUBLISHED", publishedAt: new Date(), readingTime: 1, categoryId: blogCategory.id },
        });
        newsCreated = true;
      }
    }
    return { created: true, projectSlug: slug, newsCreated };
  });

  if (!creation.created) return { ...creation, linkedInPublished: false, linkedInError: null };

  let linkedInPublished = false;
  let linkedInError: string | null = null;
  if (config.autoShareLinkedIn && config.autoPublishProjects) {
    try {
      const result = await publishOnLinkedIn(buildLinkedInPost(repository, slug, siteUrl));
      linkedInPublished = result.published;
    } catch (error) {
      linkedInError = error instanceof Error ? error.message : "Publication LinkedIn impossible.";
    }
  }
  return { ...creation, linkedInPublished, linkedInError };
}

export async function runPortfolioAgent(db: Database): Promise<PortfolioAgentResult> {
  const config = await getPortfolioAgentConfig(db);
  const previous = await getPortfolioAgentState(db);
  const startedAt = new Date().toISOString();
  if (!config.enabled) return { ...previous, skipped: true };
  if (previous.status === "running" && previous.lastRunAt && Date.now() - Date.parse(previous.lastRunAt) < 10 * 60 * 1000) return { ...previous, skipped: true };

  await saveState(db, { ...previous, status: "running", lastRunAt: startedAt, lastError: null });
  try {
    const repositories = await fetchGitHubRepositories(config.githubUsername);
    const candidates = repositories.filter(repository => isPublishableRepository(repository, config.githubUsername, config.excludedRepositories));
    const highest = await db.project.aggregate({ _max: { order: true } });
    const actions: string[] = [];
    let projectsCreated = 0;
    let newsCreated = 0;
    let linkedInPostsCreated = 0;

    for (const [index, repository] of candidates.entries()) {
      try {
        const result = await createProjectFromRepository(db, repository, (highest._max.order ?? 0) + index + 1, config, process.env.NEXT_PUBLIC_SITE_URL ?? "https://rehema-gules.vercel.app");
        if (!result.created) continue;
        projectsCreated += 1;
        if (result.newsCreated) newsCreated += 1;
        if (result.linkedInPublished) linkedInPostsCreated += 1;
        actions.push(`Projet ajouté : ${titleFromRepository(repository.name)}`);
        if (result.linkedInError) actions.push(`${repository.name} : ${result.linkedInError}`);
      } catch (error) {
        actions.push(`${repository.name} : ${error instanceof Error ? error.message : "échec de synchronisation"}`);
      }
    }

    const state = stateSchema.parse({
      status: "success",
      lastRunAt: startedAt,
      lastSuccessAt: new Date().toISOString(),
      lastError: null,
      repositoriesChecked: repositories.length,
      projectsCreated,
      newsCreated,
      linkedInPostsCreated,
      lastActions: actions.slice(0, 20),
    });
    await saveState(db, state);
    if (projectsCreated || newsCreated) {
      revalidatePath("/", "layout");
      revalidatePath("/sitemap.xml");
    }
    return state;
  } catch (error) {
    const state = stateSchema.parse({
      ...previous,
      status: "error",
      lastRunAt: startedAt,
      lastError: error instanceof Error ? error.message.slice(0, 500) : "Erreur inconnue.",
    });
    await saveState(db, state);
    return state;
  }
}
