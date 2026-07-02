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

  const needleRotation = -90 + (scrollProgress * 1.8); // -90 to 90 degrees

  const getLabel = () => {
    if (scrollProgress < 33) return 'NORMAL';
    if (scrollProgress < 66) return 'ANOMALOUS';
    return 'ANOMALY DETECTED';
  };

  const getGlowColor = () => {
    if (scrollProgress < 33) return 'rgba(0, 255, 0, 0.3)';
    if (scrollProgress < 66) return 'rgba(255, 200, 0, 0.4)';
    return 'rgba(255, 0, 100, 0.5)';
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 0.5, duration: 0.8 }}
      className="fixed right-4 top-1/2 z-50 hidden -translate-y-1/2 transform lg:block xl:right-6"
    >
      <div className="relative flex flex-col items-center">
        {/* Journal number indicator */}
        <div className="mb-2 text-center font-typewriter text-xs uppercase tracking-wider text-parchment-400">
          {Math.ceil(scrollProgress / 33.33)}
        </div>

        {/* Gauge body - parchment styled */}
        <div
          className="relative h-48 w-16 rounded-t-full rounded-b-sm border-2 border-parchment-500 bg-parchment-200 shadow-paper-lg"
          style={{
            background: 'linear-gradient(180deg, #f5f0e1 0%, #e8dcb8 50%, #d4c4a0 100%)',
          }}
        >
          {/* Gauge markings */}
          <div className="absolute inset-x-0 top-0 h-full">
            {/* Tick marks */}
            {[0, 25, 50, 75, 100].map((tick) => (
              <div
                key={tick}
                className="absolute left-1 h-px bg-parchment-500"
                style={{
                  top: `${10 + tick * 0.8}%`,
                  width: tick % 50 === 0 ? '12px' : '8px',
                }}
              />
            ))}
            {[0, 25, 50, 75, 100].map((tick) => (
              <div
                key={`r-${tick}`}
                className="absolute right-1 h-px bg-parchment-500"
                style={{
                  top: `${10 + tick * 0.8}%`,
                  width: tick % 50 === 0 ? '12px' : '8px',
                }}
              />
            ))}
          </div>

          {/* Percentage display */}
          <div className="absolute inset-x-0 bottom-3 text-center font-mono text-[10px] font-bold text-parchmark-600">
            {Math.round(scrollProgress)}%
          </div>
        </div>

        {/* Needle */}
        <motion.div
          className="absolute bottom-6 h-32 w-32"
          animate={{ rotate: needleRotation }}
          transition={{ type: 'spring', stiffness: 100, damping: 15 }}
        >
          <div
            className="absolute inset-0"
            style={{
              transform: 'translateX(-50%)',
            }}
          >
            <svg viewBox="0 0 100 120" className="h-full w-full">
              {/* Needle center */}
              <circle cx="50" cy="100" r="8" fill="#5c4a32" />
              <circle cx="50" cy="100" r="5" fill="#FFD700" />
              {/* Needle */}
              <polygon
                points="50,10 46,95 54,95"
                fill={scrollProgress < 33 ? '#2d5016' : scrollProgress < 66 ? '#8B7355' : '#8B0000'}
                style={{ filter: `drop-shadow(0 0 5px ${getGlowColor()})` }}
              />
            </svg>
          </div>
        </motion.div>

        {/* Status label */}
        <div
          className="mt-3 rounded border border-parchment-500 bg-parchment-300 px-2 py-1 text-center"
          style={{ transform: 'rotate(-90deg)', transformOrigin: 'center' }}
        >
          <span
            className="font-typewriter text-[10px] font-bold uppercase tracking-wider"
            style={{
              color: scrollProgress < 33 ? '#2d5016' : scrollProgress < 66 ? '#8B7355' : '#8B0000',
            }}
          >
            {getLabel()}
          </span>
        </div>

        {/* Glowing anomaly indicator */}
        {scrollProgress > 66 && (
          <motion.div
            animate={{
              opacity: [0.5, 1, 0.5],
              scale: [1, 1.1, 1],
            }}
            transition={{ duration: 1, repeat: Infinity }}
            className="absolute -left-2 top-0 h-3 w-3 rounded-full bg-red-500 shadow-lg"
            style={{ boxShadow: '0 0 10px #FF0000, 0 0 20px #FF0000' }}
          />
        )}
      </div>
    </motion.div>
  );
}
