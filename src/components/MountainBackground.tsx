import { motion, useScroll, useTransform, type MotionValue } from 'framer-motion';
import { useRef } from 'react';

/**
 * Layered minimalist mountain silhouettes that parallax upward
 * as the user scrolls — evoking the ascent metaphor site-wide.
 * Pure SVG, monochrome, fixed behind content.
 */
export default function MountainBackground() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end end'],
  });

  // Each layer moves at a different rate — back peaks drift slowest.
  const yBack = useTransform(scrollYProgress, [0, 1], [0, -60]);
  const yMid = useTransform(scrollYProgress, [0, 1], [0, -140]);
  const yFront = useTransform(scrollYProgress, [0, 1], [0, -240]);
  const yStars = useTransform(scrollYProgress, [0, 1], [0, -40]);

  return (
    <div
      ref={ref}
      aria-hidden
      className="pointer-events-none fixed inset-0 -z-10 overflow-hidden bg-summit"
    >
      {/* Grid + topo texture */}
      <div className="absolute inset-0 bg-grid bg-grid-fade opacity-60" />
      <div className="absolute inset-0 bg-topo opacity-70" />

      {/* Subtle radial glow near summit */}
      <div className="absolute inset-0 bg-grid-mono" />

      {/* Twinkling night stars — each star pulses independently with a
          randomized delay/duration. Strictly decorative: the parent is
          fixed -z-10 pointer-events-none, so stars never sit over content. */}
      <motion.div style={{ y: yStars }} className="absolute inset-0">
        <StarField />
        <ConstellationLayer />
      </motion.div>

      {/* Drifting cloud silhouettes — sit behind the mountains,
          strictly background. Low opacity, pointer-events-none,
          never overlaps foreground content (which is z-0+). */}
      <CloudLayer />

      {/* Back range — faintest */}
      <motion.div
        style={{ y: yBack }}
        className="absolute inset-x-0 bottom-0 h-[55vh] opacity-30"
      >
        <PeakLayer color="#161618" roughness={0.55} base={70} amplitude={130} />
      </motion.div>

      {/* Mid range */}
      <motion.div
        style={{ y: yMid }}
        className="absolute inset-x-0 bottom-0 h-[45vh] opacity-50"
      >
        <PeakLayer color="#101012" roughness={0.75} base={55} amplitude={100} />
      </motion.div>

      {/* Front range — darkest, sharpest */}
      <motion.div
        style={{ y: yFront }}
        className="absolute inset-x-0 bottom-0 h-[35vh] opacity-90"
      >
        <PeakLayer color="#08080a" roughness={1.1} base={42} amplitude={75} sharp />
      </motion.div>

      {/* Vignette so foreground content stays readable */}
      <div className="absolute inset-0 bg-gradient-to-b from-ink-950/40 via-transparent to-ink-950" />
    </div>
  );
}

/**
 * Twinkling star field. Each star is a small div with a randomized
 * position, size, and twinkle animation (delay + duration). The
 * `animate-twinkle` keyframe pulses opacity gently. Stars are
 * deterministic per-render (seeded) so they don't reshuffle on rerender.
 */
function StarField() {
  return (
    <div className="absolute inset-0">
      {STARS.map((s, i) => (
        <span
          key={i}
          className="absolute rounded-full bg-white animate-twinkle"
          style={{
            left: `${s.x}%`,
            top: `${s.y}%`,
            width: `${s.size}px`,
            height: `${s.size}px`,
            opacity: s.baseOpacity,
            animationDelay: `${s.delay}s`,
            animationDuration: `${s.duration}s`,
          }}
        />
      ))}
    </div>
  );
}

