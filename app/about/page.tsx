import Image from "next/image";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function About() {
  return (
    <div className="min-h-screen bg-slate-900 text-white">
      <Navbar />
      
      <main className="pt-24 pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-5xl font-bold text-center mb-4 text-white drop-shadow-[0_0_20px_rgba(34,211,238,0.3)]">
            À propos de moi
          </h1>
          <p className="text-center text-slate-400 text-xl mb-12">
            Digital Architect · Full-Stack Developer · AI Systems Builder
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center mb-16">
            <div className="order-2 md:order-1">
              <h2 className="text-3xl font-bold mb-4 text-cyan-400 drop-shadow-[0_0_10px_rgba(34,211,238,0.5)]">
                REHEMA KASONGO
              </h2>
              <p className="text-slate-400 mb-4 text-lg">
                Étudiant en BAC2 Informatique à l'UNIKOL (Université de Kolwezi), passionné par le développement logiciel et l'innovation technologique.
              </p>
              <p className="text-slate-400 mb-4">
                Je me spécialise dans le développement Full-Stack, l'architecture logicielle moderne et l'intégration de l'intelligence artificielle dans les applications. Mon objectif est de créer des solutions numériques innovantes qui répondent aux besoins réels des utilisateurs et des entreprises.
              </p>
              <div className="mt-8 space-y-4">
                <div className="flex justify-between py-3 border-b border-slate-700">
                  <span className="font-semibold text-white">Nom</span>
                  <span className="text-slate-400">REHEMA KASONGO</span>
                </div>
                <div className="flex justify-between py-3 border-b border-slate-700">
                  <span className="font-semibold text-white">Études</span>
                  <span className="text-slate-400">BAC2 Informatique - UNIKOL</span>
                </div>
                <div className="flex justify-between py-3 border-b border-slate-700">
                  <span className="font-semibold text-white">Spécialisation</span>
                  <span className="text-slate-400">Full-Stack Development</span>
                </div>
                <div className="flex justify-between py-3 border-b border-slate-700">
                  <span className="font-semibold text-white">Localisation</span>
                  <span className="text-slate-400">Kolwezi, RD Congo</span>
                </div>
              </div>
            </div>
            <div className="order-1 md:order-2 flex justify-center">
              <Image
                src="/images/rehema-profil.jpeg"
                alt="REHEMA KASONGO"
                width={400}
                height={400}
                className="rounded-xl border-4 border-cyan-400 shadow-[0_0_30px_rgba(34,211,238,0.5)]"
              />
            </div>
          </div>

          <section className="mb-16">
            <h2 className="text-3xl font-bold mb-8 text-center text-cyan-400 drop-shadow-[0_0_10px_rgba(34,211,238,0.5)]">
              Ma Vision
            </h2>
            <div className="max-w-4xl mx-auto text-center">
              <p className="text-slate-400 text-lg leading-relaxed mb-8">
                Je crois que la technologie doit être un levier de transformation positive pour les communautés locales. Mon objectif est de créer des solutions numériques accessibles, performantes et adaptées aux réalités africaines, tout en maintenant les standards internationaux de qualité.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
                <div className="bg-slate-800 p-8 rounded-xl border border-slate-700 hover:border-cyan-400 hover:shadow-[0_0_20px_rgba(34,211,238,0.3)] transition-all hover:-translate-y-0.5">
                  <div className="text-4xl mb-4">🎯</div>
                  <h3 className="text-xl font-bold mb-2 text-cyan-400 drop-shadow-[0_0_10px_rgba(34,211,238,0.5)]">Innovation</h3>
                  <p className="text-slate-400 text-sm">Explorer de nouvelles technologies et créer des solutions innovantes</p>
                </div>
                <div className="bg-slate-800 p-8 rounded-xl border border-slate-700 hover:border-cyan-400 hover:shadow-[0_0_20px_rgba(34,211,238,0.3)] transition-all hover:-translate-y-0.5">
                  <div className="text-4xl mb-4">🌍</div>
                  <h3 className="text-xl font-bold mb-2 text-cyan-400 drop-shadow-[0_0_10px_rgba(34,211,238,0.5)]">Impact Local</h3>
                  <p className="text-slate-400 text-sm">Créer des solutions adaptées aux besoins de ma communauté</p>
                </div>
                <div className="bg-slate-800 p-8 rounded-xl border border-slate-700 hover:border-cyan-400 hover:shadow-[0_0_20px_rgba(34,211,238,0.3)] transition-all hover:-translate-y-0.5">
                  <div className="text-4xl mb-4">📚</div>
                  <h3 className="text-xl font-bold mb-2 text-cyan-400 drop-shadow-[0_0_10px_rgba(34,211,238,0.5)]">Apprentissage</h3>
                  <p className="text-slate-400 text-sm">Continuer à apprendre et me perfectionner constamment</p>
                </div>
              </div>
            </div>
          </section>

          <section className="mb-16">
            <h2 className="text-3xl font-bold mb-8 text-center text-cyan-400 drop-shadow-[0_0_10px_rgba(34,211,238,0.5)]">
              Micro-Entreprise RM
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
              <div className="flex justify-center">
                <Image
                  src="/images/rm_logo.png"
                  alt="RM Logo"
                  width={300}
                  height={300}
                  className="rounded-xl border-4 border-cyan-400 shadow-[0_0_30px_rgba(34,211,238,0.5)]"
                />
              </div>
              <div>
                <p className="text-slate-400 mb-4 text-lg">
                  Je suis co-fondateur de RM, une micro-entreprise technologique offrant des services de développement et de consulting.
                </p>
                <p className="text-slate-400 mb-4">
                  <strong>Services :</strong> Développement web et mobile, Consulting technique, Formation, Solutions sur mesure.
                </p>
                <p className="text-slate-400">
                  <strong>Philosophie :</strong> Innovation locale, Qualité professionnelle, Accessibilité pour les PME et startups.
                </p>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-3xl font-bold mb-8 text-center text-cyan-400 drop-shadow-[0_0_10px_rgba(34,211,238,0.5)]">
              Co-Fondateur
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
              <div>
                <p className="text-slate-400 mb-4 text-lg">
                  Ensemble avec mon co-fondateur, nous construisons des solutions technologiques pour répondre aux besoins locaux.
                </p>
                <p className="text-slate-400">
                  Notre collaboration combine nos compétences complémentaires pour offrir des services de qualité supérieure à nos clients.
                </p>
              </div>
              <div className="flex justify-center">
                <Image
                  src="/images/medard-co-fondateur.jpeg"
                  alt="Co-Fondateur"
                  width={300}
                  height={300}
                  className="rounded-xl border-4 border-cyan-400 shadow-[0_0_30px_rgba(34,211,238,0.5)]"
                />
              </div>
            </div>
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
}
