import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Menu, X, Mountain } from 'lucide-react';
import { navLinks, profile } from '../data';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState<string>('#home');

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 24);
      const offset = window.scrollY + 120;
      for (const link of navLinks) {
        const el = document.querySelector(link.href);
        if (el) {
          const top = (el as HTMLElement).offsetTop;
          const height = (el as HTMLElement).offsetHeight;
          if (offset >= top && offset < top + height) {
            setActive(link.href);
            break;
          }
        }
      }
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const initials = profile.name
    .split(' ')
    .map((w) => w[0])
    .slice(0, 2)
    .join('');

  return (
    <motion.header
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className="fixed inset-x-0 top-0 z-50"
    >
      <div
        className={`transition-all duration-500 ${
          scrolled
            ? 'border-b border-white/[0.06] bg-ink-950/80 backdrop-blur-xl'
            : 'bg-transparent'
        }`}
      >
        <nav className="mx-auto flex max-w-6xl items-center justify-between px-5 py-4 sm:px-8">
          {/* Logo */}
          <a href="#home" className="group flex items-center gap-2.5">
            <span className="relative flex h-9 w-9 items-center justify-center rounded-xl border border-white/15 bg-ink-850 text-platinum">
              <Mountain className="h-5 w-5" />
            </span>
            <span className="font-mono text-sm font-bold tracking-tight text-platinum">
              {initials}
              <span className="text-ash-300">.</span>dev
            </span>
          </a>

          {/* Desktop nav */}
          <div className="hidden items-center gap-1 md:flex">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className={`relative rounded-lg px-3.5 py-2 text-sm font-medium transition-colors ${
                  active === link.href ? 'text-platinum' : 'text-ash-300 hover:text-platinum'
                }`}
              >
                {active === link.href && (
                  <motion.span
                    layoutId="nav-active"
                    className="absolute inset-0 -z-10 rounded-lg bg-white/5 ring-1 ring-white/10"
                    transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                  />
                )}
                {link.label}
              </a>
            ))}
          </div>

          {/* CTA + mobile toggle */}
          <div className="flex items-center gap-3">
            <a
              href="#contact"
              className="hidden rounded-lg bg-platinum px-4 py-2 text-sm font-semibold text-ink-950 transition-all hover:scale-[1.03] hover:bg-white sm:block"
            >
              Let's talk
            </a>
            <button
              onClick={() => setOpen((v) => !v)}
              className="flex h-10 w-10 items-center justify-center rounded-lg border border-white/10 text-platinum md:hidden"
              aria-label="Toggle menu"
            >
              {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </nav>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden border-b border-white/[0.06] bg-ink-950/95 backdrop-blur-xl md:hidden"
          >
            <div className="flex flex-col gap-1 px-5 py-4">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className={`rounded-lg px-4 py-3 text-sm font-medium transition-colors ${
                    active === link.href
                      ? 'bg-white/5 text-platinum'
                      : 'text-ash-300 hover:bg-white/5 hover:text-platinum'
                  }`}
                >
                  {link.label}
                </a>
              ))}
              <a
                href="#contact"
                onClick={() => setOpen(false)}
                className="mt-2 rounded-lg bg-platinum px-4 py-3 text-center text-sm font-semibold text-ink-950"
              >
                Let's talk
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
