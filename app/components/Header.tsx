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
              방명록
            </Link>
            <a
              href="https://note.do-seung.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-foreground hover:text-primary"
            >
              노트
            </a>
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
