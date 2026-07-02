import { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface HideBehindAnomalyProps {
  initialSide?: 'left' | 'right';
  initialTop?: string;
}

interface HideBehindPosition {
  top: string;
  left?: string;
  right?: string;
}

// Predefined teleportation coordinates
const teleportPositions: HideBehindPosition[] = [
  { top: '15%', left: '5%' },
  { top: '25%', right: '8%' },
  { top: '40%', left: '3%' },
  { top: '55%', right: '5%' },
  { top: '70%', left: '7%' },
  { top: '20%', right: '12%' },
  { top: '85%', left: '4%' },
  { top: '35%', right: '3%' },
  { top: '50%', left: '8%' },
  { top: '65%', right: '6%' },
  { top: '10%', right: '4%' },
  { top: '78%', left: '10%' },
];

export default function HideBehindAnomaly({
  initialSide = 'right',
  initialTop = '30%',
}: HideBehindAnomalyProps) {
  const [position, setPosition] = useState<HideBehindPosition>({
    top: initialTop,
    [initialSide]: '5%',
  });
  const [isVisible, setIsVisible] = useState(true);
  const [isHiding, setIsHiding] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const lastTeleportTime = useRef(0);

  const teleport = useCallback(() => {
    // Debounce teleportation (minimum 500ms between teleports)
    const now = Date.now();
    if (now - lastTeleportTime.current < 500) return;
    lastTeleportTime.current = now;

    // Quick fade out
    setIsHiding(true);
    setIsVisible(false);

    // Select random new position
    const randomIndex = Math.floor(Math.random() * teleportPositions.length);
    const newPosition = teleportPositions[randomIndex];

    // Teleport and fade back in
    setTimeout(() => {
      setPosition(newPosition);
      setIsHiding(false);
      setTimeout(() => setIsVisible(true), 100);
    }, 200);
  }, []);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return;

      const rect = containerRef.current.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      const distance = Math.sqrt(
        Math.pow(e.clientX - centerX, 2) + Math.pow(e.clientY - centerY, 2)
      );

      // If mouse gets close - teleport away!
      if (distance < 150 && isVisible && !isHiding) {
        teleport();
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [isVisible, isHiding, teleport]);

  // Random peeking behavior when far from mouse
  useEffect(() => {
    const randomPeek = () => {
      if (!isVisible && !isHiding) {
        setIsVisible(true);
      }
    };

    const interval = setInterval(randomPeek, 3000);
    return () => clearInterval(interval);
  }, [isVisible, isHiding]);

  return (
    <motion.div
      ref={containerRef}
      className="pointer-events-none fixed z-40"
      style={{
        top: position.top,
        left: position.left,
        right: position.right,
      }}
    >
      <AnimatePresence mode="wait">
        <motion.div
          key={`${position.top}-${position.left || position.right}`}
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{
            opacity: isVisible && !isHiding ? 0.7 : 0,
            scale: isVisible && !isHiding ? 1 : 0.5,
          }}
          exit={{ opacity: 0, scale: 0.5 }}
          transition={{
            opacity: { duration: isHiding ? 0.1 : 0.3 },
            scale: { duration: 0.2 },
          }}
          className="relative"
        >
          {/* The Hide-Behind creature - shadowy figure */}
          <svg
            viewBox="0 0 50 90"
            className="h-24 w-14"
            style={{
              filter: `drop-shadow(0 0 ${isHiding ? 0 : '12px'} rgba(255,0,255,0.6))`,
            }}
          >
            {/* Body - shadowy mass */}
            <motion.ellipse
              cx="25"
              cy="55"
              rx="18"
              ry="30"
              fill="rgba(20,10,30,0.95)"
              stroke="#FF00FF"
              strokeWidth="0.5"
              animate={{
                ry: [30, 32, 30],
                opacity: [0.9, 1, 0.9],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
              }}
            />

            {/* Glowing eyes */}
            {isVisible && !isHiding && (
              <>
                {/* Left eye */}
                <motion.ellipse
                  cx="17"
                  cy="35"
                  rx="4"
                  ry="5"
                  fill="#00FFFF"
                  animate={{
                    opacity: [0.6, 1, 0.6],
                    cy: [35, 33, 35],
                  }}
                  transition={{
                    duration: 1.5,
                    repeat: Infinity,
                    repeatType: 'reverse',
                  }}
                  style={{ filter: 'drop-shadow(0 0 6px #00FFFF)' }}
                />
                {/* Right eye */}
                <motion.ellipse
                  cx="33"
                  cy="35"
                  rx="4"
                  ry="5"
                  fill="#00FFFF"
                  animate={{
                    opacity: [0.6, 1, 0.6],
                    cy: [35, 33, 35],
                  }}
                  transition={{
                    duration: 1.5,
                    repeat: Infinity,
                    repeatType: 'reverse',
                    delay: 0.3,
                  }}
                  style={{ filter: 'drop-shadow(0 0 6px #00FFFF)' }}
                />
                {/* Eye pupils */}
                <circle cx="17" cy="35" r="1.5" fill="#FF00FF" style={{ filter: 'drop-shadow(0 0 3px #FF00FF)' }} />
                <circle cx="33" cy="35" r="1.5" fill="#FF00FF" style={{ filter: 'drop-shadow(0 0 3px #FF00FF)' }} />
              </>
            )}

            {/* Tentacle-like appendages */}
            {isVisible && !isHiding && (
              <>
                <motion.path
                  d="M10 75 Q5 85 12 88"
                  fill="none"
                  stroke="rgba(20,10,30,0.95)"
                  strokeWidth="5"
                  strokeLinecap="round"
                  animate={{
                    d: ['M10 75 Q5 85 12 88', 'M10 75 Q3 87 14 90', 'M10 75 Q5 85 12 88'],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                  }}
                />
                <motion.path
                  d="M40 75 Q45 85 38 88"
                  fill="none"
                  stroke="rgba(20,10,30,0.95)"
                  strokeWidth="5"
                  strokeLinecap="round"
                  animate={{
                    d: ['M40 75 Q45 85 38 88', 'M40 75 Q47 87 36 90', 'M40 75 Q45 85 38 88'],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    delay: 1,
                  }}
                />
              </>
            )}
          </svg>

          {/* "Hide-Behind" label */}
          <motion.div
            animate={{ opacity: isVisible && !isHiding ? 0.6 : 0 }}
            transition={{ duration: 0.2 }}
            className="absolute -top-6 left-1/2 -translate-x-1/2 whitespace-nowrap"
          >
            <span className="font-typewriter text-[8px] uppercase tracking-wider text-magenta">
              (THE HIDE-BEHIND)
            </span>
          </motion.div>

          {/* Teleport flash effect */}
          <AnimatePresence>
            {isHiding && (
              <motion.div
                initial={{ opacity: 1, scale: 2 }}
                animate={{ opacity: 0, scale: 3 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="absolute left-1/2 top-1/2 h-16 w-16 -translate-x-1/2 -translate-y-1/2"
              >
                <div
                  className="h-full w-full rounded-full"
                  style={{
                    background: 'radial-gradient(circle, rgba(255,0,255,0.6), transparent)',
                  }}
                />
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </AnimatePresence>
    </motion.div>
  );
}
