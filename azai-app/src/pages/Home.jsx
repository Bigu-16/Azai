import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

const services = [
  {
    icon: "https://img.icons8.com/fluency/240/null/smartphone.png",
    title: "Mobile Apps",
    tagline: "IOS & ANDROID NATIVE",
    bgImage: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?q=80&w=2000",
    description: "Architecting buttery-smooth mobile experiences. We specialize in high-performance native development that pushes the boundaries of touch-first interaction.",
    color: "#00f2ff",
    solutionTagline: "CLEAN ARCHITECTURE & FLUTTER",
    solutionTitle: "MOBILE EXCELLENCE",
    solutionDescription: "We build high-performance mobile applications using Flutter, Google's UI toolkit for native compilation. Our development is rooted in Clean Architecture principles, ensuring a strict separation of concerns that makes our apps modular, testable, and future-proof.",
    solutionImage: "https://images.unsplash.com/photo-1551650975-87deedd944c3?q=80&w=2000"
  },
  {
    icon: "https://img.icons8.com/fluency/240/null/web.png",
    title: "Web Platforms",
    tagline: "SCALABLE SAAS ARCHITECTURE",
    bgImage: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=2000",
    description: "From complex SaaS dashboards to high-conversion digital hubs. Our web platforms are engineered for speed, scale, and uncompromising precision.",
    color: "#b464ff",
    solutionTagline: "REACT & SCALABLE SAAS",
    solutionTitle: "WEB PLATFORMS",
    solutionDescription: "Our web architecture leverages React and Next.js to deliver high-performance, SEO-optimized experiences. We focus on modular frontend patterns and micro-frontend architectures to ensure your platform remains scalable and easy to maintain as it grows.",
    solutionImage: "https://images.unsplash.com/photo-1547658719-da2b51169166?q=80&w=2000"
  },
  {
    icon: "https://img.icons8.com/fluency/240/null/artificial-intelligence.png",
    title: "Cloud & AI",
    tagline: "AUTONOMOUS BACKEND SYSTEMS",
    bgImage: "https://images.unsplash.com/photo-1677442136019-21780ecad995?q=80&w=2000",
    description: "The digital spine of your enterprise. We deploy massive-scale cloud infrastructures and custom AI neural networks to automate your commercial destiny.",
    color: "#ff6496",
    solutionTagline: "NODE.JS & NEURAL NETWORKS",
    solutionTitle: "CLOUD & AI SYSTEMS",
    solutionDescription: "We architect robust backend systems using Node.js and Python, specialized for AI integration. By employing serverless computing and distributed system patterns, we ensure your AI workflows are efficient, cost-effective, and capable of handling massive datasets.",
    solutionImage: "https://images.unsplash.com/photo-1509062522246-3755977927d7?q=80&w=2000"
  }
];

