'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';

interface Post {
  id: string;
  title: string;
  description: string;
  content?: string;
  createdAt?: string;
  updatedAt?: string;
}

interface RecentPostsSliderProps {
  posts: Post[];
}

export default function RecentPostsSlider({ posts }: RecentPostsSliderProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  useEffect(() => {
    if (!isAutoPlaying || posts.length <= 1) return;

    const interval = setInterval(() => {
      setCurrentIndex(prev => (prev + 1) % posts.length);
    }, 4000);

    return () => clearInterval(interval);
  }, [isAutoPlaying, posts.length]);

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 3000);
  };

  const goToNext = () => {
    setCurrentIndex(prev => (prev + 1) % posts.length);
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 3000);
  };

  const goToPrev = () => {
    setCurrentIndex(prev => (prev - 1 + posts.length) % posts.length);
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 3000);
  };

  if (!posts || posts.length === 0) {
    return null;
  }

  return (
    <div className="w-full max-w-3xl mx-auto px-4">
      <div className="mb-4">
        <h2 className="text-lg sm:text-xl font-bold text-foreground mb-1">최근 작성된 글</h2>
        <p className="text-xs text-muted-foreground">새롭게 업로드된 개발 이야기를 확인해보세요</p>
      </div>

      <div className="relative">
        <div className="relative h-[200px] sm:h-[240px] overflow-hidden rounded-xl bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800 border border-slate-200 dark:border-slate-700">
          <Link href={`/post/${posts[currentIndex].id}`}>
            <AnimatePresence mode="wait">
              <motion.div
                key={currentIndex}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5, ease: 'easeOut' }}
                className="absolute inset-0 p-4 flex flex-col justify-between"
              >
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-1.5 h-1.5 bg-blue-500 rounded-full animate-pulse"></div>
                    <span className="text-xs text-muted-foreground font-medium">최신 포스트</span>
                  </div>

                  <h3 className="text-base sm:text-lg font-bold text-foreground mb-2 leading-tight line-clamp-2">
                    {posts[currentIndex].title}
                  </h3>

                  <p className="text-muted-foreground text-xs leading-relaxed mb-3 line-clamp-3">
                    {posts[currentIndex].description ||
                      (posts[currentIndex].content
                        ? posts[currentIndex].content
                            .replace(/<[^>]+>/g, ' ')
                            .trim()
                            .substring(0, 200) + '...'
                        : '...')}
                  </p>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    {posts[currentIndex].createdAt && (
                      <time className="text-xs text-muted-foreground">
                        {new Date(posts[currentIndex].createdAt).toLocaleDateString('ko-KR', {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric',
                        })}
                      </time>
                    )}
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </Link>

          {posts.length > 1 && (
            <>
              <button
                onClick={goToPrev}
                className="absolute left-2 top-1/2 -translate-y-1/2 w-6 h-6 bg-white/80 hover:bg-white dark:bg-slate-800/80 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300 rounded-full backdrop-blur-sm transition-all duration-200 hover:scale-110 shadow-lg"
                aria-label="이전 포스트"
              >
                <svg className="w-3 h-3 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>

              <button
                onClick={goToNext}
                className="absolute right-2 top-1/2 -translate-y-1/2 w-6 h-6 bg-white/80 hover:bg-white dark:bg-slate-800/80 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300 rounded-full backdrop-blur-sm transition-all duration-200 hover:scale-110 shadow-lg"
                aria-label="다음 포스트"
              >
                <svg className="w-3 h-3 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
