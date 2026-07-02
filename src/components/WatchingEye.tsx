import { useEffect, useState, useRef } from 'react';
import { motion } from 'framer-motion';

export default function WatchingEye() {
  const [pupilPosition, setPupilPosition] = useState({ x: 0, y: 0 });
  const eyeRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!eyeRef.current) return;

      const eyeRect = eyeRef.current.getBoundingClientRect();
      const eyeCenterX = eyeRect.left + eyeRect.width / 2;
      const eyeCenterY = eyeRect.top + eyeRect.height / 2;

      // Calculate angle from eye center to cursor
      const deltaX = e.clientX - eyeCenterX;
      const deltaY = e.clientY - eyeCenterY;

      // Limit pupil movement to a small radius
      const maxRadius = 8;
      const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);
      const angle = Math.atan2(deltaY, deltaX);

      // Normalize movement
      const normalizedDist = Math.min(distance / 200, 1);
      const moveX = Math.cos(angle) * normalizedDist * maxRadius;
      const moveY = Math.sin(angle) * normalizedDist * maxRadius;

      setPupilPosition({ x: moveX, y: moveY });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div
      ref={eyeRef}
      className="pointer-events-none absolute right-8 top-1/4 z-0 opacity-[0.07]"
      aria-hidden="true"
    >
      {/* Bill Cipher eye - triangular */}
      <svg
        viewBox="0 0 80 100"
        className="h-32 w-24"
      >
        {/* Triangle body */}
        <polygon
          points="40,5 75,95 5,95"
          fill="none"
          stroke="#FFD700"
          strokeWidth="2"
          opacity="0.5"
        />

        {/* Eye outline */}
        <ellipse
          cx="40"
          cy="55"
          rx="18"
          ry="22"
          fill="none"
          stroke="#FFD700"
          strokeWidth="1.5"
          opacity="0.6"
        />

        {/* Eye white */}
        <ellipse
          cx="40"
          cy="55"
          rx="16"
          ry="20"
          fill="rgba(255,255,255,0.1)"
        />
      </svg>

      {/* Pupil that follows cursor */}
      <motion.div
        animate={{
          x: pupilPosition.x,
          y: pupilPosition.y,
        }}
        transition={{
          type: 'spring',
          stiffness: 200,
          damping: 20,
          mass: 0.5,
        }}
        className="absolute left-1/2 top-[55%] -translate-x-1/2 -translate-y-1/2"
      >
        <div
          className="h-5 w-5 rounded-full bg-gold"
          style={{
            boxShadow: '0 0 10px #FFD700, 0 0 20px rgba(255,215,0,0.5)',
          }}
        >
          {/* Pupil slit */}
          <div className="absolute inset-1 rounded-full bg-black" />
        </div>
      </motion.div>

      {/* Top hat */}
      <svg
        viewBox="0 0 80 30"
        className="absolute -top-2 left-1/2 -translate-x-1/2 h-8 w-20"
      >
        <rect x="20" y="5" width="40" height="15" fill="#FFD700" opacity="0.4" />
        <rect x="10" y="0" width="60" height="5" fill="#FFD700" opacity="0.3" />
      </svg>
    </div>
  );
}
