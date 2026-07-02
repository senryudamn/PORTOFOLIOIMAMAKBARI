import { useState } from 'react';
import { motion } from 'framer-motion';
import { gallery, awards } from '../data';
import WatchingEye from './WatchingEye';
import CryptogramText from './CryptogramText';
import HideBehindAnomaly from './HideBehindAnomaly';

// Six-fingered hand with number 3
function SixFingerHand3({ className = '' }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 120 100"
      className={className}
      style={{ filter: 'drop-shadow(0 4px 8px rgba(0,0,0,0.4))' }}
    >
      {/* Palm */}
      <path
        d="M30 95 L30 60 L20 45 L25 40 L35 55 L35 25 L42 25 L42 55 L50 20 L58 22 L45 60 L65 15 L73 18 L52 65 L80 25 L88 30 L60 70 L95 40 L100 48 L65 75 L70 60 L70 85 L65 85 L60 90 L55 90 L50 92 L45 90 L35 90 L30 95 Z"
        fill="#2d1b4e"
        stroke="#1a0d2e"
        strokeWidth="2"
      />
      {/* Number 3 */}
      <text
        x="60"
        y="70"
        textAnchor="middle"
        fontSize="24"
        fontWeight="bold"
        fill="#FF00FF"
        style={{ fontFamily: '"Cinzel Decorative", serif' }}
      >
        3
      </text>
      {/* Glint effect */}
      <ellipse cx="30" cy="40" rx="3" ry="5" fill="#8050c0" opacity="0.6" />
    </svg>
  );
}

interface GalleryItemProps {
  item: typeof gallery[0];
  index: number;
}

function GalleryCard({ item, index }: GalleryItemProps) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.05 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="group relative"
    >
      {/* Torn paper edge effect */}
      <div
        className="relative overflow-hidden rounded-sm shadow-paper-lg transition-all duration-500"
        style={{
          background: 'linear-gradient(135deg, #f0e6cc, #e8dcb8)',
          clipPath: 'polygon(2% 0, 98% 2%, 100% 98%, 0 100%)',
        }}
      >
        {/* Image */}
        <div className="relative aspect-square overflow-hidden">
          <img
            src={item.image}
            alt={item.title}
            className="h-full w-full object-cover transition-all duration-500"
            style={{
              filter: isHovered
                ? 'sepia(0) saturate(1.4) contrast(1.15)'
                : 'sepia(0.5) contrast(1.05) brightness(0.9)',
            }}
          />

          {/* Blacklight overlay */}
          <div
            className="absolute inset-0 bg-gradient-to-t from-transparent via-transparent to-purple-900/20 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
            style={{
              mixBlendMode: 'overlay',
            }}
          />

          {/* UV reveal category tag */}
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={isHovered ? { opacity: 1, y: 0 } : { opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
            className="absolute left-3 top-3"
          >
            <span
              className="rounded-full border border-[#00FFFF] bg-purple-900/80 px-3 py-1 font-mono text-xs text-[#00FFFF]"
              style={{ boxShadow: '0 0 10px rgba(0,255,255,0.3)' }}
            >
              {item.category}
            </span>
          </motion.div>
        </div>

        {/* Caption */}
        <div className="p-3">
          <p
            className="font-typewriter text-sm font-bold transition-colors duration-300"
            style={{ color: isHovered ? '#FF00FF' : '#2d1b4e' }}
          >
            {item.title}
          </p>
          <p className="font-serif text-xs text-parchment-500">{item.description}</p>
        </div>

        {/* Corner tape */}
        <div
          className="absolute -right-1 -top-1 h-8 w-6 rotate-12 rounded-sm opacity-70"
          style={{ background: 'rgba(255,255,200,0.6)' }}
        />
      </div>
    </motion.div>
  );
}

interface AwardItemProps {
  award: typeof awards[0];
  index: number;
}

