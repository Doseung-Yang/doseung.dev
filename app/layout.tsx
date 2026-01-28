import type { Metadata } from 'next';
import './globals.css';
import Header from './components/Header';
import Footer from './components/Footer';
import { ThemeProvider } from './util/theme-provider';
import { SITE_URL, SITE_TITLE, SITE_DESCRIPTION, SITE_KEYWORDS } from './constants/site';

export const metadata: Metadata = {
  title: SITE_TITLE,
  description: SITE_DESCRIPTION,
  keywords: [...SITE_KEYWORDS],
  authors: [{ name: '양도승', url: SITE_URL }],
  creator: '양도승',
  publisher: '양도승',
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon.ico',
    apple: '/DS.png',
  },
  openGraph: {
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    url: SITE_URL,
    siteName: SITE_TITLE,
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
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    images: ['/DS.png'],
  },
  robots: 'index, follow',
  metadataBase: new URL(SITE_URL),
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="ko" suppressHydrationWarning>
      <head>
        <meta name="naver-site-verification" content="85aa45c91ab7900ee949467cdf8ec36f42e79d36" />
        <link rel="icon" href="/favicon.ico" sizes="32x32" type="image/png" />
        <link rel="apple-touch-icon" href="/DS.png" />
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
              '@graph': [
                {
                  '@type': 'Organization',
                  '@id': `${SITE_URL}/#organization`,
                  name: '양도승',
                  url: SITE_URL,
                  logo: `${SITE_URL}/DS.png`,
                },
                {
                  '@type': 'Person',
                  '@id': `${SITE_URL}/#person`,
                  name: '양도승',
                  alternateName: '도승',
                  url: SITE_URL,
                  sameAs: [
                    'https://github.com/Doseung-Yang',
                    'https://x.com/DoseungYang',
                  ],
                },
                {
                  '@type': 'WebSite',
                  '@id': `${SITE_URL}/#website`,
                  url: SITE_URL,
                  name: '양도승 블로그',
                  alternateName: '도승 블로그',
                  description: SITE_DESCRIPTION,
                  publisher: { '@id': `${SITE_URL}/#organization` },
                },
              ],
            }).replace(/</g, '\\u003c'),
          }}
        />
      </body>
    </html>
  );
}
