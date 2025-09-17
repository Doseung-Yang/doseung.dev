'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface Comment {
  id?: string;
  author?: string;
  content: string;
  createdAt?: string;
  postId?: string;
}

interface RecentCommentsSliderProps {
  comments: Comment[];
}

export default function RecentCommentsSlider({ comments }: RecentCommentsSliderProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  useEffect(() => {
    if (!isAutoPlaying || comments.length <= 1) return;

    const interval = setInterval(() => {
      setCurrentIndex(prev => (prev + 1) % comments.length);
    }, 3000);

    return () => clearInterval(interval);
  }, [isAutoPlaying, comments.length]);

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 3000);
  };

  if (!comments || comments.length === 0) {
    return null;
  }

  return (
    <div className="w-full max-w-3xl mx-auto px-4">
      <div className="mb-4">
        <h2 className="text-lg sm:text-xl font-bold text-foreground mb-1">최근 작성된 댓글</h2>
        <p className="text-xs text-muted-foreground">최근 작성된 댓글을 구경해보세요</p>
      </div>

      <div className="relative">
        <div className="relative h-[100px] sm:h-[100px] overflow-hidden rounded-xl bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800 border border-slate-200 dark:border-slate-700">
          <AnimatePresence mode="sync">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -30 }}
              transition={{ duration: 0.6, ease: 'easeInOut' }}
              className="absolute inset-0 p-4 flex flex-col justify-between"
            >
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-1.5 h-1.5 bg-blue-500 rounded-full animate-pulse"></div>
                  <span className="text-xs text-muted-foreground font-medium">최신 댓글</span>
                </div>

                <div className="mb-3">
                  <p className="text-muted-foreground text-xs leading-relaxed line-clamp-3 mb-2">
                    작성자 : {comments[currentIndex].author || '익명'}
                  </p>
                  <p className="text-xs">내용 : {comments[currentIndex].content}</p>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  {comments[currentIndex].createdAt && (
                    <time className="text-xs text-muted-foreground">
                      {new Date(comments[currentIndex].createdAt).toLocaleDateString('ko-KR', {
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
        </div>
      </div>
    </div>
  );
}
