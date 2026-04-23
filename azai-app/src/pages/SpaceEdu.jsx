import React from 'react';
import { motion } from 'framer-motion';

const planets = [
  {
    name: 'Venus',
    tagline: 'THE MORNING STAR',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBbpklZ6yDdlsAFKzdkSGmtTEu6Dwf_LD_BFDeA1QFOk_orPHC3AoAJzv0N26nCd6COvLl8LI_b1f7AztxZmS5FYvjYJ-elqY1xYj6B2viix58Nu6dpXMygnCsYidgtxSwfy4tU5RQ1R_X1or1lW4igVbYxZvm_L4BSXPpcMBsXmMWo_opLuo36XXycyqERviCYrBQtNsH1dzQqoDeGebDLLutAQyu_-XYejbLoFocVI0FLgl7xFV8aF942jFZS6asQwx0UYCvzK_w',
    description: 'Second planet from the Sun and our closest planetary neighbor. Venus is similar in structure and size to Earth.',
    color: 'rgba(255, 200, 100, 0.4)'
  },
  {
    name: 'Earth',
    tagline: 'THE BLUE PLANET',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuA8d5a7rWXknRFDt6NecifxDbE4c1E_WD6Korcz5_tDyE2QJJ6zvnK6hF_trZvz7wd2aBb7bi0GrKRBbvBfoduR1mSAez8iEwmMim2C4d5EoITHlXhxdscTlshasso5Q2DlPBnOM_ic3UamQo6BN-ReFwomSH7DUjy_gasI3L7Mp8SO1d927ApYsssv4zjlsStsOIRKl-IDvjJKh8gNf7nAiDyR39aa23qTVemOIhm4ukI7tjuCGzTPdUSKWsJiBmHGLwSaGnwL9Fg',
    description: 'Our home. A fragile, complex ecosystem suspended in the vastness of space. It is the only known harbor of life in the universe.',
    color: 'rgba(0, 150, 255, 0.4)'
  },
  {
    name: 'Mars',
    tagline: 'THE RED PLANET',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuASegDzRh68dPwPqzEBA30y8My-u4f_dXWNtsorvpOpEh8eLmNNH4SS23dCeYSJSYkcmCUqpi_ciBCmIB1YxC36YcafDxxvb3g0fbEHGJyj4LhNOICWwuEIntnSDmsBASGgnsbT9kS6kJ9WvJG-LQq1E4yRgT6oRITjLwNZyDfIETIavpCrWsjlGukfN5sU2_8M0hzZE5lzkLsDN9YbW0wBeIc9_LeoHsCWgE8g3BMb27OOwm4J9WIsOxHCZb_uTdSD5oMx2hfbsqE',
    description: 'Mars is a dusty, cold, desert world with a very thin atmosphere. There is strong evidence Mars was once much wetter and warmer.',
    color: 'rgba(255, 100, 50, 0.4)'
  },
  {
    name: 'Jupiter',
    tagline: 'THE GAS GIANT',
    image: 'https://images.unsplash.com/photo-1630839437035-dac17da580d0?q=80&w=2000',
    description: 'Jupiter is more than twice as massive than all the other planets combined. Its Great Red Spot is a storm larger than Earth.',
    color: 'rgba(255, 180, 140, 0.4)'
  },
  {
    name: 'Saturn',
    tagline: 'THE RINGED WORLD',
    image: 'https://images.unsplash.com/photo-1614732414444-096e5f1122d5?q=80&w=2000',
    description: 'Adorned with a dazzling, complex system of icy rings, Saturn is unique in our solar system and exceptionally beautiful.',
    color: 'rgba(230, 210, 160, 0.4)'
  }
];

