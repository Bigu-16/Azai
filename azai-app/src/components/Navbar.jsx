import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <>
      <nav className="fixed top-0 w-full z-50 glass h-16 md:h-20 border-b border-white/10 flex items-center justify-between px-4 md:px-[8%]">
        <div className="flex items-center gap-4">
          <div className="flex items-center md:items-end gap-2 md:gap-2.5 text-sm md:text-xl font-extrabold tracking-[2px] uppercase">
            
            {/* Mobile Hamburger Toggle */}
            <button 
              className="md:hidden flex items-center justify-center text-white hover:text-accent transition-colors"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              <span className="material-symbols-outlined text-[26px]">
                {isMobileMenuOpen ? 'close' : 'menu'}
              </span>
            </button>

            {/* Desktop Logo */}
            <Link to="/" onClick={() => { window.scrollTo(0, 0); setIsMobileMenuOpen(false); }} className="hidden md:block">
              <img src="/logo.png" alt="AZYAB Logo" className="h-13 w-13 object-contain" />
            </Link>
            
            {/* Brand Text */}
            <Link to="/" onClick={() => { window.scrollTo(0, 0); setIsMobileMenuOpen(false); }} className="flex items-end mb-[1px] md:mb-0">
              AZYAB<span className="text-accent">TECH</span>
            </Link>
          </div>
        </div>
        
        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-10 absolute left-1/2 -translate-x-1/2">
          <a href="#about" className="text-[0.75rem] font-bold tracking-widest text-slate-400 hover:text-white transition-colors uppercase">
            About Us
          </a>
          <a href="#work" className="text-[0.75rem] font-bold tracking-widest text-slate-400 hover:text-white transition-colors uppercase">
            Our Works
          </a>
        </div>

        {/* Contact Button */}
        <div className="flex items-center gap-4">
          <a href="#contact" onClick={() => setIsMobileMenuOpen(false)} className="btn-primary !px-3 md:!px-6 !py-1.5 md:!py-2 !text-[0.6rem] md:!text-[0.7rem]">
            <span className="hidden sm:inline">CONTACT US</span>
            <span className="sm:hidden">CONTACT</span>
          </a>
        </div>
      </nav>

      {/* Mobile Dropdown Menu */}
      {isMobileMenuOpen && (
        <div className="fixed top-16 left-0 w-full glass border-b border-white/10 flex flex-col items-center py-6 gap-6 md:hidden z-40 bg-[#020617]/95 backdrop-blur-2xl shadow-2xl">
          <a 
            href="#about" 
            onClick={() => setIsMobileMenuOpen(false)} 
            className="text-sm font-bold tracking-widest text-slate-300 hover:text-accent transition-colors uppercase"
          >
            About Us
          </a>
          <a 
            href="#work" 
            onClick={() => setIsMobileMenuOpen(false)} 
            className="text-sm font-bold tracking-widest text-slate-300 hover:text-accent transition-colors uppercase"
          >
            Our Works
          </a>
        </div>
      )}
    </>
  );
};

export default Navbar;
