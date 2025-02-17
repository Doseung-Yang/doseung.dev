'use client';

import HeroSection from '../_components/HeroSection';
import SkillsSection from '../_components/SkillsSection';
import CTASection from '../_components/CTASection';

interface MainContentProps {
  children?: React.ReactNode;
}

export default function MainContent({ children }: MainContentProps) {
  return (
    <main className="flex flex-col items-center justify-center min-h-screen text-black p-6">
      <HeroSection />
      {children}
      <SkillsSection />
      <CTASection />
    </main>
  );
}
