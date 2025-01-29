import TypingEffect from '../_components/TypingEffect';
import { ReactNode } from 'react';

interface MainContentProps {
  children?: ReactNode;
}

export default function MainContent({ children }: MainContentProps) {
  return (
    <main className="flex flex-col items-center justify-center h-screen text-black">
      <TypingEffect
        text={['안녕하세요!', '도승의 포트폴리오입니다.', '멋진 프로젝트를 구경하세요!']}
        speed={100}
        pause={1500}
      />
      {children}
    </main>
  );
}
