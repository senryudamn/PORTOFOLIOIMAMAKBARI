import { motion } from 'framer-motion';
import { ReactNode } from 'react';

interface InvisibleMarginNotesProps {
  notes: Array<{
    text: string;
    position: 'left' | 'right';
    top: string;
    color?: 'cyan' | 'magenta';
    rotation?: number;
  }>;
  triggerState: boolean;
  children: ReactNode;
}

export default function InvisibleMarginNotes({
  notes,
  triggerState,
  children,
}: InvisibleMarginNotesProps) {
  return (
    <div className="relative">
      {/* Margin notes */}
      {notes.map((note, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0 }}
          animate={{
            opacity: triggerState ? 0.9 : 0,
            x: triggerState ? 0 : note.position === 'left' ? -10 : 10,
          }}
          transition={{ duration: 0.5, delay: index * 0.1 }}
          className={`pointer-events-none absolute ${
            note.position === 'left' ? '-left-24 lg:-left-32' : '-right-24 lg:-right-32'
          }`}
          style={{
            top: note.top,
            transform: `rotate(${note.rotation || (note.position === 'left' ? -5 : 5)}deg)`,
          }}
        >
          <div
            className="whitespace-nowrap font-typewriter text-xs uppercase tracking-widest"
            style={{
              color: note.color === 'magenta' ? '#FF00FF' : '#00FFFF',
              textShadow: note.color === 'magenta'
                ? '0 0 10px rgba(255,0,255,0.8)'
                : '0 0 10px rgba(0,255,255,0.8)',
            }}
          >
            {note.text}
          </div>
        </motion.div>
      ))}

      {/* Children content */}
      {children}
    </div>
  );
}

// Predefined secret messages
export const secretMessages = {
  indonesian: [
    'BACA SANDI INI!',
    'DIA MENGAWASIMU',
    'SEMBUNYIKAN INI!',
    'AKU TAHU RAHASIAMU',
    'LOGIKA TERSEMBUNYI',
  ],
  english: [
    'TRUST NO ONE',
    'THE AUTHOR LIED',
    'ANOMALY DETECTED',
    'HE IS ALWAYS WATCHING',
    'REALITY IS AN ILLUSION',
  ],
  formulas: [
    'E = mc² + ∞',
    'Σ anomaly = 42',
    'ψ = Σiαiφi(x)',
    '∇ × F = 0',
    '∫ curiosity dt',
  ],
};
