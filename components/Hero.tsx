
import React from 'react';
import { motion } from 'framer-motion';
import { ChevronRight, Zap } from 'lucide-react';

interface HeroProps {
  onCtaClick: () => void;
}

const Hero: React.FC<HeroProps> = ({ onCtaClick }) => {
  return (
    <section className="relative overflow-hidden min-h-[80vh] flex items-center pt-20">
      {/* Background Decor */}
      <div className="absolute top-1/4 -left-20 w-96 h-96 bg-blue-600/20 rounded-full blur-[120px]" />
      <div className="absolute bottom-1/4 -right-20 w-96 h-96 bg-purple-600/20 rounded-full blur-[120px]" />
      
      {/* Grid Pattern */}
      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 z-10 grid md:grid-cols-2 gap-12 items-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/30 text-blue-400 text-sm font-medium mb-6">
            <Zap size={14} />
            <span>Next-Gen Hardware Now Available</span>
          </div>
          
          <h1 className="text-6xl lg:text-8xl font-orbitron font-bold leading-none mb-8">
            EVOLVE YOUR <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-indigo-400 to-purple-500">DIGITAL LIFE.</span>
          </h1>
          
          <p className="text-lg text-gray-400 max-w-xl mb-10 leading-relaxed">
            Experience the pinnacle of technology. From quantum-ready laptops to hyper-responsive peripherals. Designed for the elite. Built for the future.
          </p>
          
          <div className="flex flex-wrap gap-4">
            <button 
              onClick={onCtaClick}
              className="px-8 py-4 bg-blue-600 rounded-xl font-bold flex items-center gap-2 hover:bg-blue-700 transition-all group neon-glow"
            >
              SHOP CATALOG
              <ChevronRight className="group-hover:translate-x-1 transition-transform" />
            </button>
            <button className="px-8 py-4 bg-gray-900 border border-gray-800 rounded-xl font-bold hover:bg-gray-800 transition-all">
              VIEW SHOWREEL
            </button>
          </div>
        </motion.div>

        <motion.div 
          className="relative hidden md:block"
          initial={{ opacity: 0, scale: 0.8, rotateY: 30 }}
          animate={{ opacity: 1, scale: 1, rotateY: 0 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
          style={{ perspective: 1000 }}
        >
          <div className="relative aspect-square">
            {/* Floating 3D-like Mock */}
            <motion.img 
              src="https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=800&q=80" 
              alt="Hero Tech"
              className="w-full h-full object-cover rounded-3xl shadow-2xl border border-white/10"
              animate={{ 
                y: [0, -20, 0],
                rotate: [0, 2, 0]
              }}
              transition={{ 
                duration: 6, 
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
            
            {/* Overlay Elements */}
            <div className="absolute -top-6 -right-6 p-6 glass rounded-2xl border border-blue-500/30">
              <p className="text-xs text-blue-400 font-bold mb-1">NEW ARRIVAL</p>
              <p className="text-lg font-orbitron font-bold">Zenith Z-1</p>
            </div>

            <div className="absolute -bottom-6 -left-6 p-6 glass rounded-2xl border border-purple-500/30">
              <div className="flex gap-1 mb-2">
                {[1,2,3,4,5].map(i => <div key={i} className="w-1 h-4 bg-blue-500 animate-pulse" style={{animationDelay: `${i*0.2}s`}} />)}
              </div>
              <p className="text-xs text-gray-400 font-medium">SYSTEM PERFORMANCE</p>
              <p className="text-sm font-bold">OPTIMIZED</p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
