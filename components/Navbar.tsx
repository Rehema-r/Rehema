'use client';

import Link from 'next/link';
import { useState } from 'react';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-slate-900/95 backdrop-blur-md border-b border-slate-700">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link href="/" className="text-2xl font-bold text-cyan-400 drop-shadow-[0_0_20px_rgba(34,211,238,0.5)]">
            REHEMA.
          </Link>
          
          <div className="hidden md:flex space-x-8">
            <Link href="/" className="text-white hover:text-cyan-400 hover:bg-cyan-400/10 px-3 py-2 rounded-md transition-all duration-300 hover:shadow-[0_0_15px_rgba(34,211,238,0.3)]">
              Accueil
            </Link>
            <Link href="/about" className="text-white hover:text-cyan-400 hover:bg-cyan-400/10 px-3 py-2 rounded-md transition-all duration-300 hover:shadow-[0_0_15px_rgba(34,211,238,0.3)]">
              À propos
            </Link>
            <Link href="/skills" className="text-white hover:text-cyan-400 hover:bg-cyan-400/10 px-3 py-2 rounded-md transition-all duration-300 hover:shadow-[0_0_15px_rgba(34,211,238,0.3)]">
              Compétences
            </Link>
            <Link href="/projects" className="text-white hover:text-cyan-400 hover:bg-cyan-400/10 px-3 py-2 rounded-md transition-all duration-300 hover:shadow-[0_0_15px_rgba(34,211,238,0.3)]">
              Projets
            </Link>
            <Link href="/certifications" className="text-white hover:text-cyan-400 hover:bg-cyan-400/10 px-3 py-2 rounded-md transition-all duration-300 hover:shadow-[0_0_15px_rgba(34,211,238,0.3)]">
              Certificats
            </Link>
            <Link href="/contact" className="text-white hover:text-cyan-400 hover:bg-cyan-400/10 px-3 py-2 rounded-md transition-all duration-300 hover:shadow-[0_0_15px_rgba(34,211,238,0.3)]">
              Contact
            </Link>
          </div>

          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden flex flex-col space-y-1.5 p-2"
            aria-label="Menu"
          >
            <span className={`w-6 h-0.5 bg-white transition-all duration-300 ${isOpen ? 'rotate-45 translate-y-2' : ''}`}></span>
            <span className={`w-6 h-0.5 bg-white transition-all duration-300 ${isOpen ? 'opacity-0' : ''}`}></span>
            <span className={`w-6 h-0.5 bg-white transition-all duration-300 ${isOpen ? '-rotate-45 -translate-y-2' : ''}`}></span>
          </button>
        </div>
      </div>

      {isOpen && (
        <div className="md:hidden bg-slate-900/98 backdrop-blur-md border-t border-slate-700">
          <div className="px-4 pt-2 pb-4 space-y-2">
            <Link href="/" className="block text-white hover:text-cyan-400 hover:bg-cyan-400/10 px-3 py-2 rounded-md transition-all duration-300">
              Accueil
            </Link>
            <Link href="/about" className="block text-white hover:text-cyan-400 hover:bg-cyan-400/10 px-3 py-2 rounded-md transition-all duration-300">
              À propos
            </Link>
            <Link href="/skills" className="block text-white hover:text-cyan-400 hover:bg-cyan-400/10 px-3 py-2 rounded-md transition-all duration-300">
              Compétences
            </Link>
            <Link href="/projects" className="block text-white hover:text-cyan-400 hover:bg-cyan-400/10 px-3 py-2 rounded-md transition-all duration-300">
              Projets
            </Link>
            <Link href="/certifications" className="block text-white hover:text-cyan-400 hover:bg-cyan-400/10 px-3 py-2 rounded-md transition-all duration-300">
              Certificats
            </Link>
            <Link href="/contact" className="block text-white hover:text-cyan-400 hover:bg-cyan-400/10 px-3 py-2 rounded-md transition-all duration-300">
              Contact
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}
