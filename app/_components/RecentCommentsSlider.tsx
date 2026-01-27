'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { ChevronRight } from '@/components/icons';

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

  useEffect(() => {
    if (comments.length <= 1) return;

    const interval = setInterval(() => {
      setCurrentIndex(prev => (prev + 1) % comments.length);
    }, 3500);

    return () => clearInterval(interval);
  }, [comments.length]);

  if (!comments || comments.length === 0) {
    return null;
  }

  return (
    <div className="w-full">
      <div className="flex items-center justify-between mb-6">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-xs font-medium text-emerald-600 dark:text-emerald-400 uppercase tracking-wider">Live</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-bold text-foreground">최근 댓글</h2>
        </div>
        <Link
          href="/post"
          className="text-sm text-muted-foreground hover:text-primary transition-colors flex items-center gap-1"
        >
          방명록
          <ChevronRight className="w-4 h-4" />
        </Link>
      </div>

      <div className="relative h-[280px] sm:h-[320px] overflow-hidden rounded-2xl bg-gradient-to-br from-card to-accent border border-border shadow-xl">
        <div className="absolute top-0 left-0 w-full h-20 bg-gradient-to-b from-emerald-500/5 to-transparent pointer-events-none" />

        <div className="p-6 sm:p-8 h-full flex flex-col">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4, ease: 'easeOut' }}
              className="flex-1 flex flex-col"
            >
              <div className="text-6xl text-emerald-500/20 font-serif leading-none mb-2">&ldquo;</div>

              <blockquote className="flex-1 flex flex-col justify-center -mt-8">
                <p className="text-foreground text-lg sm:text-xl leading-relaxed line-clamp-4">
                  {comments[currentIndex].content}
                </p>
              </blockquote>

              <div className="flex items-center justify-between mt-6 pt-4 border-t border-border">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-emerald-400 to-emerald-600 flex items-center justify-center text-white font-medium text-sm shadow-lg shadow-emerald-500/25">
                    {(comments[currentIndex].author || '익명').charAt(0).toUpperCase()}
                  </div>
                  <div>
                    <p className="font-medium text-foreground">
                      {comments[currentIndex].author || '익명'}
                    </p>
                    {comments[currentIndex].createdAt && (
                      <time className="text-xs text-muted-foreground">
                        {new Date(comments[currentIndex].createdAt).toLocaleDateString('ko-KR', {
                          year: 'numeric',
                          month: 'short',
                          day: 'numeric',
                        })}
                      </time>
                    )}
                  </div>
                </div>

                <div className="text-sm text-muted-foreground">
                  <span className="text-emerald-600 dark:text-emerald-400 font-medium">{currentIndex + 1}</span>
                  <span className="mx-1">/</span>
                  <span>{comments.length}</span>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {comments.length > 1 && (
          <div className="absolute bottom-0 left-0 right-0 h-1 bg-border">
            <motion.div
              className="h-full bg-emerald-500"
              initial={{ width: '0%' }}
              animate={{ width: '100%' }}
              transition={{ duration: 3.5, ease: 'linear' }}
              key={currentIndex}
            />
          </div>
        )}
      </div>
    </div>
  );
}
