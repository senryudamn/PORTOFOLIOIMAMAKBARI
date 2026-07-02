import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { TrailIcon } from './AscentMeta';
import { awards } from '../data';
import { fadeUp, AwardIcon } from './primitives';
import SectionHeading from './SectionHeading';

/**
 * "Ascent Trail" — awards rendered as altitude checkpoints on a
 * climb to the summit. The trail path fills with progress as the
 * user scrolls through the section, creating the feeling of ascending.
 */
export default function Awards() {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start 0.6', 'end 0.4'],
  });

  // The trail fill height (0->1) drives the SVG dashoffset + a vertical bar.
  const fillHeight = useTransform(scrollYProgress, [0, 1], ['0%', '100%']);

  // Reverse-chronological display: climb from Base Camp -> Summit.
  const trail = [...awards].sort((a, b) => a.altitude - b.altitude);
  const maxAlt = Math.max(...trail.map((a) => a.altitude));

  return (
    <section id="awards" ref={sectionRef} className="relative py-24 sm:py-32">
      <div className="mx-auto max-w-5xl px-5 sm:px-8">
        <SectionHeading
          eyebrow="The Ascent"
          title="Awards as"
          highlight="altitude checkpoints"
          description="Every recognition is a milestone on the climb. Scroll to ascend the trail from Base Camp to the Summit."
        />

        {/* Altitude legend */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="mt-8 flex items-center justify-center gap-6 font-mono text-xs uppercase tracking-widest text-ash-300"
        >
          <span className="flex items-center gap-2">
            <span className="h-2 w-2 rounded-full border border-white/30" />
            Base · {'0 m'}
          </span>
          <span className="h-3 w-px bg-white/10" />
          <span className="flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-platinum" />
            Summit · {maxAlt.toLocaleString()} m
          </span>
        </motion.div>

        {/* Trail track + fill live in a bounded wrapper so the line
            ends at the summit circle and never runs through the text. */}
        <div className="relative mt-16">
          <div className="pointer-events-none absolute left-5 top-0 bottom-[150px] z-0 w-px bg-white/10 sm:left-1/2 sm:-translate-x-1/2">
            {/* Animated fill — grows 0→100% within the bounded wrapper */}
            <motion.div
              style={{ height: fillHeight }}
              className="absolute left-0 top-0 w-px bg-gradient-to-t from-white/10 via-ash-100 to-platinum"
            />
          </div>

          {/* Trail profile — faint mountain ridge behind the path */}
          <TrailRidge className="pointer-events-none absolute inset-0 -z-[1] hidden opacity-[0.04] sm:block" />

          <div className="flex flex-col gap-10 sm:gap-2">
            {trail.map((award, i) => {
              const isLeft = i % 2 === 0;
              return (
                <motion.div
                  key={`${award.year}-${award.title}`}
                  variants={fadeUp}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, amount: 0.4 }}
                  className={`relative flex w-full sm:items-center ${
                    isLeft ? 'sm:flex-row-reverse' : 'sm:flex-row'
                  }`}
                >
                  {/* Node — sits on the trail */}
                  <div className="absolute left-5 z-10 -translate-x-1/2 sm:left-1/2 sm:-translate-x-1/2">
                    <span className="relative flex h-11 w-11 items-center justify-center rounded-full border border-white/15 bg-ink-950">
                      <TrailIcon />
                      <span className="absolute inset-0 -z-10 rounded-full bg-platinum/10 blur-md" />
                    </span>
                  </div>

                  {/* Card */}
                  <div
                    className={`ml-14 flex flex-col sm:ml-0 sm:w-[calc(50%-3rem)] ${
                      isLeft ? 'sm:pr-8 sm:text-right' : 'sm:pl-8'
                    }`}
                  >
                    <div className="glass card-hover rounded-2xl p-5">
                      {/* Altitude reading */}
                      <div
                        className={`flex items-center gap-3 ${
                          isLeft ? 'sm:flex-row-reverse' : ''
                        }`}
                      >
                        <span className="font-mono text-2xl font-bold text-platinum">
                          {award.altitude.toLocaleString()}
                          <span className="ml-1 text-sm text-ash-300">m</span>
                        </span>
                        <span className="font-mono text-[0.65rem] uppercase tracking-[0.2em] text-ash-300">
                          {award.ascentLabel}
                        </span>
                      </div>

                      <div
                        className={`mt-2 flex items-center gap-2 ${
                          isLeft ? 'sm:flex-row-reverse' : ''
                        }`}
                      >
                        <span className="flex items-center gap-1.5 rounded-full border border-white/10 bg-white/5 px-2.5 py-0.5 text-xs text-ash-100">
                          <AwardIcon name={award.icon} className="h-3 w-3" />
                          {award.year}
                        </span>
                        <span className="rounded-full border border-white/10 bg-white/5 px-2.5 py-0.5 text-xs text-ash-300">
                          {award.level}
                        </span>
                      </div>

                      <h3 className="mt-3 font-sans text-base font-bold leading-snug text-platinum sm:text-lg">
                        {award.title}
                      </h3>
                      <p className="mt-1.5 text-xs text-ash-300">{award.organization}</p>
                      <p className="mt-3 text-sm leading-relaxed text-ash-200">
                        {award.description}
                      </p>
                      {award.project !== '—' && (
                        <div
                          className={`mt-3 rounded-xl border border-white/[0.06] bg-ink-950/60 px-3 py-2 text-xs text-ash-200 ${
                            isLeft ? 'sm:text-right' : ''
                          }`}
                        >
                          <span className="font-mono uppercase tracking-wide text-ash-300">
                            Project:
                          </span>{' '}
                          <em>{award.project}</em>
                        </div>
                      )}

                      {/* Progress bar for this checkpoint */}
                      <div className="mt-4">
                        <div className="h-0.5 w-full overflow-hidden rounded-full bg-white/5">
                          <motion.div
                            initial={{ width: 0 }}
                            whileInView={{
                              width: `${(award.altitude / maxAlt) * 100}%`,
                            }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8, ease: 'easeOut' }}
                            className="h-full rounded-full bg-gradient-to-r from-ash-300 to-platinum"
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Spacer for the other half on desktop */}
                  <div className="hidden sm:block sm:w-[calc(50%-3rem)]" />
                </motion.div>
              );
            })}
          </div>

          {/* Summit marker — circle sits above the text, never overlapping it.
              The centered trail line passes through the circle cleanly. */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="relative mt-14 flex flex-col items-center"
          >
            {/* Circle node — centered on the trail line, with spacing below */}
            <div className="relative z-10 mb-6 flex h-11 w-11 items-center justify-center rounded-full bg-platinum text-ink-950 shadow-mono-glow">
              <TrailIcon />
            </div>
            {/* Text — fully visible, no overlap, centered */}
            <div className="px-4 text-center">
              <p className="font-mono text-xs uppercase tracking-[0.3em] text-ash-300">
                The climb continues
              </p>
              <p className="mt-2 font-sans text-lg font-bold text-platinum">
                Next peak in progress.
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

/** A faint mountain ridge profile rendered behind the trail. */
function TrailRidge({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 800 1200" preserveAspectRatio="none">
      <path
        d="M400,0 L400,1200"
        fill="none"
        stroke="#ffffff"
        strokeWidth="1"
        strokeOpacity="0.15"
        strokeDasharray="4 8"
      />
      <path
        d="M0,1100 L150,950 L250,1020 L360,800 L430,880 L540,600 L610,680 L720,350 L800,200"
        fill="none"
        stroke="#ffffff"
        strokeWidth="1"
        strokeOpacity="0.12"
      />
      <path
        d="M0,1150 L120,1050 L200,1100 L320,920 L400,980 L520,760 L600,820 L700,500 L800,320"
        fill="none"
        stroke="#ffffff"
        strokeWidth="1"
        strokeOpacity="0.08"
      />
    </svg>
  );
}
