import TypingEffect from './TypingEffect';
import Image from 'next/image';
import { motion } from 'framer-motion';

export default function HeroSection() {
  return (
    <div className="flex flex-col items-center text-center gap-4 mb-6">
      <div className="w-32 h-32 sm:w-40 sm:h-40 rounded-full overflow-hidden border-4 border-gray-300">
        <Image src="/my.jpg" alt="프로필 사진" width={160} height={160} className="object-cover w-full h-full" />
      </div>

      <div className="flex flex-col justify-center items-center">
        <h1 className="text-3xl font-bold text-gray-900">안녕하세요</h1>
        <p className="text-gray-600 mt-2">웹 개발자 양도승입니다.</p>

        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mt-4 min-h-[80px]"
        >
          <TypingEffect
            text={[
              '와디즈 FE 개발 및 유지보수',
              'Next.js & TypeScript 전문가',
              'SEO 최적화 (트래픽 160% 증가)',
              'AI 챗봇 Deep Learning 연동',
            ]}
            speed={100}
            pause={1500}
          />
        </motion.div>
      </div>
    </div>
  );
}