// Deterministic star field — 60 stars with varied size/opacity/timing.
const STARS = Array.from({ length: 60 }, (_, i) => {
  const r1 = ((i * 9301 + 49297) % 233280) / 233280;
  const r2 = ((i * 49297 + 9301) % 233280) / 233280;
  const r3 = ((i * 31337 + 7919) % 233280) / 233280;
  return {
    x: r1 * 100,
    y: r2 * 60,
    size: r3 > 0.88 ? 2.2 : r3 > 0.6 ? 1.6 : 1.1,
    baseOpacity: 0.08 + r3 * 0.12,
    delay: +(r1 * 5).toFixed(2),
    duration: +(2.5 + r2 * 3.5).toFixed(2),
  };
});

/**
 * Slowly panning constellation outlines. A few faint SVG star patterns
 * (connected dots with thin lines) drift horizontally across the sky.
 * The whole layer is low-opacity and pointer-events-none, sitting inside
 * the same fixed -z-10 container as the stars.
 */
function ConstellationLayer() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      <div className="absolute inset-x-0 top-0 h-[70%] animate-pan-slow opacity-[0.10]">
        <ConstellationStrip className="h-full w-[100%]" />
        <ConstellationStrip className="absolute left-0 top-0 h-full w-[100%] -translate-x-full" />
      </div>
    </div>
  );
}

function ConstellationStrip({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 1440 500" preserveAspectRatio="none">
      <g stroke="#ffffff" strokeWidth="0.5" fill="#ffffff">
        {CONSTELLATIONS.map((c, ci) => (
          <g key={ci}>
            {/* Connecting lines */}
            {c.lines.map(([a, b], li) => (
              <line
                key={li}
                x1={c.points[a][0]}
                y1={c.points[a][1]}
                x2={c.points[b][0]}
                y2={c.points[b][1]}
                opacity="0.4"
              />
            ))}
            {/* Star nodes — each twinkles via CSS class */}
            {c.points.map(([cx, cy], pi) => (
              <circle
                key={pi}
                cx={cx}
                cy={cy}
                r={pi === 0 ? 2 : 1.4}
                className="animate-twinkle"
                style={{
                  animationDelay: `${(ci * 1.3 + pi * 0.7).toFixed(2)}s`,
                  animationDuration: `${(3 + pi * 0.5).toFixed(2)}s`,
                }}
              />
            ))}
          </g>
        ))}
      </g>
    </svg>
  );
}

// Three minimalist constellation patterns — abstract star outlines
// positioned across the strip. Coordinates are in the 1440x500 viewBox.
const CONSTELLATIONS = [
  {
    points: [
      [120, 80], [180, 60], [240, 110], [200, 160], [140, 140],
    ],
    lines: [[0, 1], [1, 2], [2, 3], [3, 4], [4, 0]] as [number, number][],
  },
  {
    points: [
      [620, 50], [680, 90], [740, 70], [700, 140], [640, 120],
    ],
    lines: [[0, 1], [1, 2], [2, 3], [3, 4], [4, 1]] as [number, number][],
  },
  {
    points: [
      [1100, 100], [1160, 70], [1220, 120], [1180, 170], [1120, 150],
    ],
    lines: [[0, 1], [1, 2], [2, 3], [3, 4], [4, 0]] as [number, number][],
  },
];

/**
 * Slowly drifting cloud silhouettes. Strictly decorative background:
 * the whole layer is pointer-events-none, very low opacity, and
 * positioned high above the mountain peaks so it never sits over
 * foreground text/cards. CSS keyframe `drift` translates the row
 * -50% to loop seamlessly (the strip is duplicated to tile).
 */
function CloudLayer() {
  return (
    <div className="pointer-events-none absolute inset-x-0 top-[8%] h-[40%] overflow-hidden">
      {/* Back row — slower, fainter, higher */}
      <div className="absolute inset-x-0 top-0 h-1/2 animate-drift opacity-[0.06]">
        <CloudStrip className="h-full w-[100%]" />
        <CloudStrip className="absolute left-0 top-0 h-full w-[100%] -translate-x-full" />
      </div>
      {/* Front row — a touch denser, lower */}
      <div
        className="absolute inset-x-0 top-1/2 h-1/2 animate-drift opacity-[0.08]"
        style={{ animationDuration: '90s', animationDirection: 'reverse' }}
      >
        <CloudStrip className="h-full w-[100%]" variant={1} />
        <CloudStrip className="absolute left-0 top-0 h-full w-[100%] -translate-x-full" variant={1} />
      </div>
    </div>
  );
}

