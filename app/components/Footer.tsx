import Link from 'next/link';
import { GitHub, Twitter, ExternalLink } from '@/components/icons';

const footerLinks = {
  navigation: [
    { href: '/blog', label: '블로그' },
    { href: '/post', label: '방명록' },
  ],
  external: [
    { href: 'https://note.do-seung.com', label: '메모장' },
    { href: 'https://book.do-seung.com', label: '도북' },
    { href: 'https://github.com/Doseung-Yang', label: 'GitHub' },
  ],
};

const socialLinks = [
  {
    name: 'GitHub',
    href: 'https://github.com/Doseung-Yang',
    icon: <GitHub className="w-5 h-5" />,
  },
  {
    name: 'X (Twitter)',
    href: 'https://x.com/DoseungYang',
    icon: <Twitter className="w-5 h-5" />,
  },
];

export default function Footer() {
  return (
    <footer className="relative mt-auto border-t border-border bg-card/50">
      <div className="absolute inset-0 bg-gradient-to-t from-primary/5 to-transparent pointer-events-none" />

      <div className="relative container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="md:col-span-2">
            <Link href="/" className="inline-flex items-center gap-2 group">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-purple-600 flex items-center justify-center text-white font-bold text-sm shadow-lg shadow-primary/25">
                DS
              </div>
              <span className="text-lg font-bold text-foreground">도승</span>
            </Link>
            <p className="mt-4 text-sm text-muted-foreground max-w-md leading-relaxed">
              안녕하세요 웹 개발자 양도승입니다. <br />
              새로운 지식을 배우고 공유하는 것을 좋아합니다.
            </p>
            <div className="flex items-center gap-3 mt-6">
              {socialLinks.map(social => (
                <a
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2.5 rounded-xl bg-accent hover:bg-primary hover:text-white transition-all duration-300 hover:scale-110 hover:shadow-lg hover:shadow-primary/25"
                  aria-label={social.name}
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-foreground mb-4">탐색</h3>
            <ul className="space-y-3">
              {footerLinks.navigation.map(link => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground hover:text-primary transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-foreground mb-4">외부 링크</h3>
            <ul className="space-y-3">
              {footerLinks.external.map(link => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-primary transition-colors"
                  >
                    {link.label}
                    <ExternalLink className="w-3 h-3 opacity-50" />
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-border">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-sm text-muted-foreground">
              © {new Date().getFullYear()} Doseung Yang. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
