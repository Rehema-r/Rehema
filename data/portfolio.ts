export type ProjectStatus = "Prototype" | "En développement" | "Concept" | "Activité";

export type Project = {
  id: number;
  title: string;
  category: string;
  status: ProjectStatus;
  summary: string;
  outcome: string;
  tags: string[];
  image?: string;
  featured?: boolean;
};

export const projects: Project[] = [
  {
    id: 1,
    title: "REHEMA OS",
    category: "Intelligence artificielle",
    status: "En développement",
    summary: "Un assistant personnel pensé comme un ensemble de services capables d’analyser et d’orchestrer des commandes.",
    outcome: "Architecture distribuée : passerelle API, orchestration, IA locale, services Python, PostgreSQL et Docker.",
    tags: ["Ollama", "Python", "Docker", "Microservices"],
    featured: true,
  },
  {
    id: 2,
    title: "Codel Academy",
    category: "Éducation",
    status: "En développement",
    summary: "Une plateforme d’apprentissage structurée pour faire évoluer séparément le produit web, l’API et les outils partagés.",
    outcome: "Monorepo Turborepo avec NestJS, Prisma, PostgreSQL et environnement conteneurisé.",
    tags: ["NestJS", "PostgreSQL", "Turborepo", "Prisma"],
    featured: true,
  },
  {
    id: 3,
    title: "RM Study",
    category: "Éducation",
    status: "Prototype",
    summary: "Une expérience d’apprentissage numérique conçue pour progresser à son rythme avec des contenus contextualisés.",
    outcome: "Cours, ressources pédagogiques, tutorat et suivi de progression dans une interface accessible.",
    tags: ["EdTech", "Mobile", "UX"],
    image: "/images/rm-study.png",
    featured: true,
  },
  {
    id: 4,
    title: "REHEMA Beats",
    category: "Produit numérique",
    status: "Concept",
    summary: "Un écosystème musical tourné vers les artistes, la publication de contenus et l’écoute en ligne.",
    outcome: "Gestion des artistes, médias, utilisateurs et diffusion avec une attention portée aux coûts d’hébergement.",
    tags: ["Kotlin", "Streaming", "Mobile"],
  },
  {
    id: 5,
    title: "MathForge",
    category: "Éducation",
    status: "Prototype",
    summary: "Une application pour relier les mathématiques aux usages concrets de l’informatique et des réseaux.",
    outcome: "Parcours progressifs, exercices interactifs et interface Android inspirée de Material Design 3.",
    tags: ["Android", "Kotlin", "EdTech"],
  },
  {
    id: 6,
    title: "Rehema Langue",
    category: "Éducation",
    status: "Prototype",
    summary: "Une application Android d’apprentissage des langues organisée autour de leçons courtes et progressives.",
    outcome: "Architecture Kotlin et pistes de personnalisation future par intelligence artificielle.",
    tags: ["Android", "Kotlin", "IA"],
  },
  {
    id: 7,
    title: "ReChat",
    category: "Produit numérique",
    status: "Concept",
    summary: "Une application de messagerie avec comptes utilisateurs et conversations en temps réel.",
    outcome: "Étude d’une architecture d’authentification, de données temps réel et d’API évolutive.",
    tags: ["Mobile", "Backend", "Temps réel"],
  },
  {
    id: 8,
    title: "Nircia Shop",
    category: "Commerce",
    status: "Concept",
    summary: "Une base de produit e-commerce couvrant catalogue, commandes et administration.",
    outcome: "Modélisation des produits, catégories, utilisateurs, commandes et opérations du tableau de bord.",
    tags: ["Full-stack", "E-commerce", "Base de données"],
  },
  {
    id: 9,
    title: "Explore Kolwezi",
    category: "Impact local",
    status: "Concept",
    summary: "Une vitrine numérique pour découvrir les lieux, les services, la culture et les initiatives de Kolwezi.",
    outcome: "Un point d’entrée communautaire pour les habitants, les visiteurs et les entreprises locales.",
    tags: ["Web", "Tourisme", "Communauté"],
  },
  {
    id: 10,
    title: "Tests & recrutement",
    category: "Produit numérique",
    status: "Concept",
    summary: "Une plateforme SaaS pour administrer des évaluations de recrutement et restituer les résultats.",
    outcome: "Questionnaires, accès candidat, chronométrage, rapports et espace d’administration.",
    tags: ["SaaS", "B2B", "PDF"],
  },
  {
    id: 11,
    title: "Rehema API",
    category: "Infrastructure",
    status: "Concept",
    summary: "Une couche de services réutilisables destinée à réduire la duplication entre plusieurs produits.",
    outcome: "Passerelle API, modules partagés, documentation, journalisation et supervision.",
    tags: ["API", "Backend", "Infrastructure"],
  },
  {
    id: 12,
    title: "RM Tech",
    category: "Impact local",
    status: "Activité",
    summary: "Une micro-entreprise technologique cofondée pour accompagner les besoins numériques locaux.",
    outcome: "Développement web et mobile, conseil technique, formation et solutions sur mesure.",
    tags: ["Conseil", "Développement", "Formation"],
    image: "/images/rm_logo.png",
  },
  {
    id: 13,
    title: "Union Company SARL",
    category: "Commerce",
    status: "Activité",
    summary: "Une initiative commerciale et de services construite autour de besoins d’entreprises locales.",
    outcome: "Commerce général, services B2B, distribution et accompagnement de proximité.",
    tags: ["B2B", "Services", "Commerce"],
    image: "/images/unoncompanysarl.jpg",
  },
  {
    id: 14,
    title: "Rehema Chain",
    category: "Recherche",
    status: "Concept",
    summary: "Une exploration des architectures blockchain et des actifs numériques appliqués à un écosystème local.",
    outcome: "Étude de réseau, transactions, portefeuilles, nœuds et modèle économique — sans promesse de production.",
    tags: ["Blockchain", "Recherche", "Architecture"],
  },
];

export const skillGroups = [
  {
    title: "Concevoir",
    description: "Passer d’un besoin à une architecture claire, découpée et maintenable.",
    skills: ["Architecture logicielle", "Modélisation de données", "API REST", "Monorepo", "UX produit"],
  },
  {
    title: "Développer",
    description: "Construire des interfaces et des services avec une base technique moderne.",
    skills: ["TypeScript", "React", "Next.js", "Node.js", "NestJS", "Python", "Kotlin"],
  },
  {
    title: "Opérer",
    description: "Rendre un projet reproductible, déployable et plus simple à faire évoluer.",
    skills: ["Git & GitHub", "Docker", "Linux", "PostgreSQL", "MySQL", "Prisma", "Vercel"],
  },
  {
    title: "Explorer",
    description: "Prototyper autour des systèmes intelligents et des technologies émergentes.",
    skills: ["Ollama", "LLM", "Intégration IA", "Microservices", "Blockchain"],
  },
];

export const learning = [
  { title: "Python Programming", source: "Coursera / Google", area: "Programmation" },
  { title: "C Programming", source: "Coursera / Duke University", area: "Programmation" },
  { title: "C# Development", source: "Microsoft Learn", area: "Développement" },
  { title: "Flutter Development", source: "Écosystème Flutter", area: "Mobile" },
  { title: "Web Development", source: "freeCodeCamp", area: "Web" },
  { title: "Cybersécurité", source: "Cisco Networking Academy", area: "Sécurité" },
];
