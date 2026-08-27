'use client';

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useState } from 'react';

const skills = {
  web: [
    { name: "HTML5 & CSS3", level: 95, comment: "Maîtrise avancée du sémantique HTML et des layouts CSS modernes (Flexbox, Grid)" },
    { name: "JavaScript (ES6+)", level: 90, comment: "Programmation fonctionnelle et orientée objet, manipulation du DOM, APIs modernes" },
    { name: "TypeScript", level: 85, comment: "Typage statique, interfaces, generics, patterns avancés pour des applications robustes" },
    { name: "React & Ecosystem", level: 88, comment: "Hooks, Context API, Redux, Next.js, architecture de composants modulaires" },
    { name: "Vite & Build Tools", level: 85, comment: "Optimisation des builds, configuration avancée, hot module replacement" },
    { name: "PHP", level: 75, comment: "Développement backend, frameworks Laravel/Symfony, intégration de bases de données" },
    { name: "Node.js & Ecosystem", level: 90, comment: "Runtime JavaScript côté serveur, npm/yarn, scripts de build, automatisation" },
    { name: "NestJS", level: 85, comment: "Architecture enterprise, modules, dependency injection, guards, interceptors" },
  ],
  mobile: [
    { name: "Android Natif (Kotlin)", level: 88, comment: "Activités, fragments, services, broadcast receivers, permissions, lifecycle management" },
    { name: "Material Design 3", level: 90, comment: "Composants Material, theming, animations, responsive layouts pour différentes tailles d'écran" },
    { name: "Architecture Android", level: 85, comment: "MVVM, Clean Architecture, Jetpack Compose, Room Database, Data Binding" },
    { name: "Authentification Mobile", level: 82, comment: "OAuth, JWT, Firebase Auth, biometric authentication, secure storage" },
    { name: "Intégration d'API", level: 85, comment: "Retrofit, OkHttp, coroutines, gestion des erreurs, offline-first architecture" },
  ],
  backend: [
    { name: "REST API Design", level: 92, comment: "Principes RESTful, HTTP methods, status codes, versioning, documentation OpenAPI/Swagger" },
    { name: "Architecture Backend Modulaire", level: 88, comment: "SOLID principles, clean architecture, separation of concerns, design patterns" },
    { name: "NestJS", level: 85, comment: "Modules, providers, controllers, services, pipes, guards, interceptors, custom decorators" },
    { name: "Python Backend", level: 88, comment: "FastAPI, Flask, async/await, Uvicorn, Gunicorn, middleware, dependency injection" },
    { name: "Microservices", level: 80, comment: "Service boundaries, data consistency, event-driven architecture, saga pattern" },
    { name: "Communication Inter-Services", level: 82, comment: "gRPC, message queues (RabbitMQ, Kafka), event sourcing, CQRS pattern" },
    { name: "Health Checks & Monitoring", level: 78, comment: "Prometheus, Grafana, logging structuré, alerting, observability" },
  ],
  database: [
    { name: "PostgreSQL", level: 90, comment: "Advanced queries, indexes, transactions, stored procedures, replication, partitioning" },
    { name: "MySQL", level: 85, comment: "Query optimization, indexing strategies, master-slave replication, backup & recovery" },
    { name: "Prisma ORM", level: 88, comment: "Schema definition, migrations, type-safe queries, relations, transactions, raw SQL" },
    { name: "Conception de Schémas", level: 85, comment: "Normalization, denormalization, ER modeling, data integrity, performance optimization" },
    { name: "Dockerisation de Bases de Données", level: 82, comment: "Docker Compose, volume management, networking, backup strategies, CI/CD integration" },
  ],
  devops: [
    { name: "Docker", level: 90, comment: "Dockerfiles, multi-stage builds, image optimization, container orchestration, security best practices" },
    { name: "Docker Compose", level: 88, comment: "Multi-container applications, networking, volumes, environment variables, service dependencies" },
    { name: "Déploiement de Services", level: 85, comment: "CI/CD pipelines, GitHub Actions, automated testing, blue-green deployments, rollbacks" },
    { name: "Architecture de Serveurs", level: 80, comment: "Load balancing, reverse proxies (Nginx), SSL/TLS configuration, performance tuning" },
    { name: "GitHub & Version Control", level: 92, comment: "Git workflows, branching strategies, code reviews, pull requests, GitHub Actions" },
    { name: "Vercel & Hébergement Web", level: 88, comment: "Static site deployment, serverless functions, edge computing, environment variables" },
    { name: "Linux Administration", level: 78, comment: "Command line, system monitoring, log management, user management, security hardening" },
  ],
  ai: [
    { name: "Ollama & LLM Locaux", level: 82, comment: "Model management, API integration, prompt engineering, fine-tuning, quantization" },
    { name: "Large Language Models", level: 78, comment: "Transformer architecture, tokenization, context windows, RAG (Retrieval-Augmented Generation)" },
    { name: "Gemini & Google AI Studio", level: 80, comment: "API integration, multimodal capabilities, function calling, safety filters, rate limiting" },
    { name: "Architecture d'Assistants IA", level: 75, comment: "Agent design, tool use, memory management, context handling, multi-turn conversations" },
    { name: "Orchestration de Services IA", level: 72, comment: "LangChain, service composition, error handling, fallback strategies, monitoring" },
    { name: "Intégration IA dans Applications", level: 75, comment: "API design, streaming responses, async processing, caching, cost optimization" },
  ],
  architecture: [
    { name: "Monorepo", level: 85, comment: "Code sharing, unified CI/CD, dependency management, versioning strategies" },
    { name: "Turborepo", level: 80, comment: "Build orchestration, caching, task pipelines, remote caching, incremental builds" },
    { name: "Microservices", level: 78, comment: "Service boundaries, data consistency, event-driven architecture, saga pattern" },
    { name: "API Gateway", level: 75, comment: "Request routing, rate limiting, authentication, caching, transformation" },
    { name: "System Design", level: 72, comment: "Scalability patterns, CAP theorem, consistency models, distributed systems fundamentals" },
  ],
};

