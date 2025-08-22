import Link from 'next/link';
import ThemeToggle from './ThemeToggle';

export default function Header() {
  return (
    <header className="sticky top-0 z-10 bg-background/80 backdrop-blur supports-[backdrop-filter]:backdrop-blur shadow-sm border-b border-border">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link href="/" className="text-xl font-bold text-foreground">
          도승
        </Link>

        <div className="flex items-center gap-4">
          <nav className="flex items-center space-x-6">
            <Link href="/blog" className="text-foreground hover:text-primary">
              블로그
            </Link>
            <div className="text-foreground hover:text-primary">포트폴리오</div>
            <Link href="/about" className="text-foreground hover:text-primary">
              소개
            </Link>
          </nav>
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}
