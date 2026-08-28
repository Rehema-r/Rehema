export type BlogPost = {
  slug: string;
  title: string;
  excerpt: string;
  content: string[];
  category: string;
  publishedAt: string;
  readingTime: number;
};

export const posts: BlogPost[] = [
  {
    slug: "construire-depuis-kolwezi",
    title: "Construire depuis Kolwezi, sans réduire l’ambition",
    excerpt: "Ce que le contexte local change dans la manière de choisir une technologie, un produit et un rythme de livraison.",
    category: "Vision produit",
    publishedAt: "2026-08-20",
    readingTime: 4,
    content: [
      "Construire un produit numérique depuis Kolwezi ne signifie pas copier plus lentement ce qui existe ailleurs. Cela oblige à regarder plus précisément les contraintes d’accès, de coût, d’équipement et de confiance.",
      "Une architecture pertinente commence par le problème réel. Une application légère, documentée et maintenable peut avoir plus d’impact qu’une démonstration techniquement spectaculaire mais impossible à exploiter.",
      "Mon objectif est donc double : apprendre les standards internationaux et les appliquer avec discernement aux réalités du terrain. Cette tension produit de meilleures décisions techniques.",
    ],
  },
  {
    slug: "prototype-honnete",
    title: "Pourquoi un prototype doit annoncer clairement ce qu’il est",
    excerpt: "Présenter le niveau réel d’avancement d’un projet renforce sa crédibilité au lieu de la diminuer.",
    category: "Méthode",
    publishedAt: "2026-08-12",
    readingTime: 3,
    content: [
      "Un portfolio peut rapidement devenir une collection de promesses. Or un concept, un prototype et un produit actif ne racontent pas la même chose.",
      "Nommer le statut d’un projet rend la discussion plus utile. On peut alors évaluer l’idée, l’architecture ou l’exécution avec les bons critères.",
      "Cette transparence permet aussi de montrer la progression : ce qui a été appris, ce qui reste incertain et la prochaine étape concrète.",
    ],
  },
  {
    slug: "architecture-qui-aide-a-apprendre",
    title: "Une architecture qui aide à apprendre",
    excerpt: "Séparer routes, fonctionnalités et infrastructure pour faire évoluer un projet sans perdre sa lisibilité.",
    category: "Ingénierie",
    publishedAt: "2026-08-04",
    readingTime: 5,
    content: [
      "Une bonne architecture personnelle ne cherche pas à reproduire une grande entreprise. Elle doit rendre les décisions visibles et limiter le coût du changement.",
      "Dans Rehema Digital Universe, les routes vivent dans App Router, la logique par domaine dans features et les services transverses dans lib. Prisma forme la frontière avec PostgreSQL.",
      "Cette structure permet d’ajouter un blog, une administration ou une expérience interactive sans transformer le dossier components en entrepôt indifférencié.",
    ],
  },
];

export function getPostBySlug(slug: string) {
  return posts.find((post) => post.slug === slug);
}