const Home = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [activeService, setActiveService] = useState(1);
  const [selectedSolution, setSelectedSolution] = useState(1);

  useEffect(() => {
    const handleMouseMove = (e) => {
      const x = (e.clientX - window.innerWidth / 2) * 0.01;
      const y = (e.clientY - window.innerHeight / 2) * 0.01;
      setMousePosition({ x, y });
    };
    window.addEventListener('mousemove', handleMouseMove);

    const timer = setInterval(() => {
      setActiveService((prev) => (prev + 1) % services.length);
    }, 3000);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      clearInterval(timer);
    };
  }, []);

  const getShiftedIndex = (index) => {
    const total = services.length;
    let diff = index - activeService;
    if (diff > total / 2) diff -= total;
    if (diff < -total / 2) diff += total;
    return diff;
  };

  return (
    <div className="pt-20">
      {/* HERO SECTION */}
      <section id="hero" className="min-h-screen flex flex-col items-center justify-center relative px-8">
        <motion.img 
          src="https://cdni.iconscout.com/illustration/premium/thumb/abstract-3d-shape-5692015-4743204.png"
          className="absolute w-[500px] opacity-60 pointer-events-none"
          animate={{
            x: mousePosition.x * 2 - 250, // centering adjustment
            y: mousePosition.y * 2 - 250,
            rotate: [0, 5, 0],
            scale: [1, 1.05, 1],
          }}
          transition={{
            x: { type: 'spring', stiffness: 50, damping: 20 },
            y: { type: 'spring', stiffness: 50, damping: 20 },
            rotate: { duration: 10, repeat: Infinity, ease: "easeInOut" },
            scale: { duration: 10, repeat: Infinity, ease: "easeInOut" }
          }}
          style={{ left: '50%', top: '45%', transform: 'translate(-50%, -50%)' }}
        />
        
        <div className="z-10 text-center max-w-[800px]">
          <p className="section-tag">Digital Software Studio</p>
          <h1 className="text-[clamp(4rem,15vw,10rem)] font-display tracking-[-5px] leading-[0.9] bg-gradient-to-b from-white to-[#444] bg-clip-text text-transparent uppercase">
            AZAI
          </h1>
          <p className="text-slate-400 my-8 mx-auto max-w-[550px] leading-relaxed text-lg">
            We transform complex ideas into elegant digital products. Specialized in high-performance 
            mobile apps and scalable cloud ecosystems.
          </p>
          <a href="#work" className="btn-primary">VIEW OUR WORK</a>
        </div>
      </section>

      {/* SERVICES SECTION */}
      <section id="services" className="relative min-h-screen flex flex-col items-center pt-40 pb-20 overflow-hidden">
        {/* Cinematic Backdrop - Now Dynamic */}
        <div className="absolute inset-0 z-0 pointer-events-none">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,_rgba(15,23,42,0.8)_0%,_transparent_100%)]" />
          <motion.div 
            key={services[activeService].bgImage}
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.08 }}
            transition={{ duration: 2 }}
            className="absolute inset-0 bg-cover bg-center mix-blend-screen"
            style={{ backgroundImage: `url(${services[activeService].bgImage})` }}
          />
        </div>

        <div className="relative z-10 text-center mb-12">
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="section-tag"
          >
            Our Expertise
          </motion.p>
        </div>
        
        {/* Orbital Carousel Container */}
        <div className="relative w-full max-w-7xl h-[450px] flex items-center justify-center z-40">
          {services.map((service, index) => {
            // Minimal Orbital Math
            const total = services.length;
            const angle = ((index - activeService) / total) * 2 * Math.PI;
            
            const x = Math.sin(angle) * 30; // Compact displacement
            const z = Math.cos(angle);
            
            const isCenter = Math.abs(x) < 5 && z > 0.5;
            const scale = isCenter ? 1.0 : 0.6;
            const opacity = isCenter ? 1 : 0.4; 
            const zIndex = Math.round(z * 100) + 50;

            return (
              <motion.div
                key={service.title}
                initial={false}
                animate={{
                  x: `${x}vw`,
                  scale: scale,
                  opacity: opacity,
                  zIndex: zIndex,
                }}
                transition={{ duration: 1.2, ease: [0.32, 0.72, 0, 1] }}
                onClick={() => setActiveService(index)}
                className={`absolute flex flex-col items-center cursor-pointer transition-all duration-500 ${isCenter ? 'pointer-events-auto' : 'pointer-events-auto hover:opacity-80'}`}
              >
                {/* Orbital Icon Navigation */}
                {!isCenter && (
                  <div className="flex flex-col items-center gap-4">
                    <div className="w-14 h-14 md:w-16 md:h-16 rounded-full glass flex items-center justify-center p-3">
                      <img alt={service.title} className="w-full h-full object-contain opacity-60" src={service.icon}/>
                    </div>
                    <span className="font-sans text-[0.5rem] tracking-[0.3em] text-white/40 uppercase">
                      {service.title}
                    </span>
                  </div>
                )}

                {/* Central Focus Content */}
                {isCenter && (
                  <div className="flex flex-col items-center text-center max-w-3xl px-6">
                    <motion.p 
                      initial={{ y: 20, opacity: 0 }}
                      animate={{ y: 0, opacity: 0.8 }}
                      className="font-sans text-[0.6rem] text-accent tracking-[0.4em] uppercase mb-4"
                    >
                      {service.tagline}
                    </motion.p>
                    <motion.h3 
                      initial={{ y: 30, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      className="font-display text-[40px] md:text-[64px] leading-none text-white uppercase tracking-tighter mb-8 bg-gradient-to-b from-white to-white/40 bg-clip-text text-transparent"
                    >
                      {service.title}
                    </motion.h3>
                    <motion.div 
                      key={`line-${service.title}`}
                      initial={{ scaleX: 0 }}
                      animate={{ scaleX: 1 }}
                      transition={{ duration: 1 }}
                      className="w-16 h-[2px] bg-accent shadow-[0_0_15px_rgba(0,242,255,0.5)] mb-8"
                    ></motion.div>
                    <motion.p 
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 0.9 }}
                      className="text-slate-400 font-sans text-base md:text-lg leading-relaxed mb-10 max-w-lg"
                    >
                      {service.description}
                    </motion.p>
                    <motion.button 
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => {
                        setSelectedSolution(index);
                        document.getElementById('solutions').scrollIntoView({ behavior: 'smooth' });
                      }}
                      className="btn-primary"
                    >
                      EXPLORE SOLUTIONS
                    </motion.button>
                  </div>
                )}
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* SOLUTIONS DETAIL SECTION (Based on SpaceEdu design) */}
      <section id="solutions" className="relative min-h-screen bg-slate-950 text-white py-32 px-8 flex flex-col items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0 bg-[radial-gradient(ellipse_at_center,_#0b1121_0%,_#020408_100%)] opacity-60"></div>
        
        <div className="flex flex-col md:flex-row items-center justify-center max-w-[1280px] mx-auto w-full gap-24 relative z-10">
          {/* Left Side: Technical Visual */}
          <motion.div 
            key={`img-${services[selectedSolution].title}`}
            initial={{ scale: 0.8, opacity: 0, rotate: -5 }}
            whileInView={{ scale: 1, opacity: 1, rotate: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1.5, ease: "easeOut" }}
            className="w-full md:w-1/2 flex justify-center items-center relative"
          >
            <div className="relative group">
              <div 
                className="absolute inset-0 rounded-3xl blur-3xl opacity-20 group-hover:opacity-40 transition-opacity duration-1000"
                style={{ backgroundColor: services[selectedSolution].color }}
              />
              <img 
                alt={services[selectedSolution].title} 
                className="object-cover rounded-3xl w-full max-w-[500px] h-auto aspect-[4/5] md:aspect-[3/4] shadow-2xl border border-white/10" 
                src={services[selectedSolution].solutionImage}
              />
            </div>
          </motion.div>

          {/* Right Side: Content */}
          <motion.div 
            key={`content-${services[selectedSolution].title}`}
            initial={{ x: 50, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.2, ease: "easeOut" }}
            className="w-full md:w-1/2 flex flex-col items-start justify-center text-left"
          >
            <span className="font-sans text-[0.7rem] text-accent tracking-[0.5em] uppercase mb-4 opacity-80">
              {services[selectedSolution].solutionTagline}
            </span>
            <h2 className="font-display text-[clamp(2.5rem,6vw,4.5rem)] text-white mb-8 uppercase tracking-tight leading-none">
              {services[selectedSolution].solutionTitle}
            </h2>
            <div className="w-20 h-[1px] bg-accent/50 mb-10"></div>
            <p className="font-sans text-lg text-slate-400 max-w-lg mb-12 leading-relaxed">
              {services[selectedSolution].solutionDescription}
            </p>
            <div className="flex items-center gap-8">
              <button className="btn-primary">
                TECHNICAL SPEC
              </button>
              <button className="flex items-center gap-3 text-white/60 hover:text-accent transition-colors group">
                <span className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center group-hover:border-accent/50">
                  <span className="material-symbols-outlined text-xl">play_arrow</span>
                </span>
                <span className="text-xs font-bold tracking-widest uppercase">Video Overview</span>
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* WORK SECTION */}
      <section id="work" className="py-32 flex flex-col items-center overflow-hidden">
        <p className="section-tag">Portfolio</p>
        <h2 className="text-[clamp(2.5rem,5vw,4rem)] mb-16 text-center">Selected Projects</h2>
        <OrbitalProjectViewer />
      </section>

      {/* CONTACT SECTION */}
      <section id="contact" className="py-32 px-8 flex flex-col items-center">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 w-full max-w-5xl glass p-10 md:p-16 rounded-[40px]">
          <div className="flex flex-col">
            <p className="section-tag !text-left">Contact</p>
            <h2 className="text-[3rem] mb-6 !text-left">Ready to start your journey?</h2>
            <p className="text-slate-400 leading-[1.8] mt-4">
              Have a project in mind? We'd love to hear about it. Send us a message and our team will get back to you within 24 hours.
            </p>
            <div className="mt-10">
              <p className="font-bold">Email us:</p>
              <p className="text-accent">hello@azaitech.studio</p>
            </div>
          </div>
          <form className="flex flex-col gap-5">
            <input type="text" placeholder="Your Name" className="bg-white/5 border border-white/10 rounded-xl p-4 text-white outline-none focus:border-accent transition-colors" />
            <input type="email" placeholder="Your Email" className="bg-white/5 border border-white/10 rounded-xl p-4 text-white outline-none focus:border-accent transition-colors" />
            <textarea rows="5" placeholder="Tell us about your project..." className="bg-white/5 border border-white/10 rounded-xl p-4 text-white outline-none focus:border-accent transition-colors"></textarea>
            <button className="btn-primary w-full">SEND MESSAGE</button>
          </form>
        </div>
      </section>

      <footer className="py-16 text-center text-slate-600 text-xs tracking-[2px] uppercase">
        <p>&copy; 2024 AZAI TECH STUDIO &bull; BUILT FOR THE FUTURE</p>
      </footer>
    </div>
  );
};


