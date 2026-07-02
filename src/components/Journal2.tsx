import { useState } from 'react';
import { motion } from 'framer-motion';
import { projects } from '../data';
import InvisibleMarginNotes, { secretMessages } from './InvisibleMarginNotes';

// Six-fingered hand with number 2
function SixFingerHand2({ className = '' }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 120 100"
      className={className}
      style={{ filter: 'drop-shadow(0 4px 8px rgba(0,0,0,0.4))' }}
    >
      {/* Palm */}
      <path
        d="M30 95 L30 60 L20 45 L25 40 L35 55 L35 25 L42 25 L42 55 L50 20 L58 22 L45 60 L65 15 L73 18 L52 65 L80 25 L88 30 L60 70 L95 40 L100 48 L65 75 L70 60 L70 85 L65 85 L60 90 L55 90 L50 92 L45 90 L35 90 L30 95 Z"
        fill="#1a3a5c"
        stroke="#0d1f30"
        strokeWidth="2"
      />
      {/* Number 2 */}
      <text
        x="60"
        y="70"
        textAnchor="middle"
        fontSize="24"
        fontWeight="bold"
        fill="#00FFFF"
        style={{ fontFamily: '"Cinzel Decorative", serif' }}
      >
        2
      </text>
      {/* Glint effect */}
      <ellipse cx="30" cy="40" rx="3" ry="5" fill="#4a90d9" opacity="0.6" />
    </svg>
  );
}

interface ProjectCardProps {
  project: typeof projects[0];
  index: number;
}

function ProjectCard({ project, index }: ProjectCardProps) {
  const [isHovered, setIsHovered] = useState(false);

  const notes = [
    {
      text: secretMessages.indonesian[index % secretMessages.indonesian.length],
      position: index % 2 === 0 ? 'left' as const : 'right' as const,
      top: '20%',
      color: index % 2 === 0 ? 'cyan' as const : 'magenta' as const,
    },
    {
      text: secretMessages.formulas[index % secretMessages.formulas.length],
      position: index % 2 === 0 ? 'right' as const : 'left' as const,
      top: '60%',
      color: index % 2 === 0 ? 'magenta' as const : 'cyan' as const,
    },
  ];

  return (
    <InvisibleMarginNotes triggerState={isHovered} notes={notes}>
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-50px' }}
        transition={{ duration: 0.6, delay: index * 0.15 }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className="group relative"
      >
        {/* Sketchy border wrapper */}
        <div className="relative rounded-sm border-2 border-dashed border-blue-900/40 p-4 transition-all duration-500 group-hover:border-solid group-hover:border-cyan-400/60">
          {/* Hand-drawn corner decorations */}
          <div className="absolute -left-1 -top-1 h-4 w-4 border-l-2 border-t-2 border-blue-900/30" />
          <div className="absolute -right-1 -top-1 h-4 w-4 border-r-2 border-t-2 border-blue-900/30" />
          <div className="absolute -bottom-1 -left-1 h-4 w-4 border-b-2 border-l-2 border-blue-900/30" />
          <div className="absolute -bottom-1 -right-1 h-4 w-4 border-b-2 border-r-2 border-blue-900/30" />

          {/* Blueprint styled card */}
          <div
            className="blacklight-card relative overflow-hidden rounded bg-parchment-200 shadow-paper transition-all duration-500"
            style={{
              background: isHovered
                ? 'linear-gradient(135deg, #0a1628, #1a2a4a)'
                : 'linear-gradient(135deg, #f0e6cc, #e8dcb8)',
            }}
          >
            {/* Image container */}
            <div className="relative aspect-video overflow-hidden">
              {/* Grid lines overlay (blueprint style) */}
              <div
                className="absolute inset-0 z-10 opacity-10 transition-opacity duration-500 group-hover:opacity-40"
                style={{
                  backgroundImage: `
                    linear-gradient(to right, ${isHovered ? '#00FFFF' : '#1a3a5c'} 1px, transparent 1px),
                    linear-gradient(to bottom, ${isHovered ? '#00FFFF' : '#1a3a5c'} 1px, transparent 1px)
                  `,
                  backgroundSize: '20px 20px',
                }}
              />

              {/* Project image with blacklight effect */}
              <img
                src={project.image}
                alt={project.title}
                className="h-full w-full object-cover transition-all duration-500"
                style={{
                  filter: isHovered
                    ? 'sepia(0) saturate(1.3) contrast(1.1)'
                    : 'sepia(0.6) contrast(1.05) brightness(0.9)',
                }}
              />

              {/* UV reveal overlay - hidden tech stack */}
              <div className="absolute inset-0 z-20 flex items-end justify-center bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100">
                <div className="mb-4 text-center">
                  <p className="uv-text font-typewriter text-xs uppercase tracking-wider">
                    Tech Stack Detected
                  </p>
                  <motion.div
                    initial={{ y: 20, opacity: 0 }}
                    animate={isHovered ? { y: 0, opacity: 1 } : { y: 20, opacity: 0 }}
                    transition={{ delay: 0.2 }}
                    className="mt-2 flex flex-wrap justify-center gap-1"
                  >
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="rounded border border-cyan-400/50 bg-cyan-900/30 px-2 py-0.5 font-mono text-xs text-cyan-400"
                      >
                        {tag}
                      </span>
                    ))}
                  </motion.div>
                </div>
              </div>

              {/* Blueprint stamp */}
              <div
                className="absolute right-2 top-2 rounded-sm border border-current p-1 font-typewriter text-[10px] uppercase opacity-50 transition-colors duration-500"
                style={{
                  borderColor: isHovered ? '#FF00FF' : '#1a3a5c',
                  color: isHovered ? '#FF00FF' : '#1a3a5c',
                  transform: 'rotate(3deg)',
                }}
              >
                Anomaly #{index + 1}
              </div>
            </div>

            {/* Content area */}
            <div className="p-4">
              {/* Title and subtitle */}
              <h3
                className="font-cryptic text-xl font-bold transition-colors duration-500"
                style={{ color: isHovered ? '#00FFFF' : '#1a3a5c' }}
              >
                {project.title}
              </h3>
              <p
                className="mt-1 font-typewriter text-sm transition-colors duration-500"
                style={{ color: isHovered ? '#FF00FF' : '#1a3a5c' }}
              >
                "{project.subtitle}"
              </p>

              {/* Description */}
              <p
                className="mt-3 font-serif text-sm leading-relaxed transition-colors duration-500"
                style={{ color: isHovered ? '#e0f0ff' : '#4a4a4a' }}
              >
                {project.description}
              </p>

              {/* Highlights as "anomaly readings" */}
              <div className="mt-4 space-y-2">
                {project.highlights.map((highlight, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.1 * i }}
                    className="flex items-start gap-2"
                  >
                    <div
                      className="mt-1 h-2 w-2 rounded-full border transition-colors duration-500"
                      style={{
                        borderColor: isHovered ? '#00FFFF' : '#1a3a5c',
                        background: isHovered ? '#00FFFF' : 'transparent',
                      }}
                    />
                    <p
                      className="flex-1 font-typewriter text-xs transition-colors duration-500"
                      style={{ color: isHovered ? '#a0e8ff' : '#5c4a32' }}
                    >
                      {highlight}
                    </p>
                  </motion.div>
                ))}
              </div>

              {/* Technical specs panel (shown on hover) */}
              {isHovered && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-4 border-t border-cyan-400/30 pt-4"
                >
                  <p className="font-mono text-[10px] uppercase tracking-widest text-cyan-400">
                    System Analysis Complete
                  </p>
                  <p className="mt-2 font-serif text-xs text-gray-300">
                    {project.longDescription[0]}
                  </p>
                </motion.div>
              )}
            </div>
          </div>
        </div>
      </motion.div>
    </InvisibleMarginNotes>
  );
}

