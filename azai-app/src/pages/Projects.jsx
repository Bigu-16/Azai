import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { portfolioProjects, AutoVideo, ProjectModal } from './Home';

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

        {/* Grid: up to 3 columns */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
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
                  {project.video ? (
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
                  {project.description && (
                    <p className="mt-2 md:mt-3 text-[10px] md:text-[11px] text-slate-400 tracking-[0.15em] leading-[1.9] uppercase font-sans font-medium">
                      {project.description}
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