export default Home;

const portfolioProjects = [
  {
    id: 1,
    title: "Nova Wallet App",
    tag: "MOBILE / FINTECH",
    heading: "HARNESS THE POWER OF INNOVATION •",
    description: "A BURST OF PRECISION DIGITAL DESIGN WILL IGNITE YOUR SENSES AND FUEL YOUR CORE PEAK PERFORMANCE.",
    mainImage: "https://images.unsplash.com/photo-1616469829581-73993eb86b02?q=80&w=2070&auto=format&fit=crop",
    floatingItems: [
      {
        type: "image",
        src: "https://lh3.googleusercontent.com/aida-public/AB6AXuBoi8jtaxdtjlcU0ylWqpfdGSRoHwBS4DvrwwYP3x8jcqaRIYEo348i1Cud6iPBUzYe4w659p-vJSgN4mvfVzFHk0UxgapWw2T6UjZVT3sX9xcBHrXJv41FyKpE8IrNR_oANp-4k_hIC2ntuzVyVNv1G0fKzLT1CLTgUQa4dvtVOav6ozH58ZcQ7rpx8wUQ1sNFfejLUTsaqBVEcWDaTurgqsrSnM-VbePU7b5Krac36hDmDLlkw-iN1okWVr_PFLgkIotAjTsUs9CB",
        top: "15%", left: "-15%",
        animation: "animate-[bounce_4s_infinite]",
        width: "w-14", height: "h-14"
      },
      {
        type: "image",
        src: "https://lh3.googleusercontent.com/aida-public/AB6AXuB5PrJe96dcMWLme3F1cEcvDlL4WzSYPZLI6FlwoTtbcKzJN0Wu13Hkzcu6ouGS6OR5dMpJcF56YG37Ka37Fk30oZ5eifYfeyde9oZ2ky9uQOmHzfzWWojUIJwA-TiW9QYQYgJBU9E8TuM3oECYJmy_o-Ln9zqGOhIwx4YVFY2U2mIZFpYQ5AWBCYrC8hWjaEMhhC6tIiOsIY5FOnvkIK6bHRR25CmV01KcgbKVx1a9FSY-xKQ4I807U8tsxmkdFIzSQlJ0nrcdPxQl",
        top: "-15%", left: "50%", transform: "translateX(-50%)",
        animation: "animate-[bounce_5s_infinite]",
        width: "w-16", height: "h-16"
      },
      {
        type: "image",
        src: "https://lh3.googleusercontent.com/aida-public/AB6AXuBTyMwwPL4fCM0KC0nT2s9b-u2XeYyfpOrAs1JLlK7DwjQ_CPC4b34u0Rde0YGSwLM2CCq6Y6BcGeiL90IjiWEqKHMkf2jQpJNOi8xJBiikcuDZCq2yCO4eWlDIh6K3n_thmgS3kjHwOceG0ZVMqtekpfTe0KlxdpypbmIiOWDBrobwF8rHr4pAepTzbcMUoCp9o23dq-VLiGeIwfcfWR4RkfnrxxHowaoUEIWrj_sIPYYZtSpPagnfr2pj4_Hcv0dTgUKdz2eE63JE",
        top: "15%", right: "-15%",
        animation: "animate-[bounce_6s_infinite]",
        width: "w-16", height: "h-16"
      },
      {
        type: "icon",
        icon: "shield_locked",
        top: "70%", left: "-20%",
        animation: "animate-[bounce_7s_infinite]",
        width: "w-14", height: "h-14",
        iconClass: "text-4xl text-cyan-400 drop-shadow-[0_0_8px_rgba(0,229,255,0.8)]"
      },
      {
        type: "icon",
        icon: "credit_card",
        top: "70%", right: "-20%",
        animation: "animate-[bounce_4.5s_infinite]",
        width: "w-16", height: "h-16",
        iconClass: "text-5xl text-cyan-400 drop-shadow-[0_0_8px_rgba(0,229,255,0.8)]"
      }
    ]
  },
  {
    id: 2,
    title: "Zenith AI Dashboard",
    tag: "WEB / SAAS",
    heading: "ELEVATE YOUR SAAS PLATFORM •",
    description: "ARCHITECTING SCALABLE SOLUTIONS THAT EMPOWER YOUR BUSINESS TO REACH UNPRECEDENTED HEIGHTS OF EFFICIENCY.",
    mainImage: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=2015&auto=format&fit=crop",
    floatingItems: [
      {
        type: "icon", icon: "monitoring",
        top: "20%", left: "-18%", animation: "animate-[bounce_4s_infinite]",
        width: "w-16", height: "h-16", iconClass: "text-4xl text-purple-400 drop-shadow-[0_0_8px_rgba(168,85,247,0.8)]"
      },
      {
        type: "icon", icon: "robot_2",
        top: "-15%", left: "50%", transform: "translateX(-50%)", animation: "animate-[bounce_5s_infinite]",
        width: "w-20", height: "h-20", iconClass: "text-5xl text-purple-400 drop-shadow-[0_0_8px_rgba(168,85,247,0.8)]"
      },
      {
        type: "icon", icon: "insights",
        top: "25%", right: "-18%", animation: "animate-[bounce_6s_infinite]",
        width: "w-14", height: "h-14", iconClass: "text-4xl text-purple-400 drop-shadow-[0_0_8px_rgba(168,85,247,0.8)]"
      },
      {
        type: "icon", icon: "memory",
        top: "65%", left: "-15%", animation: "animate-[bounce_5.5s_infinite]",
        width: "w-16", height: "h-16", iconClass: "text-5xl text-purple-400 drop-shadow-[0_0_8px_rgba(168,85,247,0.8)]"
      },
      {
        type: "icon", icon: "schema",
        top: "70%", right: "-15%", animation: "animate-[bounce_4.5s_infinite]",
        width: "w-16", height: "h-16", iconClass: "text-5xl text-purple-400 drop-shadow-[0_0_8px_rgba(168,85,247,0.8)]"
      }
    ]
  },
  {
    id: 3,
    title: "Quantum Data Engine",
    tag: "WEB / ANALYTICS",
    heading: "UNLEASH QUANTUM ANALYTICS •",
    description: "DECODE THE FUTURE WITH DATA-DRIVEN INSIGHTS THAT TRANSFORM COMPLEXITY INTO ACTIONABLE INTELLIGENCE.",
    mainImage: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2070&auto=format&fit=crop",
    floatingItems: [
      {
        type: "icon", icon: "database",
        top: "15%", left: "-15%", animation: "animate-[bounce_4.5s_infinite]",
        width: "w-16", height: "h-16", iconClass: "text-4xl text-blue-400 drop-shadow-[0_0_8px_rgba(96,165,250,0.8)]"
      },
      {
        type: "icon", icon: "analytics",
        top: "-15%", left: "50%", transform: "translateX(-50%)", animation: "animate-[bounce_5.5s_infinite]",
        width: "w-20", height: "h-20", iconClass: "text-5xl text-blue-400 drop-shadow-[0_0_8px_rgba(96,165,250,0.8)]"
      },
      {
        type: "icon", icon: "hub",
        top: "20%", right: "-15%", animation: "animate-[bounce_6.5s_infinite]",
        width: "w-14", height: "h-14", iconClass: "text-4xl text-blue-400 drop-shadow-[0_0_8px_rgba(96,165,250,0.8)]"
      },
      {
        type: "icon", icon: "query_stats",
        top: "65%", left: "-20%", animation: "animate-[bounce_4s_infinite]",
        width: "w-16", height: "h-16", iconClass: "text-5xl text-blue-400 drop-shadow-[0_0_8px_rgba(96,165,250,0.8)]"
      },
      {
        type: "icon", icon: "speed",
        top: "70%", right: "-20%", animation: "animate-[bounce_5s_infinite]",
        width: "w-16", height: "h-16", iconClass: "text-5xl text-blue-400 drop-shadow-[0_0_8px_rgba(96,165,250,0.8)]"
      }
    ]
  },
  {
    id: 4,
    title: "Aura Social Network",
    tag: "MOBILE / LIFESTYLE",
    heading: "CONNECT WITH THE WORLD •",
    description: "CRAFTING IMMERSIVE SOCIAL EXPERIENCES THAT BRIDGE COMMUNITIES AND REDEFINE DIGITAL LIFESTYLE.",
    mainImage: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?q=80&w=2070&auto=format&fit=crop",
    floatingItems: [
      {
        type: "icon", icon: "groups",
        top: "20%", left: "-15%", animation: "animate-[bounce_5s_infinite]",
        width: "w-16", height: "h-16", iconClass: "text-4xl text-pink-400 drop-shadow-[0_0_8px_rgba(244,114,182,0.8)]"
      },
      {
        type: "icon", icon: "favorite",
        top: "-15%", left: "50%", transform: "translateX(-50%)", animation: "animate-[bounce_4s_infinite]",
        width: "w-16", height: "h-16", iconClass: "text-5xl text-pink-400 drop-shadow-[0_0_8px_rgba(244,114,182,0.8)]"
      },
      {
        type: "icon", icon: "forum",
        top: "25%", right: "-15%", animation: "animate-[bounce_6s_infinite]",
        width: "w-14", height: "h-14", iconClass: "text-4xl text-pink-400 drop-shadow-[0_0_8px_rgba(244,114,182,0.8)]"
      },
      {
        type: "icon", icon: "photo_library",
        top: "70%", left: "-15%", animation: "animate-[bounce_4.5s_infinite]",
        width: "w-16", height: "h-16", iconClass: "text-5xl text-pink-400 drop-shadow-[0_0_8px_rgba(244,114,182,0.8)]"
      },
      {
        type: "icon", icon: "share",
        top: "75%", right: "-15%", animation: "animate-[bounce_5.5s_infinite]",
        width: "w-16", height: "h-16", iconClass: "text-5xl text-pink-400 drop-shadow-[0_0_8px_rgba(244,114,182,0.8)]"
      }
    ]
  }
];

