import React, { useEffect, useState, useRef } from 'react';
import { motion, useInView, useAnimation } from 'motion/react';
import { TrendingUp, Zap, ShieldCheck, Clock, CheckCircle } from 'lucide-react';
import { cn } from './Experience';

interface AchievementsProps {
  data: any[];
}

const AnimatedCounter = ({ value, duration = 2 }: { value: string; duration?: number }) => {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });
  
  const numMatch = value.match(/[0-9.]+/);
  const numValue = numMatch ? parseFloat(numMatch[0]) : 0;
  const suffix = value.replace(/[0-9.]/g, '');
  const isDecimal = value.includes('.');

  useEffect(() => {
    if (isInView) {
      let start = 0;
      const increment = numValue / (duration * 60);
      const timer = setInterval(() => {
        start += increment;
        if (start >= numValue) {
          setCount(numValue);
          clearInterval(timer);
        } else {
          setCount(start);
        }
      }, 1000 / 60);
      return () => clearInterval(timer);
    }
  }, [isInView, numValue, duration]);

  return (
    <span ref={ref} className="tabular-nums font-bold tracking-tighter">
      {isDecimal ? count.toFixed(1) : Math.floor(count)}
      {suffix}
    </span>
  );
};

export const Achievements: React.FC<AchievementsProps> = ({ data }) => {
  const getIcon = (metric: string) => {
    if (metric.includes('94')) return <Clock className="w-6 h-6 text-blue-400" />;
    if (metric.includes('25')) return <TrendingUp className="w-6 h-6 text-emerald-400" />;
    if (metric.includes('35')) return <ShieldCheck className="w-6 h-6 text-purple-400" />;
    if (metric.includes('40')) return <Zap className="w-6 h-6 text-amber-400" />;
    if (metric.includes('50')) return <CheckCircle className="w-6 h-6 text-rose-400" />;
    return <TrendingUp className="w-6 h-6 text-cyan-400" />;
  };

  return (
    <section id="achievements" className="py-24 px-6 relative z-10 bg-slate-950/50">
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6 }}
          className="mb-16 text-center"
        >
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-4 tracking-tight">
            Key Impact
          </h2>
          <div className="w-20 h-1 bg-blue-500 rounded-full mx-auto" />
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {data.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              whileInView={{ opacity: 1, scale: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ y: -5, scale: 1.02 }}
              className="group relative p-8 rounded-3xl bg-slate-900/40 border border-slate-800/60 backdrop-blur-sm overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              
              <div className="relative z-10 flex flex-col h-full">
                <div className="flex items-center justify-between mb-6">
                  <div className="p-3 bg-slate-800/50 rounded-2xl border border-slate-700/50 shadow-inner">
                    {getIcon(item.metric)}
                  </div>
                  <div className="text-4xl md:text-5xl text-white">
                    <AnimatedCounter value={item.metric} />
                  </div>
                </div>
                
                <p className="text-slate-400 leading-relaxed font-medium mt-auto group-hover:text-slate-300 transition-colors">
                  {item.context}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
