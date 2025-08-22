'use client';

import { useEffect, useState } from 'react';
import HeroSection from '../_components/HeroSection';
import SkillsSection from '../_components/SkillsSection';
import RecentPostsSlider from '../_components/RecentPostsSlider';
import RecentCommentsSlider from '../_components/RecentCommentsSlider';
import { getRecentPosts, getRecentComments, Post, Comment } from '../api/lib/get-post';

export default function MainContent() {
  const [recentPosts, setRecentPosts] = useState<Post[]>([]);
  const [recentComments, setRecentComments] = useState<Comment[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true);
        setError(null);

        const [posts, comments] = await Promise.all([getRecentPosts(3), getRecentComments(5)]);

        if (posts.length === 0 && comments.length === 0) {
          setError('최근 포스트와 댓글을 찾을 수 없습니다.');
        } else {
          setRecentPosts(posts);
          setRecentComments(comments);
        }
      } catch (error) {
        console.error('데이터를 가져오는 중 오류 발생:', error);
        setError('데이터를 불러오는 중 오류가 발생했습니다.');
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  return (
    <main className="flex flex-col items-center min-h-screen text-foreground">
      <HeroSection />

      {/* 최근 포스트와 댓글 슬라이더 */}
      {!loading && (recentPosts.length > 0 || recentComments.length > 0) && (
        <div className="w-full py-12 bg-gradient-to-b from-transparent to-slate-50 dark:to-slate-900/50">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-7xl mx-auto px-4">
            {recentPosts.length > 0 && <RecentPostsSlider posts={recentPosts} />}
            {recentComments.length > 0 && <RecentCommentsSlider comments={recentComments} />}
          </div>
        </div>
      )}

      {/* 에러 상태 */}
      {!loading && error && (
        <div className="w-full py-12 bg-gradient-to-b from-transparent to-slate-50 dark:to-slate-900/50">
          <div className="max-w-3xl mx-auto px-4 text-center">
            <p className="text-muted-foreground">{error}</p>
          </div>
        </div>
      )}

      {/* 나머지 콘텐츠 - 컨테이너 제한 적용 */}
      <div className="container mx-auto px-4 py-8 w-full">
        <SkillsSection />
      </div>
    </main>
  );
}
