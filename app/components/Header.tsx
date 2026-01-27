'use client';

import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import ThemeToggle from './ThemeToggle';
import { ExternalLink, Menu, ChevronDown } from '@/components/icons';

type NavLink = {
  href: string;
  label: string;
  external?: boolean;
};

type DropdownLink = {
  label: string;
  dropdown: true;
  items: { href: string; label: string }[];
};

type NavItem = NavLink | DropdownLink;

const navLinks: NavItem[] = [
  { href: '/blog', label: '블로그' },
  { href: '/post', label: '방명록' },
  {
    label: '사이드 프로젝트',
    dropdown: true,
    items: [
      { href: 'https://note.do-seung.com', label: '메모장' },
      { href: 'https://book.do-seung.com', label: '도북' },
    ],
  },
];

function DropdownMenu({ item, isMobile = false }: { item: DropdownLink; isMobile?: boolean }) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleMouseEnter = () => {
    if (isMobile) return;
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setIsOpen(true);
  };

  const handleMouseLeave = () => {
    if (isMobile) return;
    timeoutRef.current = setTimeout(() => setIsOpen(false), 150);
  };

  return (
    <div
      ref={dropdownRef}
      className={isMobile ? 'w-full' : 'relative'}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`w-full px-4 py-2 text-sm font-medium transition-colors rounded-lg flex items-center justify-between ${
          isOpen
            ? 'text-primary bg-primary/10'
            : 'text-muted-foreground hover:text-foreground hover:bg-accent'
        }`}
      >
        <span>{item.label}</span>
        <ChevronDown
          className={`w-3.5 h-3.5 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
        />
      </button>

      <div
        className={`${
          isMobile
            ? 'w-full mt-1'
            : 'absolute top-full left-0 mt-2 min-w-[180px]'
        } py-2 bg-background/95 backdrop-blur-xl border border-border rounded-xl shadow-xl transition-all duration-200 origin-top ${
          isOpen
            ? 'opacity-100 scale-100 translate-y-0'
            : 'opacity-0 scale-95 -translate-y-2 pointer-events-none max-h-0 overflow-hidden'
        }`}
      >
        {item.items.map((subItem, idx) => (
          <a
            key={idx}
            href={subItem.href}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-between px-4 py-2.5 text-sm text-muted-foreground hover:text-foreground hover:bg-accent transition-colors"
          >
            <span>{subItem.label}</span>
            <ExternalLink className="w-3.5 h-3.5 opacity-50" />
          </a>
        ))}
      </div>
    </div>
  );
}

export default function Header() {
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const mobileMenuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (mobileMenuRef.current && !mobileMenuRef.current.contains(event.target as Node)) {
        setIsMobileMenuOpen(false);
      }
    }

    if (isMobileMenuOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.body.style.overflow = '';
    };
  }, [isMobileMenuOpen]);

  const handleLinkClick = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-50 w-full" ref={mobileMenuRef}>
      <div className="absolute inset-0 bg-background/60 backdrop-blur-xl border-b border-border/40" />
      <div className="relative container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <Link href="/" className="flex items-center gap-2 group" onClick={handleLinkClick}>
            <div className="relative">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-purple-600 flex items-center justify-center text-white font-bold text-sm shadow-lg shadow-primary/25">
                DS
              </div>
            </div>
            <span className="text-lg font-bold text-foreground group-hover:text-primary transition-colors">
              DoSeung
            </span>
          </Link>

          <nav className="hidden sm:flex items-center gap-1">
            {navLinks.map((item, idx) => {
              if ('dropdown' in item) {
                return <DropdownMenu key={idx} item={item} />;
              }

              if (item.external) {
                return (
                  <a
                    key={item.href}
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="relative px-4 py-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors rounded-lg hover:bg-accent"
                  >
                    {item.label}
                    <ExternalLink className="inline-block w-3 h-3 ml-1 opacity-50" />
                  </a>
                );
              }

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`relative px-4 py-2 text-sm font-medium transition-colors rounded-lg ${
                    pathname === item.href || pathname.startsWith(item.href + '/')
                      ? 'text-primary bg-primary/10'
                      : 'text-muted-foreground hover:text-foreground hover:bg-accent'
                  }`}
                >
                  {item.label}
                  {(pathname === item.href || pathname.startsWith(item.href + '/')) && (
                    <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-primary" />
                  )}
                </Link>
              );
            })}
          </nav>

          <div className="flex items-center gap-2">
            <ThemeToggle />
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="sm:hidden p-2 rounded-lg hover:bg-accent transition-colors"
              aria-label="메뉴 토글"
            >
              <Menu className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <div
          className={`sm:hidden overflow-hidden transition-all duration-300 ease-in-out ${
            isMobileMenuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
          }`}
        >
          <nav className="py-4 space-y-2 border-t border-border/40">
            {navLinks.map((item, idx) => {
              if ('dropdown' in item) {
                return <DropdownMenu key={idx} item={item} isMobile={true} />;
              }

              if (item.external) {
                return (
                  <a
                    key={item.href}
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={handleLinkClick}
                    className="flex items-center justify-between px-4 py-2 text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-accent transition-colors rounded-lg"
                  >
                    <span>{item.label}</span>
                    <ExternalLink className="w-3.5 h-3.5 opacity-50" />
                  </a>
                );
              }

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={handleLinkClick}
                  className={`block px-4 py-2 text-sm font-medium transition-colors rounded-lg ${
                    pathname === item.href || pathname.startsWith(item.href + '/')
                      ? 'text-primary bg-primary/10'
                      : 'text-muted-foreground hover:text-foreground hover:bg-accent'
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>
        </div>
      </div>
    </header>
  );
}