export default function Journal2() {
  return (
    <section id="projects" className="relative px-4 py-16 md:px-8 lg:pr-20">
      {/* Journal header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mb-8 flex items-center gap-6"
        >
          {/* Six-fingered hand */}
          <SixFingerHand2 className="h-24 w-28 md:h-32 md:w-36" />

          {/* Journal title */}
          <div>
            <h2 className="font-cryptic text-3xl font-bold md:text-4xl" style={{ color: '#1a3a5c' }}>
              JOURNAL #2
            </h2>
            <p className="font-typewriter text-sm uppercase tracking-widest text-parchment-500">
              Anomalous Machines & Mystical Blueprints
            </p>
          </div>
        </motion.div>

        {/* Decorative line */}
        <motion.div
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-12 h-1 bg-gradient-to-r from-[#1a3a5c] via-parchment-500 to-transparent"
          style={{ transformOrigin: 'left' }}
        />

        {/* Intro text */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="relative mb-12 overflow-hidden rounded border border-blue-900/20 bg-parchment-200 p-6"
        >
          {/* Blueprint grid background */}
          <div
            className="absolute inset-0 opacity-5"
            style={{
              backgroundImage: `
                linear-gradient(to right, #1a3a5c 1px, transparent 1px),
                linear-gradient(to bottom, #1a3a5c 1px, transparent 1px)
              `,
              backgroundSize: '20px 20px',
            }}
          />

          <p className="relative font-typewriter text-parchment-600 text-lg">
            "The following entries document anomalous technological constructs discovered
            during field research. Each machine exhibits properties that defy conventional
            understanding. Handle with extreme caution."
          </p>
          <p className="mt-4 font-typewriter text-sm text-blue-900/50">
            - Journal Entry, Classified
          </p>
        </motion.div>

        {/* Projects grid */}
        <div className="grid gap-8 md:gap-12 lg:grid-cols-2">
          {projects.map((project, index) => (
            <ProjectCard key={project.id} project={project} index={index} />
          ))}
        </div>

        {/* Hidden warning message */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mt-16 text-center"
        >
          <p className="font-typewriter text-xs uppercase tracking-[0.5em] text-parchment-400/50">
            Hover over blueprints to reveal hidden specifications...
          </p>
        </motion.div>
    </section>
  );
}
