import { Instagram, Twitter, Facebook, ArrowUpRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../lib/i18n';

export default function Footer() {
  const { t } = useLanguage();

  return (
    <footer className="bg-dark border-t border-white/5 pt-24 pb-12 px-6">
      <div className="container mx-auto">
        <div className="grid md:grid-cols-4 gap-16 mb-24">
          <div className="md:col-span-2">
            <Link to="/" className="flex flex-col mb-8">
              <span className="font-display text-4xl font-bold tracking-tighter uppercase">
                KOON-TET RANDRI
              </span>
              <span className="font-accent text-xs mt-1 opacity-60 tracking-[0.3em]">
                PHOTOGRAPHY
              </span>
            </Link>
            <p className="max-w-md text-beige/40 font-light leading-relaxed mb-8">
              {t('hero.desc')}
            </p>
            <div className="flex gap-6">
               <Instagram className="w-5 h-5 hover:text-gold cursor-pointer transition-colors" />
               <a href="https://wa.me/261343116654" target="_blank" rel="noopener noreferrer">
                 <span className="font-accent text-[11px] tracking-widest hover:text-gold cursor-pointer transition-colors pt-0.5">WA</span>
               </a>
               <a href="https://www.facebook.com/KoontetRandriPhotographyOfficialPage/" target="_blank" rel="noopener noreferrer">
                 <Facebook className="w-5 h-5 hover:text-gold cursor-pointer transition-colors" />
               </a>
            </div>
          </div>

          <div>
             <h4 className="font-accent text-xs tracking-widest text-gold mb-8 uppercase">{t('nav.portfolio')}</h4>
             <ul className="space-y-4 font-light text-beige/60">
                <li><Link to="/portfolio" className="hover:text-white transition-colors uppercase">{t('footer.cat1')}</Link></li>
                <li><Link to="/portfolio" className="hover:text-white transition-colors uppercase">{t('footer.cat2')}</Link></li>
                <li><Link to="/portfolio" className="hover:text-white transition-colors uppercase">{t('footer.cat3')}</Link></li>
                <li><Link to="/portfolio" className="hover:text-white transition-colors uppercase">{t('footer.cat4')}</Link></li>
             </ul>
          </div>

          <div>
             <h4 className="font-accent text-xs tracking-widest text-gold mb-8 uppercase">{t('footer.office')}</h4>
             <p className="text-beige/40 font-light leading-relaxed mb-6">
                Lot A 126 bis Manarintsoa Anatihazo <br /> 
                Antananarivo, <br />
                Madagascar
             </p>
             <a href="mailto:sendrarandrianasolo@gmail.com" className="group flex items-center gap-2 text-beige/60 hover:text-white transition-colors underline underline-offset-4">
                sendrarandrianasolo@gmail.com <ArrowUpRight className="w-3 h-3" />
             </a>
          </div>
        </div>

        <div className="flex flex-col md:flex-row justify-between items-center border-t border-white/5 pt-12 gap-8 text-[9px] uppercase tracking-[0.4em]">
           <span className="opacity-30">
              © 2026 KOON-TET RANDRI / {t('footer.copy')}
           </span>
           <div className="flex gap-8 items-center">
              <div className="flex gap-6">
                <span className="opacity-40 hover:opacity-100 cursor-pointer transition-opacity">Instagram</span>
                <span className="opacity-40 hover:opacity-100 cursor-pointer transition-opacity">Behance</span>
                <span className="opacity-40 hover:opacity-100 cursor-pointer transition-opacity">Vimeo</span>
              </div>
              <div className="w-px h-4 bg-white/20 hidden md:block"></div>
              <div className="opacity-40 hidden md:block">
                {t('footer.cities')}
              </div>
            </div>
        </div>
      </div>
    </footer>
  );
}