export default function Skills() {
  const [hoveredSkill, setHoveredSkill] = useState<string | null>(null);

  return (
    <div className="min-h-screen bg-slate-900 text-white">
      <Navbar />
      
      <main className="pt-24 pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-5xl font-bold text-center mb-4 text-white drop-shadow-[0_0_20px_rgba(34,211,238,0.3)]">
            Mes Compétences
          </h1>
          <p className="text-center text-slate-400 text-xl mb-12">
            Technologies et domaines d'expertise approfondis
          </p>

          <section className="mb-16">
            <h2 className="text-2xl font-bold mb-4 text-cyan-400 drop-shadow-[0_0_15px_rgba(34,211,238,0.3)]">
              💻 Développement Web
            </h2>
            <p className="text-slate-400 mb-6">
              Expertise dans la création de sites web modernes et responsives, avec une maîtrise complète du frontend et du backend. 
              Je conçois des interfaces utilisateur intuitives et des architectures d'applications web scalables.
            </p>
            <div className="space-y-6">
              {skills.web.map((skill) => (
                <div 
                  key={skill.name}
                  onMouseEnter={() => setHoveredSkill(skill.name)}
                  onMouseLeave={() => setHoveredSkill(null)}
                  className="transition-all duration-300 hover:scale-[1.02]"
                >
                  <h3 className="text-white font-semibold mb-2">{skill.name}</h3>
                  <div className="h-2.5 bg-slate-700 rounded-full overflow-hidden mb-2">
                    <div
                      className={`h-full bg-gradient-to-r from-cyan-500 via-purple-600 to-cyan-500 rounded-full shadow-[0_0_10px_rgba(34,211,238,0.5)] transition-all duration-1000 ease-out ${
                        hoveredSkill === skill.name ? 'shadow-[0_0_20px_rgba(34,211,238,0.8)]' : ''
                      }`}
                      style={{ width: `${skill.level}%` }}
                    ></div>
                  </div>
                  <p className="text-slate-400 text-sm leading-relaxed">{skill.comment}</p>
                </div>
              ))}
            </div>
          </section>

          <section className="mb-16">
            <h2 className="text-2xl font-bold mb-4 text-cyan-400 drop-shadow-[0_0_15px_rgba(34,211,238,0.3)]">
              📱 Développement Mobile
            </h2>
            <p className="text-slate-400 mb-6">
              Spécialisation dans le développement Android natif avec Kotlin, en suivant les meilleures pratiques Material Design.
              Création d'applications performantes et intuitives pour les utilisateurs mobiles.
            </p>
            <div className="space-y-6">
              {skills.mobile.map((skill) => (
                <div 
                  key={skill.name}
                  onMouseEnter={() => setHoveredSkill(skill.name)}
                  onMouseLeave={() => setHoveredSkill(null)}
                  className="transition-all duration-300 hover:scale-[1.02]"
                >
                  <h3 className="text-white font-semibold mb-2">{skill.name}</h3>
                  <div className="h-2.5 bg-slate-700 rounded-full overflow-hidden mb-2">
                    <div
                      className={`h-full bg-gradient-to-r from-cyan-500 via-purple-600 to-cyan-500 rounded-full shadow-[0_0_10px_rgba(34,211,238,0.5)] transition-all duration-1000 ease-out ${
                        hoveredSkill === skill.name ? 'shadow-[0_0_20px_rgba(34,211,238,0.8)]' : ''
                      }`}
                      style={{ width: `${skill.level}%` }}
                    ></div>
                  </div>
                  <p className="text-slate-400 text-sm leading-relaxed">{skill.comment}</p>
                </div>
              ))}
            </div>
          </section>

          <section className="mb-16">
            <h2 className="text-2xl font-bold mb-4 text-cyan-400 drop-shadow-[0_0_15px_rgba(34,211,238,0.3)]">
              ⚙️ Backend & API
            </h2>
            <p className="text-slate-400 mb-6">
              Conception et développement d'APIs REST robustes et scalables, avec une expertise en architecture backend modulaire
              et en microservices. Focus sur la performance, la sécurité et la maintenabilité.
            </p>
            <div className="space-y-6">
              {skills.backend.map((skill) => (
                <div 
                  key={skill.name}
                  onMouseEnter={() => setHoveredSkill(skill.name)}
                  onMouseLeave={() => setHoveredSkill(null)}
                  className="transition-all duration-300 hover:scale-[1.02]"
                >
                  <h3 className="text-white font-semibold mb-2">{skill.name}</h3>
                  <div className="h-2.5 bg-slate-700 rounded-full overflow-hidden mb-2">
                    <div
                      className={`h-full bg-gradient-to-r from-cyan-500 via-purple-600 to-cyan-500 rounded-full shadow-[0_0_10px_rgba(34,211,238,0.5)] transition-all duration-1000 ease-out ${
                        hoveredSkill === skill.name ? 'shadow-[0_0_20px_rgba(34,211,238,0.8)]' : ''
                      }`}
                      style={{ width: `${skill.level}%` }}
                    ></div>
                  </div>
                  <p className="text-slate-400 text-sm leading-relaxed">{skill.comment}</p>
                </div>
              ))}
            </div>
          </section>

          <section className="mb-16">
            <h2 className="text-2xl font-bold mb-4 text-cyan-400 drop-shadow-[0_0_15px_rgba(34,211,238,0.3)]">
              🗄️ Bases de données
            </h2>
            <p className="text-slate-400 mb-6">
              Expertise dans la conception et l'optimisation de bases de données relationnelles, avec une maîtrise des ORM
              et des patterns de conception de schémas pour des applications scalables.
            </p>
            <div className="space-y-6">
              {skills.database.map((skill) => (
                <div 
                  key={skill.name}
                  onMouseEnter={() => setHoveredSkill(skill.name)}
                  onMouseLeave={() => setHoveredSkill(null)}
                  className="transition-all duration-300 hover:scale-[1.02]"
                >
                  <h3 className="text-white font-semibold mb-2">{skill.name}</h3>
                  <div className="h-2.5 bg-slate-700 rounded-full overflow-hidden mb-2">
                    <div
                      className={`h-full bg-gradient-to-r from-cyan-500 via-purple-600 to-cyan-500 rounded-full shadow-[0_0_10px_rgba(34,211,238,0.5)] transition-all duration-1000 ease-out ${
                        hoveredSkill === skill.name ? 'shadow-[0_0_20px_rgba(34,211,238,0.8)]' : ''
                      }`}
                      style={{ width: `${skill.level}%` }}
                    ></div>
                  </div>
                  <p className="text-slate-400 text-sm leading-relaxed">{skill.comment}</p>
                </div>
              ))}
            </div>
          </section>

          <section className="mb-16">
            <h2 className="text-2xl font-bold mb-4 text-cyan-400 drop-shadow-[0_0_15px_rgba(34,211,238,0.3)]">
              🐳 DevOps & Infrastructure
            </h2>
            <p className="text-slate-400 mb-6">
              Compétences en conteneurisation, déploiement et gestion d'infrastructure, avec une expertise en Docker
              et en automatisation des processus de déploiement pour des environnements de production fiables.
            </p>
            <div className="space-y-6">
              {skills.devops.map((skill) => (
                <div 
                  key={skill.name}
                  onMouseEnter={() => setHoveredSkill(skill.name)}
                  onMouseLeave={() => setHoveredSkill(null)}
                  className="transition-all duration-300 hover:scale-[1.02]"
                >
                  <h3 className="text-white font-semibold mb-2">{skill.name}</h3>
                  <div className="h-2.5 bg-slate-700 rounded-full overflow-hidden mb-2">
                    <div
                      className={`h-full bg-gradient-to-r from-cyan-500 via-purple-600 to-cyan-500 rounded-full shadow-[0_0_10px_rgba(34,211,238,0.5)] transition-all duration-1000 ease-out ${
                        hoveredSkill === skill.name ? 'shadow-[0_0_20px_rgba(34,211,238,0.8)]' : ''
                      }`}
                      style={{ width: `${skill.level}%` }}
                    ></div>
                  </div>
                  <p className="text-slate-400 text-sm leading-relaxed">{skill.comment}</p>
                </div>
              ))}
            </div>
          </section>

          <section className="mb-16">
            <h2 className="text-2xl font-bold mb-4 text-cyan-400 drop-shadow-[0_0_15px_rgba(34,211,238,0.3)]">
              🤖 Intelligence Artificielle
            </h2>
            <p className="text-slate-400 mb-6">
              Exploration et intégration de l'intelligence artificielle dans les projets, avec une expertise en modèles LLM locaux,
              en architecture d'assistants IA et en intégration de services d'IA dans des applications.
            </p>
            <div className="space-y-6">
              {skills.ai.map((skill) => (
                <div 
                  key={skill.name}
                  onMouseEnter={() => setHoveredSkill(skill.name)}
                  onMouseLeave={() => setHoveredSkill(null)}
                  className="transition-all duration-300 hover:scale-[1.02]"
                >
                  <h3 className="text-white font-semibold mb-2">{skill.name}</h3>
                  <div className="h-2.5 bg-slate-700 rounded-full overflow-hidden mb-2">
                    <div
                      className={`h-full bg-gradient-to-r from-cyan-500 via-purple-600 to-cyan-500 rounded-full shadow-[0_0_10px_rgba(34,211,238,0.5)] transition-all duration-1000 ease-out ${
                        hoveredSkill === skill.name ? 'shadow-[0_0_20px_rgba(34,211,238,0.8)]' : ''
                      }`}
                      style={{ width: `${skill.level}%` }}
                    ></div>
                  </div>
                  <p className="text-slate-400 text-sm leading-relaxed">{skill.comment}</p>
                </div>
              ))}
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4 text-cyan-400 drop-shadow-[0_0_15px_rgba(34,211,238,0.3)]">
              🏗️ Architecture Logicielle
            </h2>
            <p className="text-slate-400 mb-6">
              Expertise en architecture logicielle moderne, avec une maîtrise des patterns de conception, des architectures
              monorepo et microservices, et du system design pour des applications évolutives et maintenables.
            </p>
            <div className="space-y-6">
              {skills.architecture.map((skill) => (
                <div 
                  key={skill.name}
                  onMouseEnter={() => setHoveredSkill(skill.name)}
                  onMouseLeave={() => setHoveredSkill(null)}
                  className="transition-all duration-300 hover:scale-[1.02]"
                >
                  <h3 className="text-white font-semibold mb-2">{skill.name}</h3>
                  <div className="h-2.5 bg-slate-700 rounded-full overflow-hidden mb-2">
                    <div
                      className={`h-full bg-gradient-to-r from-cyan-500 via-purple-600 to-cyan-500 rounded-full shadow-[0_0_10px_rgba(34,211,238,0.5)] transition-all duration-1000 ease-out ${
                        hoveredSkill === skill.name ? 'shadow-[0_0_20px_rgba(34,211,238,0.8)]' : ''
                      }`}
                      style={{ width: `${skill.level}%` }}
                    ></div>
                  </div>
                  <p className="text-slate-400 text-sm leading-relaxed">{skill.comment}</p>
                </div>
              ))}
            </div>
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
}
