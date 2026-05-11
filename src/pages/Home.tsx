import { motion, useScroll, useTransform, AnimatePresence } from 'motion/react';
import { ArrowDown } from 'lucide-react';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../lib/i18n';

const HERO_ITEMS = [
  {
    id: '01',
    label: 'Portraits',
    tag: 'Vogue Editorial 2026',
    image: 'https://i.imgur.com/7Ux1OZX.png'
  },
  {
    id: '02',
    label: 'Fashion',
    tag: 'Paris Fashion Week 2026',
    image: 'https://i.imgur.com/IB3FPoY.png'
  },
  {
    id: '03',
    label: 'Weddings',
    tag: 'Lake Como Romance 2026',
    image: 'https://i.imgur.com/GOxwBa4.png'
  }
];

export default function Home() {
  const { scrollY } = useScroll();
  const { t } = useLanguage();
  const [activeIndex, setActiveIndex] = useState(0);
  
  const y1 = useTransform(scrollY, [0, 500], [0, 200]);
  const opacity = useTransform(scrollY, [0, 300], [1, 0]);

  const handleNext = () => {
    setActiveIndex((prev) => (prev + 1) % HERO_ITEMS.length);
  };

  const handlePrev = () => {
    setActiveIndex((prev) => (prev - 1 + HERO_ITEMS.length) % HERO_ITEMS.length);
  };

  const currentItem = HERO_ITEMS[activeIndex];

  return (
    <div className="relative w-full">
      {/* Hero Section */}
      <section className="relative min-h-screen w-full flex flex-col lg:flex-row overflow-hidden pt-20">
        <div className="absolute inset-0 bg-noise opacity-[0.02] pointer-events-none" />
        
        {/* Left Branding Column */}
        <motion.div 
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="w-full lg:w-2/5 p-8 md:p-16 flex flex-col justify-center border-r border-white/10 bg-dark"
        >
          <div className="space-y-3 mb-12">
            <span className="text-[11px] uppercase tracking-[0.4em] text-gold font-semibold block">{t('hero.tagline')}</span>
            <h1 className="text-6xl md:text-7xl lg:text-8xl font-display leading-[0.9] text-white">
              {t('hero.title.1')} <br/>
              <span className="italic font-normal text-gold/80">{t('hero.title.2')}</span> <br/>
              {t('hero.title.3')}
            </h1>
          </div>
          
          <p className="text-lg md:text-xl text-white/50 font-display italic mb-12 max-w-sm leading-relaxed">
            {t('hero.desc')}
          </p>

          <div className="flex flex-wrap gap-8 md:gap-12 mt-4">
            <div className="flex flex-col">
              <span className="text-2xl md:text-3xl font-display text-white">12+</span>
              <span className="text-[9px] uppercase tracking-widest opacity-40">{t('hero.exp')}</span>
            </div>
            <div className="w-px h-10 bg-white/10 hidden sm:block"></div>
            <div className="flex flex-col">
              <span className="text-2xl md:text-3xl font-display text-white">450+</span>
              <span className="text-[9px] uppercase tracking-widest opacity-40">{t('hero.shoots')}</span>
            </div>
            <div className="w-px h-10 bg-white/10 hidden sm:block"></div>
            <div className="flex flex-col">
              <span className="text-2xl md:text-3xl font-display text-white">18</span>
              <span className="text-[9px] uppercase tracking-widest opacity-40">{t('hero.awards')}</span>
            </div>
          </div>

          <div className="mt-16 flex gap-6">
            <Link
              to="/booking"
              className="border border-gold/50 text-gold px-8 py-3 text-[10px] uppercase tracking-[0.2em] hover:bg-gold hover:text-black transition-all font-accent font-bold"
            >
              {t('nav.booking')}
            </Link>
          </div>
        </motion.div>

        {/* Right Visual Column */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.5, delay: 0.2 }}
          className="w-full lg:w-3/5 relative bg-dark-accent overflow-hidden flex flex-col"
        >
          {/* Large Artistic Frame */}
          <div className="flex-1 relative flex flex-col m-8 md:m-12 border border-white/5 bg-dark">
            <div className="flex-1 relative group overflow-hidden">
               {/* Background Image with animation */}
               <AnimatePresence mode="wait">
                 <motion.div 
                   key={currentItem.id}
                   initial={{ opacity: 0, scale: 1.1 }}
                   animate={{ opacity: 1, scale: 1 }}
                   exit={{ opacity: 0, scale: 0.95 }}
                   transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                   className="absolute inset-0"
                 >
                   <div className="absolute inset-0 border border-white/10 m-8 md:m-16 z-20 pointer-events-none" />
                   <img 
                     src={currentItem.image}
                     referrerPolicy="no-referrer"
                     className="w-full h-full object-cover object-top transition-transform duration-1000 group-hover:scale-105"
                     alt={currentItem.label}
                   />
                 </motion.div>
               </AnimatePresence>

               {/* Content Overlays */}
               <div className="absolute bottom-12 left-12 z-30">
                  <motion.span 
                    key={currentItem.id + "-tag"}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-[10px] uppercase tracking-widest bg-black/80 px-4 py-2 border border-white/20 font-accent"
                  >
                    {currentItem.tag}
                  </motion.span>
               </div>

               {/* Floating UI elements */}
               <div className="absolute top-12 right-12 flex flex-col items-end gap-3 z-30">
                 <div className="w-2 h-2 rounded-full bg-gold shadow-[0_0_15px_rgba(197,160,89,0.6)] animate-pulse"></div>
                 <span className="text-[9px] uppercase tracking-[0.4em] opacity-30 whitespace-nowrap rotate-180" style={{ writingMode: 'vertical-rl' }}>
                   SELECTED WORK
                 </span>
               </div>
            </div>

            {/* Category Navigation Bar (Bottom of Hero) */}
            <div className="h-24 border-t border-white/5 flex items-center justify-between px-8 bg-black/20">
              <div className="flex items-baseline gap-8 md:gap-12">
                {HERO_ITEMS.map((item, index) => (
                  <div 
                    key={item.id}
                    onClick={() => setActiveIndex(index)}
                    className={`flex items-baseline gap-2 cursor-pointer transition-all duration-300 group ${index === activeIndex ? 'opacity-100' : 'opacity-30 hover:opacity-100'}`}
                  >
                    <span className={`text-[10px] uppercase tracking-widest ${index === activeIndex ? 'text-gold' : ''}`}>{item.id}</span>
                    <span className={`text-sm uppercase tracking-[0.2em] font-light group-hover:text-gold transition-colors ${index === activeIndex ? 'text-white' : ''}`}>
                      {item.label}
                    </span>
                  </div>
                ))}
              </div>
              <div className="flex gap-4">
                <button 
                  onClick={handlePrev}
                  className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center cursor-pointer hover:border-gold hover:text-gold transition-all bg-transparent focus:outline-none"
                >
                  ←
                </button>
                <button 
                  onClick={handleNext}
                  className="w-10 h-10 rounded-full border border-white/40 flex items-center justify-center cursor-pointer hover:bg-white hover:text-black transition-all bg-transparent focus:outline-none"
                >
                  →
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      </section>

      {/* Philosophy Section */}
      <section className="py-32 px-6 bg-dark-accent relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-gold/5 rounded-full blur-[120px] pointer-events-none" />
        
        <div className="container mx-auto max-w-6xl">
          <div className="grid md:grid-cols-2 gap-20 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1 }}
            >
              <div className="relative group">
                <div className="absolute -inset-4 border border-gold/20 translate-x-4 translate-y-4 group-hover:translate-x-0 group-hover:translate-y-0 transition-transform duration-700" />
                <img 
                  src="https://i.imgur.com/t9OHMYm.png" 
                  referrerPolicy="no-referrer"
                  alt="Artist at work" 
                  className="relative z-10 grayscale-[0.5] hover:grayscale-0 transition-all duration-700 aspect-[4/5] object-cover"
                />
              </div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1, delay: 0.2 }}
            >
              <span className="font-accent text-gold text-xs tracking-[0.3em] mb-4 block">THE PHILOSOPHY</span>
              <h2 className="text-4xl md:text-5xl lg:text-6xl mb-8 leading-tight">
                Emotions are Fleeting. <br /> Artifacts are <span className="italic">Forever.</span>
              </h2>
              <p className="text-beige/60 text-lg mb-8 leading-relaxed">
                My approach blends classical composition with modern cinematic aesthetics. 
                I believe that every project—whether a high-budget editorial or an intimate 
                portrait—deserves a level of visual storytelling that transcends the frame.
              </p>
              <div className="grid grid-cols-2 gap-8 mb-12">
                <div>
                  <h4 className="text-2xl mb-2 font-display">12M+</h4>
                  <p className="font-accent text-[10px] opacity-50">Impressions</p>
                </div>
                <div>
                  <h4 className="text-2xl mb-2 font-display">450+</h4>
                  <p className="font-accent text-[10px] opacity-50">Sessions</p>
                </div>
              </div>
              <Link to="/about" className="flex items-center gap-4 group">
                <span className="font-accent text-xs font-bold tracking-widest group-hover:text-gold transition-colors">READ MY STORY</span>
                <div className="w-12 h-[1px] bg-white group-hover:bg-gold transition-all group-hover:w-16" />
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Featured Gallery */}
      <section className="py-32 bg-dark">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
            <div>
              <span className="font-accent text-gold text-xs tracking-[0.3em] mb-4 block">PORTFOLIO EXCERPT</span>
              <h2 className="text-4xl md:text-6xl">Lately in the Studio</h2>
            </div>
            <Link to="/portfolio" className="font-accent text-xs tracking-widest hover:text-gold transition-colors flex items-center gap-2">
              VIEW ALL WORK <ArrowDown className="w-3 h-3 -rotate-45" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="md:col-span-2 relative group overflow-hidden bg-dark-accent aspect-video md:aspect-auto">
              <img 
                src="https://i.imgur.com/IB3FPoY.png" 
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110 grayscale-[0.2] group-hover:grayscale-0"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-dark/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 p-8 flex flex-col justify-end">
                <span className="font-accent text-[10px] text-gold mb-2">FASHION EDITORIAL</span>
                <h3 className="text-2xl">The Red Line</h3>
              </div>
            </div>
            <div className="space-y-8">
              <div className="relative group overflow-hidden bg-dark-accent aspect-[4/5]">
                <img 
                  src="https://i.imgur.com/wmkSSEO.png" 
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover object-top transition-transform duration-1000 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-dark/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 p-8 flex flex-col justify-end">
                   <span className="font-accent text-[10px] text-gold mb-2">PORTRAIT</span>
                   <h3 className="text-2xl">Vulnerability</h3>
                </div>
              </div>
              <div className="relative group overflow-hidden bg-dark-accent aspect-[4/5]">
                <img 
                  src="https://i.imgur.com/GOxwBa4.png" 
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-dark/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 p-8 flex flex-col justify-end">
                   <span className="font-accent text-[10px] text-gold mb-2">WEDDING</span>
                   <h3 className="text-2xl">Eternal Bond</h3>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Footer */}
      <section className="py-40 bg-dark relative flex flex-col items-center justify-center overflow-hidden">
         <div className="absolute inset-0 bg-noise opacity-10 pointer-events-none" />
         <motion.div
           initial={{ opacity: 0, scale: 0.9 }}
           whileInView={{ opacity: 1, scale: 1 }}
           transition={{ duration: 1 }}
           className="text-center"
         >
            <h2 className="text-5xl md:text-8xl lg:text-9xl mb-12 max-w-5xl px-6">
               READY TO START YOUR <span className="italic font-normal text-gold">STORY?</span>
            </h2>
            <Link
              to="/contact"
              className="group relative px-16 py-6 border border-white/20 inline-block overflow-hidden"
            >
              <div className="absolute inset-0 bg-gold translate-x-full group-hover:translate-x-0 transition-transform duration-500 ease-in-out" />
              <span className="relative z-10 font-accent text-sm font-bold tracking-widest text-white group-hover:text-dark transition-colors">
                GET IN TOUCH
              </span>
            </Link>
         </motion.div>
      </section>
    </div>
  );
}
