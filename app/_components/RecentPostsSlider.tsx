'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ChevronRight, ArrowRight, Calendar } from '@/components/icons';

interface NotionPost {
  id: string;
  title: string;
  slug: string;
  description?: string;
  tags: string[];
  date?: string;
  published: boolean;
  coverUrl?: string;
}

interface RecentPostsSliderProps {
  posts: NotionPost[];
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: 'easeOut' },
  },
};

export default function RecentPostsSlider({ posts }: RecentPostsSliderProps) {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  if (!posts || posts.length === 0) {
    return null;
  }

  const featuredPost = posts[0];
  const otherPosts = posts.slice(1, 5);

  return (
    <div className="w-full">
      <div className="flex items-center justify-between mb-10">
        <div>
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-block px-3 py-1 text-xs font-semibold text-primary bg-primary/10 rounded-full mb-3"
          >
            BLOG
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-3xl sm:text-4xl font-bold text-foreground"
          >
            최근 포스트
          </motion.h2>
        </div>
        <motion.div
          initial={{ opacity: 0, x: -10 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
        >
          <Link
            href="/blog"
            className="group flex items-center gap-2 px-4 py-2 text-sm font-medium text-muted-foreground hover:text-primary transition-colors rounded-full hover:bg-primary/5"
          >
            전체보기
            <ChevronRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
          </Link>
        </motion.div>
      </div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="grid grid-cols-1 lg:grid-cols-2 gap-6"
      >
        <motion.article
          variants={cardVariants}
          className="group relative"
          onMouseEnter={() => setHoveredIndex(0)}
          onMouseLeave={() => setHoveredIndex(null)}
        >
          <Link href={`/blog/${featuredPost.slug}`} className="block h-full">
            <div className="relative h-full min-h-[400px] rounded-3xl overflow-hidden bg-gradient-to-br from-primary/20 via-purple-500/10 to-pink-500/10 border border-border/50 p-8 flex flex-col justify-end transition-all duration-500 hover:shadow-2xl hover:shadow-primary/10 hover:border-primary/30">
              <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/50 to-transparent" />
              <div className="absolute top-0 right-0 w-2/3 h-2/3 bg-gradient-to-bl from-primary/10 to-transparent rounded-bl-full" />

              <div className="relative z-10">
                <div className="flex items-center gap-3 mb-4">
                  <span className="px-3 py-1 text-xs font-bold text-white bg-primary rounded-full shadow-lg shadow-primary/30">
                    Featured
                  </span>
                  {featuredPost.date && (
                    <span className="flex items-center gap-1 text-xs text-muted-foreground">
                      <Calendar className="w-3 h-3" />
                      {new Date(featuredPost.date).toLocaleDateString('ko-KR', {
                        month: 'short',
                        day: 'numeric',
                      })}
                    </span>
                  )}
                </div>

                <h3 className="text-2xl sm:text-3xl font-bold text-foreground mb-3 leading-tight group-hover:text-primary transition-colors">
                  {featuredPost.title}
                </h3>

                <p className="text-muted-foreground leading-relaxed mb-4 line-clamp-2">
                  {featuredPost.description || '내용을 확인해보세요...'}
                </p>

                {featuredPost.tags && featuredPost.tags.length > 0 && (
                  <div className="flex flex-wrap gap-2 mb-6">
                    {featuredPost.tags.slice(0, 3).map((tag, idx) => (
                      <span
                        key={idx}
                        className="px-2.5 py-1 text-xs font-medium bg-foreground/5 text-foreground/70 rounded-full border border-border/50"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                )}

                <div className="flex items-center gap-2 text-primary font-semibold">
                  <span>Read more</span>
                  <ArrowRight className={`w-4 h-4 transition-transform duration-300 ${hoveredIndex === 0 ? 'translate-x-1' : ''}`} />
                </div>
              </div>
            </div>
          </Link>
        </motion.article>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {otherPosts.map((post, idx) => (
            <motion.article
              key={post.id}
              variants={cardVariants}
              className="group"
              onMouseEnter={() => setHoveredIndex(idx + 1)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              <Link href={`/blog/${post.slug}`} className="block h-full">
                <div className="relative h-full min-h-[180px] rounded-2xl overflow-hidden bg-card border border-border/50 p-5 flex flex-col justify-between transition-all duration-300 hover:shadow-xl hover:shadow-primary/5 hover:border-primary/20 hover:-translate-y-1">
                  <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-bl from-primary/5 to-transparent rounded-bl-full opacity-0 group-hover:opacity-100 transition-opacity" />

                  <div className="relative z-10">
                    {post.date && (
                      <span className="flex items-center gap-1 text-xs text-muted-foreground mb-3">
                        <Calendar className="w-3 h-3" />
                        {new Date(post.date).toLocaleDateString('ko-KR', {
                          month: 'short',
                          day: 'numeric',
                        })}
                      </span>
                    )}

                    <h3 className="text-base font-bold text-foreground mb-2 leading-snug line-clamp-2 group-hover:text-primary transition-colors">
                      {post.title}
                    </h3>

                    {post.tags && post.tags.length > 0 && (
                      <div className="flex flex-wrap gap-1.5">
                        {post.tags.slice(0, 2).map((tag, tagIdx) => (
                          <span
                            key={tagIdx}
                            className="px-2 py-0.5 text-[10px] font-medium bg-muted text-muted-foreground rounded-full"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>

                  <div className="flex items-center gap-1 text-xs text-primary font-medium mt-3 relative z-10">
                    <span>Read</span>
                    <ArrowRight className={`w-3 h-3 transition-transform duration-300 ${hoveredIndex === idx + 1 ? 'translate-x-0.5' : ''}`} />
                  </div>
                </div>
              </Link>
            </motion.article>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
