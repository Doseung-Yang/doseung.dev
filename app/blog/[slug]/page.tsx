import { getPostBySlug, getPostContentHtml, getPostUrl, getPosts } from '@/app/api/lib/notion';
import { Suspense } from 'react';
import { notFound } from 'next/navigation';
import Link from 'next/link';

export const revalidate = 60;

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  if (!post) return {};
  const title = post.title;
  const description = post.description ?? '';
  const url = `https://do-seung.com${getPostUrl(post.slug)}`;
  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: {
      type: 'article',
      url,
      title,
      description,
      images: ['/DS.png'],
      locale: 'ko_KR',
    },
    twitter: { card: 'summary_large_image', title, description, images: ['/DS.png'] },
  } as any;
}

export default async function BlogDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  if (!post) notFound();
  const contentPromise = getPostContentHtml(post.id);

  return (
    <article className="max-w-4xl mx-auto py-10 px-6 text-foreground">
      <div className="mb-6">
        <Link
          href="/blog"
          className="inline-flex items-center text-muted-foreground hover:text-primary transition-colors"
        >
          <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          블로그 목록으로 돌아가기
        </Link>
      </div>

      <header className="mb-8">
        <h1 className="text-4xl md:text-5xl font-bold mb-4 leading-tight">{post.title}</h1>

        {post.description && <p className="text-xl text-muted-foreground mb-6 leading-relaxed">{post.description}</p>}

        <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
          {post.date && (
            <time className="flex items-center">
              <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                />
              </svg>
              {new Date(post.date).toLocaleDateString('ko-KR', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              })}
            </time>
          )}

          {post.tags && post.tags.length > 0 && (
            <div className="flex items-center flex-wrap gap-2">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z"
                />
              </svg>
              <div className="flex flex-wrap gap-1">
                {post.tags.map((tag, index) => (
                  <span key={index} className="px-2 py-1 bg-primary/10 text-primary rounded-full text-xs">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      </header>

      <Suspense fallback={<div className="text-muted-foreground">콘텐츠를 불러오는 중...</div>}>
        <ArticleBody contentPromise={contentPromise} />
      </Suspense>
    </article>
  );
}

async function ArticleBody({ contentPromise }: { contentPromise: Promise<{ md: string; html: string }> }) {
  const content = await contentPromise;
  return (
    <div
      className="prose prose-lg max-w-none dark:prose-invert text-foreground prose-headings:text-foreground prose-p:text-foreground prose-strong:text-foreground prose-code:text-foreground prose-pre:bg-muted prose-pre:text-foreground"
      dangerouslySetInnerHTML={{ __html: content.html }}
    />
  );
}
export async function generateStaticParams() {
  const { posts } = await getPosts({ pageSize: 50 });
  return posts.map(p => ({ slug: p.slug }));
}
