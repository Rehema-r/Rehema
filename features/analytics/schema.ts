import { z } from "zod";

export const eventSchema = z.object({
  type: z.enum(["PAGE_VIEW", "PROJECT_VIEW", "PROJECT_DEMO_CLICK", "REPOSITORY_CLICK", "CV_DOWNLOAD", "BLOG_READ", "QUIZ_COMPLETED"]),
  path: z.string().max(300).regex(/^\/(?:[a-z0-9-]+\/?)*$/).refine(path => !path.startsWith("/admin") && !path.startsWith("/api")),
});
