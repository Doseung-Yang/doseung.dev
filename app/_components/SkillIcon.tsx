'use client';

import { ElementType } from 'react';

interface SkillIconProps {
  icon: ElementType;
  label: string;
}

const skillColors: Record<string, string> = {
  React: 'from-cyan-400 to-cyan-600',
  'Next.js': 'from-gray-700 to-gray-900 dark:from-gray-200 dark:to-gray-400',
  'Tailwind CSS': 'from-teal-400 to-teal-600',
  TypeScript: 'from-blue-500 to-blue-700',
  'Node.js': 'from-green-500 to-green-700',
  AWS: 'from-orange-400 to-orange-600',
  Python: 'from-yellow-400 to-blue-500',
  'SQL / MySQL': 'from-blue-400 to-indigo-600',
};

export default function SkillIcon({ icon: Icon, label }: SkillIconProps) {
  const gradientClass = skillColors[label] || 'from-primary to-purple-600';

  return (
    <div className="group relative p-6 rounded-2xl bg-card border border-border hover:border-primary/50 transition-all duration-300 hover:shadow-lg hover:shadow-primary/5 cursor-default">
      <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

      <div className="relative flex flex-col items-center gap-3">
        <div className={`p-3 rounded-xl bg-gradient-to-br ${gradientClass} shadow-lg`}>
          <Icon className="text-white text-2xl sm:text-3xl" />
        </div>

        <span className="text-sm font-medium text-foreground text-center">
          {label}
        </span>
      </div>
    </div>
  );
}
