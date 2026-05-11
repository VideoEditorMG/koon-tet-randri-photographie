import { useState, useMemo, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { CATEGORIES, PORTFOLIO_IMAGES } from '../constants';
import { Maximize2, X } from 'lucide-react';
import { cn } from '../lib/utils';
import { useLanguage } from '../lib/i18n';
import { useSearchParams } from 'react-router-dom';

export default function Portfolio() {
  const { t } = useLanguage();
  const [searchParams, setSearchParams] = useSearchParams();
  const initialCategory = searchParams.get('category');
  
  const [activeCategory, setActiveCategory] = useState(
    initialCategory && CATEGORIES.includes(initialCategory) ? initialCategory : 'All'
  );
  const [selectedImage, setSelectedImage] = useState<typeof PORTFOLIO_IMAGES[0] | null>(null);

  const categoryMapping: Record<string, string> = {
    'All': 'cat.all',
    'Portraits': 'cat.portraits',
    'Fashion Editorial': 'cat.fashion_editorial',
    'Cinematic Weddings': 'cat.cinematic_weddings',
    'Commercial': 'cat.commercial'
  };

  useEffect(() => {
    if (initialCategory && CATEGORIES.includes(initialCategory)) {
      setActiveCategory(initialCategory);
    }
  }, [initialCategory]);

  const handleCategoryChange = (cat: string) => {
    setActiveCategory(cat);
    if (cat === 'All') {
      const newParams = new URLSearchParams(searchParams);
      newParams.delete('category');
      setSearchParams(newParams);
    } else {
      setSearchParams({ category: cat });
    }
  };

  const filteredImages = useMemo(() => {
    return activeCategory === 'All' 
      ? PORTFOLIO_IMAGES 
      : PORTFOLIO_IMAGES.filter(img => img.category === activeCategory);
  }, [activeCategory]);

  return (
    <div className="pt-32 pb-20 px-6">
      <div className="container mx-auto">
        <div className="text-center mb-16">
          <span className="font-accent text-gold text-xs tracking-[0.3em] mb-4 block uppercase">{t('portfolio.tag')}</span>
          <h1 className="text-5xl md:text-7xl mb-8 leading-tight">
            {t('portfolio.title.1')} <span className="italic">{t('portfolio.title.2')}</span>
          </h1>
          
          {/* Category Filters */}
          <div className="flex flex-wrap justify-center gap-4 md:gap-8 mt-12">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => handleCategoryChange(cat)}
                className={cn(
                  "font-accent text-[10px] md:text-xs tracking-widest py-2 relative transition-all duration-300 uppercase",
                  activeCategory === cat ? "text-gold" : "text-white/40 hover:text-white"
                )}
              >
                {t(categoryMapping[cat] || 'cat.all')}
                <motion.div 
                  className={cn(
                    "absolute -bottom-1 left-0 right-0 h-[1px] bg-gold",
                    activeCategory === cat ? "opacity-100" : "opacity-0"
                  )}
                  layoutId="filter-underline"
                />
              </button>
            ))}
          </div>
        </div>

        {/* Masonry Grid */}
        <motion.div 
          layout
          className="columns-1 md:columns-2 lg:columns-3 gap-6 space-y-6"
        >
          <AnimatePresence mode="popLayout">
            {filteredImages.map((image) => (
              <motion.div
                layout
                key={image.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.5 }}
                className="relative group cursor-none break-inside-avoid overflow-hidden"
              >
                <img 
                  src={image.url} 
                  referrerPolicy="no-referrer"
                  alt={image.title} 
                  className="w-full h-auto object-cover transition-transform duration-700 group-hover:scale-105"
                  loading="lazy"
                />
                
                <div className="absolute inset-0 bg-dark/60 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex flex-col justify-end p-8">
                  <div className="translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                    <span className="font-accent text-[10px] text-gold mb-2 block uppercase">{t(categoryMapping[image.category] || 'cat.all')}</span>
                    <h3 className="text-xl md:text-2xl mb-2">{image.title}</h3>
                    <button 
                      onClick={() => setSelectedImage(image)}
                      className="flex items-center gap-2 text-white/60 hover:text-white transition-colors"
                    >
                      <Maximize2 className="w-4 h-4" />
                      <span className="font-accent text-[9px] tracking-widest uppercase">{t('portfolio.fullscreen')}</span>
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-dark/95 flex items-center justify-center p-6 backdrop-blur-xl"
            onClick={() => setSelectedImage(null)}
          >
            <button className="absolute top-8 right-8 text-white/50 hover:text-white transition-colors z-[110]">
              <X className="w-8 h-8" />
            </button>
            
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="relative max-w-5xl w-full flex flex-col items-center"
              onClick={(e) => e.stopPropagation()}
            >
              <img 
                src={selectedImage.url} 
                referrerPolicy="no-referrer"
                className="max-h-[80vh] w-auto shadow-2xl rounded-sm"
              />
              <div className="mt-8 text-center max-w-lg">
                <span className="font-accent text-gold text-xs tracking-widest mb-2 block uppercase">
                  {t(categoryMapping[selectedImage.category] || 'cat.all')}
                </span>
                <h2 className="text-3xl mb-4">{selectedImage.title}</h2>
                <p className="text-beige/60 font-light leading-relaxed">
                  {selectedImage.description}
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
