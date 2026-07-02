import { motion } from 'framer-motion';
import { fadeUp } from './primitives';

interface SectionHeadingProps {
  eyebrow: string;
  title: string;
  highlight?: string;
  description?: string;
  align?: 'left' | 'center';
}

export default function SectionHeading({
  eyebrow,
  title,
  highlight,
  description,
  align = 'center',
}: SectionHeadingProps) {
  const isCenter = align === 'center';
  return (
    <motion.div
      variants={fadeUp}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.5 }}
      className={`flex flex-col gap-4 ${isCenter ? 'items-center text-center' : 'items-start text-left'}`}
    >
      <span className="section-eyebrow">
        <span className="h-px w-6 bg-neon-cyan/60" />
        {eyebrow}
      </span>
      <h2 className="font-sans text-3xl font-bold tracking-tight text-white sm:text-4xl md:text-5xl">
        {title} {highlight && <span className="gradient-text">{highlight}</span>}
      </h2>
      {description && (
        <p
          className={`max-w-2xl text-balance text-slate-400 ${
            isCenter ? 'mx-auto' : ''
          } text-base sm:text-lg`}
        >
          {description}
        </p>
      )}
    </motion.div>
  );
}
