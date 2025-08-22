import Image from 'next/image';

export default function AboutPage() {
  return (
    <div className="container mx-auto px-4 py-8 min-h-screen">
      <div className="flex flex-col items-center text-center">
        <div className="w-32 h-32 sm:w-40 sm:h-40 rounded-full overflow-hidden border-4 border-border">
          <Image src="/my.jpg" alt="프로필 사진" width={160} height={160} className="object-cover w-full h-full" />
        </div>

        <div className="flex flex-col justify-center items-center mt-4">
          <h1 className="text-3xl font-bold text-foreground">안녕하세요</h1>
          <p className="text-muted-foreground mt-2">웹 개발자 양도승입니다.</p>
        </div>
      </div>
    </div>
  );
}
