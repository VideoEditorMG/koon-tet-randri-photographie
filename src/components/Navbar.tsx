import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Menu, X, Instagram, Twitter, Facebook, ArrowUpRight, Globe } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { cn } from '../lib/utils';
import { useLanguage } from '../lib/i18n';

const NAV_LINKS = [
  { name: 'nav.portfolio', path: '/portfolio' },
  { name: 'nav.services', path: '/services' },
  { name: 'nav.about', path: '/about' },
  { name: 'nav.contact', path: '/contact' },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const { language, setLanguage, t } = useLanguage();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsOpen(false);
  }, [location]);

  const toggleLanguage = () => {
    setLanguage(language === 'EN' ? 'FR' : 'EN');
  };

  return (
    <>
      <nav 
        className={cn(
          "fixed top-0 left-0 w-full z-50 transition-all duration-500 h-20 px-6 md:px-12 flex justify-between items-center border-b border-white/10",
          scrolled ? "bg-dark/80 backdrop-blur-md" : "bg-dark"
        )}
      >
        <Link to="/" className="flex items-center gap-1 group">
          <span className="font-display text-2xl tracking-[0.3em] font-light transition-colors group-hover:text-gold uppercase">
            KOON-TET RANDRI
          </span>
          <span className="font-accent text-[10px] uppercase tracking-[0.5em] opacity-40 ml-2 mt-1 hidden sm:block">
            PHOTOGRAPHY
          </span>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden lg:flex items-center gap-10">
          {NAV_LINKS.map(link => (
            <Link 
              key={link.path}
              to={link.path}
              className={cn(
                "text-[11px] uppercase tracking-widest transition-all",
                location.pathname === link.path ? "text-gold" : "text-white/60 hover:text-gold"
              )}
            >
              {t(link.name)}
            </Link>
          ))}
        </div>

        <div className="flex items-center gap-6">
          <button 
            onClick={toggleLanguage}
            className="flex items-center gap-2 group p-2 hover:bg-white/5 transition-colors"
            title={language === 'EN' ? 'Passer en Français' : 'Switch to English'}
          >
            <Globe className="w-3.5 h-3.5 text-gold/60 group-hover:text-gold transition-colors" />
            <span className="font-accent text-[10px] tracking-widest text-white/40 group-hover:text-white transition-colors">
              {language}
            </span>
          </button>

          <Link 
            to="/booking" 
            className="hidden md:block border border-gold/50 text-gold px-6 py-2 text-[10px] uppercase tracking-[0.2em] hover:bg-gold hover:text-black transition-all"
          >
            {t('nav.booking')}
          </Link>
          
          <button 
            onClick={() => setIsOpen(!isOpen)}
            className="flex flex-col gap-1.5 p-2 group"
          >
            <span className={cn(
              "w-8 h-[1px] bg-white transition-all duration-300 origin-right",
              isOpen && "rotate-45 -translate-y-px w-8"
            )} />
            <span className={cn(
              "w-5 h-[1px] bg-white transition-all duration-300 ml-auto",
              isOpen && "opacity-0"
            )} />
            <span className={cn(
              "w-8 h-[1px] bg-white transition-all duration-300 origin-right",
              isOpen && "-rotate-45 translate-y-px w-8"
            )} />
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ y: '-100%' }}
            animate={{ y: 0 }}
            exit={{ y: '-100%' }}
            transition={{ type: 'spring', damping: 30, stiffness: 100, mass: 1 }}
            className="fixed inset-0 z-[60] bg-dark-accent flex flex-col items-center justify-center pt-20"
          >
            <div className="absolute inset-0 bg-noise pointer-events-none" />
            
            <motion.div 
               initial={{ opacity: 0 }}
               animate={{ opacity: 1 }}
               transition={{ delay: 0.4 }}
               className="flex flex-col items-center gap-4 mb-12"
            >
               {[ { name: 'nav.home', path: '/' }, ...NAV_LINKS ].map((link, i) => (
                 <motion.div
                   key={link.path}
                   initial={{ opacity: 0, x: -20 }}
                   animate={{ opacity: 1, x: 0 }}
                   transition={{ delay: 0.5 + i * 0.1 }}
                 >
                   <Link 
                     to={link.path}
                     className={cn(
                       "relative font-display text-4xl md:text-6xl lg:text-7xl group py-2",
                       location.pathname === link.path ? "text-gold" : "text-white/40 hover:text-white"
                     )}
                   >
                     <span className="relative z-10 transition-colors duration-500 uppercase">
                       {t(link.name)}
                     </span>
                     <span className="absolute -left-8 top-1/2 -translate-y-1/2 font-accent text-xs opacity-0 group-hover:opacity-100 transition-all text-gold">
                       0{i + 1}
                     </span>
                   </Link>
                 </motion.div>
               ))}
            </motion.div>

             <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1 }}
                className="flex gap-8 mt-auto mb-12"
             >
                <Instagram className="w-6 h-6 hover:text-gold cursor-pointer transition-colors" />
                <a href="https://wa.me/261343116654" target="_blank" rel="noopener noreferrer">
                  <span className="font-accent text-sm tracking-widest hover:text-gold cursor-pointer transition-colors pt-1">WA</span>
                </a>
                <a href="https://www.facebook.com/KoontetRandriPhotographyOfficialPage/" target="_blank" rel="noopener noreferrer">
                  <Facebook className="w-6 h-6 hover:text-gold cursor-pointer transition-colors" />
                </a>
             </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
