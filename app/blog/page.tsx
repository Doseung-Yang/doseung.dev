import type { Metadata } from 'next';
import { getPosts } from '@/app/api/lib/notion';
import BlogGallery from './_components/BlogGallery';

export const metadata: Metadata = {
  title: '블로그 | 개발자 도승',
  description: '개발과 일상에서 얻은 경험과 배움을 정리한 글을 공유합니다.',
  alternates: { canonical: '/blog' },
  openGraph: {
    title: '블로그 | 개발자 도승',
    description: '개발과 일상에서 얻은 경험과 배움을 정리한 글을 공유합니다.',
    url: '/blog',
    siteName: '개발자 도승',
    images: ['/DS.png'],
    type: 'website',
    locale: 'ko_KR',
  },
  twitter: {
    card: 'summary_large_image',
    title: '블로그 | 개발자 도승',
    description: '개발과 일상에서 얻은 경험과 배움을 정리한 글을 공유합니다.',
    images: ['/DS.png'],
  },
};

export const revalidate = 60;

export default async function BlogIndexPage() {
  const { posts, hasMore, nextCursor } = await getPosts({ pageSize: 20 });

  return (
    <section className="max-w-4xl mx-auto py-10 px-6 text-foreground">
      <div className="mb-12">
        <h1 className="text-4xl font-bold mb-4">블로그</h1>
        <p className="text-xl text-muted-foreground">개발과 일상에 대한 이야기를 기록합니다</p>
      </div>

      <BlogGallery initialPosts={posts} initialCursor={nextCursor} initialHasMore={hasMore} />

      {posts.length === 0 && (
        <div className="text-center py-12">
          <p className="text-muted-foreground text-lg">아직 작성된 글이 없습니다.</p>
        </div>
      )}
    </section>
  );
}
