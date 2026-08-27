'use client';

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useState } from 'react';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [errors, setErrors] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [submitted, setSubmitted] = useState(false);

  const validateForm = () => {
    let newErrors = {
      name: '',
      email: '',
      subject: '',
      message: ''
    };
    let isValid = true;

    if (!formData.name.trim()) {
      newErrors.name = 'Le nom est requis';
      isValid = false;
    }

    if (!formData.email.trim()) {
      newErrors.email = 'L\'email est requis';
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'L\'email n\'est pas valide';
      isValid = false;
    }

    if (!formData.subject.trim()) {
      newErrors.subject = 'Le sujet est requis';
      isValid = false;
    }

    if (!formData.message.trim()) {
      newErrors.message = 'Le message est requis';
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      setSubmitted(true);
      // Here you would typically send the form data to your backend
      console.log('Form submitted:', formData);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    // Clear error when user starts typing
    setErrors({
      ...errors,
      [e.target.name]: ''
    });
  };
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
              
              <form className="space-y-6" onSubmit={handleSubmit}>
                {submitted && (
                  <div className="bg-green-500/20 border border-green-500 text-green-400 px-4 py-3 rounded-lg">
                    Message envoyé avec succès ! Je vous répondrai bientôt.
                  </div>
                )}
                <div>
                  <label htmlFor="name" className="block mb-2 font-semibold text-white">
                    Nom
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className={`w-full px-4 py-3 rounded-lg border bg-slate-800 text-white focus:outline-none focus:border-cyan-400 focus:shadow-[0_0_10px_rgba(34,211,238,0.3)] transition-all ${
                      errors.name ? 'border-red-500' : 'border-slate-700'
                    }`}
                    placeholder="Votre nom"
                  />
                  {errors.name && <p className="text-red-400 text-sm mt-1">{errors.name}</p>}
                </div>
                
                <div>
                  <label htmlFor="email" className="block mb-2 font-semibold text-white">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className={`w-full px-4 py-3 rounded-lg border bg-slate-800 text-white focus:outline-none focus:border-cyan-400 focus:shadow-[0_0_10px_rgba(34,211,238,0.3)] transition-all ${
                      errors.email ? 'border-red-500' : 'border-slate-700'
                    }`}
                    placeholder="votre@email.com"
                  />
                  {errors.email && <p className="text-red-400 text-sm mt-1">{errors.email}</p>}
                </div>
                
                <div>
                  <label htmlFor="subject" className="block mb-2 font-semibold text-white">
                    Sujet
                  </label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    className={`w-full px-4 py-3 rounded-lg border bg-slate-800 text-white focus:outline-none focus:border-cyan-400 focus:shadow-[0_0_10px_rgba(34,211,238,0.3)] transition-all ${
                      errors.subject ? 'border-red-500' : 'border-slate-700'
                    }`}
                    placeholder="Sujet de votre message"
                  />
                  {errors.subject && <p className="text-red-400 text-sm mt-1">{errors.subject}</p>}
                </div>
                
                <div>
                  <label htmlFor="message" className="block mb-2 font-semibold text-white">
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows={6}
                    className={`w-full px-4 py-3 rounded-lg border bg-slate-800 text-white focus:outline-none focus:border-cyan-400 focus:shadow-[0_0_10px_rgba(34,211,238,0.3)] transition-all resize-none ${
                      errors.message ? 'border-red-500' : 'border-slate-700'
                    }`}
                    placeholder="Votre message..."
                  />
                  {errors.message && <p className="text-red-400 text-sm mt-1">{errors.message}</p>}
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
