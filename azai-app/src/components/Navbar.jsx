import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="fixed top-0 w-full z-50 glass h-16 md:h-20 border-b border-white/10 flex items-center justify-between px-4 md:px-[8%]">
      <div className="flex items-center gap-4">
        <Link to="/" className="flex items-end gap-1.5 md:gap-2.5 text-sm md:text-xl font-extrabold tracking-[2px] uppercase">
          <img src="/logo.png" alt="AZYAB Logo" className="h-8 w-8 md:h-13 md:w-13 object-contain" />
          AZYAB<span className="text-accent">TECH</span>
        </Link>
      </div>
      
      <div className="hidden md:flex items-center gap-10">
        <Link to="/" className="text-[0.75rem] font-bold tracking-widest text-slate-400 hover:text-white transition-colors uppercase">
          Home
        </Link>
        <a href="#about" className="text-[0.75rem] font-bold tracking-widest text-slate-400 hover:text-white transition-colors uppercase">
          About
        </a>
        <a href="#work" className="text-[0.75rem] font-bold tracking-widest text-slate-400 hover:text-white transition-colors uppercase">
          Our Works
        </a>
      </div>

      <div className="flex items-center gap-4">
        <a href="#contact" className="btn-primary !px-3 md:!px-6 !py-1.5 md:!py-2 !text-[0.6rem] md:!text-[0.7rem]">
          <span className="hidden sm:inline">CONTACT US</span>
          <span className="sm:hidden">CONTACT</span>
        </a>
      </div>
    </nav>
  );
};

export default Navbar;
