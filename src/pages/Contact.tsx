import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Mail, Phone, MapPin, Instagram, Twitter, Facebook, ArrowUpRight } from 'lucide-react';

export default function Contact() {
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus('loading');
    
    const formData = new FormData(e.currentTarget);
    const data = {
      name: formData.get('name'),
      email: formData.get('email'),
      category: formData.get('category'),
      vision: formData.get('vision'),
    };

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        setStatus('success');
      } else {
        setStatus('error');
      }
    } catch (error) {
      console.error('Submission error:', error);
      setStatus('error');
    }
  };

  return (
    <div className="pt-32 pb-20 px-6">
      <div className="container mx-auto">
        <div className="grid lg:grid-cols-2 gap-20 items-start">
          {/* Left Column: Info */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1 }}
          >
            <span className="font-accent text-gold text-xs tracking-[0.4em] mb-6 block uppercase">GET IN TOUCH</span>
            <h1 className="text-5xl md:text-8xl mb-12">Let's Create <br /> <span className="italic">Something Bold</span></h1>
            
            <p className="text-xl text-beige/60 font-light leading-relaxed mb-16 max-w-lg">
              Whether you're inquiring about a commercial commission or an intimate portrait session, 
              excellence begins with a conversation.
            </p>

            <div className="space-y-10 mb-20">
               <div className="flex gap-6 group cursor-pointer">
                  <div className="w-14 h-14 border border-white/10 flex items-center justify-center group-hover:border-gold transition-colors">
                     <Mail className="w-5 h-5 text-white/40 group-hover:text-gold" />
                  </div>
                  <div>
                     <span className="block font-accent text-[9px] text-white/30 tracking-widest mb-1 uppercase">EMAIL US</span>
                     <span className="text-xl md:text-2xl font-display">sendrarandrianasolo@gmail.com</span>
                  </div>
               </div>
               
               <div className="flex gap-6 group cursor-pointer">
                  <div className="w-14 h-14 border border-white/10 flex items-center justify-center group-hover:border-gold transition-colors">
                     <Phone className="w-5 h-5 text-white/40 group-hover:text-gold" />
                  </div>
                  <div>
                     <span className="block font-accent text-[9px] text-white/30 tracking-widest mb-1 uppercase">WHATSAPP</span>
                     <span className="text-xl md:text-2xl font-display">+261 34 31 166 54</span>
                  </div>
               </div>
               
               <div className="flex gap-6 group cursor-pointer">
                  <div className="w-14 h-14 border border-white/10 flex items-center justify-center group-hover:border-gold transition-colors">
                     <MapPin className="w-5 h-5 text-white/40 group-hover:text-gold" />
                  </div>
                  <div>
                     <span className="block font-accent text-[9px] text-white/30 tracking-widest mb-1 uppercase">THE STUDIO</span>
                     <span className="text-xl md:text-2xl font-display">Lot A 146 bis Manarintsoa Anatihazo, Antananarivo</span>
                  </div>
               </div>
            </div>

            <div className="flex gap-8">
               <Instagram className="w-6 h-6 hover:text-gold cursor-pointer transition-colors" />
               <a href="https://wa.me/261343116654" target="_blank" rel="noopener noreferrer">
                 <span className="font-accent text-sm tracking-widest hover:text-gold cursor-pointer transition-colors pt-1">WA</span>
               </a>
               <a href="https://www.facebook.com/KoontetRandriPhotographyOfficialPage/" target="_blank" rel="noopener noreferrer">
                 <Facebook className="w-6 h-6 hover:text-gold cursor-pointer transition-colors" />
               </a>
            </div>
          </motion.div>

          {/* Right Column: Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="bg-dark-accent p-10 md:p-16 border border-white/5 relative"
          >
            <div className="absolute inset-0 bg-noise opacity-5 pointer-events-none" />
            {status === 'success' ? (
              <div className="relative z-10 text-center py-20">
                <h3 className="text-3xl mb-4 font-display text-white">Inquiry Sent</h3>
                <p className="text-white/60 mb-8 font-light">Thank you. I have received your message and will respond within 24 hours.</p>
                <button 
                  onClick={() => setStatus('idle')}
                  className="text-gold border border-gold/30 px-8 py-3 text-xs tracking-widest hover:bg-gold hover:text-black transition-all font-accent"
                >
                  SEND ANOTHER
                </button>
              </div>
            ) : (
              <form className="space-y-8 relative z-10" onSubmit={handleSubmit}>
                <div className="grid md:grid-cols-2 gap-8">
                   <div className="space-y-2">
                      <label className="font-accent text-[9px] text-white/30 tracking-widest uppercase">FULL NAME</label>
                      <input 
                         name="name"
                         type="text" 
                         required
                         placeholder="Jean-Pierre..."
                         className="w-full bg-transparent border-b border-white/10 py-4 focus:border-gold outline-none transition-colors font-light text-lg text-white"
                      />
                   </div>
                   <div className="space-y-2">
                      <label className="font-accent text-[9px] text-white/30 tracking-widest uppercase">EMAIL ADDRESS</label>
                      <input 
                         name="email"
                         type="email" 
                         required
                         placeholder="hello@example.com"
                         className="w-full bg-transparent border-b border-white/10 py-4 focus:border-gold outline-none transition-colors font-light text-lg text-white"
                      />
                   </div>
                </div>
                
                <div className="space-y-2">
                   <label className="font-accent text-[9px] text-white/30 tracking-widest uppercase">PROJECT CATEGORY</label>
                   <select name="category" className="w-full bg-transparent border-b border-white/10 py-4 focus:border-gold outline-none transition-colors font-light text-lg appearance-none text-white">
                      <option className="bg-dark">Portrait Session</option>
                      <option className="bg-dark">Fashion Editorial</option>
                      <option className="bg-dark">Wedding Photography</option>
                      <option className="bg-dark">Commercial / Brand</option>
                   </select>
                </div>
                
                <div className="space-y-2">
                   <label className="font-accent text-[9px] text-white/30 tracking-widest uppercase">TELL ME ABOUT YOUR VISION</label>
                   <textarea 
                      name="vision"
                      required
                      rows={5}
                      placeholder="Share some details about the mood, location, and timeline..."
                      className="w-full bg-transparent border-b border-white/10 py-4 focus:border-gold outline-none transition-colors font-light text-lg resize-none text-white"
                   />
                </div>
                
                <button 
                  disabled={status === 'loading'}
                  className="w-full group relative py-6 bg-gold overflow-hidden disabled:opacity-50"
                >
                   <div className="absolute inset-0 bg-white translate-x-full group-hover:translate-x-0 transition-transform duration-500 ease-in-out" />
                   <span className="relative z-10 font-accent text-xs font-bold tracking-widest text-dark group-hover:text-dark flex items-center justify-center gap-3">
                      {status === 'loading' ? 'SENDING...' : 'SEND INQUIRY'} <ArrowUpRight className="w-4 h-4" />
                   </span>
                </button>
                {status === 'error' && (
                  <p className="text-red-500 text-[10px] tracking-widest text-center uppercase font-accent">An error occurred. Please try again.</p>
                )}
              </form>
            )}
          </motion.div>
        </div>
      </div>
    </div>
  );
}
