import TypingEffect from './TypingEffect';
import Image from 'next/image';
import { motion } from 'framer-motion';

export default function HeroSection() {
  return (
    <div className="flex flex-col items-center text-center gap-4 mb-6">
      <div className="w-32 h-32 sm:w-40 sm:h-40 rounded-full overflow-hidden border-4 border-border">
        <Image src="/my.jpg" alt="프로필 사진" width={160} height={160} className="object-cover w-full h-full" />
      </div>

      <div className="flex flex-col justify-center items-center">
        <h1 className="text-3xl font-bold text-foreground">안녕하세요</h1>
        <p className="text-muted-foreground mt-2">웹 개발자 양도승입니다.</p>

        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mt-4 min-h-[80px]"
        >
          <TypingEffect
            text={[
              '속도보다 안정성을',
              '사용자의 경험을',
              '유저와 접점을 통해 더 좋은 프로덕트를',
              '프로덕트 엔지니어로 기여하고 싶습니다.',
            ]}
            speed={100}
            pause={1500}
          />
        </motion.div>
      </div>
    </div>
  );
}