const SpaceEdu = () => {
  const [activeIndex, setActiveIndex] = React.useState(1); // Start with Earth

  React.useEffect(() => {
    const timer = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % planets.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  const getShiftedIndex = (index) => {
    const total = planets.length;
    let diff = index - activeIndex;
    if (diff > total / 2) diff -= total;
    if (diff < -total / 2) diff += total;
    return diff;
  };

  return (
    <div className="min-h-screen bg-[#050810] text-white selection:bg-primary/30 selection:text-white overflow-x-hidden">
      
      {/* SECTION 1: DYNAMIC PLANET ORBITAL HERO */}
      <section className="relative min-h-screen flex flex-col items-center justify-center pt-20 px-8 overflow-hidden">
        {/* Deep Space Background & Starfield */}
        <div className="absolute inset-0 z-0 pointer-events-none">
          <div className="absolute inset-0 bg-gradient-to-b from-[#060b14] to-[#020408]"></div>
          <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1506318137071-a8e063b4bec0?q=80&w=3000&auto=format&fit=crop')] bg-cover bg-center opacity-20 mix-blend-screen"></div>
        </div>

        {/* Orbital Carousel Container */}
        <div className="relative w-full max-w-7xl h-[600px] flex items-center justify-center z-40">
          {planets.map((planet, index) => {
            const shiftedIndex = getShiftedIndex(index);
            const isCenter = shiftedIndex === 0;
            const isLeft = shiftedIndex < 0;
            const isRight = shiftedIndex > 0;
            
            // Logic for "Horizontal Circle" positioning
            const xOffset = isCenter ? 0 : isLeft ? -100 : 100;
            const opacity = isCenter ? 1 : Math.abs(shiftedIndex) === 1 ? 0.3 : 0;
            const scale = isCenter ? 1 : 0.4;
            const zIndex = isCenter ? 50 : 20;

            return (
              <motion.div
                key={planet.name}
                initial={false}
                animate={{
                  x: `${shiftedIndex * 45}%`,
                  scale: scale,
                  opacity: opacity,
                  zIndex: zIndex,
                }}
                transition={{ duration: 1.5, ease: [0.32, 0.72, 0, 1] }}
                onClick={() => setActiveIndex(index)}
                className={`absolute flex flex-col items-center cursor-pointer transition-all duration-500 ${isCenter ? 'pointer-events-auto' : 'pointer-events-auto hover:opacity-60'}`}
              >
                {/* Planet Image Component (Small when off-center, Name big when center) */}
                {!isCenter && (
                  <div className="flex flex-center items-center gap-6">
                    {isRight && (
                      <span className="font-sans text-[0.6rem] tracking-[0.3em] text-white/80 uppercase">
                        {planet.name}
                      </span>
                    )}
                    <div className={`w-24 h-24 rounded-full overflow-hidden border border-white/5 shadow-[0_0_20px_rgba(255,255,255,0.05)]`}>
                      <img alt={planet.name} className="w-full h-full object-cover" src={planet.image}/>
                    </div>
                    {isLeft && (
                      <span className="font-sans text-[0.6rem] tracking-[0.3em] text-white/80 uppercase">
                        {planet.name}
                      </span>
                    )}
                  </div>
                )}

                {/* Central Focus Content */}
                {isCenter && (
                  <div className="flex flex-col items-center text-center max-w-2xl px-4">
                    <motion.p 
                      initial={{ y: 20, opacity: 0 }}
                      animate={{ y: 0, opacity: 0.8 }}
                      className="font-sans text-sm text-white tracking-[0.4em] uppercase mb-4 opacity-80"
                    >
                      PLANET
                    </motion.p>
                    <motion.h1 
                      initial={{ y: 30, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      className="font-serif text-[80px] md:text-[120px] leading-none text-white uppercase tracking-wider mb-6 drop-shadow-lg"
                    >
                      {planet.name}
                    </motion.h1>
                    <motion.div 
                      key={`line-${planet.name}`}
                      initial={{ scaleX: 0 }}
                      animate={{ scaleX: 1 }}
                      transition={{ duration: 1.2 }}
                      className="w-24 h-[3px] bg-accent shadow-[0_0_15px_#00f2ff] mb-8"
                    ></motion.div>
                    <motion.p 
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 0.9 }}
                      className="text-white/90 font-sans text-sm md:text-base leading-loose mb-12"
                    >
                      {planet.description}
                    </motion.p>
                    <motion.button 
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="px-8 py-4 bg-white text-black font-sans text-xs font-bold uppercase tracking-[0.15em] rounded-full shadow-[0_0_30px_rgba(255,255,255,0.15)]"
                    >
                      EXPLORE {planet.name}
                    </motion.button>
                  </div>
                )}
              </motion.div>
            );
          })}
        </div>

        {/* Bottom Visual Anchor: Dynamic Giant Planet */}
        <div 
          className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[140vw] max-w-[1200px] z-20 pointer-events-none"
        >
          <motion.div 
            key={planets[activeIndex].name}
            initial={{ y: "60%", opacity: 0, rotate: -10 }}
            animate={{ y: "20%", opacity: 1, rotate: 0 }}
            transition={{ duration: 2.5, ease: "easeOut" }}
            className="relative w-full aspect-square rounded-full"
          >
            <div 
              className="absolute inset-0 rounded-full blur-[40px]" 
              style={{ backgroundColor: planets[activeIndex].color }}
            />
            <img 
              alt={planets[activeIndex].name} 
              className="w-full h-full object-cover rounded-full opacity-60 mix-blend-screen" 
              src={planets[activeIndex].image}
            />
            <div className="absolute inset-0 rounded-full shadow-[inset_0_0_100px_rgba(255,255,255,0.1)]"></div>
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-50 animate-bounce">
          <span className="material-symbols-outlined text-white text-3xl opacity-30">keyboard_double_arrow_down</span>
        </div>
      </section>

      {/* SECTION 2: EARTH EXACT REPLICATION REFINEMENT (Exploration) */}
      <section className="relative min-h-screen bg-background text-on-background py-32 px-8 flex flex-col items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-[-1] bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-[#0b1121] via-background to-black opacity-60"></div>
        
        <div className="flex flex-col md:flex-row items-center justify-center max-w-[1280px] mx-auto w-full gap-24 relative z-10">
          {/* Left Side: Earth Image */}
          <motion.div 
            initial={{ scale: 0.7, opacity: 0, rotate: -5 }}
            whileInView={{ scale: 1, opacity: 0.9, rotate: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 2.5, ease: "easeOut" }}
            className="w-full md:w-1/2 flex justify-center items-center relative h-[512px] md:h-[716px]"
          >
            <img alt="Earth from space" 
                 className="object-cover rounded-full w-full max-w-[600px] h-auto aspect-square mix-blend-screen opacity-90 shadow-[0_0_100px_rgba(0,242,255,0.2)]" 
                 src="https://lh3.googleusercontent.com/aida-public/AB6AXuBk9o2DXmAkY75MN2HSrZQqdHQIe-foer3uNvtrTnkdaZ-GnlbSDoLiBHBPpa_Ga3E1n-jgk5UzoxBFdXpcGxABzHSe1lFfcPAiKaaFHnAghK9t0ty2I3OpVJgjnO0Tstous1F-AhW6v1_NYeuByga7mK1ZCovPuDRzCc8kxQYWU2s6a_dKQIwSQ_2Q0l5dk70g10d20V52pbU3vWTbEWT6Z8SYDxfl9M6PqtzWqUbSm8Lb3bZYfU7aK_jDBKtzTQFzMIaKhhMPh9E"/>
          </motion.div>

          {/* Right Side: Content */}
          <motion.div 
            initial={{ x: 100, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 2, ease: "easeOut" }}
            className="w-full md:w-1/2 flex flex-col items-start justify-center text-left"
          >
            <span className="font-sans text-[0.7rem] text-accent tracking-widest uppercase mb-4 opacity-80">
              THE BLUE PLANET
            </span>
            <h1 className="font-serif text-[clamp(3rem,8vw,6rem)] text-white mb-6 uppercase tracking-wider leading-none">
              EARTH
            </h1>
            <p className="font-sans text-body-lg text-on-surface-variant max-w-md mb-8 leading-relaxed">
              Our home. A fragile, complex ecosystem suspended in the vastness of space. It is the only known harbor of life in the universe, a brilliant blue marble characterized by its abundant liquid water, dynamic atmosphere, and staggering biodiversity.
            </p>
            <div className="flex items-center gap-6">
              <button className="bg-white text-[#00363a] px-8 py-3 rounded-full font-sans text-xs font-bold tracking-widest hover:shadow-[0_0_25px_rgba(0,242,255,0.5)] transition-all">
                LEARN MORE
              </button>
              <button className="w-12 h-12 rounded-full border border-accent/50 flex items-center justify-center text-accent hover:bg-accent/10 hover:shadow-[0_0_15px_rgba(0,242,255,0.3)] transition-all group">
                <span className="material-symbols-outlined text-2xl group-hover:scale-110 transition-transform">play_arrow</span>
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-slate-950/90 backdrop-blur-md text-accent font-serif text-[0.6rem] tracking-widest uppercase border-t border-white/5 w-full py-12 px-8 flex flex-col md:flex-row justify-between items-center z-50">
        <div className="text-lg font-black text-white mb-4 md:mb-0">SpaceEdu</div>
        <div className="flex gap-10 mb-4 md:mb-0 opacity-60">
          <a className="hover:text-white transition-colors" href="#">Privacy Protocol</a>
          <a className="hover:text-white transition-colors" href="#">Navigation Charts</a>
          <a className="hover:text-white transition-colors" href="#">Contact Command</a>
        </div>
        <div className="opacity-40">
          © 2024 SpaceEdu Galactic. All orbits reserved.
        </div>
      </footer>
    </div>
  );
};

export default SpaceEdu;

