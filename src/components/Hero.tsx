import { motion } from 'framer-motion';
import { ArrowDown, Mountain } from 'lucide-react';
import { profile } from '../data';
import { fadeUp, fadeUpLarge, staggerContainer, SocialIcon } from './primitives';

/**
 * Home section — ultra-minimalist.
 * Only the name (primary heading) + tagline + a single CTA row.
 * A Hero-scoped mountain silhouette sits strictly in the background
 * (z-0, opacity ~12%, pointer-events-none) and never overflows: the
 * section is `overflow-hidden` and bounded to its own height.
 */
export default function Hero() {
  return (
    <section
      id="home"
      className="relative isolate flex min-h-screen items-center overflow-hidden"
    >
      {/* Hero-scoped mountain silhouette background.
          - z-0 (behind content which is z-10)
          - low opacity, pointer-events-none
          - absolutely positioned + bounded by section's overflow-hidden */}
      <HeroMountains className="pointer-events-none absolute inset-x-0 bottom-0 z-0 h-[70%] opacity-[0.12]" />

      {/* Content */}
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        animate="visible"
        className="relative z-10 mx-auto flex w-full max-w-6xl flex-col items-start px-5 pt-28 pb-24 sm:px-8"
      >
        <motion.span
          variants={fadeUp}
          className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 font-mono text-xs text-ash-200 backdrop-blur"
        >
          <Mountain className="h-3.5 w-3.5 text-platinum" />
          The ascent starts here
        </motion.span>

        <motion.h1
          variants={fadeUpLarge}
          className="mt-6 max-w-4xl font-sans text-5xl font-extrabold leading-[1.0] tracking-tight text-platinum sm:text-6xl md:text-8xl"
        >
          {profile.name.split(' ')[0]}
          <br />
          <span className="text-ash-200">{profile.name.split(' ').slice(1).join(' ')}</span>
        </motion.h1>

        <motion.p
          variants={fadeUp}
          className="mt-6 font-mono text-sm uppercase tracking-[0.3em] text-ash-200 sm:text-base"
        >
          {profile.tagline}
        </motion.p>

        {/* Minimal CTA row */}
        <motion.div variants={fadeUp} className="mt-10 flex flex-wrap items-center gap-4">
          <a
            href="#about"
            className="group inline-flex items-center gap-2 rounded-xl bg-platinum px-6 py-3.5 text-sm font-semibold text-ink-950 transition-all hover:scale-[1.03] hover:bg-white hover:shadow-mono-glow"
          >
            Begin the climb
            <ArrowDown className="h-4 w-4 transition-transform group-hover:translate-y-0.5" />
          </a>
          <div className="flex items-center gap-1">
            {profile.social.map((s) => (
              <a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noreferrer"
                aria-label={s.label}
                className="flex h-10 w-10 items-center justify-center rounded-lg border border-white/10 text-ash-300 transition-all hover:border-white/30 hover:text-platinum"
              >
                <SocialIcon name={s.icon} />
              </a>
            ))}
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}

/**
 * Layered mountain silhouettes scoped strictly to the Home section.
 * Bottom-anchored so peaks rise from the base of the hero.
 */
function HeroMountains({ className }: { className?: string }) {
  return (
    <div className={className} aria-hidden>
      {/* Back range */}
      <svg
        viewBox="0 0 1440 320"
        preserveAspectRatio="none"
        className="absolute bottom-0 left-0 h-full w-full"
      >
        <path d="M0,320 L0,200 L120,120 L220,180 L340,70 L460,150 L580,60 L720,160 L860,80 L1000,170 L1140,90 L1280,180 L1440,110 L1440,320 Z" fill="#3a3a40" />
      </svg>
      {/* Mid range */}
      <svg
        viewBox="0 0 1440 320"
        preserveAspectRatio="none"
        className="absolute bottom-0 left-0 h-full w-full"
      >
        <path d="M0,320 L0,240 L160,160 L300,220 L440,130 L600,210 L760,140 L920,220 L1080,150 L1240,230 L1440,170 L1440,320 Z" fill="#27272a" />
      </svg>
      {/* Front range — darkest */}
      <svg
        viewBox="0 0 1440 320"
        preserveAspectRatio="none"
        className="absolute bottom-0 left-0 h-[85%] w-full"
      >
        <path d="M0,320 L0,270 L180,210 L360,260 L540,200 L720,250 L900,210 L1100,260 L1280,220 L1440,250 L1440,320 Z" fill="#18181b" />
      </svg>
      {/* Fade into the page background so the top edge is soft */}
      <div className="absolute inset-x-0 top-0 h-1/3 bg-gradient-to-b from-ink-950 to-transparent" />
    </div>
  );
}
