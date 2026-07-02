import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ZoomIn } from 'lucide-react';
import { gallery, type GalleryItem } from '../data';
import { fadeUp, staggerContainer } from './primitives';
import SectionHeading from './SectionHeading';

export default function Gallery() {
  const [active, setActive] = useState<GalleryItem | null>(null);
  const categories = useMemo(
    () => ['All', ...Array.from(new Set(gallery.map((g) => g.category)))],
    [],
  );
  const [filter, setFilter] = useState<string>('All');

  const items = filter === 'All' ? gallery : gallery.filter((g) => g.category === filter);

  return (
    <section id="gallery" className="relative py-24 sm:py-32">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <SectionHeading
          eyebrow="Gallery"
          title="Moments in"
          highlight="ascent"
          description="Documenting projects, competitions, and the day-to-day of an engineering student on the climb."
        />

        {/* Filters */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.6 }}
          className="mt-10 flex flex-wrap justify-center gap-2"
        >
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={`rounded-full border px-4 py-1.5 text-sm transition-all ${
                filter === cat
                  ? 'border-white/25 bg-platinum text-ink-950'
                  : 'border-white/10 bg-white/5 text-ash-300 hover:text-platinum'
              }`}
            >
              {cat}
            </button>
          ))}
        </motion.div>

        {/* Masonry */}
        <motion.div
          key={filter}
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          className="masonry mt-10 columns-1 sm:columns-2 lg:columns-3"
        >
          {items.map((item) => (
            <motion.button
              key={item.id}
              variants={fadeUp}
              onClick={() => setActive(item)}
              className="group relative w-full overflow-hidden rounded-2xl border border-white/[0.06] bg-ink-850/60 text-left hover:border-white/15"
            >
              <img
                src={item.image}
                alt={item.title}
                loading="lazy"
                className="img-mono w-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-ink-950 via-ink-950/30 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
              <div className="absolute inset-x-0 bottom-0 translate-y-4 p-4 opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100">
                <span className="mb-1 inline-block rounded-full border border-white/15 bg-ink-950/60 px-2 py-0.5 text-[10px] font-medium uppercase tracking-wide text-ash-100 backdrop-blur">
                  {item.category}
                </span>
                <h3 className="font-sans text-sm font-bold text-platinum">{item.title}</h3>
                <p className="mt-1 text-xs text-ash-200">{item.description}</p>
              </div>
              <span className="absolute right-3 top-3 flex h-9 w-9 items-center justify-center rounded-full bg-ink-950/70 text-platinum opacity-0 backdrop-blur transition-opacity duration-300 group-hover:opacity-100">
                <ZoomIn className="h-4 w-4" />
              </span>
            </motion.button>
          ))}
        </motion.div>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {active && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setActive(null)}
            className="fixed inset-0 z-[60] flex items-center justify-center bg-ink-950/90 p-4 backdrop-blur-md"
          >
            <motion.figure
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ duration: 0.3, ease: 'easeOut' }}
              onClick={(e) => e.stopPropagation()}
              className="relative max-h-[88vh] w-full max-w-2xl overflow-hidden rounded-3xl border border-white/10 bg-ink-900"
            >
              <button
                onClick={() => setActive(null)}
                className="absolute right-4 top-4 z-10 flex h-9 w-9 items-center justify-center rounded-full bg-ink-950/70 text-platinum backdrop-blur transition-colors hover:bg-ink-950"
                aria-label="Close"
              >
                <X className="h-4 w-4" />
              </button>
              <img
                src={active.image}
                alt={active.title}
                className="img-mono max-h-[60vh] w-full object-cover"
              />
              <figcaption className="p-6">
                <span className="mb-2 inline-block rounded-full border border-white/15 bg-ink-950/60 px-2.5 py-0.5 text-[10px] font-medium uppercase tracking-wide text-ash-100 backdrop-blur">
                  {active.category}
                </span>
                <h3 className="font-sans text-xl font-bold text-platinum">{active.title}</h3>
                <p className="mt-2 text-sm text-ash-300">{active.description}</p>
              </figcaption>
            </motion.figure>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
