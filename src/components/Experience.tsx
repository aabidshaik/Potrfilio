import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Briefcase, Calendar, MapPin, ChevronDown, Award } from 'lucide-react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

interface ExperienceProps {
  data: any[];
}

export const Experience: React.FC<ExperienceProps> = ({ data }) => {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(0);

  const toggleExpand = (index: number) => {
    setExpandedIndex(expandedIndex === index ? null : index);
  };

  return (
    <section id="experience" className="py-24 px-6 relative z-10">
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-4 tracking-tight">
            Experience
          </h2>
          <div className="w-20 h-1 bg-blue-500 rounded-full" />
        </motion.div>

        <div className="space-y-6">
          {data.map((job, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className={cn(
                "group relative bg-slate-900/40 backdrop-blur-md border border-slate-800/60 rounded-2xl overflow-hidden transition-all duration-300 hover:border-slate-700/80 hover:bg-slate-900/60",
                expandedIndex === index ? "ring-1 ring-blue-500/20" : ""
              )}
            >
              <button
                onClick={() => toggleExpand(index)}
                className="w-full text-left p-6 md:p-8 flex flex-col md:flex-row md:items-center justify-between gap-4 focus:outline-none"
              >
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="p-2 bg-blue-500/10 rounded-lg text-blue-400">
                      <Briefcase className="w-5 h-5" />
                    </div>
                    <h3 className="text-xl md:text-2xl font-semibold text-white group-hover:text-blue-400 transition-colors">
                      {job.role}
                    </h3>
                  </div>
                  <div className="text-lg text-slate-300 font-medium mb-3">
                    {job.company}
                  </div>
                  <div className="flex flex-wrap gap-4 text-sm text-slate-500">
                    <div className="flex items-center gap-1.5">
                      <Calendar className="w-4 h-4" />
                      {job.dates}
                    </div>
                    <div className="flex items-center gap-1.5">
                      <MapPin className="w-4 h-4" />
                      {job.location}
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between md:justify-end w-full md:w-auto mt-4 md:mt-0">
                  <div className="flex gap-2">
                    {job.bullets.some((b: string) => b.includes('%')) && (
                      <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                        <Award className="w-3 h-3 mr-1" />
                        Impact
                      </span>
                    )}
                  </div>
                  <motion.div
                    animate={{ rotate: expandedIndex === index ? 180 : 0 }}
                    transition={{ duration: 0.3 }}
                    className="p-2 rounded-full bg-slate-800/50 text-slate-400 group-hover:text-white group-hover:bg-slate-700/50 transition-colors"
                  >
                    <ChevronDown className="w-5 h-5" />
                  </motion.div>
                </div>
              </button>

              <AnimatePresence>
                {expandedIndex === index && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: 'easeInOut' }}
                    className="overflow-hidden"
                  >
                    <div className="p-6 md:p-8 pt-0 border-t border-slate-800/50">
                      <ul className="space-y-4">
                        {job.bullets.map((bullet: string, i: number) => {
                          const isMetric = bullet.includes('%') || bullet.includes('10,000+');
                          return (
                            <motion.li
                              key={i}
                              initial={{ opacity: 0, x: -10 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: i * 0.05 }}
                              className="flex items-start gap-3 text-slate-300 leading-relaxed"
                            >
                              <span className="mt-2 w-1.5 h-1.5 rounded-full bg-blue-500 shrink-0" />
                              <span className={isMetric ? "text-slate-200 font-medium" : ""}>
                                {bullet}
                              </span>
                            </motion.li>
                          );
                        })}
                      </ul>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
