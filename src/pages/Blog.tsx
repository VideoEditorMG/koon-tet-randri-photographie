import { motion } from 'motion/react';
import { ArrowRight, Calendar, User } from 'lucide-react';
import { Link } from 'react-router-dom';

const POSTS = [
  {
    title: "The Art of Natural Light in Portraiture",
    excerpt: "Understanding how to manipulate the most powerful tool in a photographer's arsenal.",
    date: "May 12, 2026",
    author: "Koon-Tet Randri",
    image: "https://images.unsplash.com/photo-1452587925148-ce544e77e70d?auto=format&fit=crop&q=80",
    category: "Technique"
  },
  {
    title: "Minimalism: Why Less is More",
    excerpt: "Exploring the philosophy of stripping back the frame to reveal raw emotion.",
    date: "April 28, 2026",
    author: "Koon-Tet Randri",
    image: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&q=80",
    category: "Philosophy"
  },
  {
    title: "Capturing Paris After Midnight",
    excerpt: "A photo essay on the rhythmic pulse of the City of Light during the witching hour.",
    date: "April 15, 2026",
    author: "Koon-Tet Randri",
    image: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&q=80",
    category: "Storytelling"
  }
];

export default function Blog() {
  return (
    <div className="pt-32 pb-20 px-6">
      <div className="container mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-end mb-24 gap-8">
          <div className="max-w-2xl">
            <span className="font-accent text-gold text-xs tracking-[0.4em] mb-4 block uppercase">INSIGHTS & MUSINGS</span>
            <h1 className="text-5xl md:text-7xl mb-8 leading-tight">
              The <span className="italic">Monograph</span>
            </h1>
            <p className="text-xl text-beige/60 font-light">
              Deep dives into the technical, philosophical, and emotional aspects of professional photography.
            </p>
          </div>
          
          <div className="flex gap-4">
             {['All', 'Technique', 'Philosophy', 'Travel'].map(cat => (
               <button key={cat} className="font-accent text-[10px] tracking-widest px-4 py-2 border border-white/5 hover:border-gold/30 transition-all">
                  {cat.toUpperCase()}
               </button>
             ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
          {POSTS.map((post, i) => (
            <motion.article 
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="group cursor-pointer"
            >
              <div className="aspect-[4/5] overflow-hidden mb-8 relative">
                <img 
                  src={post.image} 
                  alt={post.title}
                  className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110 grayscale-[0.3] group-hover:grayscale-0"
                />
                <div className="absolute top-4 left-4">
                   <span className="font-accent text-[8px] bg-gold text-dark font-bold px-3 py-1 tracking-widest uppercase">
                      {post.category}
                   </span>
                </div>
              </div>
              
              <div className="space-y-4">
                <div className="flex items-center gap-4 font-accent text-[9px] text-beige/30 tracking-widest uppercase">
                   <div className="flex items-center gap-2">
                      <Calendar className="w-3 h-3" />
                      {post.date}
                   </div>
                   <div className="flex items-center gap-2">
                      <User className="w-3 h-3" />
                      {post.author}
                   </div>
                </div>
                
                <h3 className="text-2xl md:text-3xl group-hover:text-gold transition-colors duration-500 font-display">
                  {post.title}
                </h3>
                
                <p className="text-beige/50 font-light leading-relaxed line-clamp-2">
                  {post.excerpt}
                </p>
                
                <button className="flex items-center gap-3 group/link pt-4">
                   <span className="font-accent text-[10px] font-bold tracking-widest">READ ARTICLE</span>
                   <div className="w-8 h-[1px] bg-white group-hover/link:w-12 group-hover/link:bg-gold transition-all" />
                   <ArrowRight className="w-3 h-3 text-gold opacity-0 group-hover/link:opacity-100 transition-opacity" />
                </button>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </div>
  );
}
