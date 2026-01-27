import type { Metadata } from 'next';
import './globals.css';
import Header from './components/Header';
import Footer from './components/Footer';
import { ThemeProvider } from './util/theme-provider';

export const metadata: Metadata = {
  title: '개발자 도승',
  description: '개발자 양도승 기술 블로그',
  authors: [{ name: '양도승', url: 'https://do-seung.com' }],
  creator: '양도승',
  publisher: '양도승',
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon.ico',
    apple: '/DS.png',
  },
  openGraph: {
    title: '개발자 도승',
    description: '개발자 양도승 기술 블로그',
    url: 'https://do-seung.com',
    siteName: '개발자 도승',
    images: [
      {
        url: '/DS.png',
        width: 1200,
        height: 630,
        alt: '개발자 도승 블로그 로고',
      },
    ],
    type: 'website',
    locale: 'ko_KR',
  },
  twitter: {
    card: 'summary_large_image',
    title: '개발자 도승',
    description: '개발자 양도승 기술 블로그.',
    images: ['/DS.png'],
  },
  robots: 'index, follow',
  metadataBase: new URL('https://do-seung.com'),
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="ko" suppressHydrationWarning>
      <head>
        <meta name="naver-site-verification" content="85aa45c91ab7900ee949467cdf8ec36f42e79d36" />
        <link rel="icon" href="/favicon.ico" sizes="32x32" type="image/png" />
        <link rel="apple-touch-icon" href="/DS.png" />
        <meta property="og:image" content="/DS.png" />
        <meta name="twitter:image" content="/DS.png" />
        <meta name="google-site-verification" content="EPVuKhsslwvvX5ZfwzlyIxMqrdlf6-_7qUGaVmmNhy0" />
      </head>
      <body className="bg-background text-foreground">
        <ThemeProvider>
          <Header />
          <main>{children}</main>
          <Footer />
        </ThemeProvider>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'Organization',
              name: '양도승',
              url: 'https://do-seung.com',
              logo: 'https://do-seung.com/DS.png',
            }).replace(/</g, '\\u003c'),
          }}
        />
      </body>
    </html>
  );
}
