import { motion } from 'motion/react';
import { Camera, Calendar, Mail, MapPin, Instagram, Youtube, Twitter } from 'lucide-react';

export default function About() {
  return (
    <div className="pt-32 pb-20">
      {/* Intro */}
      <section className="container mx-auto px-6 mb-32">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1 }}
            className="relative"
          >
            <div className="aspect-[3/4] relative overflow-hidden rounded-sm grayscale hover:grayscale-0 transition-all duration-1000">
              <img 
                src="https://images.unsplash.com/photo-1554151228-14d9def656e4?auto=format&fit=crop&q=80" 
                referrerPolicy="no-referrer"
                alt="Koon-Tet Randri" 
                className="w-full h-full object-cover"
              />
            </div>
            <div className="absolute -bottom-8 -right-8 w-48 h-48 bg-gold flex items-center justify-center transform rotate-12 hidden md:flex">
              <span className="font-display text-dark text-4xl text-center leading-none">
                Since <br /> 2018
              </span>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, delay: 0.2 }}
          >
            <span className="font-accent text-gold text-xs tracking-[0.4em] mb-6 block">THE ARTIST BEHIND THE LENS</span>
            <h1 className="text-5xl md:text-7xl mb-8 leading-tight">
              Koon-Tet <span className="italic font-normal">Randri</span>
            </h1>
            <p className="text-xl text-beige/80 font-light leading-relaxed mb-8">
              Born from a passion for visual rhythm and narrative depth, I've spent nearly 
              a decade refining my eye for the cinematic. My photography isn't just about 
              the subject—it's about the feeling between the frames.
            </p>
            <p className="text-lg text-beige/50 leading-relaxed mb-12">
              Based in the artistic heart of Paris, I travel globally for clients who 
              value bold composition and emotional authenticity. My work has been featured 
              in editorial publications and premium commercial campaigns, yet I find 
              the most inspiration in the quiet, raw moments of everyday life.
            </p>
            
            <div className="space-y-6">
              <div className="flex items-center gap-4 group">
                <div className="w-10 h-10 rounded-full border border-gold/30 flex items-center justify-center group-hover:bg-gold/10 transition-colors">
                  <MapPin className="w-4 h-4 text-gold" />
                </div>
                <span className="font-accent text-[11px] tracking-widest">AVAILABLE WORLDWIDE</span>
              </div>
              <div className="flex items-center gap-4 group">
                <div className="w-10 h-10 rounded-full border border-gold/30 flex items-center justify-center group-hover:bg-gold/10 transition-colors">
                  <Camera className="w-4 h-4 text-gold" />
                </div>
                <span className="font-accent text-[11px] tracking-widest">PHASE ONE & LEICA ECOSYSTEM</span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Expertise & Gear */}
      <section className="bg-dark-accent py-32 border-y border-white/5">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-3 gap-12">
            <div className="p-12 border border-white/5 bg-dark">
              <h3 className="text-2xl mb-8 font-display">Philosophy</h3>
              <p className="text-beige/40 font-light leading-relaxed">
                Less is profound. I simplify every frame to its essential emotional core, 
                letting the light and shadow tell the story that words often fail to capture.
              </p>
            </div>
            <div className="p-12 border border-white/5 bg-dark">
              <h3 className="text-2xl mb-8 font-display">Experience</h3>
              <p className="text-beige/40 font-light leading-relaxed">
                From high-fashion runways in Milan to quiet mountaintop weddings in the Alps, 
                I bring a consistent level of premium technical skill to every environment.
              </p>
            </div>
            <div className="p-12 border border-white/5 bg-dark">
              <h3 className="text-2xl mb-8 font-display">Recognition</h3>
              <p className="text-beige/40 font-light leading-relaxed">
                Recipient of the European Editorial Photography Award and featured globally 
                in 'The Modern Portrait' exhibit (2024).
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-32">
        <div className="container mx-auto px-6 max-w-4xl">
          <div className="text-center mb-16">
             <h2 className="text-4xl md:text-6xl mb-4">The Journey</h2>
             <div className="w-12 h-px bg-gold mx-auto" />
          </div>
          
          <div className="relative space-y-12 before:absolute before:left-[11px] before:top-2 before:bottom-2 before:w-px before:bg-white/10">
            {[
              { year: '2025', title: 'Global Retrospective', desc: 'Released "THE SILENT FRAME" monograph.' },
              { year: '2022', title: 'Studio Expansion', desc: 'Opened flagship creative studio in Paris.' },
              { year: '2020', title: 'Paris Fashion Week', desc: 'Lead visual director for major couture brand.' },
              { year: '2018', title: 'The Genesis', desc: 'Founding of Koon-Tet Randri Photography.' },
            ].map((item, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="relative pl-12"
              >
                <div className="absolute left-0 top-1 w-[22px] h-[22px] rounded-full border-2 border-gold bg-dark z-10" />
                <span className="font-accent text-gold text-xs font-bold mb-1 block">{item.year}</span>
                <h4 className="text-xl mb-2">{item.title}</h4>
                <p className="text-beige/40 font-light">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
