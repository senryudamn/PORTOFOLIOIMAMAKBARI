import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { navLinks } from '../data';

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);

      const sections = ['home', 'about', 'projects', 'awards', 'gallery', 'contact'];
      let current = 'home';

      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 150 && rect.bottom >= 150) {
            current = section;
            break;
          }
        }
      }
      setActiveSection(current);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <motion.nav
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, delay: 3 }}
      className={`sticky top-0 z-50 transition-all duration-500 ${
        isScrolled ? 'shadow-paper-lg' : ''
      }`}
      style={{
        background: isScrolled
          ? 'linear-gradient(135deg, rgba(232,220,184,0.98), rgba(212,196,160,0.98))'
          : 'rgba(232,220,184,0.85)',
        backdropFilter: 'blur(8px)',
      }}
    >
      {/* Decorative top border */}
      <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-crimson via-[#1a3a5c] to-[#2d1b4e]" />

      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3 md:px-6">
        {/* Logo - Journal icon */}
        <a href="#home" className="group flex items-center gap-2">
          <div className="relative h-10 w-10 rounded-sm border-2 border-parchment-500 bg-parchment-200 p-1 shadow-paper transition-transform group-hover:scale-105">
            {/* Mini journal icon */}
            <svg viewBox="0 0 24 24" className="h-full w-full">
              <rect x="4" y="2" width="16" height="20" rx="1" fill="#8B0000" />
              <rect x="6" y="4" width="12" height="16" rx="0.5" fill="#e8dcb8" />
              <line x1="8" y1="8" x2="16" y2="8" stroke="#5c4a32" strokeWidth="1" />
              <line x1="8" y1="11" x2="14" y2="11" stroke="#5c4a32" strokeWidth="1" />
              <line x1="8" y1="14" x2="15" y2="14" stroke="#5c4a32" strokeWidth="1" />
            </svg>
          </div>
          <span className="font-cryptic text-lg font-bold text-parchment-600 hidden md:block">
            Myst Journal
          </span>
        </a>

        {/* Navigation links - Desktop */}
        <div className="hidden items-center gap-1 md:flex">
          {navLinks.map((link) => {
            const isActive = activeSection === link.href.replace('#', '');
            return (
              <a
                key={link.href}
                href={link.href}
                className="group relative"
              >
                <div
                  className={`relative px-3 py-2 font-typewriter text-sm uppercase tracking-wider transition-all duration-300 ${
                    isActive
                      ? 'text-crimson'
                      : 'text-parchment-500 hover:text-parchment-600'
                  }`}
                >
                  {link.label}

                  {/* Active indicator */}
                  {isActive && (
                    <motion.div
                      layoutId="navIndicator"
                      className="absolute -bottom-1 left-1/2 h-0.5 w-8 -translate-x-1/2 bg-crimson"
                      style={{ boxShadow: '0 0 4px rgba(139,0,0,0.3)' }}
                    />
                  )}

                  {/* Hover underline */}
                  <div className="absolute -bottom-1 left-1/2 h-0.5 w-0 -translate-x-1/2 bg-parchment-500 transition-all duration-300 group-hover:w-8" />
                </div>
              </a>
            );
          })}
        </div>

        {/* Cipher wheel indicator & Mobile toggle */}
        <div className="flex items-center gap-3">
          {/* Cipher wheel - Desktop only */}
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
            className="hidden h-8 w-8 opacity-40 lg:block"
          >
            <svg viewBox="0 0 40 40">
              <circle cx="20" cy="20" r="18" fill="none" stroke="#5c4a32" strokeWidth="1" />
              {[...Array(6)].map((_, i) => (
                <g key={i} transform={`rotate(${i * 60} 20 20)`}>
                  <circle cx="20" cy="3" r="2" fill="#8B0000" />
                </g>
              ))}
            </svg>
          </motion.div>

          {/* Mobile menu button */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="flex h-10 w-10 items-center justify-center rounded-sm border-2 border-parchment-500 text-parchment-600 transition-colors hover:bg-parchment-200 md:hidden"
            aria-label="Toggle menu"
          >
            {mobileOpen ? (
              <svg className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden border-b border-parchment-400/30 bg-parchment-200/95 backdrop-blur-lg md:hidden"
          >
            <div className="px-4 py-4">
              {navLinks.map((link) => {
                const isActive = activeSection === link.href.replace('#', '');
                return (
                  <a
                    key={link.href}
                    href={link.href}
                    onClick={() => setMobileOpen(false)}
                    className={`block rounded-sm px-4 py-3 font-typewriter text-sm uppercase tracking-wider transition-colors ${
                      isActive
                        ? 'bg-crimson/10 text-crimson'
                        : 'text-parchment-500 hover:bg-parchment-300'
                    }`}
                  >
                    {link.label}
                  </a>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Bottom decorative border */}
      <div
        className="absolute inset-x-0 bottom-0 h-px"
        style={{
          background: 'linear-gradient(90deg, transparent, rgba(92,74,50,0.3), transparent)',
        }}
      />
    </motion.nav>
  );
}
