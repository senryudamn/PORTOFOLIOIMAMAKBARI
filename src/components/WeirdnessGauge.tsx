import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

export default function WeirdnessGauge() {
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
      setScrollProgress(Math.min(100, Math.max(0, progress)));
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Needle rotates from -90deg (0%) to 90deg (100%)
  const needleRotation = -90 + (scrollProgress * 1.8);

  const getDangerLevel = () => {
    if (scrollProgress < 33) return { label: 'SAFE', color: '#22c55e' };
    if (scrollProgress < 66) return { label: 'CAUTION', color: '#eab308' };
    return { label: 'ANOMALY!', color: '#ef4444' };
  };

  const danger = getDangerLevel();

  // Generate tick marks for the gauge
  const ticks = [0, 20, 40, 60, 80, 100];

  return (
    <motion.div
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 3.5, duration: 0.8 }}
      className="fixed right-4 top-1/2 z-50 hidden -translate-y-1/2 transform lg:block xl:right-6"
    >
      <div className="relative flex flex-col items-center">
        {/* Journal section indicator */}
        <div className="mb-3 rounded-full border border-parchment-500/50 bg-parchment-900/80 px-3 py-1">
          <span className="font-typewriter text-xs uppercase tracking-wider text-gold">
            Journal {Math.ceil(scrollProgress / 33.33)}
          </span>
        </div>

        {/* Steampunk Gauge Container */}
        <div className="relative h-44 w-24">
          {/* Outer metallic frame */}
          <div
            className="absolute inset-0 rounded-t-full rounded-b-lg"
            style={{
              background: 'linear-gradient(145deg, #8B7355 0%, #5c4a32 50%, #3d2e1a 100%)',
              boxShadow: `
                inset 0 2px 4px rgba(255,255,255,0.2),
                inset 0 -2px 4px rgba(0,0,0,0.4),
                0 4px 12px rgba(0,0,0,0.5),
                0 0 0 3px #3d2e1a
              `,
            }}
          />

          {/* Inner gauge face */}
          <div
            className="absolute inset-2 rounded-t-full rounded-b-md"
            style={{
              background: 'linear-gradient(180deg, #1a1608 0%, #0d0a04 100%)',
              boxShadow: 'inset 0 4px 8px rgba(0,0,0,0.8)',
            }}
          >
            {/* Glass reflection semi-circle */}
            <div
              className="absolute inset-x-0 top-0 h-1/2 rounded-t-full opacity-20"
              style={{
                background: 'linear-gradient(180deg, rgba(255,255,255,0.3) 0%, transparent 100%)',
              }}
            />

            {/* Tick marks and labels */}
            <svg viewBox="0 0 100 70" className="absolute inset-x-2 top-2 h-full w-auto">
              {/* Arc path for ticks */}
              {ticks.map((tick) => {
                const angle = -90 + (tick * 1.8);
                const rad = (angle * Math.PI) / 180;
                const x1 = 50 + 35 * Math.cos(rad);
                const y1 = 65 - 35 * Math.sin(rad);
                const x2 = 50 + (tick % 20 === 0 ? 28 : 31) * Math.cos(rad);
                const y2 = 65 - (tick % 20 === 0 ? 28 : 31) * Math.sin(rad);
                const labelX = 50 + 22 * Math.cos(rad);
                const labelY = 65 - 22 * Math.sin(rad);

                return (
                  <g key={tick}>
                    {/* Tick line */}
                    <line
                      x1={x1}
                      y1={y1}
                      x2={x2}
                      y2={y2}
                      stroke={tick >= 80 ? '#ef4444' : tick >= 60 ? '#eab308' : '#22c55e'}
                      strokeWidth={tick % 20 === 0 ? 2 : 1}
                      opacity={0.8}
                    />
                    {/* Label */}
                    {tick % 20 === 0 && (
                      <text
                        x={labelX}
                        y={labelY}
                        textAnchor="middle"
                        dominantBaseline="middle"
                        fill={tick >= 80 ? '#ef4444' : tick >= 60 ? '#eab308' : '#22c55e'}
                        fontSize="5"
                        fontFamily="monospace"
                        opacity={0.9}
                      >
                        {tick}
                      </text>
                    )}
                  </g>
                );
              })}

              {/* Colored zones */}
              <defs>
                <linearGradient id="zoneGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#22c55e" />
                  <stop offset="50%" stopColor="#eab308" />
                  <stop offset="100%" stopColor="#ef4444" />
                </linearGradient>
              </defs>
              <path
                d="M 15 65 A 35 35 0 0 1 85 65"
                fill="none"
                stroke="url(#zoneGradient)"
                strokeWidth="2"
                opacity="0.3"
              />
            </svg>

            {/* Needle */}
            <motion.div
              className="absolute bottom-6 left-1/2 origin-bottom"
              style={{
                width: '4px',
                height: '50px',
                marginLeft: '-2px',
              }}
              animate={{ rotate: needleRotation }}
              transition={{ type: 'spring', stiffness: 100, damping: 15 }}
            >
              <svg viewBox="0 0 8 50" className="h-full w-full">
                {/* Needle shape */}
                <polygon
                  points="4,0 6,40 2,40"
                  fill={danger.color}
                  stroke="rgba(0,0,0,0.3)"
                  strokeWidth="0.5"
                />
                {/* Needle center cap */}
                <circle
                  cx="4"
                  cy="45"
                  r="4"
                  fill="url(#needleCap)"
                  stroke="#3d2e1a"
                  strokeWidth="1"
                />
                <defs>
                  <radialGradient id="needleCap" cx="30%" cy="30%">
                    <stop offset="0%" stopColor="#FFD700" />
                    <stop offset="100%" stopColor="#C9A800" />
                  </radialGradient>
                </defs>
              </svg>
            </motion.div>

            {/* Center screw/cap */}
            <div
              className="absolute bottom-5 left-1/2 h-5 w-5 -translate-x-1/2 rounded-full"
              style={{
                background: 'radial-gradient(circle at 30% 30%, #FFD700, #8B7355, #3d2e1a)',
                boxShadow: '0 1px 2px rgba(0,0,0,0.5)',
              }}
            />
          </div>

          {/* Brass screws decoration */}
          <div
            className="absolute -left-1 top-8 h-2 w-2 rounded-full"
            style={{
              background: 'radial-gradient(circle at 30% 30%, #FFD700, #8B7355)',
              boxShadow: '0 1px 2px rgba(0,0,0,0.3)',
            }}
          />
          <div
            className="absolute -right-1 top-8 h-2 w-2 rounded-full"
            style={{
              background: 'radial-gradient(circle at 30% 30%, #FFD700, #8B7355)',
              boxShadow: '0 1px 2px rgba(0,0,0,0.3)',
            }}
          />
        </div>

        {/* Digital readout */}
        <div
          className="mt-2 rounded border border-parchment-500/50 px-2 py-1"
          style={{
            background: 'linear-gradient(180deg, #1a1608 0%, #0d0a04 100%)',
            boxShadow: 'inset 0 1px 2px rgba(0,0,0,0.5)',
          }}
        >
          <span
            className="font-mono text-sm font-bold tabular-nums"
            style={{
              color: danger.color,
              textShadow: `0 0 8px ${danger.color}`,
            }}
          >
            {Math.round(scrollProgress)}%
          </span>
        </div>

        {/* Status label */}
        <motion.div
          key={danger.label}
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="mt-1"
        >
          <span
            className="font-typewriter text-[10px] font-bold uppercase tracking-wider"
            style={{ color: danger.color }}
          >
            {danger.label}
          </span>
        </motion.div>

        {/* Warning light (blinks at high danger) */}
        {scrollProgress > 66 && (
          <motion.div
            animate={{
              opacity: [0.3, 1, 0.3],
              scale: [1, 1.2, 1],
            }}
            transition={{
              duration: 0.5,
              repeat: Infinity,
            }}
            className="absolute -left-3 top-6 h-3 w-3 rounded-full"
            style={{
              background: 'radial-gradient(circle, #ef4444, #7f1d1d)',
              boxShadow: '0 0 8px #ef4444, 0 0 16px #ef4444',
            }}
          />
        )}
      </div>
    </motion.div>
  );
}
