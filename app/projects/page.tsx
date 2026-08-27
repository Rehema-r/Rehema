import Image from "next/image";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const projects = [
  {
    id: 1,
    icon: "🤖",
    title: "REHEMA OS",
    badge: "Projet Phare",
    description: "Système d'assistant personnel intelligent inspiré de Jarvis, capable de centraliser différentes fonctionnalités et services.",
    details: [
      "Architecture complète : Gateway Service, Orchestrator Service, API Backend, Intelligence artificielle locale (Ollama), PostgreSQL, Docker, Services Python, Communication entre microservices.",
      "Objectif : Construire un écosystème intelligent capable de recevoir des commandes, les analyser et orchestrer plusieurs services de manière autonome."
    ],
    tags: ["IA", "Microservices", "Docker", "Python"],
    featured: true,
  },
  {
    id: 2,
    icon: "🎓",
    title: "Codel Academy",
    badge: "Plateforme Éducative",
    description: "Plateforme orientée vers l'apprentissage et la formation avec architecture monorepo moderne.",
    details: [
      "Architecture technique : Monorepo, PNPM, Turborepo, Application Web, API Backend (NestJS), Prisma, PostgreSQL, Docker.",
      "Structure : Séparation claire entre Frontend, Backend, Packages partagés et Base de données pour une maintenance et évolutivité optimales."
    ],
    tags: ["Éducation", "Full-Stack", "NestJS", "Monorepo"],
    featured: true,
  },
  {
    id: 3,
    icon: "🎵",
    title: "REHEMA BEATS",
    badge: "Écosystème Musical",
    description: "Plateforme/application orientée vers la musique et les artistes avec streaming et gestion de contenus.",
    details: [
      "Fonctionnalités clés : Publication de contenus musicaux, Gestion d'artistes, Streaming ou diffusion de musique, Interfaces modernes, Gestion des utilisateurs, Stockage de médias.",
      "Innovation : Solutions alternatives pour réduire les coûts d'hébergement tout en maintenant une qualité de service optimale."
    ],
    tags: ["Mobile", "Streaming", "Kotlin"],
    featured: true,
  },
  {
    id: 4,
    icon: "🏢",
    title: "UNION COMPANY SARL",
    image: "/images/unoncompanysarl.jpg",
    description: "Entreprise commerciale et de services offrant des solutions innovantes pour les entreprises locales.",
    details: [
      "Secteurs d'activité : Commerce général, Services B2B, Consultation, Distribution de produits.",
      "Valeur ajoutée : Approche client personnalisée, Solutions adaptées aux réalités locales, Partenariats stratégiques."
    ],
    tags: ["Entreprise", "Services", "Commerce"],
  },
  {
    id: 5,
    icon: "📚",
    title: "RM STUDY",
    image: "/images/rm-study.png",
    description: "Plateforme éducative et de formation spécialisée dans l'apprentissage numérique.",
    details: [
      "Services : Cours en ligne, Tutorat personnalisé, Ressources pédagogiques, Suivi de progression.",
      "Approche : Méthodologie adaptée aux étudiants africains, Contenus contextualisés, Accès flexible et abordable."
    ],
    tags: ["Éducation", "Formation", "Digital"],
  },
  {
    id: 6,
    icon: "💼",
    title: "RM - Micro-Entreprise",
    image: "/images/rm_logo.png",
    description: "Micro-entreprise technologique offrant des services de développement et de consulting.",
    details: [
      "Services : Développement web et mobile, Consulting technique, Formation, Solutions sur mesure.",
      "Philosophie : Innovation locale, Qualité professionnelle, Accessibilité pour les PME et startups."
    ],
    tags: ["Tech", "Consulting", "Services"],
  },
  {
    id: 7,
    icon: "🧮",
    title: "MathForge",
    description: "Application éducative spécialisée dans l'apprentissage des mathématiques appliquées à l'informatique.",
    details: [
      "Public cible : Développeurs, Étudiants en informatique, Ingénieurs réseaux.",
      "Caractéristiques : Interface moderne, Design Material 3, Approche interactive, Exercices et apprentissage progressif, Mathématiques pratiques pour la tech."
    ],
    tags: ["Éducation", "Android", "Kotlin"],
  },
  {
    id: 8,
    icon: "🗣️",
    title: "REHEMA LANGUE",
    description: "Application Android dédiée à l'apprentissage des langues avec interfaces éducatives et gestion des leçons.",
    details: [
      "Fonctionnalités : Apprentissage progressif, Interfaces éducatives, Gestion des leçons, Architecture Android Kotlin, Possibilité d'intégration d'intelligence artificielle pour personnaliser l'apprentissage."
    ],
    tags: ["Éducation", "Android", "Kotlin"],
  },
  {
    id: 9,
    icon: "💬",
    title: "RECHAT",
    description: "Application de communication et de messagerie avec comptes utilisateurs, authentification et conversations.",
    details: [
      "Fonctionnalités : Comptes utilisateurs sécurisés, Authentification robuste, Conversations en temps réel, Messagerie, Architecture backend scalable, Gestion de données en temps réel ou via API."
    ],
    tags: ["Communication", "Mobile", "Backend"],
  },
  {
    id: 10,
    icon: "🛒",
    title: "NIRCIA SHOP",
    description: "Projet orienté e-commerce avec catalogue de produits, gestion des utilisateurs et système de commande.",
    details: [
      "Fonctionnalités : Catalogue de produits riche, Gestion des utilisateurs, Produits et catégories organisés, Système de commande complet, Dashboard administrateur, Architecture backend robuste et base de données optimisée."
    ],
    tags: ["E-commerce", "Full-Stack", "Database"],
  },
  {
    id: 11,
    icon: "🌍",
    title: "Explore Kolwezi",
    description: "Plateforme web consacrée à la découverte et à la mise en valeur de Kolwezi.",
    details: [
      "Fonctionnalités : Découverte des lieux, Informations locales, Services, Entreprises, Culture, Tourisme, Plateforme communautaire.",
      "Objectif : Créer une vitrine numérique moderne pour la ville, promouvoir le tourisme local et faciliter l'accès aux informations pour les résidents et visiteurs."
    ],
    tags: ["Web", "Communauté", "Local"],
  },
  {
    id: 12,
    icon: "📝",
    title: "Plateforme de Tests et Recrutement",
    badge: "SaaS",
    description: "Plateforme SaaS permettant aux entreprises de réaliser des tests de recrutement numériques.",
    details: [
      "Fonctionnalités : Création de questionnaires personnalisés, Codes uniques pour les candidats, Chronomètre intégré, Gestion automatique du temps, Résultats en temps réel, Génération de rapports PDF, Dashboard administrateur complet, Système d'abonnement flexible.",
      "Modèle : Solution B2B commercialisable auprès d'entreprises et institutions pour optimiser leurs processus de recrutement."
    ],
    tags: ["SaaS", "Full-Stack", "Business"],
  },
  {
    id: 13,
    icon: "🔗",
    title: "REHEMA API",
    description: "Projet visant à créer et centraliser des services API pour différents projets.",
    details: [
      "Architecture : API Gateway centralisée, Services modulaires, Documentation complète, Monitoring et logging.",
      "Objectif : Disposer d'une infrastructure capable de fournir des services réutilisables à plusieurs applications, réduire la duplication de code et standardiser les intégrations."
    ],
    tags: ["API", "Backend", "Infrastructure"],
  },
  {
    id: 14,
    icon: "⛓️",
    title: "REHEMA CHAIN",
    description: "Projet ambitieux autour de la blockchain et des actifs numériques.",
    details: [
      "Architecture : Architecture d'une blockchain personnalisée, Réseau indépendant, Cryptomonnaie / token natif, Transactions sécurisées, Wallets multi-signature, Nodes décentralisés, Système économique robuste.",
      "Objectif : Construire un écosystème numérique pouvant financer et connecter différentes applications et plateformes, créer une économie circulaire locale."
    ],
    tags: ["Blockchain", "Crypto", "Innovation"],
  },
];

