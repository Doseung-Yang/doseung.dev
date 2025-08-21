import { motion } from 'framer-motion';
import { ctaButtons } from '../constants';
import CTAButton from './CTAButton';

export default function CTASection() {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 1 }}
      className="mt-12 flex flex-wrap gap-4 justify-center"
    >
      {ctaButtons.map(({ href, text }) => (
        <CTAButton key={text} href={href} text={text} />
      ))}
    </motion.div>
  );
}
