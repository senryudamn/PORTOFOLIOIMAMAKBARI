import { type Variants } from 'framer-motion';
import {
  Github,
  Linkedin,
  Instagram,
  Mail,
  ExternalLink,
  Trophy,
  Medal,
  Star,
  Sparkles,
  Cpu,
} from 'lucide-react';

// Framer Motion shared variants — tuned for a calm, ascending feel.
export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 28 },
  visible: (i: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.65, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] },
  }),
};

export const fadeUpLarge: Variants = {
  hidden: { opacity: 0, y: 48 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] },
  },
};

export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.9, ease: 'easeOut' } },
};

export const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.94 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.55, ease: 'easeOut' } },
};

export const staggerContainer: Variants = {
  hidden: { opacity: 1 },
  visible: { opacity: 1, transition: { staggerChildren: 0.12, delayChildren: 0.05 } },
};

// Social / icon resolver
const socialIcons = {
  github: Github,
  linkedin: Linkedin,
  instagram: Instagram,
  mail: Mail,
  external: ExternalLink,
  cpu: Cpu,
} as const;

export function SocialIcon({
  name,
  className = 'h-4 w-4',
}: {
  name: keyof typeof socialIcons;
  className?: string;
}) {
  const Icon = socialIcons[name] ?? ExternalLink;
  return <Icon className={className} />;
}

// Award icon resolver
const awardIcons = {
  trophy: Trophy,
  medal: Medal,
  star: Star,
  sparkles: Sparkles,
} as const;

export function AwardIcon({
  name,
  className = 'h-5 w-5',
}: {
  name: keyof typeof awardIcons;
  className?: string;
}) {
  const Icon = awardIcons[name] ?? Trophy;
  return <Icon className={className} />;
}