export default function Projects() {
  return (
    <div className="min-h-screen bg-slate-900 text-white">
      <Navbar />
      
      <main className="pt-24 pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-5xl font-bold text-center mb-4 text-white drop-shadow-[0_0_20px_rgba(34,211,238,0.3)]">
            Mes Projets
          </h1>
          <p className="text-center text-slate-400 text-xl mb-12">
            Une sélection de mes travaux personnels et entrepreneuriaux
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project) => (
              <div
                key={project.id}
                className={`bg-slate-800 p-8 rounded-xl border border-slate-700 hover:border-cyan-400 hover:shadow-[0_0_20px_rgba(34,211,238,0.3)] transition-all hover:-translate-y-0.5 ${
                  project.featured ? 'border-2 border-cyan-400 shadow-[0_0_20px_rgba(34,211,238,0.3)]' : ''
                }`}
              >
                {project.badge && (
                  <span className="absolute top-4 right-4 bg-gradient-to-r from-purple-600 to-cyan-500 text-white px-3 py-1 rounded-full text-xs font-semibold shadow-[0_0_10px_rgba(124,58,237,0.3)]">
                    {project.badge}
                  </span>
                )}
                
                <div className="text-5xl mb-4">{project.icon}</div>
                
                {project.image && (
                  <Image
                    src={project.image}
                    alt={project.title}
                    width={400}
                    height={200}
                    className="w-full h-48 object-cover rounded-lg mb-4 border border-slate-700"
                  />
                )}
                
                <h3 className="text-2xl font-bold mb-2 text-white">{project.title}</h3>
                <p className="text-slate-400 mb-4">{project.description}</p>
                
                <div className="bg-cyan-400/10 border border-cyan-400/20 p-4 rounded-lg mb-4">
                  {project.details.map((detail, index) => (
                    <p key={index} className="text-slate-400 text-sm mb-2 last:last:mb-0">
                      <strong className="text-cyan-400">{detail.split(':')[0]}:</strong>
                      {detail.split(':')[1]}
                    </p>
                  ))}
                </div>
                
                <div className="flex flex-wrap gap-2">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="bg-cyan-400/15 border border-cyan-400/30 px-3 py-1 rounded-full text-sm text-white"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
