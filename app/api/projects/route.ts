import { projects } from "@/features/projects/data";

export function GET() {
  return Response.json({ data: projects, source: "portfolio-fallback" });
}
