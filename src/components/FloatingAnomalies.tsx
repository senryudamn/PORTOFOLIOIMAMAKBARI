import { motion } from 'framer-motion';
import { useMemo } from 'react';

const anomalySymbols = [
  '👁', // Eye
  '△', // Triangle
  '☆', // Star
  '☉', // Sun
  '☽', // Moon
  '♄', // Saturn
  '✧', // Sparkle
  '◬', // Diamond
  '⬡', // Hexagon
  '⊛', // Circled star
  '⎔', // Eye symbol
  '⚛', // Atom
];

interface Anomaly {
  id: number;
  symbol: string;
  x: string;
  y: string;
  duration: number;
  delay: number;
  size: number;
}

export default function FloatingAnomalies() {
  const anomalies: Anomaly[] = useMemo(() => {
    return Array.from({ length: 20 }, (_, i) => ({
      id: i,
      symbol: anomalySymbols[i % anomalySymbols.length],
      x: `${Math.random() * 100}%`,
      y: `${Math.random() * 100}%`,
      duration: 25 + Math.random() * 20,
      delay: Math.random() * 5,
      size: 16 + Math.random() * 24,
    }));
  }, []);

  return (
    <div className="pointer-events-none fixed inset-0 z-[-10] overflow-hidden">
      {/* Radial Cryptogram Background */}
      <div className="absolute inset-0 opacity-[0.02]">
        <div
          className="h-full w-full text-[8px] leading-tight"
          style={{
            fontFamily: '"Special Elite", monospace',
            wordBreak: 'break-all',
            overflow: 'hidden',
            color: '#5c4a32',
          }}
        >
          {Array.from({ length: 50 }, (_, i) => (
            <div key={i}>
              {Array.from({ length: 120 }, () => String.fromCharCode(65 + Math.floor(Math.random() * 26))).join('')}
            </div>
          ))}
        </div>
      </div>

      {/* Floating Anomalies */}
      {anomalies.map((anomaly) => (
        <motion.div
          key={anomaly.id}
          className="absolute"
          style={{
            left: anomaly.x,
            top: anomaly.y,
            fontSize: anomaly.size,
          }}
          animate={{
            x: [0, 100, -50, 0],
            y: [0, -50, 100, 0],
            rotate: [0, 90, 180, 270, 360],
            scale: [1, 1.2, 0.8, 1],
            opacity: [0.03, 0.08, 0.04, 0.03],
          }}
          transition={{
            duration: anomaly.duration,
            repeat: Infinity,
            delay: anomaly.delay,
            ease: 'easeInOut',
          }}
        >
          {/* Zodiac/Eye symbols */}
          <span
            style={{
              color: anomaly.id % 3 === 0 ? '#FFD700' : anomaly.id % 3 === 1 ? '#00FFFF' : '#8B0000',
              textShadow: anomaly.id % 2 === 0 ? '0 0 10px currentColor' : 'none',
            }}
          >
            {anomaly.symbol}
          </span>
        </motion.div>
      ))}

      {/* Floating Bill Cipher triangles (very subtle) */}
      {[...Array(3)].map((_, i) => (
        <motion.div
          key={`bill-${i}`}
          className="absolute"
          style={{
            left: `${20 + i * 30}%`,
            top: `${30 + i * 15}%`,
          }}
          animate={{
            y: [0, -20, 0],
            opacity: [0.02, 0.05, 0.02],
            rotate: [0, 5, 0],
          }}
          transition={{
            duration: 8 + i * 2,
            repeat: Infinity,
            delay: i * 2,
            ease: 'easeInOut',
          }}
        >
          <svg
            viewBox="0 0 50 50"
            className="h-12 w-12 opacity-30"
            style={{ filter: 'drop-shadow(0 0 5px #FFD700)' }}
          >
            <polygon
              points="25,5 45,45 5,45"
              fill="none"
              stroke="#FFD700"
              strokeWidth="1"
            />
            <circle cx="25" cy="30" r="5" fill="none" stroke="#FFD700" strokeWidth="1" />
            <line x1="25" y1="5" x2="25" y2="15" stroke="#FFD700" strokeWidth="1" />
          </svg>
        </motion.div>
      ))}

      {/* Glowing portal effect */}
      <motion.div
        className="absolute left-1/2 top-1/4 -translate-x-1/2"
        animate={{
          scale: [1, 1.5, 1],
          opacity: [0.02, 0.05, 0.02],
        }}
        transition={{
          duration: 15,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      >
        <div
          className="h-[400px] w-[400px] rounded-full"
          style={{
            background: 'radial-gradient(circle, rgba(0,255,255,0.1) 0%, transparent 70%)',
          }}
        />
      </motion.div>

      {/* Subtle floating cryptograms */}
      {['A1 B2 C3', 'TRUST NO ONE', 'I\'M WATCHING', 'XQFL', 'QRSL'].map((text, i) => (
        <motion.div
          key={`crypto-${i}`}
          className="absolute font-mono text-xs"
          style={{
            left: `${10 + i * 20}%`,
            top: `${50 + (i % 3) * 15}%`,
            color: 'rgba(92, 74, 50, 0.03)',
            writingMode: i % 2 === 0 ? 'horizontal-tb' : 'vertical-rl',
          }}
          animate={{
            x: i % 2 === 0 ? [0, 30, 0] : [0, -30, 0],
            opacity: [0.02, 0.04, 0.02],
          }}
          transition={{
            duration: 20 + i * 3,
            repeat: Infinity,
            delay: i * 0.5,
          }}
        >
          {text}
        </motion.div>
      ))}
    </div>
  );
}
