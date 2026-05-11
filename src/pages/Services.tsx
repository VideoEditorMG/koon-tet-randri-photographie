import { motion } from 'motion/react';
import { SERVICES } from '../constants';
import { ArrowRight, CheckCircle2 } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Services() {
  return (
    <div className="pt-32 pb-20 px-6">
      <div className="container mx-auto">
        <div className="max-w-4xl mb-24">
          <span className="font-accent text-gold text-xs tracking-[0.4em] mb-6 block uppercase">ELEVATED OFFERINGS</span>
          <h1 className="text-5xl md:text-7xl mb-8 leading-tight">
            Tailored Experiences for <span className="italic">Discerning Clients</span>
          </h1>
          <p className="text-xl text-beige/60 font-light leading-relaxed">
            Every session is a collaboration. I provide a comprehensive suite of photographic services 
            designed to produce heirloom-quality visuals that endure through generations.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12">
          {SERVICES.map((service, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="group bg-dark-accent border border-white/5 hover:border-gold/30 transition-all duration-700 overflow-hidden"
            >
              <div className="aspect-[4/3] overflow-hidden">
                <img 
                  src={service.url} 
                  alt={service.title}
                  className="w-full h-full object-cover object-top transition-transform duration-1000 group-hover:scale-105"
                />
              </div>
              <div className="p-10 md:p-14">
                <div className="flex flex-col sm:flex-row justify-between items-start gap-4 mb-6">
                  <h3 className="text-3xl md:text-4xl">{service.title}</h3>
                  <span className="font-accent text-[10px] text-gold tracking-widest bg-gold/10 px-3 py-1 whitespace-nowrap">
                    {service.price}
                  </span>
                </div>
                <p className="text-beige/50 font-light leading-relaxed mb-8 flex-grow">
                  {service.description}
                </p>
                
                <div className="space-y-4 mb-10">
                   {(service.features || []).map((feature, idx) => (
                     <div key={idx} className="flex items-center gap-3 text-beige/40">
                        <CheckCircle2 className="w-4 h-4 text-gold" />
                        <span className="text-sm">{feature}</span>
                     </div>
                   ))}
                </div>

                <Link 
                  to="/booking" 
                  className="inline-flex items-center gap-4 group/btn"
                >
                  <span className="font-accent text-xs font-bold tracking-[0.2em] group-hover/btn:text-gold transition-colors">
                    RESERVE SESSION
                  </span>
                  <div className="w-8 h-[1px] bg-white group-hover/btn:w-12 group-hover/btn:bg-gold transition-all" />
                  <ArrowRight className="w-4 h-4 text-gold opacity-0 group-hover/btn:opacity-100 transition-opacity" />
                </Link>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Process Section */}
        <section className="mt-40 bg-dark py-32 border-t border-white/5">
           <div className="text-center mb-20">
              <h2 className="text-4xl md:text-6xl mb-4">The Creative Process</h2>
              <p className="text-beige/40 font-light max-w-2xl mx-auto">
                 We believe in a meticulous journey from vision to artifact.
              </p>
           </div>
           
           <div className="grid md:grid-cols-4 gap-8">
              {[
                { n: '01', t: 'Vision Call', d: 'Discussing goals, aesthetics, and logistics.' },
                { n: '02', t: 'Production', d: 'Focused execution with cinematic precision.' },
                { n: '03', t: 'Curation', d: 'Selecting only the strongest narratives.' },
                { n: '04', t: 'Delivery', d: 'Ready-to-publish high-end digital assets.' }
              ].map((step, i) => (
                <div key={i} className="relative p-8 bg-dark-accent border border-white/5 group hover:border-gold/20 transition-all">
                  <span className="block font-accent text-5xl opacity-5 mb-4 group-hover:text-gold group-hover:opacity-10 transition-all font-bold">{step.n}</span>
                  <h4 className="text-xl mb-3">{step.t}</h4>
                  <p className="text-sm text-beige/40 leading-relaxed">{step.d}</p>
                </div>
              ))}
           </div>
        </section>
      </div>
    </div>
  );
}
