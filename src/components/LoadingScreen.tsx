import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function LoadingScreen() {
  const [isLoading, setIsLoading] = useState(true);
  const [loadingProgress, setLoadingProgress] = useState(0);
  const [displayedText, setDisplayedText] = useState('');
  const fullText = 'DECODING ANOMALIES...';

  useEffect(() => {
    // Typewriter effect
    const textInterval = setInterval(() => {
      setDisplayedText((prev) => {
        if (prev.length < fullText.length) {
          return fullText.slice(0, prev.length + 1);
        }
        return prev;
      });
    }, 80);

    // Progress bar
    const progressInterval = setInterval(() => {
      setLoadingProgress((prev) => {
        if (prev >= 100) {
          clearInterval(progressInterval);
          return 100;
        }
        return prev + 2;
      });
    }, 60);

    // Dismiss after 3 seconds
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 3000);

    return () => {
      clearTimeout(timer);
      clearInterval(textInterval);
      clearInterval(progressInterval);
    };
  }, []);

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          transition={{ duration: 0.8, ease: 'easeInOut' }}
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-black"
        >
          {/* Background glow */}
          <div className="absolute inset-0 bg-gradient-radial from-black via-black to-transparent">
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(255,215,0,0.1)_0%,transparent_70%)]" />
          </div>

          {/* Cipher Zodiac Wheel */}
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
            className="relative mb-8"
          >
            <svg
              viewBox="0 0 200 200"
              className="h-48 w-48 md:h-64 md:w-64"
              style={{ filter: 'drop-shadow(0 0 20px rgba(255,215,0,0.5))' }}
            >
              {/* Outer ring */}
              <circle
                cx="100"
                cy="100"
                r="95"
                fill="none"
                stroke="#FFD700"
                strokeWidth="2"
                opacity="0.6"
              />
              <circle
                cx="100"
                cy="100"
                r="85"
                fill="none"
                stroke="#FFD700"
                strokeWidth="1"
                opacity="0.4"
              />

              {/* Zodiac symbols */}
              {[0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330].map((angle, i) => (
                <g
                  key={i}
                  transform={`rotate(${angle} 100 100)`}
                >
                  <circle
                    cx="100"
                    cy="15"
                    r="8"
                    fill="none"
                    stroke="#00FFFF"
                    strokeWidth="1"
                    opacity="0.6"
                  />
                </g>
              ))}

              {/* Inner circle */}
              <circle
                cx="100"
                cy="100"
                r="40"
                fill="none"
                stroke="#FFD700"
                strokeWidth="2"
                opacity="0.5"
              />

              {/* Bill Cipher triangle in center */}
              <polygon
                points="100,70 115,115 85,115"
                fill="none"
                stroke="#FFD700"
                strokeWidth="2"
                opacity="0.8"
              />
              <circle cx="100" cy="95" r="6" fill="#FFD700" opacity="0.9" />

              {/* Top hat */}
              <rect x="92" y="58" width="16" height="12" fill="none" stroke="#FFD700" strokeWidth="1" opacity="0.6" />
              <rect x="88" y="55" width="24" height="4" fill="none" stroke="#FFD700" strokeWidth="1" opacity="0.6" />
            </svg>

            {/* Glowing particles */}
            {[...Array(6)].map((_, i) => (
              <motion.div
                key={i}
                animate={{
                  scale: [1, 1.5, 1],
                  opacity: [0.3, 0.8, 0.3],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  delay: i * 0.3,
                }}
                className="absolute h-2 w-2 rounded-full bg-cyan-400"
                style={{
                  top: `${50 + 45 * Math.sin((i * Math.PI) / 3)}%`,
                  left: `${50 + 45 * Math.cos((i * Math.PI) / 3)}%`,
                  transform: 'translate(-50%, -50%)',
                  boxShadow: '0 0 10px #00FFFF',
                }}
              />
            ))}
          </motion.div>

          {/* Six-fingered hand filling with color */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="relative mb-6"
          >
            <svg viewBox="0 0 100 80" className="h-16 w-20 opacity-80">
              {/* Hand outline */}
              <path
                d="M20 60 L20 40 L10 25 L15 20 L25 35 L25 15 L32 15 L32 35 L40 10 L48 12 L38 40 L50 5 L58 7 L45 42 L60 10 L68 13 L52 45 L75 20 L80 28 L55 55 L55 60 Z"
                fill="none"
                stroke="#FFD700"
                strokeWidth="2"
              />
              {/* Number 1 */}
              <text
                x="38"
                y="55"
                fontSize="20"
                fontWeight="bold"
                fill="#00FFFF"
                style={{ fontFamily: '"Cinzel Decorative", serif' }}
              >
                1
              </text>
            </svg>
          </motion.div>

          {/* Typewriter text */}
          <div className="relative h-12 w-80 overflow-hidden">
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="font-typewriter text-lg tracking-[0.3em] text-gold md:text-xl"
            >
              {displayedText}
              <span className="animate-pulse">|</span>
            </motion.p>
          </div>

          {/* Progress bar */}
          <motion.div
            initial={{ opacity: 0, width: 0 }}
            animate={{ opacity: 1, width: '200px' }}
            transition={{ delay: 0.2 }}
            className="relative mt-8 h-1 overflow-hidden rounded-full bg-gray-800"
          >
            <motion.div
              style={{ width: `${loadingProgress}%` }}
              className="h-full bg-gradient-to-r from-gold via-cyan-400 to-magenta-500"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            />
            {/* Glow effect */}
            <div
              className="absolute inset-y-0 left-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
              style={{ width: `${loadingProgress}%` }}
            />
          </motion.div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.5 }}
            transition={{ delay: 1 }}
            className="mt-4 font-mono text-xs tracking-widest text-gray-500"
          >
            OPENING JOURNAL...
          </motion.p>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
