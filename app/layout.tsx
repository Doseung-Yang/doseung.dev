import type { Metadata } from 'next';

import './globals.css';
import Header from './components/Header';
import Footer from './components/Footer';
export const metadata: Metadata = {
  title: '도승 블로그',
  description: '웹 개발자 양도승',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body className="bg-background text-foreground">
        <Header />
        <main className="container mx-auto px-4 py-8">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
