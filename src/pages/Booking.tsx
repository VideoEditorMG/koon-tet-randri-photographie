import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Calendar as CalendarIcon, ArrowRight, CircleCheck } from 'lucide-react';
import { Link } from 'react-router-dom';
import { cn } from '../lib/utils';
import { SERVICES } from '../constants';
import { useLanguage } from '../lib/i18n';

export default function Booking() {
  const { t } = useLanguage();
  const [step, setStep] = useState(1);
  const [selectedService, setSelectedService] = useState<string | null>(null);
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [bookingStatus, setBookingStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const nextStep = () => setStep(prev => prev + 1);

  const handleBookingSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setBookingStatus('loading');
    
    // Replace with your Formspree ID
    const FORMSPREE_ENDPOINT = "https://formspree.io/f/xpqbkjnv"; 

    const formData = new FormData(e.currentTarget);
    formData.append('date', selectedDate || '');
    formData.append('sessionType', selectedService || '');

    try {
      const response = await fetch(FORMSPREE_ENDPOINT, {
        method: 'POST',
        headers: { 'Accept': 'application/json' },
        body: formData,
      });

      if (response.ok) {
        setBookingStatus('success');
        setStep(4);
      } else {
        setBookingStatus('error');
      }
    } catch (error) {
       console.error('Booking error:', error);
       setBookingStatus('error');
    }
  };

  return (
    <div className="pt-32 pb-20 px-6">
      <div className="container mx-auto max-w-4xl">
        <div className="text-center mb-16">
          <span className="font-accent text-gold text-xs tracking-[0.4em] mb-4 block uppercase">{t('booking.tag')}</span>
          <h1 className="text-5xl md:text-7xl mb-8 text-white uppercase">{t('booking.title.1')} <span className="italic">{t('booking.title.2')}</span></h1>
          
          <div className="flex justify-center items-center gap-4 mt-8">
             {[1, 2, 3].map(i => (
                <div key={i} className="flex items-center gap-4">
                   <div className={cn(
                     "w-10 h-10 rounded-full border flex items-center justify-center transition-all duration-500",
                     step >= i ? "bg-gold border-gold text-dark" : "border-white/10 text-white/30"
                   )}>
                     {step > i ? <CircleCheck className="w-5 h-5" /> : i}
                   </div>
                   {i < 3 && <div className={cn("w-12 h-px transition-all duration-500", step > i ? "bg-gold" : "bg-white/10")} />}
                </div>
             ))}
          </div>
        </div>

        <motion.div 
           key={step}
           initial={{ opacity: 0, x: 20 }}
           animate={{ opacity: 1, x: 0 }}
           className="bg-dark-accent p-8 md:p-16 border border-white/5 shadow-2xl relative overflow-hidden"
        >
           <div className="absolute inset-0 bg-noise opacity-5 pointer-events-none" />
           
           {step === 1 && (
             <div className="space-y-10 relative z-10">
                <h3 className="text-3xl font-display mb-8 text-white uppercase">{t('booking.step1.title')}</h3>
                <div className="grid md:grid-cols-2 gap-6">
                   {SERVICES.map((s, i) => (
                     <button 
                       key={i}
                       onClick={() => setSelectedService(s.title)}
                       className={cn(
                         "p-8 border text-left transition-all duration-500 group",
                         selectedService === s.title ? "border-gold bg-gold/5" : "border-white/5 hover:border-white/20 bg-dark"
                       )}
                     >
                        <h4 className="text-xl mb-2 group-hover:text-gold transition-colors text-white uppercase">{s.title}</h4>
                        <p className="text-xs text-beige/40 font-light mb-4">{s.price}</p>
                        <div className={cn(
                           "flex items-center gap-2 text-[10px] font-accent tracking-widest uppercase",
                           selectedService === s.title ? "text-gold" : "text-white/20"
                        )}>
                           {t('booking.step1.select')} <ArrowRight className="w-3 h-3" />
                        </div>
                     </button>
                   ))}
                </div>
                {selectedService && (
                   <button 
                     onClick={nextStep}
                     className="w-full py-5 bg-gold text-dark font-accent font-bold tracking-widest hover:bg-white transition-colors uppercase"
                   >
                      {t('booking.step1.continue')}
                   </button>
                )}
             </div>
           )}

           {step === 2 && (
             <div className="space-y-10 relative z-10 text-center py-10">
                <CalendarIcon className="w-16 h-16 text-gold mx-auto mb-6" />
                <h3 className="text-3xl font-display text-white uppercase">{t('booking.step2.title')}</h3>
                <p className="text-beige/40">{t('booking.step2.desc')}</p>
                
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                   {['AUG 12', 'AUG 14', 'AUG 15', 'AUG 18', 'AUG 22', 'AUG 25', 'SEP 02', 'SEP 05'].map(date => (
                     <button 
                       key={date} 
                       onClick={() => setSelectedDate(date)}
                       className={cn(
                         "py-4 border transition-all font-accent text-xs",
                         selectedDate === date ? "border-gold text-gold bg-gold/5" : "border-white/10 hover:border-white/30 text-white/60"
                       )}
                     >
                        {date}
                     </button>
                   ))}
                </div>
                
                {selectedDate && (
                  <button 
                    onClick={nextStep}
                    className="w-full py-5 bg-gold text-dark font-accent font-bold tracking-widest hover:bg-white transition-colors mt-8 uppercase"
                  >
                     {t('booking.step2.continue')}
                  </button>
                )}
             </div>
           )}

           {step === 3 && (
             <div className="space-y-8 relative z-10">
                <h3 className="text-3xl font-display mb-8 text-white uppercase">{t('booking.step3.title')}</h3>
                <form onSubmit={handleBookingSubmit} className="space-y-6 text-left">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                       <label className="font-accent text-[9px] text-white/30 tracking-widest uppercase">{t('contact.form.name')}</label>
                       <input 
                          name="name"
                          type="text" 
                          required
                          className="w-full bg-transparent border-b border-white/10 py-4 focus:border-gold outline-none transition-colors font-light text-lg text-white"
                       />
                    </div>
                    <div className="space-y-2">
                       <label className="font-accent text-[9px] text-white/30 tracking-widest uppercase">{t('contact.form.email')}</label>
                       <input 
                          name="email"
                          type="email" 
                          required
                          className="w-full bg-transparent border-b border-white/10 py-4 focus:border-gold outline-none transition-colors font-light text-lg text-white"
                       />
                    </div>
                  </div>
                  <div className="space-y-2">
                     <label className="font-accent text-[9px] text-white/30 tracking-widest uppercase">{t('booking.step3.notes')}</label>
                     <textarea 
                        name="notes"
                        rows={4}
                        className="w-full bg-transparent border-b border-white/10 py-4 focus:border-gold outline-none transition-colors font-light text-lg text-white resize-none"
                     />
                  </div>
                  
                  <button 
                    type="submit"
                    disabled={bookingStatus === 'loading'}
                    className="w-full py-5 bg-gold text-dark font-accent font-bold tracking-widest hover:bg-white transition-colors disabled:opacity-50 uppercase"
                  >
                     {bookingStatus === 'loading' ? t('booking.step3.processing') : t('booking.step3.submit')}
                  </button>
                  {bookingStatus === 'error' && <p className="text-red-500 text-xs text-center font-accent uppercase tracking-widest">Error occurred. Try again.</p>}
                </form>
             </div>
           )}

           {step === 4 && (
             <div className="space-y-10 relative z-10 text-center py-20">
                <CircleCheck className="w-24 h-24 text-gold mx-auto mb-8 animate-bounce" />
                <h3 className="text-4xl font-display mb-4 text-white uppercase">{t('booking.step4.title')}</h3>
                <p className="text-beige/60 max-w-lg mx-auto leading-relaxed">
                   {t('booking.step4.desc')}
                </p>
                <div className="pt-8">
                   <Link 
                     to="/"
                     className="font-accent text-[10px] tracking-widest text-gold hover:text-white transition-colors uppercase"
                   >
                      {t('booking.step4.home')}
                   </Link>
                </div>
             </div>
           )}
        </motion.div>
      </div>
    </div>
  );
}
