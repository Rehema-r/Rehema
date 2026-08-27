import Image from "next/image";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <div className="min-h-screen bg-slate-900 text-white">
      <Navbar />
      
      <main className="relative min-h-[90vh] flex items-center justify-center overflow-hidden bg-gradient-to-br from-cyan-500 via-purple-600 to-cyan-500">
        <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/30 via-transparent to-purple-600/30 animate-pulse"></div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 flex flex-col items-center gap-8">
          <div className="flex flex-col items-center gap-4">
            <div className="relative">
              <Image
                src="/images/rehema-profil.jpeg"
                alt="REHEMA"
                width={200}
                height={200}
                className="rounded-full border-4 border-cyan-400 shadow-[0_0_30px_rgba(34,211,238,0.5)] animate-float"
                priority
              />
            </div>
            <div className="text-center">
              <h1 className="text-5xl md:text-7xl font-extrabold mb-2 drop-shadow-[0_0_30px_rgba(34,211,238,0.5)]">
                REHEMA<br />
                <span className="text-cyan-400 drop-shadow-[0_0_20px_rgba(34,211,238,0.8)]">KASONGO</span>
              </h1>
              <p className="text-xl md:text-2xl font-medium opacity-90">
                Digital Architect · Full-Stack Developer · AI Systems Builder
              </p>
            </div>
          </div>
          
          <div className="max-w-3xl text-center text-lg opacity-85 leading-relaxed">
            <p>
              Développeur Full-Stack & Créateur de Solutions Numériques. 
              Je conçois des applications web et mobiles, des plateformes éducatives, 
              des systèmes backend, des API et des solutions basées sur l'intelligence artificielle. 
              Passionné par l'innovation, l'architecture logicielle et les technologies émergentes, 
              je transforme des idées ambitieuses en projets numériques concrets.
            </p>
          </div>
          
          <div className="flex flex-wrap gap-3 justify-center">
            <span className="bg-cyan-400/20 backdrop-blur-sm border border-cyan-400/30 px-4 py-2 rounded-full text-sm shadow-[0_0_10px_rgba(34,211,238,0.2)]">React</span>
            <span className="bg-cyan-400/20 backdrop-blur-sm border border-cyan-400/30 px-4 py-2 rounded-full text-sm shadow-[0_0_10px_rgba(34,211,238,0.2)]">Node.js</span>
            <span className="bg-cyan-400/20 backdrop-blur-sm border border-cyan-400/30 px-4 py-2 rounded-full text-sm shadow-[0_0_10px_rgba(34,211,238,0.2)]">Python</span>
            <span className="bg-cyan-400/20 backdrop-blur-sm border border-cyan-400/30 px-4 py-2 rounded-full text-sm shadow-[0_0_10px_rgba(34,211,238,0.2)]">Docker</span>
            <span className="bg-cyan-400/20 backdrop-blur-sm border border-cyan-400/30 px-4 py-2 rounded-full text-sm shadow-[0_0_10px_rgba(34,211,238,0.2)]">AI/ML</span>
            <span className="bg-cyan-400/20 backdrop-blur-sm border border-cyan-400/30 px-4 py-2 rounded-full text-sm shadow-[0_0_10px_rgba(34,211,238,0.2)]">Kotlin</span>
          </div>
          
          <div className="flex gap-4 flex-wrap justify-center">
            <Link
              href="/projects"
              className="bg-gradient-to-r from-purple-600 to-cyan-500 text-white px-8 py-3 rounded-lg font-semibold shadow-[0_0_20px_rgba(124,58,237,0.4)] hover:shadow-[0_0_30px_rgba(124,58,237,0.6)] hover:-translate-y-0.5 transition-all"
            >
              Voir mes projets
            </Link>
            <Link
              href="/contact"
              className="bg-transparent border-2 border-cyan-400 text-white px-8 py-3 rounded-lg font-semibold shadow-[0_0_10px_rgba(34,211,238,0.3)] hover:bg-cyan-400/20 hover:shadow-[0_0_20px_rgba(34,211,238,0.5)] transition-all"
            >
              Me contacter
            </Link>
          </div>
        </div>
      </main>

      <section className="py-20 bg-slate-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-center mb-4 text-white drop-shadow-[0_0_20px_rgba(34,211,238,0.3)]">
            Projets Phares
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
            <div className="bg-slate-800 p-8 rounded-xl border border-slate-700 hover:border-cyan-400 hover:shadow-[0_0_20px_rgba(34,211,238,0.3)] transition-all hover:-translate-y-0.5">
              <div className="text-5xl mb-4">🤖</div>
              <h3 className="text-2xl font-bold mb-2 text-white">REHEMA OS</h3>
              <p className="text-slate-400 mb-4">Système d'assistant personnel intelligent avec IA locale, microservices et orchestration.</p>
              <span className="bg-gradient-to-r from-purple-600 to-cyan-500 text-white px-3 py-1 rounded-full text-sm shadow-[0_0_10px_rgba(124,58,237,0.3)]">IA · Microservices</span>
            </div>
            <div className="bg-slate-800 p-8 rounded-xl border border-slate-700 hover:border-cyan-400 hover:shadow-[0_0_20px_rgba(34,211,238,0.3)] transition-all hover:-translate-y-0.5">
              <div className="text-5xl mb-4">🎓</div>
              <h3 className="text-2xl font-bold mb-2 text-white">Codel Academy</h3>
              <p className="text-slate-400 mb-4">Plateforme éducative moderne avec architecture monorepo, NestJS et PostgreSQL.</p>
              <span className="bg-gradient-to-r from-purple-600 to-cyan-500 text-white px-3 py-1 rounded-full text-sm shadow-[0_0_10px_rgba(124,58,237,0.3)]">Éducation · Full-Stack</span>
            </div>
            <div className="bg-slate-800 p-8 rounded-xl border border-slate-700 hover:border-cyan-400 hover:shadow-[0_0_20px_rgba(34,211,238,0.3)] transition-all hover:-translate-y-0.5">
              <div className="text-5xl mb-4">🎵</div>
              <h3 className="text-2xl font-bold mb-2 text-white">REHEMA BEATS</h3>
              <p className="text-slate-400 mb-4">Plateforme musicale orientée artistes avec streaming et gestion de contenus.</p>
              <span className="bg-gradient-to-r from-purple-600 to-cyan-500 text-white px-3 py-1 rounded-full text-sm shadow-[0_0_10px_rgba(124,58,237,0.3)]">Mobile · Streaming</span>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-slate-800/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-center mb-4 text-white drop-shadow-[0_0_20px_rgba(34,211,238,0.3)]">
            Domaines d'Expertise
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
            <div className="bg-slate-800 p-8 rounded-xl border border-slate-700 hover:border-cyan-400 hover:shadow-[0_0_20px_rgba(34,211,238,0.3)] transition-all hover:-translate-y-0.5">
              <div className="text-4xl mb-4">💻</div>
              <h3 className="text-xl font-bold mb-2 text-cyan-400 drop-shadow-[0_0_10px_rgba(34,211,238,0.5)]">Développement Web</h3>
              <p className="text-slate-400 text-sm">React, TypeScript, Node.js, NestJS, Architecture d'applications modernes</p>
            </div>
            <div className="bg-slate-800 p-8 rounded-xl border border-slate-700 hover:border-cyan-400 hover:shadow-[0_0_20px_rgba(34,211,238,0.3)] transition-all hover:-translate-y-0.5">
              <div className="text-4xl mb-4">📱</div>
              <h3 className="text-xl font-bold mb-2 text-cyan-400 drop-shadow-[0_0_10px_rgba(34,211,238,0.5)]">Développement Mobile</h3>
              <p className="text-slate-400 text-sm">Android natif, Kotlin, Material Design 3, Applications éducatives</p>
            </div>
            <div className="bg-slate-800 p-8 rounded-xl border border-slate-700 hover:border-cyan-400 hover:shadow-[0_0_20px_rgba(34,211,238,0.3)] transition-all hover:-translate-y-0.5">
              <div className="text-4xl mb-4">⚙️</div>
              <h3 className="text-xl font-bold mb-2 text-cyan-400 drop-shadow-[0_0_10px_rgba(34,211,238,0.5)]">Backend & API</h3>
              <p className="text-slate-400 text-sm">REST API, Microservices, Architecture modulaire, NestJS, Python</p>
            </div>
            <div className="bg-slate-800 p-8 rounded-xl border border-slate-700 hover:border-cyan-400 hover:shadow-[0_0_20px_rgba(34,211,238,0.3)] transition-all hover:-translate-y-0.5">
              <div className="text-4xl mb-4">🤖</div>
              <h3 className="text-xl font-bold mb-2 text-cyan-400 drop-shadow-[0_0_10px_rgba(34,211,238,0.5)]">Intelligence Artificielle</h3>
              <p className="text-slate-400 text-sm">Ollama, LLM, Gemini, Architecture d'assistants IA, Intégration IA</p>
            </div>
            <div className="bg-slate-800 p-8 rounded-xl border border-slate-700 hover:border-cyan-400 hover:shadow-[0_0_20px_rgba(34,211,238,0.3)] transition-all hover:-translate-y-0.5">
              <div className="text-4xl mb-4">🐳</div>
              <h3 className="text-xl font-bold mb-2 text-cyan-400 drop-shadow-[0_0_10px_rgba(34,211,238,0.5)]">DevOps & Infrastructure</h3>
              <p className="text-slate-400 text-sm">Docker, Docker Compose, Linux, Déploiement, Architecture serveurs</p>
            </div>
            <div className="bg-slate-800 p-8 rounded-xl border border-slate-700 hover:border-cyan-400 hover:shadow-[0_0_20px_rgba(34,211,238,0.3)] transition-all hover:-translate-y-0.5">
              <div className="text-4xl mb-4">🗄️</div>
              <h3 className="text-xl font-bold mb-2 text-cyan-400 drop-shadow-[0_0_10px_rgba(34,211,238,0.5)]">Bases de données</h3>
              <p className="text-slate-400 text-sm">PostgreSQL, MySQL, Prisma ORM, Conception de schémas</p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-slate-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-center mb-4 text-white drop-shadow-[0_0_20px_rgba(34,211,238,0.3)]">
            Stack Technique
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
            <div className="bg-slate-800 p-6 rounded-xl border border-slate-700">
              <h3 className="text-xl font-bold mb-4 text-cyan-400 drop-shadow-[0_0_10px_rgba(34,211,238,0.5)]">Frontend</h3>
              <div className="flex flex-wrap gap-2">
                <span className="bg-cyan-400/10 border border-cyan-400/30 px-3 py-1 rounded-full text-sm text-white">HTML</span>
                <span className="bg-cyan-400/10 border border-cyan-400/30 px-3 py-1 rounded-full text-sm text-white">CSS</span>
                <span className="bg-cyan-400/10 border border-cyan-400/30 px-3 py-1 rounded-full text-sm text-white">JavaScript</span>
                <span className="bg-cyan-400/10 border border-cyan-400/30 px-3 py-1 rounded-full text-sm text-white">TypeScript</span>
                <span className="bg-cyan-400/10 border border-cyan-400/30 px-3 py-1 rounded-full text-sm text-white">React</span>
                <span className="bg-cyan-400/10 border border-cyan-400/30 px-3 py-1 rounded-full text-sm text-white">Vite</span>
              </div>
            </div>
            <div className="bg-slate-800 p-6 rounded-xl border border-slate-700">
              <h3 className="text-xl font-bold mb-4 text-cyan-400 drop-shadow-[0_0_10px_rgba(34,211,238,0.5)]">Mobile</h3>
              <div className="flex flex-wrap gap-2">
                <span className="bg-cyan-400/10 border border-cyan-400/30 px-3 py-1 rounded-full text-sm text-white">Android</span>
                <span className="bg-cyan-400/10 border border-cyan-400/30 px-3 py-1 rounded-full text-sm text-white">Kotlin</span>
                <span className="bg-cyan-400/10 border border-cyan-400/30 px-3 py-1 rounded-full text-sm text-white">Material Design 3</span>
              </div>
            </div>
            <div className="bg-slate-800 p-6 rounded-xl border border-slate-700">
              <h3 className="text-xl font-bold mb-4 text-cyan-400 drop-shadow-[0_0_10px_rgba(34,211,238,0.5)]">Backend</h3>
              <div className="flex flex-wrap gap-2">
                <span className="bg-cyan-400/10 border border-cyan-400/30 px-3 py-1 rounded-full text-sm text-white">Node.js</span>
                <span className="bg-cyan-400/10 border border-cyan-400/30 px-3 py-1 rounded-full text-sm text-white">NestJS</span>
                <span className="bg-cyan-400/10 border border-cyan-400/30 px-3 py-1 rounded-full text-sm text-white">Python</span>
                <span className="bg-cyan-400/10 border border-cyan-400/30 px-3 py-1 rounded-full text-sm text-white">REST API</span>
              </div>
            </div>
            <div className="bg-slate-800 p-6 rounded-xl border border-slate-700">
              <h3 className="text-xl font-bold mb-4 text-cyan-400 drop-shadow-[0_0_10px_rgba(34,211,238,0.5)]">Database</h3>
              <div className="flex flex-wrap gap-2">
                <span className="bg-cyan-400/10 border border-cyan-400/30 px-3 py-1 rounded-full text-sm text-white">PostgreSQL</span>
                <span className="bg-cyan-400/10 border border-cyan-400/30 px-3 py-1 rounded-full text-sm text-white">MySQL</span>
                <span className="bg-cyan-400/10 border border-cyan-400/30 px-3 py-1 rounded-full text-sm text-white">Prisma</span>
              </div>
            </div>
            <div className="bg-slate-800 p-6 rounded-xl border border-slate-700">
              <h3 className="text-xl font-bold mb-4 text-cyan-400 drop-shadow-[0_0_10px_rgba(34,211,238,0.5)]">DevOps</h3>
              <div className="flex flex-wrap gap-2">
                <span className="bg-cyan-400/10 border border-cyan-400/30 px-3 py-1 rounded-full text-sm text-white">Docker</span>
                <span className="bg-cyan-400/10 border border-cyan-400/30 px-3 py-1 rounded-full text-sm text-white">Docker Compose</span>
                <span className="bg-cyan-400/10 border border-cyan-400/30 px-3 py-1 rounded-full text-sm text-white">GitHub</span>
                <span className="bg-cyan-400/10 border border-cyan-400/30 px-3 py-1 rounded-full text-sm text-white">Vercel</span>
                <span className="bg-cyan-400/10 border border-cyan-400/30 px-3 py-1 rounded-full text-sm text-white">Linux</span>
              </div>
            </div>
            <div className="bg-slate-800 p-6 rounded-xl border border-slate-700">
              <h3 className="text-xl font-bold mb-4 text-cyan-400 drop-shadow-[0_0_10px_rgba(34,211,238,0.5)]">AI</h3>
              <div className="flex flex-wrap gap-2">
                <span className="bg-cyan-400/10 border border-cyan-400/30 px-3 py-1 rounded-full text-sm text-white">Ollama</span>
                <span className="bg-cyan-400/10 border border-cyan-400/30 px-3 py-1 rounded-full text-sm text-white">LLM</span>
                <span className="bg-cyan-400/10 border border-cyan-400/30 px-3 py-1 rounded-full text-sm text-white">Gemini</span>
                <span className="bg-cyan-400/10 border border-cyan-400/30 px-3 py-1 rounded-full text-sm text-white">Google AI Studio</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
