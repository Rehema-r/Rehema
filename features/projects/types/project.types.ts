export type ProjectStatus =
  | "En ligne"
  | "Fonctionnel"
  | "Expérimental"
  | "Concept"
  | "Prototype"
  | "En développement"
  | "Activité"
  | "Terminé";

export type PortfolioProject = {
  id: number;
  slug: string;
  title: string;
  category: string;
  status: ProjectStatus;
  summary: string;
  description: string;
  outcome: string;
  tags: string[];
  image?: string;
  featured?: boolean;
  repository?: string;
  demoUrl?: string;
};
