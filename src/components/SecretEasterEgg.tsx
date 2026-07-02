import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const hiddenPoem = `Logika yang Menunggu

Di antara nol dan satu,
Di sana logika menunggu.
Bukan hitam, bukan putih,
Tapi abu-abu yang bernyawa.

Kode bergerak, sensor membaca,
Mesin berpikir, data tersusun.
Di titik temu digital dan nyata,
Aku menemukan makna.

IOT bukan sekadar sambungan,
Tapi jembatan jiwa dan mesin.
Setiap chip punya cerita,
Setiap kabel menyimpan mimpi.

Logika yang menunggu...
Adalah logika yang hidup.`;

export default function SecretEasterEgg() {
  const [position, setPosition] = useState({ top: '50%', left: '50%' });
  const [isActive, setIsActive] = useState(false);
  const [showMindscape, setShowMindscape] = useState(false);
  const [glitchActive, setGlitchActive] = useState(false);

  useEffect(() => {
    // Random position on mount
    const top = 10 + Math.random() * 80;
    const left = 10 + Math.random() * 80;
    setPosition({ top: `${top}%`, left: `${left}%` });
  }, []);

  const handleClick = useCallback(() => {
    setIsActive(true);

    // Trigger glitch effect
    setGlitchActive(true);
    document.body.style.filter = 'invert(1) hue-rotate(180deg)';

    setTimeout(() => {
      document.body.style.filter = 'invert(0)';
    }, 150);

    setTimeout(() => {
      document.body.style.filter = 'invert(1) hue-rotate(90deg)';
    }, 300);

    setTimeout(() => {
      document.body.style.filter = 'none';
      setGlitchActive(false);
      setShowMindscape(true);
    }, 600);
  }, []);

  const closeMindscape = useCallback(() => {
    setShowMindscape(false);
    setIsActive(false);
  }, []);

  return (
    <>
      {/* Hidden Bill Cipher triangle trigger */}
      <motion.button
        onClick={handleClick}
        initial={{ opacity: 0 }}
        animate={{ opacity: isActive ? 0 : 0.15 }}
        whileHover={{ opacity: 0.8, scale: 1.5 }}
        transition={{ duration: 0.3 }}
        className="fixed z-40 cursor-pointer"
        style={{
          top: position.top,
          left: position.left,
          transform: 'translate(-50%, -50%)',
        }}
        aria-label="Secret"
      >
        <div className="relative">
          <svg
            viewBox="0 0 50 60"
            className="h-6 w-5 transition-all duration-300"
            style={{
              filter: 'drop-shadow(0 0 3px #FFD700)',
            }}
          >
            {/* Bill Cipher triangle */}
            <polygon
              points="25,5 45,55 5,55"
              fill="none"
              stroke="#FFD700"
              strokeWidth="2"
              className="transition-all duration-300"
            />
            {/* Eye */}
            <ellipse cx="25" cy="35" rx="8" ry="10" fill="none" stroke="#FFD700" strokeWidth="1" />
            <circle cx="25" cy="35" r="3" fill="#FFD700" />
            {/* Top hat */}
            <rect x="18" y="2" width="14" height="4" fill="#FFD700" opacity="0.7" />
            <rect x="14" y="0" width="22" height="3" fill="#FFD700" opacity="0.5" />
          </svg>

          {/* Blinking eye effect */}
          <motion.div
            animate={{
              scaleY: [1, 0.1, 1],
            }}
            transition={{
              duration: 0.3,
              repeat: Infinity,
              repeatDelay: 3,
            }}
            className="absolute left-1/2 top-[58%] h-2 w-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-gold"
            style={{ filter: 'blur(0.5px)' }}
          />
        </div>
      </motion.button>

      {/* Glitch overlay */}
      <AnimatePresence>
        {glitchActive && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] bg-black"
            style={{
              background: 'repeating-linear-gradient(0deg, rgba(255,0,255,0.1) 0px, rgba(255,0,255,0.1) 2px, transparent 2px, transparent 4px)',
            }}
          >
            {/* Glitch lines */}
            {[...Array(20)].map((_, i) => (
              <motion.div
                key={i}
                initial={{ x: '-100%' }}
                animate={{ x: '100vw' }}
                transition={{
                  duration: 0.1,
                  delay: i * 0.02,
                  repeat: 3,
                }}
                className="absolute h-px bg-cyan-400"
                style={{
                  top: `${i * 5}%`,
                  width: '200px',
                  opacity: Math.random(),
                }}
              />
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Mindscape Modal */}
      <AnimatePresence>
        {showMindscape && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeMindscape}
            className="fixed inset-0 z-[70] flex cursor-pointer items-center justify-center bg-black/95"
          >
            {/* Background effects */}
            <div className="absolute inset-0">
              {/* Floating triangles */}
              {[...Array(10)].map((_, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{
                    opacity: 0.1,
                    scale: 1,
                    y: [0, -20, 0],
                    rotate: [0, 360],
                  }}
                  transition={{
                    duration: 10 + i * 2,
                    repeat: Infinity,
                    delay: i * 0.5,
                  }}
                  className="absolute"
                  style={{
                    left: `${Math.random() * 100}%`,
                    top: `${Math.random() * 100}%`,
                  }}
                >
                  <svg viewBox="0 0 50 50" className="h-20 w-20">
                    <polygon
                      points="25,5 45,45 5,45"
                      fill="none"
                      stroke="#FFD700"
                      strokeWidth="1"
                    />
                  </svg>
                </motion.div>
              ))}
            </div>

            {/* Mindscape card */}
            <motion.div
              initial={{ scale: 0, rotateY: 180 }}
              animate={{ scale: 1, rotateY: 0 }}
              exit={{ scale: 0, rotateY: -180 }}
              transition={{ duration: 0.8, type: 'spring' }}
              onClick={(e) => e.stopPropagation()}
              className="relative max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-lg border border-gold/30 bg-black/80 p-8 md:p-12"
              style={{
                boxShadow: '0 0 50px rgba(255,215,0,0.3), 0 0 100px rgba(0,255,255,0.1), inset 0 0 50px rgba(0,255,255,0.05)',
              }}
            >
              {/* Bill Cipher in the background */}
              <motion.div
                animate={{
                  opacity: [0.05, 0.1, 0.05],
                  scale: [1, 1.05, 1],
                }}
                transition={{ duration: 5, repeat: Infinity }}
                className="pointer-events-none absolute right-4 top-4 opacity-10"
              >
                <svg viewBox="0 0 100 120" className="h-32 w-28">
                  <polygon points="50,5 90,110 10,110" fill="none" stroke="#FFD700" strokeWidth="2" />
                  <ellipse cx="50" cy="70" rx="15" ry="20" fill="none" stroke="#FFD700" strokeWidth="2" />
                  <circle cx="50" cy="70" r="6" fill="#FFD700" />
                  <rect x="35" y="0" width="30" height="8" fill="#FFD700" />
                  <rect x="25" y="-5" width="50" height="6" fill="#FFD700" />
                  {/* Bow tie */}
                </svg>
              </motion.div>

              {/* Title */}
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="mb-6 text-center"
              >
                <h2 className="rune-text text-3xl font-bold md:text-4xl">THE MINDSCAPE</h2>
                <p className="mt-2 font-typewriter text-sm uppercase tracking-widest text-gold/60">
                  Logika yang Menunggu
                </p>
                <div className="mx-auto mt-4 h-px w-32 bg-gradient-to-r from-transparent via-gold/50 to-transparent" />
              </motion.div>

              {/* The poem */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="relative"
              >
                <pre
                  className="rune-text mx-auto max-w-md text-center font-cryptic text-sm leading-relaxed md:text-base"
                  style={{ whiteSpace: 'pre-wrap' }}
                >
                  {hiddenPoem}
                </pre>
              </motion.div>

              {/* Cipher wheel decoration */}
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
                className="mx-auto mt-8 h-16 w-16"
              >
                <svg viewBox="0 0 100 100" className="h-full w-full opacity-30">
                  <circle cx="50" cy="50" r="45" fill="none" stroke="#FFD700" strokeWidth="1" />
                  <circle cx="50" cy="50" r="35" fill="none" stroke="#00FFFF" strokeWidth="1" />
                  {[...Array(12)].map((_, i) => (
                    <circle
                      key={i}
                      cx={50 + 40 * Math.cos((i * Math.PI) / 6)}
                      cy={50 + 40 * Math.sin((i * Math.PI) / 6)}
                      r="5"
                      fill="none"
                      stroke="#FFD700"
                      strokeWidth="1"
                    />
                  ))}
                </svg>
              </motion.div>

              {/* Close instruction */}
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.5 }}
                transition={{ delay: 1 }}
                className="mt-8 text-center font-typewriter text-xs uppercase tracking-widest text-gray-500"
              >
                Click anywhere to escape...
              </motion.p>

              {/* Floating particles */}
              {[...Array(5)].map((_, i) => (
                <motion.div
                  key={i}
                  animate={{
                    y: [0, -100, 0],
                    opacity: [0.2, 0.5, 0.2],
                  }}
                  transition={{
                    duration: 5 + i,
                    repeat: Infinity,
                    delay: i * 0.5,
                  }}
                  className="absolute h-1 w-1 rounded-full bg-cyan-400"
                  style={{
                    left: `${20 + i * 15}%`,
                    bottom: '10%',
                    boxShadow: '0 0 5px #00FFFF',
                  }}
                />
              ))}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