const OrbitalProjectViewer = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % portfolioProjects.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + portfolioProjects.length) % portfolioProjects.length);
  };

  const project = portfolioProjects[currentIndex];

  return (
    <div className="relative w-full px-6 md:px-24 min-h-[500px] flex items-center justify-center py-16">
      {/* Left Nav Arrow */}
      <button 
        onClick={handlePrev}
        className="nav-arrow absolute left-2 md:left-8 top-1/2 -translate-y-1/2 z-50 hover:bg-white/10 hover:border-accent hover:shadow-[0_0_25px_rgba(0,229,255,0.3)] hover:text-white" aria-label="Previous"
      >
        <span className="material-symbols-outlined text-2xl">chevron_left</span>
      </button>

      {/* Right Nav Arrow */}
      <button 
        onClick={handleNext}
        className="nav-arrow absolute right-2 md:right-8 top-1/2 -translate-y-1/2 z-50 hover:bg-white/10 hover:border-accent hover:shadow-[0_0_25px_rgba(0,229,255,0.3)] hover:text-white" aria-label="Next"
      >
        <span className="material-symbols-outlined text-2xl">chevron_right</span>
      </button>

      {/* Diffuse Background Glow */}
      <div className="diffuse-glow hidden md:block"></div>

      <div className="w-full max-w-[1400px] flex flex-col xl:flex-row items-center justify-between gap-12 xl:gap-20 z-10 px-12 md:px-20">
        
        {/* Left Text Block */}
        <motion.div 
          key={`left-${project.id}`}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.8 }}
          className="flex-1 flex flex-col items-start w-full"
        >
          <h2 className="text-2xl lg:text-3xl xl:text-3xl uppercase font-sans tracking-widest leading-[1.3] mb-6 text-white">
            {project.heading}
          </h2>
          <p className="text-slate-500 tracking-[0.5em] text-[10px] mb-8 font-bold">{">>>>>>>>"}</p>
          <button className="px-6 py-2.5 bg-white/5 border border-white/10 hover:border-accent hover:shadow-[0_0_20px_rgba(0,229,255,0.2)] transition-all duration-300 rounded-lg text-xs tracking-[0.2em] uppercase font-bold text-white">
            Order Today
          </button>
        </motion.div>

        {/* Central Project Image */}
        <motion.div 
          key={`center-${project.id}`}
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="relative shrink-0 w-full xl:w-[600px] flex justify-center items-center py-10"
        >
          {/* Orbital Icons */}
          {project.floatingItems.map((item, idx) => (
            <div 
              key={idx}
              className={`absolute z-40 ${item.animation} glass-icon ${item.width} ${item.height} hidden md:flex`}
              style={{ 
                top: item.top, 
                left: item.left, 
                right: item.right, 
                bottom: item.bottom,
                transform: item.transform || 'none'
              }}
            >
              {item.type === "image" ? (
                <img 
                  alt="Icon" 
                  className="w-full h-full object-contain drop-shadow-[0_0_10px_rgba(0,229,255,0.8)]" 
                  src={item.src}
                />
              ) : (
                <span className={`material-symbols-outlined ${item.iconClass}`}>
                  {item.icon}
                </span>
              )}
            </div>
          ))}

          {/* Main Asset */}
          <div className="relative w-full max-w-[600px] h-[340px] rounded-[30px] overflow-hidden border border-white/20 shadow-[0_0_50px_rgba(0,0,0,0.8)]">
            <img 
              alt={project.title} 
              className="w-full h-full object-cover" 
              src={project.mainImage}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent pointer-events-none"></div>
            <div className="absolute bottom-0 left-0 p-8 w-full">
              <p className="text-accent font-bold text-xs tracking-[5px] uppercase mb-2">{project.tag}</p>
              <h3 className="text-2xl font-bold text-white">{project.title}</h3>
            </div>
          </div>
        </motion.div>

        {/* Right Text Block */}
        <motion.div 
          key={`right-${project.id}`}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: 20 }}
          transition={{ duration: 0.8 }}
          className="flex-1 flex flex-col items-end text-right w-full"
        >
          <p className="text-xs xl:text-xs text-slate-400 tracking-[0.2em] leading-[2] max-w-[300px] uppercase font-sans font-bold">
            {project.description}
          </p>
        </motion.div>

      </div>
    </div>
  );
};

