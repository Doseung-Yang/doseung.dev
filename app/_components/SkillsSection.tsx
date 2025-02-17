'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { skills } from '../constants';
import SkillIcon from './SkillIcon';

export default function SkillsSection() {
  const [showContent, setShowContent] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setShowContent(true), 3000);
    return () => clearTimeout(timer);
  }, []);

  if (!showContent) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1 }}
      className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-6"
    >
      {skills.map(({ icon, label }) => (
        <SkillIcon key={label} icon={icon} label={label} />
      ))}
    </motion.div>
  );
}
