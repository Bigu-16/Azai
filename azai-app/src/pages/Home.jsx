import React, { useEffect, useState } from 'react';
import { motion, useAnimationFrame, AnimatePresence } from 'framer-motion';
import { Smartphone, Globe, BrainCircuit } from 'lucide-react';
import { SmokeyFluidCursor } from 'react-smokey-fluid-cursor';
import EcoSyncVideo from '../assets/EcoSyncVideo_WithAudio.mp4';
import photo1 from '../assets/photo_1_2026-05-11_19-54-06.jpg';
import photo2 from '../assets/photo_2_2026-05-11_19-54-06.jpg';
import photo3 from '../assets/photo_3_2026-05-11_19-54-06.jpg';
import photo4 from '../assets/photo_4_2026-05-11_19-54-06.jpg';
import photo5 from '../assets/photo_5_2026-05-11_19-54-06.jpg';
import solomeImage from '../assets/photo_1_2026-05-20_20-41-52.jpg';
import afomiaImage from '../assets/photo_1_2026-05-20_20-51-57.jpg';
import abigiyaImage from '../assets/image copy.png';

const aboutCards = [
  {
    id: 1,
    title: "Solome Getachew",
    narrowTitle: "Solome Getachew",
    stat: "Frontend Developer",
    image: solomeImage
  },
  {
    id: 2,
    title: "Afomia Tadesse",
    narrowTitle: "Afomia Tadesse",
    stat: "Backend Developer",
    image: afomiaImage
  },
  {
    id: 3,
    title: "Abigiya Getachew",
    narrowTitle: "Abigiya Getachew",
    stat: "Mobile Developer",
    image: abigiyaImage
  }
];

const services = [
  {
    icon: Smartphone,
    title: "Mobile Apps",
    tagline: "IOS & ANDROID NATIVE",
    bgImage: "/mobile.png",
    color: "#00f2ff",
    solutionTagline: "FLUTTER & CROSS-PLATFORM",
    solutionTitle: "MOBILE APPS",
    solutionDescription: "We build apps for iPhone and Android that feel fast and look polished. Using Flutter, we write your app once and it runs perfectly on both platforms — saving you time and money without cutting any corners on quality.",
    solutionImage: "/mobile.png"
  },
  {
    icon: Globe,
    title: "Web Platforms",
    tagline: "SCALABLE SAAS ARCHITECTURE",
    bgImage: "/web3.png",
    color: "#b464ff",
    solutionTagline: "REACT & NEXT.JS",
    solutionTitle: "WEB PLATFORMS",
    solutionDescription: "We build websites and web apps that load fast, look great, and are easy to grow over time. Whether you need a marketing site or a full product dashboard, we make sure it works well today and can handle more users tomorrow.",
    solutionImage: "/web4.png"
  },
  {
    icon: BrainCircuit,
    title: "Cloud & AI Automation",
    tagline: "AUTONOMOUS BACKEND SYSTEMS",
    bgImage: "/automation2.jpg",
    color: "#ff6496",
    solutionTagline: "AI & CLOUD INFRASTRUCTURE",
    solutionTitle: "CLOUD & AI AUTOMATION",
    solutionDescription: "We connect your business to smart cloud tools and AI that work in the background — handling tasks automatically so your team doesn't have to. From intelligent chatbots to automated data pipelines, we make technology work harder for you.",
    solutionImage: "/automation2.jpg"
  }
];

