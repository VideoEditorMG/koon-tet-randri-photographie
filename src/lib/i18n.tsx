import React, { createContext, useContext, useState, useEffect } from 'react';

type Language = 'EN' | 'FR';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const translations = {
  EN: {
    'nav.portfolio': 'Portfolio',
    'nav.services': 'Services',
    'nav.about': 'About',
    'nav.contact': 'Contact',
    'nav.booking': 'Book Session',
    'hero.tagline': 'Cinematic Storytelling',
    'hero.title.1': 'Frames',
    'hero.title.2': 'of the',
    'hero.title.3': 'Unseen',
    'hero.desc': 'Transcending the lens to capture the raw, emotional essence of a single moment in time.',
    'hero.exp': 'Years Exp.',
    'hero.shoots': 'Global Shoots',
    'hero.awards': 'Awards',
    'footer.copy': 'LUXURY PORTFOLIO EXPERIENCE',
    'footer.cities': 'Paris — New York — Tokyo',
  },
  FR: {
    'nav.portfolio': 'Portfolio',
    'nav.services': 'Services',
    'nav.about': 'À Propos',
    'nav.contact': 'Contact',
    'nav.booking': 'Réserver',
    'hero.tagline': 'Narration Cinématographique',
    'hero.title.1': 'Instants',
    'hero.title.2': 'de',
    'hero.title.3': "l'invisible",
    'hero.desc': "Transcender l'objectif pour capturer l'essence brute et émotionnelle d'un instant unique.",
    'hero.exp': 'Années Exp.',
    'hero.shoots': 'Séances Mondiales',
    'hero.awards': 'Prix',
    'footer.copy': 'EXPÉRIENCE PORTFOLIO DE LUXE',
    'footer.cities': 'Paris — New York — Tokyo',
  }
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguage] = useState<Language>('EN');

  const t = (key: string) => {
    return translations[language][key as keyof typeof translations['EN']] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}
