import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface FallingSProps {
  className?: string;
}

export default function FallingS({ className = '' }: FallingSProps) {
  const [isHovering, setIsHovering] = useState(false);
  const [hasFallen, setHasFallen] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);

  const handleClick = () => {
    if (!isAnimating && !hasFallen) {
      setIsHovering(true);
      setIsAnimating(true);

      // Trigger the fall animation
      setTimeout(() => {
        setHasFallen(true);
      }, 1000);

      // Reset after 3 seconds
      setTimeout(() => {
        setHasFallen(false);
        setIsHovering(false);
        setIsAnimating(false);
      }, 3000);
    }
  };

  return (
    <span className={`relative inline ${className}`}>
      {/* The 'S' with fall animation */}
      <AnimatePresence mode="wait">
        {!hasFallen ? (
          <motion.span
            key="attached-s"
            initial={{ rotate: 0, y: 0 }}
            animate={isHovering ? {
              rotate: [0, 15, -15, 20, -20, 40],
              y: [0, 0, 0, 0, 0, 200],
              x: [0, 3, -3, 5, -5, 10],
              opacity: [1, 1, 1, 1, 0.8, 0],
            } : {}}
            transition={{
              duration: 1.5,
              ease: 'easeIn',
            }}
            className="relative inline-block cursor-pointer text-crimson"
            onMouseEnter={() => !isAnimating && setIsHovering(true)}
            onMouseLeave={() => !isAnimating && setIsHovering(false)}
            onClick={handleClick}
            style={{
              transformOrigin: 'top center',
              display: 'inline-block',
            }}
          >
            S

            {/* Hinge effect when hovering */}
            {isHovering && !hasFallen && (
              <motion.span
                className="absolute -left-1 top-0 h-1 w-0.5 bg-crimson"
                animate={{
                  opacity: [0, 1, 0.5, 1],
                }}
                transition={{
                  duration: 0.3,
                  repeat: Infinity,
                }}
              />
            )}

            {/* Rust/dust particles when shaking */}
            {isHovering && (
              <>
                {[...Array(5)].map((_, i) => (
                  <motion.span
                    key={i}
                    className="absolute h-1 w-1 rounded-full bg-parchment-400"
                    initial={{ opacity: 0, x: 0, y: 0 }}
                    animate={{
                      opacity: [0, 1, 0],
                      x: [0, (Math.random() - 0.5) * 20],
                      y: [0, Math.random() * 10 + 5],
                    }}
                    transition={{
                      duration: 0.5,
                      delay: i * 0.1,
                      repeat: 2,
                    }}
                  />
                ))}
              </>
            )}
          </motion.span>
        ) : (
          <motion.span
            key="fallen-s"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="inline-block"
          >
            {/* Placeholder gap where S used to be */}
            <span className="text-crimson/30">_</span>
          </motion.span>
        )}
      </AnimatePresence>

      {/* The fallen S at bottom of screen */}
      <AnimatePresence>
        {hasFallen && (
          <motion.span
            className="fixed bottom-8 left-1/2 -translate-x-1/2 text-4xl text-crimson"
            initial={{ opacity: 0, rotate: -30, x: '-50%', y: -20 }}
            animate={{
              opacity: [0, 1, 1, 0],
              rotate: -30,
              y: [20, 60, 60, 100],
            }}
            transition={{
              duration: 2,
              ease: 'easeOut',
            }}
            style={{
              textShadow: '2px 2px 4px rgba(0,0,0,0.3)',
            }}
          >
            S
          </motion.span>
        )}
      </AnimatePresence>
    </span>
  );
}
