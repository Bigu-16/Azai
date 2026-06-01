import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="fixed top-0 w-full z-50 glass h-20 border-b border-white/10 flex items-center justify-between px-8 md:px-[8%]">
      <div className="flex items-center gap-4">
        <Link to="/" className="text-xl font-extrabold tracking-[2px] uppercase">
          AZYAB<span className="text-accent">TECH</span>
        </Link>
      </div>
      
      <div className="hidden md:flex items-center gap-10">
        <Link to="/" className="text-[0.75rem] font-bold tracking-widest text-slate-400 hover:text-white transition-colors uppercase">
          Home
        </Link>
        <Link to="/space-edu" className="text-[0.75rem] font-bold tracking-widest text-slate-400 hover:text-white transition-colors uppercase">
          SpaceEdu
        </Link>
        <a href="#work" className="text-[0.75rem] font-bold tracking-widest text-slate-400 hover:text-white transition-colors uppercase">
          Work
        </a>
      </div>

      <div className="flex items-center gap-4">
        <a href="#contact" className="btn-primary !px-6 !py-2 !text-[0.7rem]">
          CONTACT US
        </a>
      </div>
    </nav>
  );
};

export default Navbar;
