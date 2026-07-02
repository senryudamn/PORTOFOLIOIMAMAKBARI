import { motion } from 'framer-motion';
import { MapPin, GraduationCap, Cpu, Radio, Bot, Sparkles, Mountain } from 'lucide-react';
import { profile } from '../data';
import SectionHeading from './SectionHeading';

const focusIcons = [Radio, Bot, Cpu, Sparkles] as const;

export default function About() {
  const bioParagraphs = profile.bio.split('\n').filter(Boolean);

  return (
    <section id="about" className="relative py-24 sm:py-32">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <SectionHeading
          eyebrow="Base Camp"
          title="Who"
          highlight="am I?"
          description="The person behind the projects, the climb, and the ambition."
        />

        <div className="mt-14 grid gap-10 lg:grid-cols-12 lg:gap-14">
          {/* Photo column — elegant asymmetric geometric frame */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="lg:col-span-5"
          >
            <div className="relative mx-auto w-full max-w-sm lg:mx-0">
              <div className="relative aspect-[4/5]">
                {/* Decorative outline — shifted down-right */}
                <div className="absolute inset-0 translate-x-3 translate-y-3 rounded-[2rem] border border-white/15" />
                {/* Photo */}
                <div className="absolute inset-0 overflow-hidden rounded-[2rem] border border-white/10 bg-ink-850 shadow-mono-soft">
                  <img
                    src={profile.photo}
                    alt={`Portrait of ${profile.name}`}
                    loading="lazy"
                    className="img-mono h-full w-full object-cover transition-transform duration-700 hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-ink-950/80 via-transparent to-transparent" />
                  {/* Topo corner mark */}
                  <span className="absolute left-4 top-4 flex h-8 w-8 items-center justify-center rounded-lg border border-white/15 bg-ink-950/60 text-platinum backdrop-blur">
                    <Mountain className="h-4 w-4" />
                  </span>
                  {/* Caption */}
                  <div className="absolute inset-x-4 bottom-4">
                    <p className="font-mono text-[0.7rem] uppercase tracking-[0.2em] text-ash-300">
                      {profile.photoCaption}
                    </p>
                  </div>
                </div>
                {/* Altitude tag */}
                <div className="absolute -right-3 top-6 rotate-3 rounded-xl border border-white/15 bg-ink-900/90 px-3 py-2 backdrop-blur">
                  <div className="font-mono text-[0.6rem] uppercase tracking-widest text-ash-300">
                    Base
                  </div>
                  <div className="font-mono text-sm font-bold text-platinum">0 m</div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Biography column */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.7, delay: 0.05 }}
            className="lg:col-span-7"
          >
            <div className="space-y-4 text-base leading-relaxed text-ash-200/90">
              {bioParagraphs.map((p, i) => (
                <p key={i} className={i === 0 ? 'font-semibold text-platinum' : ''}>
                  {p}
                </p>
              ))}
            </div>

            {/* Status card */}
            <div className="mt-7 flex flex-col gap-3 rounded-2xl border border-white/[0.07] bg-ink-850/60 p-5 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex items-center gap-3">
                <span className="flex h-11 w-11 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-platinum">
                  <GraduationCap className="h-6 w-6" />
                </span>
                <div>
                  <div className="text-sm font-semibold text-platinum">{profile.university}</div>
                  <div className="text-xs text-ash-300">{profile.faculty}</div>
                </div>
              </div>
              <span className="inline-flex w-fit items-center gap-1.5 rounded-full border border-white/15 bg-white/5 px-3 py-1 text-xs font-medium text-ash-100">
                <MapPin className="h-3 w-3" />
                {profile.acceptanceNote}
              </span>
            </div>

            {/* Focus areas */}
            <div className="mt-7">
              <div className="mb-3 font-mono text-xs uppercase tracking-widest text-ash-300">
                Focus areas
              </div>
              <div className="flex flex-wrap gap-2.5">
                {profile.focusAreas.map((area, i) => {
                  const Icon = focusIcons[i % focusIcons.length];
                  return (
                    <span
                      key={area}
                      className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-ash-100"
                    >
                      <Icon className="h-3.5 w-3.5 text-platinum" />
                      {area}
                    </span>
                  );
                })}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
