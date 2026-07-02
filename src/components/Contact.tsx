import { motion } from 'framer-motion';
import { Mail, MapPin, ArrowUpRight } from 'lucide-react';
import { profile, navLinks } from '../data';
import { fadeUp, staggerContainer, SocialIcon } from './primitives';

export default function Contact() {
  return (
    <section id="contact" className="relative py-24 sm:py-32">
      <div className="mx-auto max-w-4xl px-5 text-center sm:px-8">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.4 }}
          className="flex flex-col items-center"
        >
          <motion.span variants={fadeUp} className="section-eyebrow">
            <span className="h-px w-6 bg-ash-300/60" />
            Get in touch
          </motion.span>
          <motion.h2
            variants={fadeUp}
            className="mt-4 font-sans text-3xl font-bold tracking-tight text-platinum sm:text-5xl"
          >
            Let's build something
            <br />
            <span className="gradient-text">that actually works.</span>
          </motion.h2>
          <motion.p variants={fadeUp} className="mt-5 max-w-xl text-balance text-ash-300">
            I'm always open to discussing IoT, robotics, automation projects, collaboration
            opportunities, or just a good engineering conversation.
          </motion.p>

          <motion.div
            variants={fadeUp}
            className="mt-8 flex flex-col items-center gap-3 sm:flex-row"
          >
            <a
              href={`mailto:${profile.email}`}
              className="group inline-flex items-center gap-2 rounded-xl bg-platinum px-6 py-3.5 text-sm font-semibold text-ink-950 transition-all hover:scale-[1.03] hover:bg-white hover:shadow-mono-glow"
            >
              <Mail className="h-4 w-4" />
              {profile.email}
              <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </a>
            <span className="inline-flex items-center gap-1.5 rounded-xl border border-white/10 bg-white/5 px-4 py-3.5 text-sm text-ash-200">
              <MapPin className="h-4 w-4 text-platinum" />
              {profile.location}
            </span>
          </motion.div>

          <motion.div variants={fadeUp} className="mt-8 flex items-center gap-3">
            {profile.social.map((s) => (
              <a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noreferrer"
                aria-label={s.label}
                className="flex h-11 w-11 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-ash-300 transition-all hover:border-white/30 hover:text-platinum"
              >
                <SocialIcon name={s.icon} className="h-4 w-4" />
              </a>
            ))}
          </motion.div>
        </motion.div>
      </div>

      {/* Footer */}
      <footer className="mx-auto mt-24 max-w-6xl px-5 sm:px-8">
        <div className="flex flex-col items-center justify-between gap-6 border-t border-white/[0.06] pt-8 sm:flex-row">
          <p className="text-sm text-ash-300">
            © {new Date().getFullYear()} {profile.name}. Designed &amp; built with precision.
          </p>
          <nav className="flex flex-wrap items-center justify-center gap-x-4 gap-y-2">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-xs text-ash-300 transition-colors hover:text-platinum"
              >
                {link.label}
              </a>
            ))}
          </nav>
        </div>
      </footer>
    </section>
  );
}
