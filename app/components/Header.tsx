import Link from 'next/link';

export default function Header() {
  return (
    <header className="sticky top-0 z-10 bg-card shadow-sm border-b border-border">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link href="/" className="text-xl font-bold text-foreground">
          도승
        </Link>

        <nav className="flex items-center space-x-6">
          <Link href="/blog" className="text-foreground hover:text-primary">
            블로그
          </Link>
          <div className="text-foreground hover:text-primary">포트폴리오</div>
          <div className="text-foreground hover:text-primary">소개</div>
        </nav>
      </div>
    </header>
  );
}
