import { motion } from 'framer-motion';
import { profile } from '../data';

// Six-fingered hand SVG component with gold styling
function SixFingerHand({ className = '' }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 120 100"
      className={className}
      style={{ filter: 'drop-shadow(0 4px 8px rgba(0,0,0,0.4))' }}
    >
      {/* Palm */}
      <path
        d="M30 95 L30 60 L20 45 L25 40 L35 55 L35 25 L42 25 L42 55 L50 20 L58 22 L45 60 L65 15 L73 18 L52 65 L80 25 L88 30 L60 70 L95 40 L100 48 L65 75 L70 60 L70 85 L65 85 L60 90 L55 90 L50 92 L45 90 L35 90 L30 95 Z"
        fill="#C9A800"
        stroke="#8B7355"
        strokeWidth="2"
      />
      {/* Six fingers pointing up */}
      <path d="M20 45 L25 40 L35 55 L30 60 Z" fill="#C9A800" stroke="#8B7355" strokeWidth="1" />
      {/* Number 1 - centered on palm */}
      <text
        x="60"
        y="70"
        textAnchor="middle"
        fontSize="24"
        fontWeight="bold"
        fill="#8B0000"
        style={{ fontFamily: '"Cinzel Decorative", serif' }}
      >
        1
      </text>
      {/* Glint effect */}
      <ellipse cx="30" cy="40" rx="3" ry="5" fill="#FFE44D" opacity="0.6" />
    </svg>
  );
}

