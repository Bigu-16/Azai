import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { portfolioProjects, AutoVideo, ProjectModal } from './Home';

/* Auto-advancing slideshow with a per-slide caption (subtitle). */
const CardSlideshow = ({ gallery }) => {
  const [i, setI] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setI((p) => (p + 1) % gallery.length), 2800);
    return () => clearInterval(t);
  }, [gallery.length]);

  return (
    <>
      {gallery.map((slide, idx) => (
        <img
          key={idx}
          src={slide.src}
          alt={slide.caption}
          className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-700 ${idx === i ? 'opacity-100' : 'opacity-0'}`}
        />
      ))}
      {/* Progress dots */}
      <div className="absolute top-3 left-3 z-10 flex gap-1.5">
        {gallery.map((_, idx) => (
          <span
            key={idx}
            className={`h-1.5 rounded-full transition-all duration-300 ${idx === i ? 'w-4 bg-white' : 'w-1.5 bg-white/50'}`}
          />
        ))}
      </div>
      {/* Caption / subtitle */}
      <div className="absolute inset-x-0 bottom-0 px-4 pt-10 pb-3 md:pb-4 bg-gradient-to-t from-black/85 to-transparent pointer-events-none">
        <p className="text-[11px] md:text-xs font-medium leading-snug" style={{ color: '#ffffff' }}>
          {gallery[i].caption}
        </p>
      </div>
    </>
  );
};

const Projects = () => {
  const [selected, setSelected] = useState(null);

  return (
    <div className="pt-16 md:pt-20 min-h-screen">
      {selected && <ProjectModal project={selected} onClose={() => setSelected(null)} />}

      <section className="py-14 md:py-24 px-4 md:px-8 max-w-[1280px] mx-auto">
        {/* Header */}
        <div className="flex flex-col items-center text-center mb-10 md:mb-16">
          <p className="section-tag">Portfolio</p>
          <h1 className="font-display text-[clamp(2rem,5vw,3.5rem)] mb-3 md:mb-4">Our Projects</h1>
          <p className="text-slate-400 max-w-xl text-sm md:text-base leading-relaxed">
            A selection of products we've designed, built, and shipped across web, mobile, and AI.
          </p>
        </div>

        {/* Grid: 2 columns */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 md:gap-8">
          {portfolioProjects.map((project) => {
            const thumb = project.mainImage || (project.images && project.images[0]) || '';
            return (
              <motion.div
                key={project.id}
                whileHover={{ y: -6 }}
                onClick={() => setSelected(project)}
                className="group relative rounded-2xl overflow-hidden glass border border-white/10 cursor-pointer shadow-xl hover:border-accent/50 hover:shadow-[0_0_30px_rgba(0,242,255,0.2)] transition-all duration-300"
              >
                {/* Media */}
                <div className="relative aspect-video overflow-hidden bg-slate-900">
                  {project.gallery ? (
                    <CardSlideshow gallery={project.gallery} />
                  ) : project.video ? (
                    <AutoVideo
                      src={project.video}
                      projectId={project.id}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  ) : (
                    <img
                      src={thumb}
                      alt={project.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  )}
                  {/* Expand hint */}
                  <div className="absolute top-3 right-3 w-8 h-8 rounded-md bg-black/50 border border-white/10 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <span className="material-symbols-outlined text-white text-base">open_in_full</span>
                  </div>
                </div>

                {/* Body */}
                <div className="p-4 md:p-5">
                  <span className="text-[10px] text-accent tracking-[0.3em] uppercase font-bold">{project.tag}</span>
                  <h3 className="font-display text-lg md:text-xl text-white mt-1 leading-tight">{project.title}</h3>
                  {(project.shortDescription || project.description) && (
                    <p className="mt-2 md:mt-3 text-sm md:text-base text-slate-400 leading-relaxed">
                      {project.shortDescription || project.description}
                    </p>
                  )}
                  {project.link && (
                    <a
                      href={project.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={(e) => e.stopPropagation()}
                      className="mt-3 inline-flex items-center gap-1.5 text-[11px] tracking-widest uppercase text-slate-400 hover:text-accent transition-colors"
                    >
                      <span className="material-symbols-outlined text-sm">link</span>
                      Visit site
                    </a>
                  )}
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Back to Home */}
        <div className="flex justify-center mt-12 md:mt-16">
          <Link
            to="/"
            onClick={() => window.scrollTo(0, 0)}
            className="inline-flex items-center gap-2 text-sm tracking-widest uppercase text-slate-400 hover:text-accent transition-colors"
          >
            <span className="material-symbols-outlined">arrow_back</span>
            Back to Home
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Projects;
