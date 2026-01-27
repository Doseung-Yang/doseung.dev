'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import Link from 'next/link';
import { getPostUrl } from '@/app/api/lib/notion';
import { Calendar, Tag } from '@/components/icons';

interface NotionPost {
  id: string;
  title: string;
  slug: string;
  description?: string;
  tags?: string[];
  date?: string;
  published: boolean;
  coverUrl?: string;
}

interface BlogGalleryProps {
  initialPosts: NotionPost[];
  initialCursor: string | null;
  initialHasMore: boolean;
}

function PostCard({ post }: { post: NotionPost }) {
  return (
    <article className="group">
      <Link href={getPostUrl(post.slug)} className="block">
        <div className="bg-card border border-border rounded-xl p-6 hover:shadow-xl transition-all duration-300 hover:border-primary/20 hover:-translate-y-1">
          <div className="flex flex-col space-y-4">
            <h2 className="text-xl font-bold group-hover:text-primary transition-colors line-clamp-2">
              {post.title}
            </h2>

            {post.description && (
              <p className="text-muted-foreground text-base leading-relaxed line-clamp-3">
                {post.description}
              </p>
            )}

            <div className="flex items-center gap-4 text-sm text-muted-foreground">
              {post.date && (
                <time className="flex items-center">
                  <Calendar className="w-4 h-4 mr-1" />
                  {new Date(post.date).toLocaleDateString('ko-KR', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                  })}
                </time>
              )}

              {post.tags && post.tags.length > 0 && (
                <div className="flex items-center gap-2">
                  <Tag className="w-4 h-4" />
                  <div className="flex gap-2 flex-wrap">
                    {post.tags.map((tag, index) => (
                      <span
                        key={index}
                        className="px-2 py-1 bg-primary/10 text-primary rounded-full text-xs"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </Link>
    </article>
  );
}

function LoadingSkeleton() {
  return (
    <article className="bg-card border border-border rounded-xl p-6 animate-pulse">
      <div className="flex flex-col space-y-4">
        <div className="h-6 bg-muted rounded w-3/4" />
        <div className="h-4 bg-muted rounded w-full" />
        <div className="h-4 bg-muted rounded w-2/3" />
        <div className="h-4 bg-muted rounded w-1/2" />
      </div>
    </article>
  );
}

export default function BlogGallery({
  initialPosts,
  initialCursor,
  initialHasMore,
}: BlogGalleryProps) {
  const [posts, setPosts] = useState<NotionPost[]>(initialPosts);
  const [cursor, setCursor] = useState<string | null>(initialCursor);
  const [hasMore, setHasMore] = useState(initialHasMore);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const observerTarget = useRef<HTMLDivElement>(null);

  const loadMore = useCallback(async () => {
    if (isLoading || !hasMore || !cursor) return;

    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch(`/api/blog/posts?cursor=${cursor}&pageSize=20`);
      if (!response.ok) {
        throw new Error('Failed to load posts');
      }

      const data = await response.json();
      setPosts((prev) => [...prev, ...data.posts]);
      setCursor(data.nextCursor);
      setHasMore(data.hasMore);
    } catch (err) {
      setError('포스트를 불러오는데 실패했습니다.');
      console.error('Error loading posts:', err);
    } finally {
      setIsLoading(false);
    }
  }, [cursor, hasMore, isLoading]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting && hasMore && !isLoading) {
          loadMore();
        }
      },
      { threshold: 0.1 }
    );

    const currentTarget = observerTarget.current;
    if (currentTarget) {
      observer.observe(currentTarget);
    }

    return () => {
      if (currentTarget) {
        observer.unobserve(currentTarget);
      }
    };
  }, [hasMore, isLoading, loadMore]);

  return (
    <div className="space-y-6">
      {posts.map((post) => (
        <PostCard key={post.id} post={post} />
      ))}

      {isLoading && (
        <>
          <LoadingSkeleton />
          <LoadingSkeleton />
        </>
      )}

      {error && (
        <div className="text-center py-8">
          <p className="text-destructive mb-4">{error}</p>
          <button
            onClick={loadMore}
            className="px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:opacity-90 transition-opacity"
          >
            다시 시도
          </button>
        </div>
      )}

      {hasMore && !isLoading && <div ref={observerTarget} className="h-1" />}
    </div>
  );
}
