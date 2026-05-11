import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronLeft, ChevronRight, Quote, Star } from 'lucide-react';
import { TESTIMONIALS } from '../constants';

export default function Testimonials() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const next = () => setCurrentIndex((prev) => (prev + 1) % TESTIMONIALS.length);
  const prev = () => setCurrentIndex((prev) => (prev - 1 + TESTIMONIALS.length) % TESTIMONIALS.length);

  return (
    <div className="pt-32 pb-20 overflow-hidden relative min-h-screen flex items-center">
      <div className="absolute inset-0 bg-noise opacity-5 pointer-events-none" />
      <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-gold/5 rounded-full blur-[150px] pointer-events-none" />
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center mb-24">
          <span className="font-accent text-gold text-xs tracking-[0.4em] mb-4 block uppercase">KIND WORDS</span>
          <h1 className="text-6xl md:text-8xl">Client <span className="italic">Voices</span></h1>
        </div>

        <div className="max-w-5xl mx-auto relative">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, y: 40, filter: 'blur(10px)' }}
              animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              exit={{ opacity: 0, y: -40, filter: 'blur(10px)' }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="flex flex-col items-center text-center"
            >
              <div className="mb-12 relative">
                <Quote className="w-16 h-16 text-gold/10 absolute -top-8 -left-8" />
                <img 
                  src={TESTIMONIALS[currentIndex].image} 
                  alt={TESTIMONIALS[currentIndex].name}
                  className="w-24 h-24 rounded-full border-2 border-gold grayscale object-cover"
                />
              </div>
              
              <div className="flex gap-1 mb-8">
                {[...Array(TESTIMONIALS[currentIndex].stars)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-gold text-gold" />
                ))}
              </div>

              <p className="text-2xl md:text-4xl lg:text-5xl font-display italic leading-snug mb-12 text-beige/90 px-4">
                "{TESTIMONIALS[currentIndex].text}"
              </p>

              <div>
                <h4 className="text-xl md:text-2xl font-display mb-1">{TESTIMONIALS[currentIndex].name}</h4>
                <p className="font-accent text-[10px] tracking-[0.2em] text-gold">{TESTIMONIALS[currentIndex].role}</p>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Controls */}
          <div className="flex justify-between items-center mt-20 gap-8">
            <button 
              onClick={prev}
              className="p-4 border border-white/5 hover:border-gold/50 transition-all group"
            >
              <ChevronLeft className="w-6 h-6 text-white group-hover:text-gold transition-colors" />
            </button>
            
            <div className="flex gap-3">
              {TESTIMONIALS.map((_, i) => (
                <div 
                  key={i}
                  className={`h-[2px] transition-all duration-500 ${i === currentIndex ? 'w-12 bg-gold' : 'w-4 bg-white/10'}`}
                />
              ))}
            </div>

            <button 
              onClick={next}
              className="p-4 border border-white/5 hover:border-gold/50 transition-all group"
            >
              <ChevronRight className="w-6 h-6 text-white group-hover:text-gold transition-colors" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