export default function Journal1() {
  return (
    <section id="home" className="relative min-h-screen journal-page">
      {/* Torn page edge at bottom */}
      <div className="absolute bottom-0 left-0 right-0 h-8 bg-black/5" style={{
        clipPath: 'polygon(0 0, 100% 0, 100% 100%, 95% 60%, 90% 100%, 85% 50%, 80% 100%, 75% 70%, 70% 100%, 65% 40%, 60% 100%, 55% 60%, 50% 100%, 45% 70%, 40% 100%, 35% 50%, 30% 100%, 25% 80%, 20% 100%, 15% 60%, 10% 100%, 5% 50%, 0 100%)'
      }} />

      <div className="container relative mx-auto max-w-6xl px-4 py-16 md:px-8 lg:pr-24">
        {/* Journal header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-8 flex items-center gap-6"
        >
          {/* Six-fingered hand */}
          <SixFingerHand className="h-24 w-28 md:h-32 md:w-36" />

          {/* Journal title */}
          <div>
            <h2 className="font-cryptic text-3xl font-bold text-crimson md:text-4xl">
              JOURNAL #1
            </h2>
            <p className="font-typewriter text-sm uppercase tracking-widest text-parchment-500">
              The Beginning of the Mystery
            </p>
          </div>
        </motion.div>

        {/* Decorative line */}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-12 h-1 bg-gradient-to-r from-crimson via-parchment-500 to-transparent"
          style={{ transformOrigin: 'left' }}
        />

        {/* Hero content */}
        <div className="grid gap-12 md:grid-cols-2">
          {/* Left side - Profile photo with vintage effect */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="relative"
          >
            {/* Vintage photo frame */}
            <div className="relative mx-auto max-w-sm">
              {/* Tape corners */}
              <div className="absolute -left-2 -top-4 h-16 w-10 rotate-[-15deg] bg-parchment-100 opacity-80">
                <div className="h-full w-full" style={{ background: 'linear-gradient(45deg, rgba(255,255,200,0.8), rgba(255,255,220,0.9))' }} />
              </div>
              <div className="absolute -right-2 -top-4 h-16 w-10 rotate-[15deg] bg-parchment-100 opacity-80">
                <div className="h-full w-full" style={{ background: 'linear-gradient(-45deg, rgba(255,255,200,0.8), rgba(255,255,220,0.9))' }} />
              </div>

              {/* Photo container */}
              <div className="relative overflow-hidden rounded-sm border-8 border-white shadow-paper-lg">
                {/* Sepia filter on image */}
                <img
                  src={profile.photo}
                  alt={profile.name}
                  className="aspect-[3/4] w-full object-cover"
                  style={{ filter: 'sepia(0.4) contrast(1.1)' }}
                />
                {/* Vignette overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-transparent via-transparent to-black/10" />
                <div className="absolute inset-0" style={{
                  background: 'radial-gradient(ellipse at center, transparent 50%, rgba(0,0,0,0.3) 100%)'
                }} />
              </div>

              {/* Photo caption - handwritten style */}
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8 }}
                className="mt-4 text-center font-typewriter text-sm italic text-parchment-600"
              >
                {profile.photoCaption}
              </motion.p>
            </div>
          </motion.div>

          {/* Right side - Introduction text */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="flex flex-col justify-center"
          >
            {/* Typewriter intro */}
            <div className="mb-6">
              <p className="font-typewriter text-lg uppercase tracking-wider text-crimson">
                Subject Identified
              </p>
              <h1 className="mt-2 font-cryptic text-4xl font-bold text-parchment-600 md:text-5xl lg:text-6xl">
                {profile.name}
              </h1>
            </div>

            {/* Bio in journal style */}
            <div className="relative">
              {/* Decorative corner flourish */}
              <svg className="absolute -left-4 -top-4 h-8 w-8 text-crimson opacity-30" viewBox="0 0 24 24">
                <path d="M4 20 L4 4 L20 4" fill="none" stroke="currentColor" strokeWidth="2" />
              </svg>

              <p className="font-typewriter leading-relaxed text-parchment-600 md:text-lg">
                "{profile.tagline}"
              </p>

              <p className="mt-4 whitespace-pre-line text-parchment-500 md:text-lg" style={{ fontFamily: '"Georgia", serif' }}>
                From the misty valleys of {profile.origin}, a seeker of knowledge
                has emerged. Now studying at {profile.university},
                Faculty of {profile.faculty}.
              </p>

              {/* Stats in journal entry style */}
              <div className="mt-8 grid grid-cols-2 gap-4">
                {profile.stats.map((stat, index) => (
                  <motion.div
                    key={stat.label}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6 + index * 0.1 }}
                    className="sketchy-border bg-parchment-300/50 p-3"
                  >
                    <p className="font-cryptic text-2xl font-bold text-crimson">{stat.value}</p>
                    <p className="font-typewriter text-xs uppercase tracking-wider text-parchment-500">
                      {stat.label}
                    </p>
                  </motion.div>
                ))}
              </div>

              {/* Focus areas as "anomaly types" */}
              <div className="mt-8">
                <p className="font-typewriter text-sm uppercase tracking-wider text-parchment-500">
                  Areas of Study:
                </p>
                <div className="mt-2 flex flex-wrap gap-2">
                  {profile.focusAreas.map((area) => (
                    <span
                      key={area}
                      className="rounded border border-crimson/30 bg-crimson/10 px-3 py-1 font-typewriter text-xs text-crimson"
                    >
                      {area}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* About section */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          id="about"
          className="mt-20 pt-8"
        >
          {/* Journal entry header */}
          <div className="mb-6 flex items-center gap-4">
            <div className="h-px flex-1 bg-gradient-to-r from-crimson/50 to-transparent" />
            <h3 className="font-cryptic text-xl font-bold uppercase text-crimson">
              Entry #1: The Subject
            </h3>
            <div className="h-px flex-1 bg-gradient-to-l from-crimson/50 to-transparent" />
          </div>

          {/* Bio content in journal style */}
          <div className="relative grid gap-8 md:grid-cols-3">
            {/* Main bio */}
            <div className="md:col-span-2">
              <div className="relative rounded border border-parchment-400/50 bg-parchment-100/50 p-6">
                {/* Ink splatter decoration */}
                <svg className="absolute -right-4 -top-4 h-16 w-16 text-parchment-400 opacity-20" viewBox="0 0 100 100">
                  <circle cx="50" cy="50" r="30" fill="currentColor" />
                  <circle cx="20" cy="30" r="15" fill="currentColor" />
                  <circle cx="80" cy="70" r="20" fill="currentColor" />
                </svg>

                <p className="whitespace-pre-line font-serif leading-relaxed text-parchment-600 text-lg">
                  {profile.bio}
                </p>
              </div>
            </div>

            {/* Side notes */}
            <div className="relative">
              {/* Pinned note effect */}
              <div
                className="rotate-2 rounded-sm bg-parchment-200 p-4 shadow-paper"
                style={{
                  background: 'linear-gradient(135deg, #f5f0e1, #e8dcb8)',
                }}
              >
                {/* Pushpin */}
                <div className="absolute -top-2 left-1/2 h-4 w-4 -translate-x-1/2 rounded-full bg-red-600 shadow-md" />

                <h4 className="font-typewriter text-sm font-bold uppercase text-crimson">
                  Status Update
                </h4>
                <p className="mt-2 font-typewriter text-sm text-parchment-600">
                  {profile.status}
                </p>

                <div className="mt-4">
                  <h4 className="font-typewriter text-sm font-bold uppercase text-crimson">
                    Coordinates
                  </h4>
                  <p className="font-typewriter text-sm text-parchment-600">
                    {profile.location}
                  </p>
                </div>

                {/* Social links */}
                <div className="mt-4 flex gap-2">
                  {profile.social.map((social) => (
                    <a
                      key={social.label}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-crimson/70 transition-colors hover:text-crimson"
                      aria-label={social.label}
                    >
                      {social.icon === 'github' && (
                        <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
                        </svg>
                      )}
                      {social.icon === 'linkedin' && (
                        <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                        </svg>
                      )}
                      {social.icon === 'instagram' && (
                        <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
                        </svg>
                      )}
                      {social.icon === 'mail' && (
                        <svg className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                          <rect x="2" y="4" width="20" height="16" rx="2" />
                          <path d="M22 6L12 13L2 6" />
                        </svg>
                      )}
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
