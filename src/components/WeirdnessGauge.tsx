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

  return (
    <motion.div
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 3.5, duration: 0.8 }}
      className="fixed right-4 top-1/2 z-50 hidden -translate-y-1/2 transform lg:block xl:right-8"
    >
      <div className="relative flex flex-col items-center">
        {/* Journal section indicator */}
        <div className="mb-2 rounded border border-gold/30 bg-black/80 px-3 py-1">
          <span className="font-typewriter text-[10px] uppercase tracking-wider text-gold">
            Journal {Math.ceil(scrollProgress / 33.33)}
          </span>
        </div>

        {/* Steampunk Gauge Container */}
        <div className="relative flex flex-col items-center">
          {/* Main gauge SVG - single unified element for proper alignment */}
          <svg
            viewBox="0 0 140 100"
            className="h-36 w-40"
          >
            {/* Definitions */}
            <defs>
              {/* Metallic frame gradient */}
              <linearGradient id="metalFrame" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#8B7355" />
                <stop offset="50%" stopColor="#5c4a32" />
                <stop offset="100%" stopColor="#3d2e1a" />
              </linearGradient>
              {/* Inner face gradient */}
              <radialGradient id="innerFace" cx="50%" cy="100%" r="100%">
                <stop offset="0%" stopColor="#1a1608" />
                <stop offset="100%" stopColor="#0d0a04" />
              </radialGradient>
              {/* Zone gradient */}
              <linearGradient id="zoneGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#22c55e" />
                <stop offset="50%" stopColor="#eab308" />
                <stop offset="100%" stopColor="#ef4444" />
              </linearGradient>
              {/* Needle cap gradient */}
              <radialGradient id="needleCap" cx="30%" cy="30%">
                <stop offset="0%" stopColor="#FFD700" />
                <stop offset="100%" stopColor="#C9A800" />
              </radialGradient>
            </defs>

            {/* Outer metallic frame (semi-circle) */}
            <path
              d="M 10 90 A 60 60 0 0 1 130 90"
              fill="url(#metalFrame)"
              stroke="#3d2e1a"
              strokeWidth="4"
            />

            {/* Inner gauge face */}
            <path
              d="M 18 90 A 52 52 0 0 1 122 90"
              fill="url(#innerFace)"
            />

            {/* Glass reflection */}
            <path
              d="M 20 90 A 50 50 0 0 1 70 50"
              fill="url(#innerFace)"
              opacity="0.15"
            />

            {/* Colored zone arc */}
            <path
              d="M 25 90 A 45 45 0 0 1 115 90"
              fill="none"
              stroke="url(#zoneGradient)"
              strokeWidth="3"
              opacity="0.4"
            />

            {/* Tick marks */}
            {[0, 20, 40, 60, 80, 100].map((tick) => {
              const angle = -180 + (tick * 1.8); // -180 to 0 degrees (left to right along arc)
              const rad = (angle * Math.PI) / 180;
              const x1 = 70 + 48 * Math.cos(rad);
              const y1 = 90 + 48 * Math.sin(rad);
              const x2 = 70 + (tick % 20 === 0 ? 35 : 41) * Math.cos(rad);
              const y2 = 90 + (tick % 20 === 0 ? 35 : 41) * Math.sin(rad);
              const labelX = 70 + 28 * Math.cos(rad);
              const labelY = 90 + 28 * Math.sin(rad);

              const color = tick >= 80 ? '#ef4444' : tick >= 60 ? '#eab308' : '#22c55e';

              return (
                <g key={tick}>
                  <line
                    x1={x1}
                    y1={y1}
                    x2={x2}
                    y2={y2}
                    stroke={color}
                    strokeWidth={tick % 20 === 0 ? 2 : 1}
                    opacity={0.8}
                  />
                  {tick % 20 === 0 && (
                    <text
                      x={labelX}
                      y={labelY}
                      textAnchor="middle"
                      dominantBaseline="middle"
                      fill={color}
                      fontSize="7"
                      fontFamily="monospace"
                      fontWeight="bold"
                    >
                      {tick}
                    </text>
                  )}
                </g>
              );
            })}

            {/* Needle group - pivots at center bottom (70, 90) */}
            <motion.g
              animate={{ rotate: needleRotation }}
              transition={{ type: 'spring', stiffness: 100, damping: 15 }}
              style={{ transformOrigin: '70px 90px' }}
            >
              {/* Needle shadow */}
              <polygon
                points="70,35 73,85 67,85"
                fill="rgba(0,0,0,0.3)"
                transform="translate(2, 2)"
              />
              {/* Needle */}
              <polygon
                points="70,35 73,85 67,85"
                fill={danger.color}
                stroke="rgba(255,255,255,0.2)"
                strokeWidth="0.5"
              />
              {/* Center cap */}
              <circle
                cx="70"
                cy="90"
                r="8"
                fill="url(#needleCap)"
                stroke="#3d2e1a"
                strokeWidth="1"
              />
            </motion.g>

            {/* Brass screws */}
            <circle cx="15" cy="25" r="3" fill="#FFD700" opacity="0.7" />
            <circle cx="125" cy="25" r="3" fill="#FFD700" opacity="0.7" />
          </svg>
        </div>

        {/* Digital readout */}
        <div
          className="mt-1 rounded border border-parchment-500/30 bg-black/90 px-2 py-0.5"
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
            className="absolute -left-4 top-20 h-3 w-3 rounded-full"
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
