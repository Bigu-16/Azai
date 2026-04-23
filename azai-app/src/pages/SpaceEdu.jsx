import React from 'react';
import { motion } from 'framer-motion';

const SpaceEdu = () => {
  return (
    <div className="min-h-screen bg-nebula relative overflow-x-hidden flex flex-col pt-20">
      {/* Background Starfield specifically for this page if needed, but App.jsx has one */}
      
      {/* Main Content */}
      <main className="flex-grow flex flex-col md:flex-row items-center justify-center max-w-7xl mx-auto w-full px-8 gap-20 py-20">
        
        {/* Left Side: Earth Image */}
        <div className="w-full md:w-1/2 flex justify-center items-center relative h-[400px] md:h-[600px]">
          <motion.img 
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 0.9 }}
            transition={{ duration: 1.5, ease: "easeOut" }}
            alt="Earth from space" 
            className="object-cover rounded-full w-full max-w-[600px] aspect-square mix-blend-screen shadow-[0_0_100px_rgba(0,242,255,0.2)]"
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuBk9o2DXmAkY75MN2HSrZQqdHQIe-foer3uNvtrTnkdaZ-GnlbSDoLiBHBPpa_Ga3E1n-jgk5UzoxBFdXpcGxABzHSe1lFfcPAiKaaFHnAghK9t0ty2I3OpVJgjnO0Tstous1F-AhW6v1_NYeuByga7mK1ZCovPuDRzCc8kxQYWU2s6a_dKQIwSQ_2Q0l5dk70g10d20V52pbU3vWTbEWT6Z8SYDxfl9M6PqtzWqUbSm8Lb3bZYfU7aK_jDBKtzTQFzMIaKhhMPh9E"
          />
          {/* Subtle glow pulse around Earth */}
          <div className="absolute inset-0 rounded-full bg-cyan-500/10 blur-[100px] animate-pulse-glow pointer-events-none" />
        </div>

        {/* Right Side: Content */}
        <div className="w-full md:w-1/2 flex flex-col items-start justify-center text-left">
          <motion.span 
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 0.8 }}
            transition={{ delay: 0.5 }}
            className="font-sans text-sm text-accent tracking-[0.3em] uppercase mb-4"
          >
            THE BLUE PLANET
          </motion.span>
          
          <motion.h1 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.7 }}
            className="font-serif text-7xl md:text-8xl text-white mb-6 uppercase tracking-wider"
          >
            EARTH
          </motion.h1>
          
          <motion.p 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.9 }}
            className="font-sans text-lg text-slate-400 max-w-md mb-8 leading-relaxed"
          >
            Our home. A fragile, complex ecosystem suspended in the vastness of space. It is the only known harbor of life in the universe, a brilliant blue marble characterized by its abundant liquid water, dynamic atmosphere, and staggering biodiversity.
          </motion.p>
          
          <motion.div 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 1.1 }}
            className="flex items-center gap-6"
          >
            <button className="btn-primary flex items-center gap-2">
              LEARN MORE
            </button>
            <button className="w-12 h-12 rounded-full border border-accent/50 flex items-center justify-center text-accent hover:bg-accent/10 transition-all group">
              <span className="material-symbols-outlined text-2xl group-hover:scale-110 transition-transform">play_arrow</span>
            </button>
          </motion.div>
        </div>
      </main>

      {/* Stats Section (Added for richness) */}
      <section className="py-20 border-t border-white/5 bg-black/20">
        <div className="max-w-7xl mx-auto px-8 grid grid-cols-2 md:grid-cols-4 gap-10">
          <Stat label="Diameter" value="12,742 km" />
          <Stat label="Day Length" value="24 Hours" />
          <Stat label="Orbit Period" value="365.25 Days" />
          <Stat label="Distance from Sun" value="149.6M km" />
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-950/90 backdrop-blur-md border-t border-white/5 py-12 px-8">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center text-slate-500 text-xs tracking-widest uppercase">
          <div className="text-xl font-black text-white mb-4 md:mb-0">SpaceEdu</div>
          <div className="flex gap-8 mb-4 md:mb-0">
            <a href="#" className="hover:text-accent transition-colors">Privacy</a>
            <a href="#" className="hover:text-accent transition-colors">Navigation</a>
            <a href="#" className="hover:text-accent transition-colors">Support</a>
          </div>
          <div>© 2024 SpaceEdu Galactic. All orbits reserved.</div>
        </div>
      </footer>
    </div>
  );
};

const Stat = ({ label, value }) => (
  <div className="flex flex-col gap-1">
    <p className="text-[0.65rem] text-accent tracking-widest uppercase opacity-60">{label}</p>
    <p className="text-2xl font-serif text-white">{value}</p>
  </div>
);

export default SpaceEdu;
