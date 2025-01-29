import type { Metadata } from 'next';
import './globals.css';
import Header from './components/Header';
import Footer from './components/Footer';

export const metadata: Metadata = {
  title: '양도승 | 웹 개발자 & 포트폴리오',
  description: '웹 개발자 양도승의 포트폴리오. 프론트엔드 및 풀스택 개발에 대한 경험과 프로젝트 소개.',
  keywords: ['양도승', '웹 개발자', '포트폴리오', '프론트엔드', '풀스택 개발자'],
  authors: [{ name: '양도승', url: 'https://do-seung.com' }],
  creator: '양도승',
  icons: {
    icon: '/DS.png',
  },
  openGraph: {
    title: '개발자 도승',
    description: '개발자 양도승',
    url: 'https://do-seung.com',
    siteName: '개발자 도승',
    images: [
      {
        url: '/DS.png',
        width: 1200,
        height: 630,
        alt: '양도승 블로그',
      },
    ],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: '개발자 도승',
    description: '개발자 양도승',
    images: ['/DS.png'],
  },
  robots: 'index, follow',
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="ko">
      <head>
        <link rel="icon" href="/DS.png" sizes="32x32" type="image/png" />
        <meta property="og:image" content="/DS.png" />
        <meta name="twitter:image" content="/DS.png" />
        <meta name="google-site-verification" content="YOUR_GOOGLE_SITE_VERIFICATION_CODE" />
      </head>
      <body className="bg-background text-foreground">
        <Header />
        <main className="container mx-auto px-4 py-8">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
