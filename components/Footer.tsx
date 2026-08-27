import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-slate-900/95 backdrop-blur-md border-t border-slate-700 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          <div>
            <h3 className="text-xl font-bold mb-4 text-cyan-400 drop-shadow-[0_0_10px_rgba(34,211,238,0.5)]">
              REHEMA
            </h3>
            <p className="text-slate-400">
              Digital Architect · Full-Stack Developer · AI Systems Builder
            </p>
          </div>
          <div>
            <h3 className="text-xl font-bold mb-4 text-cyan-400 drop-shadow-[0_0_10px_rgba(34,211,238,0.5)]">
              Navigation
            </h3>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="text-slate-400 hover:text-cyan-400 hover:drop-shadow-[0_0_10px_rgba(34,211,238,0.5)] transition-all">
                  Accueil
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-slate-400 hover:text-cyan-400 hover:drop-shadow-[0_0_10px_rgba(34,211,238,0.5)] transition-all">
                  À propos
                </Link>
              </li>
              <li>
                <Link href="/skills" className="text-slate-400 hover:text-cyan-400 hover:drop-shadow-[0_0_10px_rgba(34,211,238,0.5)] transition-all">
                  Compétences
                </Link>
              </li>
              <li>
                <Link href="/projects" className="text-slate-400 hover:text-cyan-400 hover:drop-shadow-[0_0_10px_rgba(34,211,238,0.5)] transition-all">
                  Projets
                </Link>
              </li>
              <li>
                <Link href="/certifications" className="text-slate-400 hover:text-cyan-400 hover:drop-shadow-[0_0_10px_rgba(34,211,238,0.5)] transition-all">
                  Certificats
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-slate-400 hover:text-cyan-400 hover:drop-shadow-[0_0_10px_rgba(34,211,238,0.5)] transition-all">
                  Contact
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-xl font-bold mb-4 text-cyan-400 drop-shadow-[0_0_10px_rgba(34,211,238,0.5)]">
              Contact
            </h3>
            <p className="text-slate-400 mb-2">paparehemasaongo@gmail.com</p>
            <p className="text-slate-400 mb-4">+243 992 623 141</p>
            <a
              href="https://github.com/Rehema-r"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block text-cyan-400 drop-shadow-[0_0_10px_rgba(34,211,238,0.5)] hover:drop-shadow-[0_0_20px_rgba(34,211,238,0.8)] transition-all"
            >
              github.com/Rehema-r
            </a>
          </div>
        </div>
        <div className="border-t border-slate-700 pt-8 text-center text-slate-400">
          <p>&copy; 2024 REHEMA KASONGO. Tous droits réservés.</p>
        </div>
      </div>
    </footer>
  );
}
