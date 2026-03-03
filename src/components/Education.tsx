import React from 'react';
import { motion } from 'motion/react';
import { GraduationCap, Award, BookOpen } from 'lucide-react';

interface EducationProps {
  education: any[];
  certifications: string[];
}

export const Education: React.FC<EducationProps> = ({ education, certifications }) => {
  return (
    <section id="education" className="py-24 px-6 relative z-10 bg-slate-950/50">
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-4 tracking-tight">
            Education & Certifications
          </h2>
          <div className="w-20 h-1 bg-blue-500 rounded-full" />
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div>
            <div className="flex items-center gap-4 mb-8">
              <div className="p-3 bg-blue-500/10 rounded-xl text-blue-400 border border-blue-500/20">
                <GraduationCap className="w-6 h-6" />
              </div>
              <h3 className="text-2xl font-semibold text-white">Academic Background</h3>
            </div>

            <div className="space-y-8 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-slate-800 before:to-transparent">
              {education.map((edu, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: '-50px' }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active"
                >
                  <div className="flex items-center justify-center w-10 h-10 rounded-full border border-slate-800 bg-slate-900 text-slate-500 group-[.is-active]:text-blue-400 group-[.is-active]:border-blue-500/30 shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 z-10">
                    <BookOpen className="w-4 h-4" />
                  </div>
                  <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] p-6 rounded-2xl bg-slate-900/40 border border-slate-800/60 backdrop-blur-sm hover:border-slate-700/80 transition-colors">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-bold text-lg text-white">{edu.institution}</h4>
                      <span className="text-xs font-medium text-slate-500 bg-slate-800/50 px-2 py-1 rounded-md">{edu.dates}</span>
                    </div>
                    <p className="text-slate-400 text-sm leading-relaxed">{edu.degree}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          <div>
            <div className="flex items-center gap-4 mb-8">
              <div className="p-3 bg-emerald-500/10 rounded-xl text-emerald-400 border border-emerald-500/20">
                <Award className="w-6 h-6" />
              </div>
              <h3 className="text-2xl font-semibold text-white">Certifications</h3>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {certifications.map((cert, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true, margin: '-50px' }}
                  transition={{ duration: 0.4, delay: index * 0.05 }}
                  whileHover={{ y: -2 }}
                  className="p-4 rounded-xl bg-slate-900/40 border border-slate-800/60 backdrop-blur-sm flex items-start gap-3 hover:border-emerald-500/30 hover:bg-slate-900/60 transition-all group"
                >
                  <div className="mt-1 w-2 h-2 rounded-full bg-emerald-500/50 group-hover:bg-emerald-400 transition-colors shrink-0" />
                  <span className="text-sm font-medium text-slate-300 group-hover:text-slate-200 leading-snug">
                    {cert}
                  </span>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