function AwardCard({ award, index }: AwardItemProps) {
  const [isHovered, setIsHovered] = useState(false);

  const iconMap = {
    trophy: (
      <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
        <path d="M12 2C9.24 2 7 4.24 7 7v2H5c-1.1 0-2 .9-2 2v1c0 3.87 3.13 7 7 7h2c3.87 0 7-3.13 7-7v-1c0-1.1-.9-2-2-2h-2V7c0-2.76-2.24-5-5-5zm0 2c1.66 0 3 1.34 3 3v2H9V7c0-1.66 1.34-3 3-3zm5 8v1c0 2.76-2.24 5-5 5h-2c-2.76 0-5-2.24-5-5v-1h2v1c0 1.65 1.35 3 3 3h2c1.65 0 3-1.35 3-3v-1h2z" />
      </svg>
    ),
    medal: (
      <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
      </svg>
    ),
    star: (
      <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
        <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
      </svg>
    ),
    sparkles: (
      <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
        <path d="M12 2L9.19 8.63 2 9.24l5.46 4.73L5.82 21 12 17.27 18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2z" />
      </svg>
    ),
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="group relative"
    >
      {/* Timeline connector */}
      <div className="absolute left-1/2 top-0 h-full w-px -translate-x-1/2 bg-gradient-to-b from-[#FF00FF]/50 via-[#FF00FF] to-[#FF00FF]/50 opacity-30" />

      <div
        className="relative mx-auto max-w-lg rounded-sm p-4 shadow-paper-lg transition-all duration-500"
        style={{
          background: isHovered
            ? 'linear-gradient(135deg, #1a0d2e, #2d1b4e)'
            : 'linear-gradient(135deg, #f0e6cc, #e8dcb8)',
        }}
      >
        {/* Year badge */}
        <div
          className="absolute -left-2 -top-2 flex h-12 w-12 items-center justify-center rounded-full border-2 font-typewriter text-xs font-bold shadow-lg transition-all duration-500"
          style={{
            borderColor: isHovered ? '#FF00FF' : '#2d1b4e',
            color: isHovered ? '#FF00FF' : '#2d1b4e',
            background: isHovered ? 'rgba(45,27,78,0.9)' : 'white',
          }}
        >
          {award.year}
        </div>

        {/* Content */}
        <div className="mt-2 flex items-start gap-4">
          {/* Icon */}
          <div
            className="mt-1 transition-colors duration-500"
            style={{ color: isHovered ? '#00FFFF' : '#2d1b4e' }}
          >
            {iconMap[award.icon]}
          </div>

          {/* Details */}
          <div className="flex-1">
            <h4
              className="font-cryptic text-lg font-bold transition-colors duration-500"
              style={{ color: isHovered ? '#00FFFF' : '#2d1b4e' }}
            >
              {award.title}
            </h4>
            <p
              className="mt-1 font-typewriter text-sm transition-colors duration-500"
              style={{ color: isHovered ? '#FF00FF' : '#453055' }}
            >
              {award.organization}
            </p>
            <p
              className="mt-2 font-serif text-sm leading-relaxed transition-colors duration-500"
              style={{ color: isHovered ? '#e0d0f0' : '#5c4a32' }}
            >
              {award.description}
            </p>

            {/* Level badge */}
            <div className="mt-3 flex items-center gap-2">
              <span
                className="rounded-full border px-2 py-0.5 font-typewriter text-xs uppercase transition-all duration-500"
                style={{
                  borderColor: isHovered ? '#FF00FF' : '#2d1b4e',
                  color: isHovered ? '#FF00FF' : '#2d1b4e',
                  background: isHovered ? 'rgba(255,0,255,0.1)' : 'transparent',
                }}
              >
                {award.level}
              </span>
            </div>
          </div>
        </div>

        {/* Altitude marker */}
        <div className="mt-4 flex items-center justify-between border-t border-parchment-400/50 pt-3">
          <span className="font-typewriter text-xs text-parchment-500">Altitude:</span>
          <span
            className="font-mono text-sm font-bold transition-colors duration-500"
            style={{ color: isHovered ? '#00FFFF' : '#2d1b4e' }}
          >
            {award.altitude}m
          </span>
        </div>
        <p
          className="mt-1 text-right font-typewriter text-xs transition-colors duration-500"
          style={{ color: isHovered ? '#FF00FF' : '#7c6a8a' }}
        >
          {award.ascentLabel}
        </p>
      </div>
    </motion.div>
  );
}

