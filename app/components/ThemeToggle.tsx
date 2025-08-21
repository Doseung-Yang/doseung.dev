'use client';

import { useEffect, useState } from 'react';
import { useTheme } from 'next-themes';

export default function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const isDark = resolvedTheme === 'dark';

  return (
    <button
      type="button"
      aria-label="Toggle theme"
      className="inline-flex items-center justify-center rounded-md border border-border bg-card text-foreground hover:bg-accent hover:text-accent-foreground transition-colors h-9 w-9"
      onClick={() => setTheme(isDark ? 'light' : 'dark')}
      {...(isDark ? { title: '라이트 모드로 전환' } : { title: '다크모드로 전환' })}
    >
      {isDark ? (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor">
          <path d="M6.76 4.84l-1.8-1.79-1.41 1.41 1.79 1.8 1.42-1.42zM1 13h3v-2H1v2zm10 10h2v-3h-2v3zm9-10v-2h-3v2h3zm-2.35 7.95l1.41-1.41-1.79-1.8-1.41 1.42 1.79 1.79zM13 1h-2v3h2V1zm4.24 3.05l1.79-1.8-1.41-1.41-1.8 1.79 1.42 1.42zM12 6a6 6 0 100 12A6 6 0 0012 6z" />
        </svg>
      ) : (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor">
          <path d="M21.64 13a9 9 0 01-11.31-11A9 9 0 1021.64 13z" />
        </svg>
      )}
    </button>
  );
}