function CloudStrip({ className, variant = 0 }: { className?: string; variant?: number }) {
  // A repeating soft cloud silhouette via stacked blurred ellipses.
  const clouds = variant === 0 ? STRIP_A : STRIP_B;
  return (
    <svg className={className} viewBox="0 0 1440 200" preserveAspectRatio="none">
      <defs>
        <filter id={`cloud-soft-${variant}`} x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="6" />
        </filter>
      </defs>
      <g filter={`url(#cloud-soft-${variant})`} fill="#ffffff">
        {clouds.map((c, i) => (
          <ellipse
            key={i}
            cx={c.cx}
            cy={c.cy}
            rx={c.rx}
            ry={c.ry}
            opacity={c.o}
          />
        ))}
      </g>
    </svg>
  );
}

// Two deterministic cloud layouts for the two rows.
const STRIP_A = [
  { cx: 180, cy: 90, rx: 120, ry: 26, o: 0.9 },
  { cx: 420, cy: 110, rx: 90, ry: 20, o: 0.7 },
  { cx: 680, cy: 80, rx: 150, ry: 30, o: 0.8 },
  { cx: 980, cy: 100, rx: 110, ry: 24, o: 0.6 },
  { cx: 1240, cy: 90, rx: 130, ry: 28, o: 0.85 },
];
const STRIP_B = [
  { cx: 120, cy: 80, rx: 100, ry: 20, o: 0.7 },
  { cx: 360, cy: 100, rx: 140, ry: 24, o: 0.85 },
  { cx: 620, cy: 90, rx: 80, ry: 18, o: 0.6 },
  { cx: 880, cy: 70, rx: 130, ry: 26, o: 0.8 },
  { cx: 1160, cy: 100, rx: 100, ry: 22, o: 0.7 },
];

interface PeakLayerProps {
  color: string;
  roughness: number;
  base: number; // baseline as % of viewport height
  amplitude: number; // peak height in px scale
  sharp?: boolean;
}

function PeakLayer({ color, roughness, base, amplitude, sharp }: PeakLayerProps) {
  // Generate a jagged mountain silhouette across 0..1440 width.
  const W = 1440;
  const H = 400;
  const step = sharp ? 60 : 90;
  const points: string[] = [`0,${H}`];
  for (let x = 0; x <= W; x += step) {
    // deterministic smooth-ish noise
    const n =
      Math.sin((x / W) * Math.PI * 2 * roughness) * 0.5 +
      Math.sin((x / W) * Math.PI * 5 * roughness + 1.3) * 0.3 +
      Math.sin((x / W) * Math.PI * 9 * roughness + 2.7) * 0.2;
    const peakY = (base / 100) * H - n * amplitude;
    points.push(`${x},${Math.max(20, peakY)}`);
    if (sharp && x < W) {
      // add a notch between points for a sharper ridge
      const midX = x + step / 2;
      const midN = n + 0.35;
      const midY = (base / 100) * H - midN * amplitude;
      points.push(`${midX},${Math.max(10, midY)}`);
    }
  }
  points.push(`${W},${H}`);
  const d = `M${points.join(' L')} Z`;

  return (
    <svg
      viewBox={`0 0 ${W} ${H}`}
      preserveAspectRatio="none"
      className="absolute bottom-0 left-0 h-full w-full"
    >
      <path d={d} fill={color} />
      {/* thin ridge highlight */}
      <path
        d={d}
        fill="none"
        stroke="#ffffff"
        strokeOpacity="0.04"
        strokeWidth="1"
      />
    </svg>
  );
}

export type { MotionValue };
