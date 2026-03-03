import React, { useState, useEffect } from 'react';
import { motion, useScroll, useSpring, AnimatePresence } from 'motion/react';
import { AnimatedBackground } from './components/AnimatedBackground';
import { Splash } from './components/Splash';
import { Hero } from './components/Hero';
import { Experience } from './components/Experience';
import { Achievements } from './components/Achievements';
import { Skills } from './components/Skills';
import { Education } from './components/Education';
import { ResumeView } from './components/ResumeView';
import resumeData from './data/resume.json';
import { Github, Linkedin, Mail, Phone, ExternalLink, X, Menu } from 'lucide-react';

export default function App() {
  const [showSplash, setShowSplash] = useState(true);
  const [showResume, setShowResume] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  useEffect(() => {
    // Prevent scrolling while splash is visible or resume/menu is open
    if (showSplash || showResume || mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [showSplash, showResume, mobileMenuOpen]);

  const handleNavClick = (id: string) => {
    setMobileMenuOpen(false);
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-50 font-sans selection:bg-blue-500/30 selection:text-blue-200">
      {showSplash && <Splash onComplete={() => setShowSplash(false)} />}
      
      {showResume && (
        <div className="fixed inset-0 z-[100] bg-slate-950 overflow-y-auto">
          <div className="sticky top-0 z-10 flex justify-end p-4 bg-slate-950/80 backdrop-blur-md border-b border-white/10">
            <button 
              onClick={() => setShowResume(false)}
              className="p-2 bg-slate-800 hover:bg-slate-700 rounded-full text-white transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
          <ResumeView data={resumeData} />
        </div>
      )}

      <AnimatedBackground />

      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-blue-500 origin-left z-50"
        style={{ scaleX }}
      />

      <nav className="fixed top-0 w-full z-40 bg-slate-950/50 backdrop-blur-md border-b border-white/5 transition-all duration-300">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <span className="text-xl font-bold tracking-tighter text-white">
            Aabid<span className="text-blue-500">.</span>
          </span>
          
          <div className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-400">
            <button onClick={() => handleNavClick('experience')} className="hover:text-white transition-colors">Experience</button>
            <button onClick={() => handleNavClick('achievements')} className="hover:text-white transition-colors">Impact</button>
            <button onClick={() => handleNavClick('skills')} className="hover:text-white transition-colors">Skills</button>
            <button onClick={() => handleNavClick('education')} className="hover:text-white transition-colors">Education</button>
          </div>
          
          <div className="hidden md:flex items-center gap-4">
            <button 
              onClick={() => setShowResume(true)}
              className="text-sm font-medium text-blue-400 hover:text-blue-300 transition-colors mr-4"
            >
              Resume
            </button>
            <a href={`mailto:${resumeData.basics.email}`} className="text-slate-400 hover:text-white transition-colors">
              <Mail className="w-5 h-5" />
            </a>
            <a href={resumeData.basics.links[0].url} target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-white transition-colors">
              <Linkedin className="w-5 h-5" />
            </a>
          </div>

          <button 
            className="md:hidden p-2 text-slate-400 hover:text-white"
            onClick={() => setMobileMenuOpen(true)}
          >
            <Menu className="w-6 h-6" />
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-0 z-50 bg-slate-950/95 backdrop-blur-xl flex flex-col items-center justify-center"
          >
            <button 
              className="absolute top-6 right-6 p-2 text-slate-400 hover:text-white"
              onClick={() => setMobileMenuOpen(false)}
            >
              <X className="w-8 h-8" />
            </button>
            
            <div className="flex flex-col items-center gap-8 text-2xl font-medium text-slate-300">
              <button onClick={() => handleNavClick('experience')} className="hover:text-white transition-colors">Experience</button>
              <button onClick={() => handleNavClick('achievements')} className="hover:text-white transition-colors">Impact</button>
              <button onClick={() => handleNavClick('skills')} className="hover:text-white transition-colors">Skills</button>
              <button onClick={() => handleNavClick('education')} className="hover:text-white transition-colors">Education</button>
              <button 
                onClick={() => {
                  setMobileMenuOpen(false);
                  setShowResume(true);
                }}
                className="text-blue-400 hover:text-blue-300 transition-colors mt-4"
              >
                View Resume
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <main className="relative z-10">
        <Hero data={resumeData.basics} onShowResume={() => setShowResume(true)} />
        <Achievements data={resumeData.achievements} />
        <Experience data={resumeData.experience} />
        <Skills data={resumeData.skills} />
        <Education education={resumeData.education} certifications={resumeData.certifications} />
      </main>

      <footer className="relative z-10 border-t border-white/5 bg-slate-950/80 backdrop-blur-md py-12 px-6">
        <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex flex-col items-center md:items-start gap-2">
            <span className="text-2xl font-bold tracking-tighter text-white">
              Aabid Basha Shaik
            </span>
            <span className="text-slate-500 text-sm text-center md:text-left">
              {resumeData.basics.title}
            </span>
          </div>
          
          <div className="flex flex-col items-center md:items-end gap-4">
            <div className="flex flex-col sm:flex-row items-center gap-4 text-slate-400">
              <a href={`mailto:${resumeData.basics.email}`} className="hover:text-white transition-colors flex items-center gap-2 text-sm">
                <Mail className="w-4 h-4" /> {resumeData.basics.email}
              </a>
              <a href={`tel:${resumeData.basics.phone}`} className="hover:text-white transition-colors flex items-center gap-2 text-sm">
                <Phone className="w-4 h-4" /> {resumeData.basics.phone}
              </a>
            </div>
            <div className="flex flex-wrap justify-center md:justify-end gap-2 text-xs text-slate-600">
              {resumeData.extra.map((text, i) => (
                <span key={i} className="px-2 py-1 rounded bg-slate-900 border border-slate-800 text-center">
                  {text.split(':')[0]}
                </span>
              ))}
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