const Home = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [activeService, setActiveService] = useState(0);
  const [rotation, setRotation] = useState(0);
  const [focusedAboutCard, setFocusedAboutCard] = useState(1);

  // Continuous smooth rotation
  useAnimationFrame((time, delta) => {
    setRotation((prev) => prev - delta * 0.0003); // Adjust speed here
  });

  useEffect(() => {
    const handleMouseMove = (e) => {
      const x = (e.clientX - window.innerWidth / 2) * 0.01;
      const y = (e.clientY - window.innerHeight / 2) * 0.01;
      setMousePosition({ x, y });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  // Update active service based on which item is closest to the front
  useEffect(() => {
    let maxZ = -Infinity;
    let centerIndex = 0;
    services.forEach((_, index) => {
      const angle = (index / services.length) * 2 * Math.PI + rotation;
      const z = Math.cos(angle);
      if (z > maxZ) {
        maxZ = z;
        centerIndex = index;
      }
    });
    if (activeService !== centerIndex) {
      setActiveService(centerIndex);
    }
  }, [rotation, activeService]);

  return (
    <div className="pt-16 md:pt-20">
      {/* HERO SECTION */}
      <section id="hero" className="min-h-[100svh] flex flex-col items-center justify-center relative px-5 sm:px-8 md:px-12 overflow-hidden">
        <SmokeyFluidCursor />
        <div className="z-10 text-center w-full max-w-[820px] px-2">
          <p className="section-tag">Integrated Tech Solutions</p>
          <h1 className="text-[clamp(3rem,18vw,10rem)] font-display tracking-[-2px] sm:tracking-[-3px] md:tracking-[-5px] leading-[0.88] bg-gradient-to-b from-white to-[#444] bg-clip-text text-transparent uppercase">
            AZYAB
          </h1>
          <p className="text-slate-400 my-5 sm:my-6 md:my-8 mx-auto max-w-[500px] leading-relaxed text-sm sm:text-base md:text-lg">
            We transform complex ideas into elegant mobile apps, immersive websites, and intelligent AI automations. Specialized in high-performance digital ecosystems.
          </p>
          <a href="#work" className="btn-primary inline-block text-[11px] sm:text-sm md:text-base px-6 sm:px-8">VIEW OUR WORK</a>
        </div>
      </section>

      {/* SERVICES SECTION */}
      <section id="services" className="relative min-h-[100svh] flex flex-col items-center pt-24 md:pt-40 pb-16 md:pb-20 overflow-hidden">
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

        <div className="relative z-10 text-center mb-8 md:mb-12">
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="section-tag"
          >
            Our Expertise
          </motion.p>
        </div>
        
        {/* Orbital Carousel Container */}
        <div className="relative w-full max-w-7xl h-[160px] md:h-[240px] flex items-center justify-center z-40">
          {services.map((service, index) => {
            // Minimal Orbital Math
            const total = services.length;
            const angle = (index / total) * 2 * Math.PI + rotation;
            
            const x = Math.sin(angle) * 30; // Compact displacement
            const z = Math.cos(angle);
            
            const isActive = index === activeService;
            const scale = z > 0 ? 0.8 + (z * 0.4) : 0.6; // Scale up when in front
            const opacity = z > 0 ? 0.6 + (z * 0.4) : 0.3; // More opaque when in front
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
                transition={{ duration: 0, ease: "linear" }}
                className="absolute flex flex-col items-center pointer-events-none"
              >
                {/* Orbital Icon Navigation */}
                <div className="flex flex-col items-center">
                  <div className={`w-24 h-24 md:w-44 md:h-44 rounded-full glass flex items-center justify-center p-4 md:p-6 transition-all duration-500 ${isActive ? 'shadow-[0_0_25px_rgba(255,255,255,0.3)] border-white/40' : 'border-white/5'}`}>
                    <service.icon 
                      className="w-full h-full p-1" 
                      strokeWidth={1}
                      style={{ color: isActive ? '#00f2ff' : 'rgba(0,242,255,0.4)' }}
                    />
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Central Focus Content */}
        <div className="relative w-full max-w-3xl min-h-[250px] md:min-h-[300px] flex items-center justify-center z-50 mt-8 md:mt-16">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeService}
              initial={{ opacity: 0, y: 10, filter: 'blur(4px)' }}
              animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              exit={{ opacity: 0, y: -10, filter: 'blur(4px)' }}
              transition={{ duration: 0.4 }}
              className="flex flex-col items-center text-center px-4 md:px-6 pt-10 md:pt-16"
            >
              <p className="font-sans text-[0.5rem] md:text-[0.6rem] text-accent tracking-[0.4em] uppercase mb-3 md:mb-4">
                {services[activeService].tagline}
              </p>
              <h3 className="font-display text-[32px] md:text-[64px] leading-none text-white uppercase tracking-tighter mb-4 md:mb-8 bg-gradient-to-b from-white to-white/40 bg-clip-text text-transparent">
                {services[activeService].title}
              </h3>
              <div className="w-12 md:w-16 h-[2px] bg-accent shadow-[0_0_15px_rgba(0,242,255,0.5)] mb-6 md:mb-8"></div>
              <button 
                onClick={() => {
                  document.getElementById('solutions').scrollIntoView({ behavior: 'smooth' });
                }}
                className="btn-primary text-xs md:text-base"
              >
                EXPLORE SOLUTIONS
              </button>
            </motion.div>
          </AnimatePresence>
        </div>
      </section>

      {/* SOLUTIONS DETAIL SECTION (Based on SpaceEdu design) */}
      <section id="solutions" className="relative min-h-[100svh] bg-slate-950 text-white py-20 md:py-32 px-4 md:px-8 flex flex-col items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0 bg-[radial-gradient(ellipse_at_center,_#0b1121_0%,_#020408_100%)] opacity-60"></div>
        
        <div className="flex flex-col md:flex-row items-center justify-center max-w-[1280px] mx-auto w-full gap-12 md:gap-24 relative z-10">
          {/* Left Side: Technical Visual */}
          <motion.div 
            key={`img-${services[activeService].title}`}
            initial={{ scale: 0.8, opacity: 0, rotate: -5 }}
            whileInView={{ scale: 1, opacity: 1, rotate: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1.5, ease: "easeOut" }}
            className="w-full md:w-1/2 flex justify-center items-center relative"
          >
            <div className="relative group">
              <img 
                alt={services[activeService].title} 
                className="object-cover rounded-[20px] md:rounded-3xl w-full max-w-[300px] md:max-w-[500px] h-auto aspect-[4/5] md:aspect-[3/4] shadow-2xl border border-white/10" 
                src={services[activeService].solutionImage}
              />
            </div>
          </motion.div>

          {/* Right Side: Content */}
          <motion.div 
            key={`content-${services[activeService].title}`}
            initial={{ x: 50, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.2, ease: "easeOut" }}
            className="w-full md:w-1/2 flex flex-col items-center md:items-start justify-center text-center md:text-left"
          >
            <span className="font-sans text-[0.6rem] md:text-[0.7rem] text-accent tracking-[0.5em] uppercase mb-4 opacity-80">
              {services[activeService].solutionTagline}
            </span>
            <h2 className="font-display text-[clamp(2rem,6vw,4.5rem)] text-white mb-6 md:mb-8 uppercase tracking-tight leading-none">
              {services[activeService].solutionTitle}
            </h2>
            <div className="w-16 md:w-20 h-[1px] bg-accent/50 mb-8 md:mb-10"></div>
            <p className="font-sans text-sm md:text-lg text-slate-400 max-w-lg mb-8 md:mb-12 leading-relaxed">
              {services[activeService].solutionDescription}
            </p>
            <div className="flex flex-col md:flex-row items-center gap-6 md:gap-8 w-full md:w-auto">
              <button 
                onClick={() => document.getElementById('contact').scrollIntoView({ behavior: 'smooth' })}
                className="btn-primary w-full md:w-auto text-xs md:text-base"
              >
                START A PROJECT
              </button>
              <button 
                onClick={() => document.getElementById('work').scrollIntoView({ behavior: 'smooth' })}
                className="flex items-center justify-center md:justify-start gap-3 w-full md:w-auto text-white/60 hover:text-accent transition-colors group"
              >
                <span className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center group-hover:border-accent/50">
                  <span className="material-symbols-outlined text-xl">arrow_forward</span>
                </span>
                <span className="text-xs font-bold tracking-widest uppercase">See Our Work</span>
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* WORK SECTION */}
      <section id="work" className="py-20 md:py-32 flex flex-col items-center overflow-hidden">
        <p className="section-tag">Portfolio</p>
        <h2 className="text-[clamp(2rem,5vw,4rem)] mb-8 md:mb-16 text-center px-4">Our Projects</h2>
        <OrbitalProjectViewer />
      </section>

      {/* ABOUT US SECTION */}
      <section id="about" className="relative py-20 md:py-32 px-4 md:px-8 flex flex-col items-center overflow-hidden border-t border-b border-white/5 bg-slate-950/50">
        {/* Ambient glows */}
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-accent/5 rounded-full blur-[120px] pointer-events-none hidden md:block"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-500/5 rounded-full blur-[120px] pointer-events-none hidden md:block"></div>
        
        <div className="max-w-[1280px] w-full mx-auto relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-12 items-start lg:gap-8">
            {/* Left Column: Content */}
            <div className="lg:col-span-5 pt-4 md:pt-12 text-center md:text-left flex flex-col items-center md:items-start">
              <span className="section-tag !mx-auto md:!mx-0">About Us</span>
              <h2 className="font-display text-[2.5rem] lg:text-[3.5rem] leading-[1] text-white mt-2 md:mt-4 mb-4 md:mb-6 uppercase tracking-tighter bg-gradient-to-b from-white to-white/40 bg-clip-text text-transparent">
                Meet the<br className="hidden md:block" />
                
                <span className="md:hidden"> </span>Team
              </h2>
              <p className="text-slate-400 font-sans text-sm md:text-lg leading-relaxed mb-8 md:mb-10 max-w-md">
                We are a collective of passionate software engineers driven by complex problem-solving. Together, we architect elite systems and amplify digital outreach, crafting transformative solutions for companies across every sector.
              </p>
            </div>

            {/* Right Column: Featured Cards */}
            <div className="lg:col-span-7 flex flex-row items-end gap-3 md:gap-4 overflow-x-auto pb-4 min-h-[350px] md:min-h-[480px] w-full snap-x snap-mandatory hide-scrollbar">
              {aboutCards.map((card) => {
                const isFocused = focusedAboutCard === card.id;
                return (
                  <div 
                    key={card.id}
                    onClick={() => setFocusedAboutCard(card.id)}
                    className={`relative h-[350px] md:h-[480px] rounded-2xl md:rounded-3xl overflow-hidden shadow-xl glass border border-white/10 transition-all duration-500 ease-[cubic-bezier(0.4,0,0.2,1)] cursor-pointer snap-center ${isFocused ? 'w-[75vw] md:w-[400px] shrink-0 cursor-default' : 'w-[20vw] md:w-[160px] shrink-0 hover:border-accent/50 hover:shadow-[0_0_30px_rgba(0,242,255,0.2)]'}`}
                  >
                    <img 
                      alt={card.narrowTitle} 
                      className="absolute inset-0 w-full h-full object-cover mix-blend-overlay opacity-60" 
                      src={card.image} 
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent"></div>
                    <div className="absolute inset-0 flex flex-col justify-end p-4 md:p-8 text-white z-10">
                      {/* Focused state info */}
                      <div className={`flex flex-col justify-end items-start gap-1 md:gap-2 transition-all duration-300 ${isFocused ? 'opacity-100 translate-y-0 delay-150' : 'opacity-0 translate-y-4 pointer-events-none absolute bottom-4 md:bottom-8 left-4 md:left-8 right-4 md:right-8'}`}>
                        <div>
                          <h3 className="font-display text-2xl md:text-3xl font-bold leading-tight uppercase tracking-tight">
                            {card.title.split('\n').map((line, i) => <React.Fragment key={i}>{line}<br/></React.Fragment>)}
                          </h3>
                        </div>
                        {card.stat && (
                          <div className="text-left mt-1 md:mt-0">
                            <span className="text-2xl md:text-3xl font-bold text-accent">{card.stat}</span>
                            <p className="text-[9px] md:text-[10px] uppercase tracking-widest text-slate-400">{card.statLabel}</p>
                          </div>
                        )}
                      </div>
                      {/* Narrow state info */}
                      <div className={`absolute bottom-8 md:bottom-12 left-1/2 -translate-x-1/2 transition-all duration-300 ${isFocused ? 'opacity-0 pointer-events-none' : 'opacity-100 delay-150'}`}>
                        <h4 
                          className="font-display text-lg md:text-2xl text-white uppercase tracking-widest whitespace-nowrap rotate-180"
                          style={{ writingMode: 'vertical-rl' }}
                        >
                          {card.narrowTitle}
                        </h4>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* CONTACT SECTION */}
      <section id="contact" className="py-20 md:py-32 px-4 md:px-8 flex flex-col items-center">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 md:gap-20 w-full max-w-5xl glass p-6 md:p-16 rounded-[24px] md:rounded-[40px]">
          <div className="flex flex-col">
            <p className="section-tag !text-left">Contact</p>
            <h2 className="text-[2rem] md:text-[3rem] mb-4 md:mb-6 !text-left">Ready to start your journey?</h2>
            <p className="text-slate-400 leading-[1.8] mt-2 md:mt-4 text-sm md:text-base">
              Have a project in mind? We'd love to hear about it. Send us a message and our team will get back to you within 24 hours.
            </p>
            <div className="mt-8 md:mt-10">
              <p className="font-bold text-sm md:text-base">Email us:</p>
              <p className="text-accent text-sm md:text-base">hello@azyabtech.studio</p>
            </div>
          </div>
          <form className="flex flex-col gap-4 md:gap-5">
            <input type="text" placeholder="Your Name" className="bg-white/5 border border-white/10 rounded-xl p-3 md:p-4 text-sm md:text-base text-white outline-none focus:border-accent transition-colors" />
            <input type="email" placeholder="Your Email" className="bg-white/5 border border-white/10 rounded-xl p-3 md:p-4 text-sm md:text-base text-white outline-none focus:border-accent transition-colors" />
            <textarea rows="5" placeholder="Tell us about your project..." className="bg-white/5 border border-white/10 rounded-xl p-3 md:p-4 text-sm md:text-base text-white outline-none focus:border-accent transition-colors"></textarea>
            <button className="btn-primary w-full text-xs md:text-base py-3 md:py-4">SEND MESSAGE</button>
          </form>
        </div>
      </section>

      <footer className="py-10 md:py-16 text-center text-slate-600 text-[10px] md:text-xs tracking-[2px] uppercase px-4">
        <p>&copy; 2026 AZYAB TECH STUDIO &bull; BUILT FOR THE FUTURE</p>
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
    deviceType: "mobile",
    heading: "HARNESS THE POWER OF INNOVATION •",
    description: "A BURST OF PRECISION DIGITAL DESIGN WILL IGNITE YOUR SENSES AND FUEL YOUR CORE PEAK PERFORMANCE.",
    mainImage: "https://images.unsplash.com/photo-1616469829581-73993eb86b02?q=80&w=2070&auto=format&fit=crop",
    video: "", // Add .mp4 URL here to show video
    link: "", // Add project URL here to make it clickable
    floatingItems: [
      {
        type: "image",
        src: "https://lh3.googleusercontent.com/aida-public/AB6AXuBoi8jtaxdtjlcU0ylWqpfdGSRoHwBS4DvrwwYP3x8jcqaRIYEo348i1Cud6iPBUzYe4w659p-vJSgN4mvfVzFHk0UxgapWw2T6UjZVT3sX9xcBHrXJv41FyKpE8IrNR_oANp-4k_hIC2ntuzVyVNv1G0fKzLT1CLTgUQa4dvtVOav6ozH58ZcQ7rpx8wUQ1sNFfejLUTsaqBVEcWDaTurgqsrSnM-VbePU7b5Krac36hDmDLlkw-iN1okWVr_PFLgkIotAjTsUs9CB",
        top: "10%", left: "-95px",
        animation: "animate-[bounce_4s_infinite]",
        width: "w-14", height: "h-14"
      },
      {
        type: "image",
        src: "https://lh3.googleusercontent.com/aida-public/AB6AXuB5PrJe96dcMWLme3F1cEcvDlL4WzSYPZLI6FlwoTtbcKzJN0Wu13Hkzcu6ouGS6OR5dMpJcF56YG37Ka37Fk30oZ5eifYfeyde9oZ2ky9uQOmHzfzWWojUIJwA-TiW9QYQYgJBU9E8TuM3oECYJmy_o-Ln9zqGOhIwx4YVFY2U2mIZFpYQ5AWBCYrC8hWjaEMhhC6tIiOsIY5FOnvkIK6bHRR25CmV01KcgbKVx1a9FSY-xKQ4I807U8tsxmkdFIzSQlJ0nrcdPxQl",
        top: "10%", right: "-95px",
        animation: "animate-[bounce_5s_infinite]",
        width: "w-16", height: "h-16"
      },
      {
        type: "image",
        src: "https://lh3.googleusercontent.com/aida-public/AB6AXuBTyMwwPL4fCM0KC0nT2s9b-u2XeYyfpOrAs1JLlK7DwjQ_CPC4b34u0Rde0YGSwLM2CCq6Y6BcGeiL90IjiWEqKHMkf2jQpJNOi8xJBiikcuDZCq2yCO4eWlDIh6K3n_thmgS3kjHwOceG0ZVMqtekpfTe0KlxdpypbmIiOWDBrobwF8rHr4pAepTzbcMUoCp9o23dq-VLiGeIwfcfWR4RkfnrxxHowaoUEIWrj_sIPYYZtSpPagnfr2pj4_Hcv0dTgUKdz2eE63JE",
        top: "80%", right: "-95px",
        animation: "animate-[bounce_6s_infinite]",
        width: "w-16", height: "h-16"
      },
      {
        type: "icon",
        icon: "shield_locked",
        top: "80%", left: "-95px",
        animation: "animate-[bounce_7s_infinite]",
        width: "w-14", height: "h-14",
        iconClass: "text-4xl text-cyan-400 drop-shadow-[0_0_8px_rgba(0,229,255,0.8)]"
      }
    ]
  },
  {
    id: 2,
    //title: "EcoSync Enterprise",
    tag: "WEB / SAAS",
    deviceType: "desktop",
    heading: "ECOSYNC ENTERPRISE",
    description: "ECOSYNC ENTERPRISE IS A HIGH-FIDELITY DASHBOARD BY AZYAB TECH THAT SIMPLIFIES LARGE-SCALE INDUSTRIAL DATA INTO INTUITIVE, PIXEL-PERFECT INTERFACES. WE BRIDGE THE GAP BETWEEN COMPLEX ENERGY TELEMETRY AND SMART UX TO DELIVER ACTIONABLE, AUTOMATED INSIGHTS.",
    mainImage: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=2015&auto=format&fit=crop",
    video: EcoSyncVideo, 
    link: "",
    floatingItems: [
      {
        type: "icon", icon: "monitoring",
        top: "10%", left: "-95px", animation: "animate-[bounce_4s_infinite]",
        width: "w-16", height: "h-16", iconClass: "text-4xl text-cyan-400 drop-shadow-[0_0_8px_rgba(0,229,255,0.8)]"
      },
      {
        type: "icon", icon: "robot_2",
        top: "10%", right: "-95px", animation: "animate-[bounce_5s_infinite]",
        width: "w-20", height: "h-20", iconClass: "text-5xl text-cyan-400 drop-shadow-[0_0_8px_rgba(0,229,255,0.8)]"
      },
      {
        type: "icon", icon: "insights",
        top: "80%", right: "-95px", animation: "animate-[bounce_6s_infinite]",
        width: "w-14", height: "h-14", iconClass: "text-4xl text-cyan-400 drop-shadow-[0_0_8px_rgba(0,229,255,0.8)]"
      },
      {
        type: "icon", icon: "memory",
        top: "80%", left: "-95px", animation: "animate-[bounce_5.5s_infinite]",
        width: "w-16", height: "h-16", iconClass: "text-5xl text-cyan-400 drop-shadow-[0_0_8px_rgba(0,229,255,0.8)]"
      }
    ]
  },
  {
    id: 3,
    title: "Patient Tracker",
    tag: "WEB / HEALTHCARE",
    deviceType: "desktop",
    heading: "PATIENT TRACKER •",
    description: "PATIENT TRACKER IS A DIGITAL ECOSYSTEM DESIGNED TO STRENGTHEN THE VITAL LINK BETWEEN PATIENTS AND DOCTORS THROUGH REAL-TIME COMMUNICATION AND SHARED HEALTH INSIGHTS.",
    mainImage: photo1,
    images: [photo1, photo2, photo3, photo4, photo5],
    video: "", 
    link: "",
    floatingItems: [
      {
        type: "icon", icon: "monitor_heart",
        top: "10%", left: "-95px", animation: "animate-[bounce_4.5s_infinite]",
        width: "w-16", height: "h-16", iconClass: "text-4xl text-cyan-400 drop-shadow-[0_0_8px_rgba(0,229,255,0.8)]"
      },
      {
        type: "icon", icon: "medical_information",
        top: "10%", right: "-95px", animation: "animate-[bounce_5.5s_infinite]",
        width: "w-20", height: "h-20", iconClass: "text-5xl text-cyan-400 drop-shadow-[0_0_8px_rgba(0,229,255,0.8)]"
      },
      {
        type: "icon", icon: "healing",
        top: "80%", right: "-95px", animation: "animate-[bounce_6.5s_infinite]",
        width: "w-14", height: "h-14", iconClass: "text-4xl text-cyan-400 drop-shadow-[0_0_8px_rgba(0,229,255,0.8)]"
      },
      {
        type: "icon", icon: "health_and_safety",
        top: "80%", left: "-95px", animation: "animate-[bounce_4s_infinite]",
        width: "w-16", height: "h-16", iconClass: "text-5xl text-cyan-400 drop-shadow-[0_0_8px_rgba(0,229,255,0.8)]"
      }
    ]
  },
  {
    id: 4,
    title: "Aura Social Network",
    tag: "MOBILE / LIFESTYLE",
    deviceType: "mobile",
    heading: "CONNECT WITH THE WORLD •",
    description: "CRAFTING IMMERSIVE SOCIAL EXPERIENCES THAT BRIDGE COMMUNITIES AND REDEFINE DIGITAL LIFESTYLE.",
    mainImage: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?q=80&w=2070&auto=format&fit=crop",
    video: "", 
    link: "",
    floatingItems: [
      {
        type: "icon", icon: "groups",
        top: "10%", left: "-95px", animation: "animate-[bounce_5s_infinite]",
        width: "w-16", height: "h-16", iconClass: "text-4xl text-cyan-400 drop-shadow-[0_0_8px_rgba(0,229,255,0.8)]"
      },
      {
        type: "icon", icon: "favorite",
        top: "10%", right: "-95px", animation: "animate-[bounce_4s_infinite]",
        width: "w-16", height: "h-16", iconClass: "text-5xl text-cyan-400 drop-shadow-[0_0_8px_rgba(0,229,255,0.8)]"
      },
      {
        type: "icon", icon: "forum",
        top: "80%", right: "-95px", animation: "animate-[bounce_6s_infinite]",
        width: "w-14", height: "h-14", iconClass: "text-4xl text-cyan-400 drop-shadow-[0_0_8px_rgba(0,229,255,0.8)]"
      },
      {
        type: "icon", icon: "photo_library",
        top: "80%", left: "-95px", animation: "animate-[bounce_4.5s_infinite]",
        width: "w-16", height: "h-16", iconClass: "text-5xl text-cyan-400 drop-shadow-[0_0_8px_rgba(0,229,255,0.8)]"
      }
    ]
  }
];

const OrbitalProjectViewer = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % portfolioProjects.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + portfolioProjects.length) % portfolioProjects.length);
  };

  const project = portfolioProjects[currentIndex];

  useEffect(() => {
    setCurrentImageIndex(0);
  }, [currentIndex]);

  useEffect(() => {
    let interval;
    if (project.images && project.images.length > 0) {
      interval = setInterval(() => {
        setCurrentImageIndex((prev) => (prev + 1) % project.images.length);
      }, 3000);
    }
    return () => clearInterval(interval);
  }, [project]);

  return (
    <div className="relative w-full px-2 md:px-24 min-h-[500px] flex items-center justify-center py-8 md:py-16 overflow-x-hidden md:overflow-x-visible">
      {/* Left Nav Arrow */}
      <button 
        onClick={handlePrev}
        className="nav-arrow absolute left-1 md:left-8 top-[30%] md:top-1/2 -translate-y-1/2 z-50 hover:bg-white/10 hover:border-accent hover:shadow-[0_0_25px_rgba(0,229,255,0.3)] hover:text-white" aria-label="Previous"
      >
        <span className="material-symbols-outlined text-xl md:text-2xl">chevron_left</span>
      </button>

      {/* Right Nav Arrow */}
      <button 
        onClick={handleNext}
        className="nav-arrow absolute right-1 md:right-8 top-[30%] md:top-1/2 -translate-y-1/2 z-50 hover:bg-white/10 hover:border-accent hover:shadow-[0_0_25px_rgba(0,229,255,0.3)] hover:text-white" aria-label="Next"
      >
        <span className="material-symbols-outlined text-xl md:text-2xl">chevron_right</span>
      </button>

      {/* Diffuse Background Glow */}
      <div className="diffuse-glow hidden md:block"></div>

      <div className="w-full max-w-[1400px] flex flex-col xl:flex-row items-center justify-between gap-8 xl:gap-32 z-10 px-8 md:px-20">
        
        {/* Left Content Group: Text & Details */}
        <motion.div 
          key={`text-${project.id}`}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.8 }}
          className="flex-1 flex flex-col items-center md:items-start w-full text-center md:text-left order-2 xl:order-1 mt-8 md:mt-0"
        >
          <div className="mb-6 md:mb-8 max-w-2xl flex flex-col items-center md:items-start gap-4 md:gap-6">
            <h2 className="text-xl md:text-2xl lg:text-3xl xl:text-3xl uppercase font-sans tracking-widest leading-[1.3] text-white">
              {project.heading}
            </h2>
            <p className="text-[10px] md:text-xs text-slate-400 tracking-[0.2em] leading-[1.8] md:leading-[2] uppercase font-sans font-bold max-w-md">
              {project.description}
            </p>
          </div>
          <p className="text-slate-500 tracking-[0.5em] text-[10px] mb-6 md:mb-8 font-bold hidden md:block">{">>>>>>>>"}</p>
          {project.link ? (
            <a 
              href={project.link} 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-block px-5 md:px-6 py-2.5 bg-white/5 border border-white/10 hover:border-accent hover:shadow-[0_0_20px_rgba(0,229,255,0.2)] hover:bg-accent/10 transition-all duration-300 rounded-lg text-[10px] md:text-xs tracking-[0.2em] uppercase font-bold text-white text-center"
            >
              View Project
            </a>
          ) : (
            <button className="px-5 md:px-6 py-2.5 bg-white/5 border border-white/10 hover:border-accent hover:shadow-[0_0_20px_rgba(0,229,255,0.2)] transition-all duration-300 rounded-lg text-[10px] md:text-xs tracking-[0.2em] uppercase font-bold text-white">
              Order Today
            </button>
          )}
        </motion.div>

        {/* Right Content Group: Device Mockup (Pushed Right by flex justify-between) */}
        <motion.div 
          key={`center-${project.id}`}
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className={`relative shrink-0 flex flex-col justify-center items-center py-4 md:py-10 order-1 xl:order-2 ${project.deviceType === 'mobile' ? 'w-[220px] md:w-[340px]' : 'w-full md:w-[680px]'}`}
        >
          {/* Orbital Icons — absolute on desktop only */}
          <div className="hidden md:block absolute inset-0 pointer-events-none">
            {project.floatingItems.map((item, idx) => (
              <div 
                key={idx}
                className={`absolute z-40 ${item.animation} glass-icon ${item.width} ${item.height} flex`}
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
          </div>

          {/* Mobile icon strip — shown only on small screens */}
          <div className="flex md:hidden items-center justify-center gap-3 mb-3 flex-wrap">
            {project.floatingItems.slice(0, 4).map((item, idx) => (
              <div key={idx} className="glass-icon w-10 h-10 flex items-center justify-center">
                {item.type === "image" ? (
                  <img alt="Icon" className="w-full h-full object-contain drop-shadow-[0_0_6px_rgba(0,229,255,0.8)]" src={item.src} />
                ) : (
                  <span className="material-symbols-outlined text-lg text-cyan-400 drop-shadow-[0_0_6px_rgba(0,229,255,0.8)]">{item.icon}</span>
                )}
              </div>
            ))}
          </div>

          {/* Main Asset: Device Mockups */}
          <div className="relative w-full max-w-[750px] flex flex-col md:flex-row items-end justify-center gap-8 md:gap-12 pb-8 md:pb-12">
            
            {/* Desktop Monitor */}
            {project.deviceType === "desktop" && (
              <div className="relative w-full h-[180px] sm:h-[220px] md:w-[560px] md:h-[350px] bg-slate-800 rounded-t-xl md:rounded-t-2xl border-[3px] md:border-[4px] border-slate-800 shadow-[0_0_20px_rgba(0,0,0,0.8)] md:shadow-[0_0_40px_rgba(0,0,0,0.8)] z-10 flex flex-col shrink-0 mx-auto">
                {/* Screen */}
                <div 
                  className={`w-full flex-1 bg-black overflow-hidden rounded-t-lg md:rounded-t-xl relative ${project.link ? 'cursor-pointer group' : ''}`}
                  onClick={() => project.link && window.open(project.link, '_blank')}
                >
                  {project.video ? (
                    <video 
                      autoPlay 
                      loop 
                      muted 
                      playsInline 
                      className={`w-full h-full object-fill rounded-t-lg md:rounded-t-xl opacity-100 transition-transform duration-700 ${project.link ? 'group-hover:scale-105' : ''}`}
                      src={project.video}
                    />
                  ) : project.images && project.images.length > 0 ? (
                    project.images.map((imgSrc, idx) => (
                      <img 
                        key={idx}
                        alt={`${project.title} Desktop Image ${idx + 1}`} 
                        className={`absolute inset-0 w-full h-full object-fill rounded-t-lg md:rounded-t-xl transition-opacity duration-1000 ${idx === currentImageIndex ? 'opacity-100' : 'opacity-0'} ${project.link ? 'group-hover:scale-105' : ''}`} 
                        src={imgSrc}
                      />
                    ))
                  ) : (
                    <img 
                      alt={`${project.title} Desktop`} 
                      className={`w-full h-full object-fill rounded-t-lg md:rounded-t-xl opacity-100 transition-transform duration-700 ${project.link ? 'group-hover:scale-105' : ''}`} 
                      src={project.mainImage}
                    />
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent pointer-events-none"></div>
                  <div className="absolute bottom-2 left-2 md:bottom-4 md:left-4 z-10">
                    <h3 className="text-[10px] md:text-sm font-bold text-white flex items-center gap-1 md:gap-2">
                      {project.title}
                      {project.link && <span className="material-symbols-outlined text-[10px] md:text-[12px] text-accent opacity-0 group-hover:opacity-100 transition-all duration-300">open_in_new</span>}
                    </h3>
                  </div>
                </div>
                {/* Chin */}
                <div className="h-3 md:h-5 w-full bg-slate-700 rounded-b-md md:rounded-b-lg flex items-center justify-center border-t border-slate-600">
                  <div className="w-4 md:w-6 h-[2px] md:h-1 bg-slate-500 rounded-full"></div>
                </div>
                {/* Stand */}
                <div className="absolute -bottom-3 md:-bottom-6 left-1/2 -translate-x-1/2 w-8 md:w-20 h-3 md:h-6 bg-slate-700" style={{ clipPath: 'polygon(15% 0, 85% 0, 100% 100%, 0% 100%)' }}></div>
                <div className="absolute -bottom-4 md:-bottom-7 left-1/2 -translate-x-1/2 w-16 md:w-36 h-1 bg-slate-600 rounded-full shadow-lg"></div>
              </div>
            )}

            {/* Mobile Phone */}
            {project.deviceType === "mobile" && (
              <div className="relative w-[140px] h-[280px] md:w-[230px] md:h-[460px] bg-slate-800 rounded-[20px] md:rounded-[32px] border-[3px] md:border-[5px] border-slate-800 shadow-[5px_5px_20px_rgba(0,0,0,0.9)] md:shadow-[10px_10px_40px_rgba(0,0,0,0.9)] z-20 overflow-hidden flex flex-col shrink-0 mx-auto">
                {/* Notch */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-10 md:w-18 h-3 md:h-4 bg-slate-800 rounded-b-md md:rounded-b-lg z-30"></div>
                {/* Screen */}
                <div 
                  className={`w-full h-full bg-black relative ${project.link ? 'cursor-pointer group' : ''}`}
                  onClick={() => project.link && window.open(project.link, '_blank')}
                >
                  {project.video ? (
                    <video 
                      autoPlay 
                      loop 
                      muted 
                      playsInline 
                      className={`w-full h-full object-cover transition-transform duration-700 ${project.link ? 'group-hover:scale-105' : ''}`}
                      src={project.video}
                    />
                  ) : (
                    <img 
                      alt={`${project.title} Mobile`} 
                      className={`w-full h-full object-cover transition-transform duration-700 ${project.link ? 'group-hover:scale-105' : ''}`} 
                      src={project.mainImage}
                    />
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent pointer-events-none"></div>
                  <div className="absolute bottom-3 md:bottom-4 left-3 md:left-4 z-10">
                    <p className="text-accent font-bold text-[8px] md:text-[10px] tracking-[2px] uppercase flex items-center gap-1">
                      {project.tag.split('/')[0]}
                      {project.link && <span className="material-symbols-outlined text-[10px] md:text-[12px] text-accent opacity-0 group-hover:opacity-100 transition-all duration-300">open_in_new</span>}
                    </p>
                  </div>
                </div>
              </div>
            )}

          </div>
        </motion.div>

      </div>
    </div>
  );
};

