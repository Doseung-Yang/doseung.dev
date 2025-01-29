'use client';

import { useState, useEffect } from 'react';

interface TypingEffectProps {
  text: string[];
  speed?: number;
  pause?: number;
}

export default function TypingEffect({ text, speed = 100, pause = 2000 }: TypingEffectProps) {
  const [currentText, setCurrentText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const handleTyping = () => {
      const currentString = text[currentIndex];
      const isComplete = currentText === currentString;

      if (isDeleting) {
        setCurrentText(prev => prev.slice(0, -1));
      } else if (!isComplete) {
        setCurrentText(prev => currentString.slice(0, prev.length + 1));
      }

      if (isComplete && !isDeleting) {
        setTimeout(() => setIsDeleting(true), pause);
      } else if (isDeleting && currentText === '') {
        setIsDeleting(false);
        setCurrentIndex(prev => (prev + 1) % text.length);
      }
    };

    const timer = setTimeout(handleTyping, isDeleting ? speed / 2 : speed);
    return () => clearTimeout(timer);
  }, [currentText, isDeleting, currentIndex, text, speed, pause]);

  return (
    <div className="text-4xl font-bold text-center text-black">
      {currentText}
      <span className="blinking-cursor">|</span>
    </div>
  );
}
