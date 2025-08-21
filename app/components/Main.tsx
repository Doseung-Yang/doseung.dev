'use client';

import HeroSection from '../_components/HeroSection';
import SkillsSection from '../_components/SkillsSection';

export default function MainContent() {
  return (
    <main className="flex flex-col items-center justify-center min-h-screen text-foreground p-6">
      <HeroSection />
      <SkillsSection />
    </main>
  );
}
