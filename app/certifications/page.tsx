import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const certifications = [
  {
    id: 1,
    icon: "🐍",
    title: "Python Programming",
    issuer: "Coursera / Google",
    category: "Programming",
    description: "Certification en programmation Python couvrant les fondamentaux, les structures de données et les algorithmes.",
    link: "https://www.coursera.org/",
  },
  {
    id: 2,
    icon: "🔧",
    title: "C Programming",
    issuer: "Coursera / Duke University",
    category: "Programming",
    description: "Certification en langage C avec focus sur la programmation système et la gestion de mémoire.",
    link: "https://www.coursera.org/",
  },
  {
    id: 3,
    icon: "💎",
    title: "C# Development",
    issuer: "Microsoft",
    category: "Programming",
    description: "Certification en développement C# et .NET pour applications desktop et web.",
    link: "https://learn.microsoft.com/",
  },
  {
    id: 4,
    icon: "📱",
    title: "Flutter Development",
    issuer: "Google",
    category: "Mobile",
    description: "Certification en développement d'applications mobiles cross-platform avec Flutter.",
    link: "https://flutter.dev/",
  },
  {
    id: 5,
    icon: "🌐",
    title: "Web Development",
    issuer: "freeCodeCamp",
    category: "Web",
    description: "Certification complète en développement web (HTML, CSS, JavaScript, React).",
    link: "https://www.freecodecamp.org/",
  },
  {
    id: 6,
    icon: "🔒",
    title: "Cybersécurité",
    issuer: "Cisco",
    category: "Security",
    description: "Certification en cybersécurité couvrant les principes de sécurité réseau et les bonnes pratiques.",
    link: "https://www.cisco.com/",
  },
];

export default function Certifications() {
  return (
    <div className="min-h-screen bg-slate-900 text-white">
      <Navbar />
      
      <main className="pt-24 pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-5xl font-bold text-center mb-4 text-white drop-shadow-[0_0_20px_rgba(34,211,238,0.3)]">
            Mes Certifications
          </h1>
          <p className="text-center text-slate-400 text-xl mb-12">
            Reconnaissances et formations professionnelles
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {certifications.map((cert) => (
              <div
                key={cert.id}
                className="bg-slate-800 p-8 rounded-xl border border-slate-700 hover:border-cyan-400 hover:shadow-[0_0_20px_rgba(34,211,238,0.3)] transition-all hover:-translate-y-0.5 text-center"
              >
                <div className="text-5xl mb-4">{cert.icon}</div>
                <h3 className="text-2xl font-bold mb-2 text-white">{cert.title}</h3>
                <p className="text-slate-400 mb-4">{cert.description}</p>
                <div className="flex flex-col gap-2">
                  <span className="text-cyan-400 font-semibold">{cert.issuer}</span>
                  <span className="bg-cyan-400/15 border border-cyan-400/30 px-3 py-1 rounded-full text-sm text-white inline-block">
                    {cert.category}
                  </span>
                  {cert.link && (
                    <a
                      href={cert.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-2 bg-gradient-to-r from-purple-600 to-cyan-500 text-white px-4 py-2 rounded-lg text-sm font-semibold shadow-[0_0_10px_rgba(124,58,237,0.3)] hover:shadow-[0_0_20px_rgba(124,58,237,0.5)] transition-all inline-block"
                    >
                      Voir la certification
                    </a>
                  )}
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
