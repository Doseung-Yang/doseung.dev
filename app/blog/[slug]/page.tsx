import type { Metadata } from 'next';
import { getPostBySlug, getPostContentHtml, getPostUrl, getPosts } from '@/app/api/lib/notion';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { ChevronLeft, Calendar, Tag, Chat } from '@/components/icons';

export const revalidate = 60;

const MAX_DESCRIPTION_LENGTH = 160;
const SITE_URL = 'https://do-seung.com';

const normalizeText = (value: string) =>
  value
    .replace(/<[^>]*>/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();

const truncateText = (value: string, maxLength: number) => {
  if (value.length <= maxLength) return value;
  return `${value.slice(0, Math.max(0, maxLength - 3)).trimEnd()}...`;
};

const createDescriptionFromHtml = (html: string) => {
  const normalized = normalizeText(html);
  return truncateText(normalized, MAX_DESCRIPTION_LENGTH);
};

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  if (!post) return {};
  const title = post.title;
  let description = post.description?.trim() ?? '';
  if (!description) {
    const content = await getPostContentHtml(post.id);
    description = createDescriptionFromHtml(content.html);
  }
  const url = `${SITE_URL}${getPostUrl(post.slug)}`;
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
  };
}

export default async function BlogDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  if (!post) notFound();
  
  const content = await getPostContentHtml(post.id);
  const description = post.description?.trim() || createDescriptionFromHtml(content.html);
  const postUrl = `${SITE_URL}${getPostUrl(post.slug)}`;
  const publishedDate = post.date ? new Date(post.date).toISOString() : undefined;
  const articleJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: post.title,
    description,
    image: [`${SITE_URL}/DS.png`],
    author: [{ '@type': 'Person', name: '양도승', url: SITE_URL }],
    publisher: {
      '@type': 'Organization',
      name: '개발자 도승',
      logo: { '@type': 'ImageObject', url: `${SITE_URL}/DS.png` },
    },
    datePublished: publishedDate,
    dateModified: publishedDate,
    mainEntityOfPage: { '@type': 'WebPage', '@id': postUrl },
  };

  return (
    <article className="max-w-4xl mx-auto py-10 px-6 text-foreground">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(articleJsonLd).replace(/</g, '\\u003c'),
        }}
      />
      <div className="mb-6">
        <Link
          href="/blog"
          className="inline-flex items-center text-muted-foreground hover:text-primary transition-colors"
        >
          <ChevronLeft className="w-4 h-4 mr-2" />
          블로그 목록으로 돌아가기
        </Link>
      </div>

      <header className="mb-8">
        <h1 className="text-4xl md:text-5xl font-bold mb-4 leading-tight">{post.title}</h1>

        {post.description && <p className="text-xl text-muted-foreground mb-6 leading-relaxed">{post.description}</p>}

        <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
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
            <div className="flex items-center flex-wrap gap-2">
              <Tag className="w-4 h-4" />
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

      <div
        className="prose prose-lg max-w-none dark:prose-invert text-foreground prose-headings:text-foreground prose-p:text-foreground prose-strong:text-foreground prose-code:text-foreground prose-pre:bg-muted prose-pre:text-foreground"
        dangerouslySetInnerHTML={{ __html: content.html }}
      />

      <div className="mt-16 pt-8 border-t border-border">
        <h2 className="text-2xl font-bold mb-6">의견 남기기</h2>
        <div className="bg-secondary p-6 rounded-lg text-secondary-foreground">
          <p className="mb-4">이 글에 대한 의견이나 질문이 있으시다면 언제든 연락주세요!</p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Link
              href="/post"
              className="inline-flex items-center px-4 py-2 border border-border rounded-lg hover:bg-muted transition"
            >
              <Chat className="w-4 h-4 mr-2" />
              방명록에 글 남기기
            </Link>
          </div>
        </div>
      </div>
    </article>
  );
}

export async function generateStaticParams() {
  const { posts } = await getPosts({ pageSize: 50 });
  return posts.map(p => ({ slug: p.slug }));
}
