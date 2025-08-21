import CommentForm from '@/app/_components/blog/CommentForm';
import EditDeleteButtons from '@/app/_components/blog/DeleteButton';
import { getPost } from '@/app/api/lib/get-post';
import Link from 'next/link';
import { notFound } from 'next/navigation';

type PageProps = {
  params: Promise<{ id: string }>;
  searchParams: Promise<Record<string, string | string[] | undefined>>;
};
export async function generateMetadata({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const post = await getPost(id);
  if (!post) return {};

  const title = post.title;
  const description = (post.content || '')
    .replace(/<[^>]+>/g, ' ')
    .trim()
    .slice(0, 140);
  const url = `https://do-seung.com/blog/${id}`;

  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: {
      type: 'article',
      url,
      title,
      description,
      siteName: '양도승 기술 블로그',
      images: ['/DS.png'],
      locale: 'ko_KR',
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: ['/DS.png'],
    },
  };
}
export default async function BlogPostPage({ params, searchParams: _searchParams }: PageProps) {
  const resolvedParams = await params;
  const id = resolvedParams.id;
  const post = await getPost(id);

  if (!post) {
    notFound();
  }

  return (
    <article className="max-w-3xl mx-auto py-10 px-6 text-foreground">
      <header className="mb-8">
        <EditDeleteButtons postId={id} />
        <h1 className="text-4xl font-bold mt-6 mb-2">{post.title}</h1>

        <div className="flex items-center text-muted-foreground text-sm">
          {post.createdAt && (
            <time dateTime={post.createdAt}>{new Date(post.createdAt).toLocaleDateString('ko-KR')}</time>
          )}
        </div>
      </header>
      <div className="prose prose-lg max-w-none dark:prose-invert text-foreground">
        {post.content ? (
          <div
            dangerouslySetInnerHTML={{
              __html: post.content,
            }}
          />
        ) : (
          <p>내용이 없습니다.</p>
        )}
      </div>

      <CommentForm postId={id} />

      <section className="mt-16 pt-8 border-t border-border">
        <h2 className="text-2xl font-bold mb-6">이런 글도 읽어보세요</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Link
            href="/blog/1"
            className="block p-4 border border-border bg-card text-card-foreground rounded-lg hover:shadow-md transition"
          >
            <h3 className="font-medium text-lg mb-1 hover:text-primary">첫 번째 추천 게시글</h3>
            <p className="text-muted-foreground text-sm">간략한 설명이 들어갑니다...</p>
          </Link>
          <Link
            href="/blog/2"
            className="block p-4 border border-border bg-card text-card-foreground rounded-lg hover:shadow-md transition"
          >
            <h3 className="font-medium text-lg mb-1 hover:text-primary">두 번째 추천 게시글</h3>
            <p className="text-muted-foreground text-sm">간략한 설명이 들어갑니다...</p>
          </Link>
        </div>
      </section>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Article',
            headline: post.title,
            datePublished: post.createdAt,
            dateModified: post.updatedAt || post.createdAt,
            author: [{ '@type': 'Person', name: 'Doseung Yang' }],
            publisher: { '@type': 'Organization', name: '개발자 도승' },
            mainEntityOfPage: `https://do-seung.com/blog/${id}`,
          }).replace(/</g, '\\u003c'),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'CollectionPage',
            name: '블로그',
            url: 'https://do-seung.com/blog',
            isPartOf: { '@type': 'WebSite', url: 'https://do-seung.com' },
          }).replace(/</g, '\\u003c'),
        }}
      />
    </article>
  );
}
