import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUpRight, Check, X, Mountain } from 'lucide-react';
import { projects, type Project } from '../data';
import { fadeUp, staggerContainer } from './primitives';
import SectionHeading from './SectionHeading';

function ProjectCard({ project, onOpen }: { project: Project; onOpen: () => void }) {
  return (
    <motion.article
      variants={fadeUp}
      onClick={onOpen}
      className="group card-hover relative cursor-pointer overflow-hidden rounded-3xl border border-white/[0.06] bg-ink-850/60 hover:shadow-mono-glow hover:border-white/15"
    >
      {/* Image */}
      <div className="relative h-56 overflow-hidden sm:h-64">
        <img
          src={project.image}
          alt={project.title}
          loading="lazy"
          className="img-mono h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-ink-950 via-ink-950/40 to-transparent" />
        <div className="absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:bg-white/[0.04]" />
        <div className="absolute left-4 top-4 flex items-center gap-2">
          <span className="rounded-full border border-white/15 bg-ink-950/60 px-3 py-1 text-xs font-medium text-ash-100 backdrop-blur">
            Featured
          </span>
        </div>
        <div className="absolute right-4 top-4">
          <span className="flex h-9 w-9 items-center justify-center rounded-full bg-ink-950/70 text-platinum backdrop-blur transition-all group-hover:bg-platinum group-hover:text-ink-950">
            <ArrowUpRight className="h-4 w-4" />
          </span>
        </div>
      </div>

      {/* Body */}
      <div className="p-6">
        <p className="mb-1.5 font-mono text-xs uppercase tracking-wider text-ash-300">
          {project.subtitle}
        </p>
        <h3 className="font-sans text-xl font-bold text-platinum">{project.title}</h3>
        <p className="mt-3 text-sm leading-relaxed text-ash-200">{project.description}</p>

        <div className="mt-5 flex flex-wrap gap-2">
          {project.tags.slice(0, 4).map((tag) => (
            <span
              key={tag}
              className="rounded-md border border-white/10 bg-white/5 px-2.5 py-1 text-xs text-ash-100"
            >
              {tag}
            </span>
          ))}
          {project.tags.length > 4 && (
            <span className="rounded-md border border-white/10 bg-white/5 px-2.5 py-1 text-xs text-ash-300">
              +{project.tags.length - 4}
            </span>
          )}
        </div>
      </div>
    </motion.article>
  );
}

function ProjectModal({ project, onClose }: { project: Project; onClose: () => void }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
      className="fixed inset-0 z-[60] flex items-end justify-center bg-ink-950/85 p-4 backdrop-blur-md sm:items-center"
    >
      <motion.div
        initial={{ opacity: 0, y: 40, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 40, scale: 0.98 }}
        transition={{ duration: 0.35, ease: 'easeOut' }}
        onClick={(e) => e.stopPropagation()}
        className="relative max-h-[88vh] w-full max-w-2xl overflow-y-auto rounded-3xl border border-white/10 bg-ink-900"
      >
        <button
          onClick={onClose}
          className="absolute right-4 top-4 z-10 flex h-9 w-9 items-center justify-center rounded-full bg-ink-950/70 text-platinum backdrop-blur transition-colors hover:bg-ink-950"
          aria-label="Close"
        >
          <X className="h-4 w-4" />
        </button>
        <div className="relative h-48 overflow-hidden sm:h-60">
          <img
            src={project.image}
            alt={project.title}
            className="img-mono h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-ink-900 to-transparent" />
        </div>
        <div className="p-6 sm:p-8">
          <p className="mb-2 font-mono text-xs uppercase tracking-wider text-ash-300">
            {project.subtitle}
          </p>
          <h3 className="font-sans text-2xl font-bold text-platinum sm:text-3xl">
            {project.title}
          </h3>
          <div className="mt-5 space-y-3">
            {project.longDescription.map((p, i) => (
              <p key={i} className="text-sm leading-relaxed text-ash-200">
                {p}
              </p>
            ))}
          </div>

          <div className="mt-6">
            <h4 className="mb-3 font-mono text-xs uppercase tracking-widest text-ash-300">
              Key highlights
            </h4>
            <ul className="space-y-2">
              {project.highlights.map((h) => (
                <li key={h} className="flex items-start gap-2.5 text-sm text-ash-100">
                  <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full border border-white/15 bg-white/5 text-platinum">
                    <Check className="h-3 w-3" />
                  </span>
                  {h}
                </li>
              ))}
            </ul>
          </div>

          <div className="mt-6 flex flex-wrap gap-2">
            {project.tags.map((tag) => (
              <span
                key={tag}
                className="rounded-md border border-white/10 bg-white/5 px-2.5 py-1 text-xs text-ash-100"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

export default function Projects() {
  const [selected, setSelected] = useState<Project | null>(null);

  return (
    <section id="projects" className="relative py-24 sm:py-32">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <SectionHeading
          eyebrow="Featured Work"
          title="Projects that bridge"
          highlight="hardware & humanity"
          description="Selected engineering work spanning assistive tech, IoT, and smart agriculture."
        />

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
          className="mt-14 grid gap-6 sm:grid-cols-2"
        >
          {projects.map((p) => (
            <ProjectCard key={p.id} project={p} onOpen={() => setSelected(p)} />
          ))}
        </motion.div>

        {/* Ascent callout */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mt-10 flex items-center justify-center gap-2 text-xs text-ash-300"
        >
          <Mountain className="h-3.5 w-3.5" />
          <span className="font-mono uppercase tracking-widest">
            The ascent continues below
          </span>
        </motion.div>
      </div>

      <AnimatePresence>
        {selected && <ProjectModal project={selected} onClose={() => setSelected(null)} />}
      </AnimatePresence>
    </section>
  );
}
