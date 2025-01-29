import type { Metadata } from 'next';
import './globals.css';
import Header from './components/Header';
import Footer from './components/Footer';

export const metadata: Metadata = {
  title: '양도승 | 웹 개발자 & 포트폴리오',
  description: '웹 개발자 양도승의 포트폴리오. 프론트엔드 및 풀스택 개발에 대한 경험과 프로젝트 소개.',
  keywords: ['양도승', '웹 개발자', '포트폴리오', '프론트엔드', '풀스택 개발자'],
  authors: [{ name: '양도승', url: 'do-seung.com' }],
  creator: '양도승',
  openGraph: {
    title: '양도승 | 웹 개발자 포트폴리오',
    description: '웹 개발자 양도승의 포트폴리오와 프로젝트를 소개합니다.',
    url: 'do-seung.com',
    siteName: '양도승 포트폴리오',
    images: [
      {
        url: 'do-seung.com/og-image.png',
        width: 1200,
        height: 630,
        alt: '양도승 포트폴리오',
      },
    ],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: '양도승 | 웹 개발자 포트폴리오',
    description: '웹 개발자 양도승의 프로젝트와 경험을 확인하세요.',
    images: ['do-seung.com/og-image.png'],
  },
  robots: 'index, follow',
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="ko">
      <head>
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
