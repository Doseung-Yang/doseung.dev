import TypingEffect from './TypingEffect';
import Image from 'next/image';
import { motion } from 'framer-motion';
import SlideBanner from './SlideBanner';

export default function HeroSection() {
  return (
    <div className="flex flex-col gap-6 mb-6">
      <SlideBanner />
    </div>
  );
}