export default function Journal3() {
  return (
    <section id="gallery" className="relative journal-page trust-no-one">
      {/* Page divider */}
      <div className="journal-divider" />

      <div className="container relative mx-auto max-w-6xl px-4 py-16 md:px-8 lg:pr-24">
        {/* Journal header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mb-8 flex items-center gap-6"
        >
          {/* Six-fingered hand */}
          <SixFingerHand3 className="h-24 w-28 md:h-32 md:w-36" />

          {/* Journal title */}
          <div>
            <h2 className="font-cryptic text-3xl font-bold md:text-4xl" style={{ color: '#2d1b4e' }}>
              JOURNAL #3
            </h2>
            <p className="font-typewriter text-sm uppercase tracking-widest text-parchment-500">
              The Most Secretive Chapter
            </p>
          </div>
        </motion.div>

        {/* Decorative line */}
        <motion.div
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-12 h-1 bg-gradient-to-r from-[#2d1b4e] via-[#FF00FF] to-transparent"
          style={{ transformOrigin: 'left' }}
        />

        {/* Warning banner */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="relative mb-12 overflow-hidden rounded border-2 border-dashed border-[#FF00FF]/30 bg-parchment-200/70 p-6"
        >
          {/* Watching Eye Easter Egg in background */}
          <WatchingEye />

          {/* Hide-Behind Anomaly */}
          <HideBehindAnomaly side="left" topPosition="40%" />

          {/* Torn edge */}
          <div
            className="absolute -right-2 -top-2 h-16 w-12 rotate-6 border-b border-l border-[#FF00FF]/20"
            style={{
              background: 'linear-gradient(135deg, rgba(255,0,255,0.05), transparent)',
            }}
          />

          <p className="font-typewriter text-lg text-[#2d1b4e] lg:text-xl">
            "<CryptogramText text="TRUST NO ONE!" className="text-[#FF00FF]" />
            The events documented herein are the most chaotic and secretive.
            Proceed with extreme caution. Reality itself bends in this section..."
          </p>
          <div className="mt-4 flex items-center gap-2">
            <div className="h-2 w-2 animate-pulse rounded-full bg-[#FF00FF]" />
            <p className="font-mono text-xs uppercase tracking-widest text-[#FF00FF]/60">
              <CryptogramText text="ANOMALY LEVEL: CRITICAL" delay={100} />
            </p>
          </div>
        </motion.div>

        {/* Timeline section */}
        <div id="awards" className="mb-20">
          <motion.h3
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="mb-12 text-center font-cryptic text-2xl font-bold text-[#2d1b4e]"
          >
            The Ascent Trail
          </motion.h3>

          <div className="relative space-y-8">
            {awards.map((award, index) => (
              <AwardCard key={award.year + award.title} award={award} index={index} />
            ))}
          </div>
        </div>

        {/* Gallery section */}
        <div>
          <motion.h3
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="mb-8 text-center font-cryptic text-2xl font-bold text-[#2d1b4e]"
          >
            Field Evidence Archives
          </motion.h3>

          <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {gallery.map((item, index) => (
              <GalleryCard key={item.id} item={item} index={index} />
            ))}
          </div>
        </div>

        {/* Hidden message (reveals on scroll) */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 0.1 }}
          viewport={{ once: true }}
          transition={{ delay: 1 }}
          className="mt-20 text-center"
        >
          <p className="font-typewriter text-2xl uppercase tracking-[0.5em] text-[#2d1b4e] rotate-[-5deg]">
            TRUST NO ONE
          </p>
        </motion.div>
      </div>

      {/* Contact section */}
      <div id="contact" className="relative mt-20 bg-gradient-to-b from-transparent via-parchment-200/50 to-parchment-300/30 py-16">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="container mx-auto max-w-2xl px-4 text-center"
        >
          <h3 className="font-cryptic text-3xl font-bold text-[#2d1b4e]">
            Establish Contact
          </h3>
          <p className="mt-4 font-typewriter text-parchment-600">
            Should you wish to transmit a message to the author of these journals...
          </p>

          <a
            href="mailto:akbariimam8@gmail.com"
            className="mt-8 inline-flex items-center gap-3 rounded-sm border-2 border-[#2d1b4e] bg-parchment-200 px-8 py-4 font-typewriter uppercase tracking-wider text-[#2d1b4e] transition-all hover:bg-[#2d1b4e] hover:text-parchment-200"
          >
            <svg className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <rect x="2" y="4" width="20" height="16" rx="2" />
              <path d="M22 6L12 13L2 6" />
            </svg>
            Send Transmission
          </a>

          {/* Cipher wheel decoration */}
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 60, repeat: Infinity, ease: 'linear' }}
            className="mx-auto mt-12 h-24 w-24 opacity-10"
          >
            <svg viewBox="0 0 100 100" className="h-full w-full">
              <circle cx="50" cy="50" r="45" fill="none" stroke="#2d1b4e" strokeWidth="1" />
              {[...Array(12)].map((_, i) => (
                <circle
                  key={i}
                  cx={50 + 40 * Math.cos((i * Math.PI) / 6)}
                  cy={50 + 40 * Math.sin((i * Math.PI) / 6)}
                  r="5"
                  fill="none"
                  stroke="#FF00FF"
                  strokeWidth="1"
                />
              ))}
            </svg>
          </motion.div>
        </motion.div>
      </div>

      {/* Final torn edge */}
      <div
        className="absolute -bottom-8 left-0 right-0 h-8 bg-black/5"
        style={{
          clipPath:
            'polygon(0 0, 100% 0, 100% 100%, 95% 60%, 90% 100%, 85% 50%, 80% 100%, 75% 70%, 70% 100%, 65% 40%, 60% 100%, 55% 60%, 50% 100%, 45% 70%, 40% 100%, 35% 50%, 30% 100%, 25% 80%, 20% 100%, 15% 60%, 10% 100%, 5% 50%, 0 100%)',
        }}
      />
    </section>
  );
}
