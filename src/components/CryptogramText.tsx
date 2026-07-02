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

const randomChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ@#$%&*!?0123456789';

export default function CryptogramText({ text, className = '', delay = 0 }: CryptogramTextProps) {
  const [displayText, setDisplayText] = useState('');
  const [isHovered, setIsHovered] = useState(false);
  const [isDecoding, setIsDecoding] = useState(false);

  const generateCipher = useCallback((original: string) => {
    return original
      .toUpperCase()
      .split('')
      .map((char) => {
        if (cipherMap[char]) return cipherMap[char];
        if (char === ' ') return ' ';
        return char;
      })
      .join('');
  }, []);

  const getRandomChar = () => randomChars[Math.floor(Math.random() * randomChars.length)];

  const generateRandomText = useCallback(() => {
    return text
      .split('')
      .map((char) => {
        if (char === ' ') return ' ';
        if (/[A-Za-z]/.test(char)) return getRandomChar();
        return char;
      })
      .join('');
  }, [text]);

  useEffect(() => {
    // Initialize with cipher text
    setDisplayText(generateCipher(text));
  }, [text, generateCipher]);

  useEffect(() => {
    if (!isHovered) {
      // Return to cipher text quickly
      if (isDecoding) {
        // Quick fade back to cipher
        const interval = setInterval(() => {
          setDisplayText((prev: string) => {
            // Gradually return to cipher
            let result = '';
            for (let i = 0; i < text.length; i++) {
              const cipherChar = generateCipher(text[i]);
              if (Math.random() > 0.3) {
                result += cipherChar;
              } else {
                result += prev[i] || cipherChar;
              }
            }
            return result;
          });
        }, 50);

        setTimeout(() => {
          clearInterval(interval);
          setDisplayText(generateCipher(text));
          setIsDecoding(false);
        }, 300);

        return () => clearInterval(interval);
      } else {
        setDisplayText(generateCipher(text));
      }
      return;
    }

    // Start decoding!
    setIsDecoding(true);

    // Phase 1: Slot machine scramble (rapid random characters)
    const scrambleInterval = setInterval(() => {
      setDisplayText(generateRandomText());
    }, 40);

    // Phase 2: After scrambling, reveal character by character
    const revealTimeout = setTimeout(() => {
      clearInterval(scrambleInterval);

      let currentIndex = 0;
      const revealInterval = setInterval(() => {
        currentIndex++;

        // Build the revealed portion plus scrambled remaining
        const revealed = text.substring(0, currentIndex);
        const remainingScrambled = generateRandomText().substring(currentIndex);

        setDisplayText(revealed + remainingScrambled);

        if (currentIndex >= text.length) {
          clearInterval(revealInterval);
          setDisplayText(text);
        }
      }, 35);
    }, 500 + delay);

    return () => {
      clearInterval(scrambleInterval);
      clearTimeout(revealTimeout);
    };
  }, [isHovered, text, delay, generateCipher, generateRandomText]);

  return (
    <motion.span
      className={`cursor-pointer font-mono tracking-wider ${className}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      animate={{
        textShadow: isHovered ? '0 0 12px rgba(0,255,255,0.6)' : 'none',
      }}
      style={{
        color: isHovered ? '#00FFFF' : 'inherit',
        transition: 'color 0.3s',
      }}
    >
      {displayText.split('').map((char, index) => (
        <motion.span
          key={index}
          animate={{
            opacity: [1, 0.7, 1],
            y: isHovered && isDecoding ? [0, Math.random() * 2 - 1, 0] : 0,
          }}
          transition={{
            duration: 0.15,
            repeat: isHovered ? Infinity : 0,
            repeatType: 'reverse',
          }}
          style={{ display: 'inline-block' }}
        >
          {char}
        </motion.span>
      ))}
    </motion.span>
  );
}
