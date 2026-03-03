import React from 'react';
import { motion } from 'motion/react';
import { Code2, Cloud, Terminal, Database, Shield, Cpu } from 'lucide-react';

interface SkillsProps {
  data: any[];
}

export const Skills: React.FC<SkillsProps> = ({ data }) => {
  const getIcon = (group: string) => {
    switch (group) {
      case 'Top Skills': return <Code2 className="w-5 h-5 text-blue-400" />;
      case 'Cloud & Infrastructure': return <Cloud className="w-5 h-5 text-cyan-400" />;
      case 'CI/CD & GitOps': return <Terminal className="w-5 h-5 text-emerald-400" />;
      case 'Observability': return <Database className="w-5 h-5 text-purple-400" />;
      default: return <Cpu className="w-5 h-5 text-slate-400" />;
    }
  };

  return (
    <section id="skills" className="py-24 px-6 relative z-10">
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6 }}
          className="mb-16 text-right"
        >
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-4 tracking-tight">
            Technical Arsenal
          </h2>
          <div className="w-20 h-1 bg-blue-500 rounded-full ml-auto" />
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {data.map((group, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="p-8 rounded-3xl bg-slate-900/40 border border-slate-800/60 backdrop-blur-sm"
            >
              <div className="flex items-center gap-4 mb-6">
                <div className="p-3 bg-slate-800/50 rounded-xl border border-slate-700/50">
                  {getIcon(group.group)}
                </div>
                <h3 className="text-xl font-semibold text-white tracking-wide">
                  {group.group}
                </h3>
              </div>

              <div className="flex flex-wrap gap-3">
                {group.items.map((skill: string, i: number) => (
                  <motion.span
                    key={i}
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.3, delay: i * 0.05 }}
                    whileHover={{ scale: 1.05, backgroundColor: 'rgba(59, 130, 246, 0.1)' }}
                    className="px-4 py-2 rounded-full bg-slate-800/50 text-slate-300 text-sm font-medium border border-slate-700/50 hover:border-blue-500/50 hover:text-blue-400 transition-colors cursor-default"
                  >
                    {skill}
                  </motion.span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
