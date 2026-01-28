import type { Metadata } from 'next';
import { getPosts } from '@/app/api/lib/notion';
import BlogGallery from './_components/BlogGallery';
import { SITE_URL } from '@/app/constants/site';

const BLOG_TITLE = '블로그 | 개발자 도승';
const BLOG_DESCRIPTION = '개발하며 새롭게 습득한 지식과 배운 내용을 공유합니다.';

export const metadata: Metadata = {
  title: BLOG_TITLE,
  description: BLOG_DESCRIPTION,
  alternates: { canonical: `${SITE_URL}/blog` },
  openGraph: {
    title: BLOG_TITLE,
    description: BLOG_DESCRIPTION,
    url: `${SITE_URL}/blog`,
    siteName: '개발자 도승',
    images: ['/DS.png'],
    type: 'website',
    locale: 'ko_KR',
  },
  twitter: {
    card: 'summary_large_image',
    title: BLOG_TITLE,
    description: BLOG_DESCRIPTION,
    images: ['/DS.png'],
  },
};

export const revalidate = 60;

const blogIndexBreadcrumbJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: '홈', item: SITE_URL },
    { '@type': 'ListItem', position: 2, name: '블로그', item: `${SITE_URL}/blog` },
  ],
};

export default async function BlogIndexPage() {
  const { posts, hasMore, nextCursor } = await getPosts({ pageSize: 20 });

  return (
    <section className="max-w-4xl mx-auto py-10 px-6 text-foreground">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(blogIndexBreadcrumbJsonLd).replace(/</g, '\\u003c'),
        }}
      />
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
