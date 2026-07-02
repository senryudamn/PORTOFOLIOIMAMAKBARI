import { useState, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';

interface CryptogramTextProps {
  text: string;
  className?: string;
  delay?: number;
}

const cipherMap: Record<string, string> = {
  'A': 'X', 'B': 'Y', 'C': 'Z', 'D': 'A', 'E': 'B', 'F': 'C',
  'G': 'D', 'H': 'E', 'I': 'F', 'J': 'G', 'K': 'H', 'L': 'I',
  'M': 'J', 'N': 'K', 'O': 'L', 'P': 'M', 'Q': 'N', 'R': 'O',
  'S': 'P', 'T': 'Q', 'U': 'R', 'V': 'S', 'W': 'T', 'X': 'U',
  'Y': 'V', 'Z': 'W',
};

export default function CryptogramText({ text, className = '', delay = 0 }: CryptogramTextProps) {
  const [displayText, setDisplayText] = useState(text);
  const [isHovered, setIsHovered] = useState(false);
  const [isDecoding, setIsDecoding] = useState(false);

  const generateCipher = useCallback((original: string) => {
    return original
      .toUpperCase()
      .split('')
      .map((char) => {
        if (cipherMap[char]) {
          return cipherMap[char];
        }
        if (char === ' ') return ' ';
        return char;
      })
      .join('');
  }, []);

  const scrambleText = useCallback(() => {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%&*!?';
    return text
      .split('')
      .map((char) => {
        if (char === ' ') return ' ';
        if (/[A-Za-z]/.test(char)) {
          return chars[Math.floor(Math.random() * chars.length)];
        }
        return char;
      })
      .join('');
  }, [text]);

  useEffect(() => {
    if (isHovered && !isDecoding) {
      setIsDecoding(true);

      // Scramble animation
      const scrambleInterval = setInterval(() => {
        setDisplayText(scrambleText());
      }, 50);

      // After scramble, reveal real text
      const revealTimeout = setTimeout(() => {
        clearInterval(scrambleInterval);

        // Reveal character by character
        let currentIndex = 0;
        const revealInterval = setInterval(() => {
          currentIndex++;
          const revealed = text.substring(0, currentIndex);
          const scrambled = scrambleText().substring(currentIndex);
          setDisplayText(revealed + scrambled);

          if (currentIndex >= text.length) {
            clearInterval(revealInterval);
            setDisplayText(text);
            setIsDecoding(false);
          }
        }, 30);

        return () => clearInterval(revealInterval);
      }, 400 + delay);

      return () => {
        clearInterval(scrambleInterval);
        clearTimeout(revealTimeout);
      };
    } else if (!isHovered) {
      setDisplayText(generateCipher(text));
      setIsDecoding(false);
    }
  }, [isHovered, text, delay, generateCipher, scrambleText]);

  useEffect(() => {
    // Initialize with cipher text
    setDisplayText(generateCipher(text));
  }, [text, generateCipher]);

  return (
    <motion.span
      className={`cursor-pointer font-mono tracking-wider transition-colors ${className}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      animate={{
        textShadow: isHovered ? '0 0 8px rgba(0,255,255,0.5)' : 'none',
      }}
      style={{
        color: isHovered ? '#00FFFF' : 'inherit',
      }}
    >
      {displayText}
    </motion.span>
  );
}
