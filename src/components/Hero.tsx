import React from 'react';
import { motion } from 'motion/react';
import { ChevronDown, FileText, ArrowRight } from 'lucide-react';

interface HeroProps {
  data: any;
  onShowResume: () => void;
}

export const Hero: React.FC<HeroProps> = ({ data, onShowResume }) => {
  const handleScroll = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="hero" className="relative min-h-screen flex items-center justify-center px-6 pt-20 pb-12 overflow-hidden">
      <div className="max-w-5xl mx-auto w-full z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          className="flex flex-col items-start"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="inline-flex items-center px-3 py-1 mb-6 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-sm font-medium tracking-wide"
          >
            <span className="w-2 h-2 rounded-full bg-blue-500 mr-2 animate-pulse" />
            Available for Senior Roles
          </motion.div>

          <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tighter text-white mb-4 leading-tight">
            {data.name.split(' ').map((word: string, i: number) => (
              <span key={i} className="block md:inline-block mr-4">
                {word}
              </span>
            ))}
          </h1>

          <h2 className="text-xl md:text-3xl font-light text-slate-400 mb-8 max-w-3xl leading-relaxed">
            {data.title.split('|').map((part: string, i: number) => (
              <React.Fragment key={i}>
                <span className="text-slate-300">{part.trim()}</span>
                {i < data.title.split('|').length - 1 && (
                  <span className="mx-2 text-slate-600">|</span>
                )}
              </React.Fragment>
            ))}
          </h2>

          <p className="text-base md:text-lg text-slate-500 max-w-2xl mb-12 leading-relaxed">
            {data.summary.split('.')[0]}. {data.summary.split('.')[1]}.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
            <button
              onClick={() => handleScroll('experience')}
              className="group relative inline-flex items-center justify-center px-8 py-4 bg-white text-slate-950 font-medium rounded-xl overflow-hidden transition-transform hover:scale-105 active:scale-95"
            >
              <span className="relative z-10 flex items-center gap-2">
                View Experience
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-slate-200 to-white opacity-0 group-hover:opacity-100 transition-opacity" />
            </button>

            <button
              onClick={onShowResume}
              className="group inline-flex items-center justify-center px-8 py-4 bg-slate-900/50 hover:bg-slate-800/80 text-white font-medium rounded-xl border border-slate-800 transition-all hover:border-slate-700 backdrop-blur-sm"
            >
              <FileText className="w-4 h-4 mr-2 text-slate-400 group-hover:text-white transition-colors" />
              Download Resume
            </button>
          </div>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center text-slate-500"
      >
        <span className="text-xs uppercase tracking-widest mb-2 font-medium">Scroll</span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
        >
          <ChevronDown className="w-5 h-5" />
        </motion.div>
      </motion.div>
    </section>
  );
};
