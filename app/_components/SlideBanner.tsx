'use client';

import Image from 'next/image';

export default function SlideBanner() {
  return (
    <div className="w-full h-[380px]">
      <Image
        src="/DS_banner.png"
        alt="양도승 기술 블로그 배너"
        width={3840}
        height={766}
        className="w-full h-full object-cover"
        priority
      />
    </div>
  );
}
