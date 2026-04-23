import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

const Home = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e) => {
      const x = (e.clientX - window.innerWidth / 2) * 0.01;
      const y = (e.clientY - window.innerHeight / 2) * 0.01;
      setMousePosition({ x, y });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

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
      <section id="services" className="py-32 px-8 flex flex-col items-center">
        <p className="section-tag">Capabilities</p>
        <h2 className="text-[clamp(2.5rem,5vw,4rem)] mb-16 text-center">Our Expertise</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 w-full max-w-7xl">
          <ServiceCard 
            icon="https://cdn3d.iconscout.com/3d/premium/thumb/smart-phone-5174984-4322436.png"
            title="Mobile Apps"
            description="Native iOS & Android development with a focus on buttery-smooth UI and performance."
          />
          <ServiceCard 
            icon="https://cdn3d.iconscout.com/3d/premium/thumb/web-development-5381861-4500010.png"
            title="Web Platforms"
            description="High-conversion websites and complex SaaS dashboards built with modern tech stacks."
          />
          <ServiceCard 
            icon="https://cdn3d.iconscout.com/3d/premium/thumb/cloud-computing-5606161-4663842.png"
            title="Cloud & AI"
            description="Scalable backend systems and custom AI integrations to automate your business flow."
          />
        </div>
      </section>

      {/* WORK SECTION */}
      <section id="work" className="py-32 px-8 flex flex-col items-center">
        <p className="section-tag">Portfolio</p>
        <h2 className="text-[clamp(2.5rem,5vw,4rem)] mb-16 text-center">Selected Projects</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 w-full max-w-7xl">
          <ProjectCard 
            image="https://images.unsplash.com/photo-1616469829581-73993eb86b02?q=80&w=2070&auto=format&fit=crop"
            tag="MOBILE / FINTECH"
            title="Nova Wallet App"
          />
          <ProjectCard 
            image="https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=2015&auto=format&fit=crop"
            tag="WEB / SAAS"
            title="Zenith AI Dashboard"
          />
          <ProjectCard 
            image="https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2070&auto=format&fit=crop"
            tag="WEB / ANALYTICS"
            title="Quantum Data Engine"
          />
          <ProjectCard 
            image="https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?q=80&w=2070&auto=format&fit=crop"
            tag="MOBILE / LIFESTYLE"
            title="Aura Social Network"
          />
        </div>
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

const ServiceCard = ({ icon, title, description }) => (
  <div className="glass p-12 rounded-[30px] transition-all duration-500 hover:border-accent group hover:-translate-y-2 hover:bg-accent/5">
    <img src={icon} alt={title} className="w-16 mb-6 group-hover:scale-110 transition-transform" />
    <h3 className="text-xl font-bold mb-4">{title}</h3>
    <p className="text-slate-400 text-sm leading-relaxed">{description}</p>
  </div>
);

const ProjectCard = ({ image, tag, title }) => (
  <div className="relative rounded-3xl overflow-hidden h-[450px] border border-white/10 group hover:border-accent transition-all duration-500">
    <img src={image} alt={title} className="w-full h-full object-cover brightness-50 group-hover:brightness-100 group-hover:scale-110 transition-all duration-700" />
    <div className="absolute bottom-0 p-10 w-full bg-gradient-to-t from-black to-transparent">
      <p className="text-accent font-bold text-[0.7rem] tracking-widest uppercase mb-2">{tag}</p>
      <h3 className="text-2xl font-bold">{title}</h3>
    </div>
  </div>
);

export default Home;
