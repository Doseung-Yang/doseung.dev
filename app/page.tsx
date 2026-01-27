import { Suspense } from 'react';
import HeroSection from './_components/HeroSection';
import SkillsSection from './_components/SkillsSection';
import RecentPostsSlider from './_components/RecentPostsSlider';
import { getPosts } from './api/lib/notion';

function SliderSkeleton() {
  return (
    <div className="w-full animate-pulse">
      <div className="flex items-center justify-between mb-8">
        <div>
          <div className="h-3 w-16 bg-muted rounded mb-2" />
          <div className="h-8 w-40 bg-muted rounded" />
        </div>
        <div className="h-4 w-20 bg-muted rounded" />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[1, 2, 3].map(i => (
          <div key={i} className="h-[320px] bg-muted rounded-2xl" />
        ))}
      </div>
    </div>
  );
}

async function RecentContent() {
  const { posts } = await getPosts({ pageSize: 6 });

  if (posts.length === 0) {
    return null;
  }

  return (
    <section className="w-full py-20 sm:py-24">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <RecentPostsSlider posts={posts} />
      </div>
    </section>
  );
}

export default function HomePage() {
  return (
    <main className="flex flex-col min-h-screen">
      <HeroSection />

      <Suspense
        fallback={
          <section className="w-full py-20 sm:py-24">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
              <SliderSkeleton />
            </div>
          </section>
        }
      >
        <RecentContent />
      </Suspense>

      <section className="w-full py-16 sm:py-20 bg-gradient-to-b from-transparent via-accent/30 to-transparent">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <SkillsSection />
        </div>
      </section>
    </main>
  );
}
