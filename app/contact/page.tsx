import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function Contact() {
  return (
    <div className="min-h-screen bg-slate-900 text-white">
      <Navbar />
      
      <main className="pt-24 pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-5xl font-bold text-center mb-4 text-white drop-shadow-[0_0_20px_rgba(34,211,238,0.3)]">
            Contact
          </h1>
          <p className="text-center text-slate-400 text-xl mb-12">
            N'hésitez pas à me contacter pour vos projets
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div>
              <h2 className="text-2xl font-bold mb-6 text-cyan-400 drop-shadow-[0_0_10px_rgba(34,211,238,0.5)]">
                Coordonnées
              </h2>
              
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="text-3xl">📧</div>
                  <div>
                    <h3 className="text-xl font-semibold mb-1 text-white">Email</h3>
                    <p className="text-slate-400">paparehemasaongo@gmail.com</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <div className="text-3xl">📱</div>
                  <div>
                    <h3 className="text-xl font-semibold mb-1 text-white">Téléphone</h3>
                    <p className="text-slate-400">+243 992 623 141</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <div className="text-3xl">🌐</div>
                  <div>
                    <h3 className="text-xl font-semibold mb-1 text-white">GitHub</h3>
                    <a
                      href="https://github.com/Rehema-r"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-cyan-400 drop-shadow-[0_0_10px_rgba(34,211,238,0.5)] hover:drop-shadow-[0_0_20px_rgba(34,211,238,0.8)] transition-all"
                    >
                      github.com/Rehema-r
                    </a>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <div className="text-3xl">📍</div>
                  <div>
                    <h3 className="text-xl font-semibold mb-1 text-white">Localisation</h3>
                    <p className="text-slate-400">Kolwezi, RD Congo</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div>
              <h2 className="text-2xl font-bold mb-6 text-cyan-400 drop-shadow-[0_0_10px_rgba(34,211,238,0.5)]">
                Envoyer un message
              </h2>
              
              <form className="space-y-6">
                <div>
                  <label htmlFor="name" className="block mb-2 font-semibold text-white">
                    Nom
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    className="w-full px-4 py-3 rounded-lg border border-slate-700 bg-slate-800 text-white focus:outline-none focus:border-cyan-400 focus:shadow-[0_0_10px_rgba(34,211,238,0.3)] transition-all"
                    placeholder="Votre nom"
                  />
                </div>
                
                <div>
                  <label htmlFor="email" className="block mb-2 font-semibold text-white">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    className="w-full px-4 py-3 rounded-lg border border-slate-700 bg-slate-800 text-white focus:outline-none focus:border-cyan-400 focus:shadow-[0_0_10px_rgba(34,211,238,0.3)] transition-all"
                    placeholder="votre@email.com"
                  />
                </div>
                
                <div>
                  <label htmlFor="subject" className="block mb-2 font-semibold text-white">
                    Sujet
                  </label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    className="w-full px-4 py-3 rounded-lg border border-slate-700 bg-slate-800 text-white focus:outline-none focus:border-cyan-400 focus:shadow-[0_0_10px_rgba(34,211,238,0.3)] transition-all"
                    placeholder="Sujet de votre message"
                  />
                </div>
                
                <div>
                  <label htmlFor="message" className="block mb-2 font-semibold text-white">
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={6}
                    className="w-full px-4 py-3 rounded-lg border border-slate-700 bg-slate-800 text-white focus:outline-none focus:border-cyan-400 focus:shadow-[0_0_10px_rgba(34,211,238,0.3)] transition-all resize-none"
                    placeholder="Votre message..."
                  />
                </div>
                
                <button
                  type="submit"
                  className="w-full bg-gradient-to-r from-purple-600 to-cyan-500 text-white px-8 py-3 rounded-lg font-semibold shadow-[0_0_20px_rgba(124,58,237,0.4)] hover:shadow-[0_0_30px_rgba(124,58,237,0.6)] hover:-translate-y-0.5 transition-all"
                >
                  Envoyer le message
                </button>
              </form>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
