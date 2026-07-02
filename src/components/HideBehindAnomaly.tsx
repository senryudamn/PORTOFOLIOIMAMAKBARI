import { useState, useEffect, useRef } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

interface HideBehindAnomalyProps {
  side?: 'left' | 'right';
  topPosition?: string;
}

export default function HideBehindAnomaly({
  side = 'right',
  topPosition = '30%',
}: HideBehindAnomalyProps) {
  const [isHiding, setIsHiding] = useState(false);
  const [isPeeking, setIsPeeking] = useState(true);
  const containerRef = useRef<HTMLDivElement>(null);

  const x = useMotionValue(side === 'right' ? '100%' : '-100%');
  const springX = useSpring(x, { stiffness: 300, damping: 30 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return;

      const rect = containerRef.current.getBoundingClientRect();
      const mouseX = e.clientX;
      const mouseY = e.clientY;

      // Calculate distance from the creature
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      const distance = Math.sqrt(
        Math.pow(mouseX - centerX, 2) + Math.pow(mouseY - centerY, 2)
      );

      // If mouse is close, hide; otherwise, slowly peek
      if (distance < 200) {
        setIsHiding(true);
        setIsPeeking(false);
        if (side === 'right') {
          x.set('85%');
        } else {
          x.set('-85%');
        }
      } else if (distance > 300) {
        // Slowly start peeking again
        setIsHiding(false);

        if (distance > 400) {
          setIsPeeking(true);
          if (side === 'right') {
            x.set('95%');
          } else {
            x.set('-95%');
          }
        }
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [side, x]);

  return (
    <div
      ref={containerRef}
      className={`absolute ${side === 'right' ? 'right-0' : 'left-0'} pointer-events-none`}
      style={{
        top: topPosition,
        zIndex: isHiding ? 0 : 10,
      }}
    >
      <motion.div
        style={{
          x: springX,
        }}
        initial={{ opacity: 0 }}
        animate={{
          opacity: isPeeking || isHiding ? 0.6 : 0.3,
        }}
        transition={{ duration: 0.3 }}
        className="relative"
      >
        {/* The Hide-Behind creature - shadowy figure */}
        <svg
          viewBox="0 0 40 80"
          className="h-20 w-10"
          style={{
            filter: `drop-shadow(0 0 ${isHiding ? 0 : isPeeking ? '8px' : '4px'} rgba(255,0,255,0.5))`,
          }}
        >
          {/* Body - shadowy mass */}
          <ellipse
            cx="20"
            cy="50"
            rx="15"
            ry="25"
            fill="rgba(20,10,30,0.9)"
            stroke={isHiding ? 'none' : '#FF00FF'}
            strokeWidth="0.5"
            opacity={isHiding ? 0.2 : 0.8}
          />

          {/* Glowing eyes */}
          {(!isHiding || isPeeking) && (
            <>
              {/* Left eye */}
              <motion.ellipse
                cx="14"
                cy="35"
                rx="3"
                ry="2.5"
                fill="#00FFFF"
                animate={{
                  opacity: [0.6, 1, 0.6],
                  cy: [35, 33, 35],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  repeatType: 'reverse',
                }}
                style={{
                  filter: 'drop-shadow(0 0 4px #00FFFF)',
                }}
              />
              {/* Right eye */}
              <motion.ellipse
                cx="26"
                cy="35"
                rx="3"
                ry="2.5"
                fill="#00FFFF"
                animate={{
                  opacity: [0.6, 1, 0.6],
                  cy: [35, 33, 35],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  repeatType: 'reverse',
                  delay: 0.5,
                }}
                style={{
                  filter: 'drop-shadow(0 0 4px #00FFFF)',
                }}
              />
              {/* Eye pupils */}
              <circle cx="14" cy="35" r="1" fill="#FF00FF" />
              <circle cx="26" cy="35" r="1" fill="#FF00FF" />
            </>
          )}

          {/* Tentacle-like appendages */}
          {!isHiding && (
            <>
              <motion.path
                d="M8 60 Q5 70 10 75"
                fill="none"
                stroke="rgba(20,10,30,0.9)"
                strokeWidth="4"
                strokeLinecap="round"
                animate={{
                  d: ['M8 60 Q5 70 10 75', 'M8 60 Q3 72 12 78', 'M8 60 Q5 70 10 75'],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                }}
              />
              <motion.path
                d="M32 60 Q35 70 30 75"
                fill="none"
                stroke="rgba(20,10,30,0.9)"
                strokeWidth="4"
                strokeLinecap="round"
                animate={{
                  d: ['M32 60 Q35 70 30 75', 'M32 60 Q37 72 28 78', 'M32 60 Q35 70 30 75'],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  delay: 1.5,
                }}
              />
            </>
          )}
        </svg>

        {/* "Hide Behind" label (rarely visible) */}
        <motion.div
          animate={{ opacity: isPeeking && !isHiding ? 0.5 : 0 }}
          className="absolute -top-6 left-1/2 -translate-x-1/2 whitespace-nowrap font-typewriter text-[8px] uppercase tracking-wider text-magenta"
        >
          (THE HIDE-BEHIND)
        </motion.div>
      </motion.div>
    </div>
  );
}
