import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [theme, setTheme] = useState(() => {
    if (typeof window === 'undefined') return 'dark';
    return localStorage.getItem('azyab-theme') || 'dark';
  });

  useEffect(() => {
    document.documentElement.classList.toggle('light', theme === 'light');
    try { localStorage.setItem('azyab-theme', theme); } catch (e) {}
  }, [theme]);

  const toggleTheme = () => setTheme((t) => (t === 'light' ? 'dark' : 'light'));

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
          <Link to="/" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className="text-[0.75rem] font-bold tracking-widest text-slate-400 hover:text-white transition-colors uppercase">
            Home
          </Link>
          <a href="#about" className="text-[0.75rem] font-bold tracking-widest text-slate-400 hover:text-white transition-colors uppercase">
            About Us
          </a>
          <Link to="/projects" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className="text-[0.75rem] font-bold tracking-widest text-slate-400 hover:text-white transition-colors uppercase">
            Our Works
          </Link>
        </div>

        {/* Contact Button + Theme Toggle */}
        <div className="flex items-center gap-2 md:gap-4">
          <button
            onClick={toggleTheme}
            aria-label="Toggle light and dark mode"
            className="flex items-center justify-center w-9 h-9 md:w-10 md:h-10 rounded-full glass text-slate-300 hover:text-accent transition-colors"
          >
            <span className="material-symbols-outlined text-[20px]">
              {theme === 'light' ? 'dark_mode' : 'light_mode'}
            </span>
          </button>
          <a href="#contact" onClick={() => setIsMobileMenuOpen(false)} className="btn-primary !px-3 md:!px-6 !py-1.5 md:!py-2 !text-[0.6rem] md:!text-[0.7rem]">
            <span className="hidden sm:inline">CONTACT US</span>
            <span className="sm:hidden">CONTACT</span>
          </a>
        </div>
      </nav>

      {/* Mobile Dropdown Menu */}
      {isMobileMenuOpen && (
        <div className="fixed top-16 left-0 w-full glass border-b border-white/10 flex flex-col items-center py-6 gap-6 md:hidden z-40 bg-[#020617]/95 backdrop-blur-2xl shadow-2xl">
          <Link
            to="/"
            onClick={() => { window.scrollTo({ top: 0, behavior: 'smooth' }); setIsMobileMenuOpen(false); }}
            className="text-sm font-bold tracking-widest text-slate-300 hover:text-accent transition-colors uppercase"
          >
            Home
          </Link>
          <a
            href="#about"
            onClick={() => setIsMobileMenuOpen(false)} 
            className="text-sm font-bold tracking-widest text-slate-300 hover:text-accent transition-colors uppercase"
          >
            About Us
          </a>
          <Link
            to="/projects"
            onClick={() => { window.scrollTo({ top: 0, behavior: 'smooth' }); setIsMobileMenuOpen(false); }}
            className="text-sm font-bold tracking-widest text-slate-300 hover:text-accent transition-colors uppercase"
          >
            Our Works
          </Link>
        </div>
      )}
    </>
  );
};

export default Navbar;
