import Link from 'next/link';
import { getPostUrl } from '@/app/api/lib/notion';

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
  posts: NotionPost[];
}

export default function BlogGallery({ posts }: BlogGalleryProps) {
  return (
    <div className="space-y-6">
      {posts.map(p => (
        <article key={p.id} className="group">
          <Link href={getPostUrl(p.slug)} className="block">
            <div className="bg-card border border-border rounded-xl p-6 hover:shadow-xl transition-all duration-300 hover:border-primary/20 hover:-translate-y-1">
              <div className="flex flex-col space-y-4">
                {/* 제목 */}
                <h2 className="text-xl font-bold group-hover:text-primary transition-colors line-clamp-2">{p.title}</h2>

                {/* 설명 */}
                {p.description && (
                  <p className="text-muted-foreground text-base leading-relaxed line-clamp-3">{p.description}</p>
                )}

                {/* 메타 정보 */}
                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                  {p.date && (
                    <time className="flex items-center">
                      <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                        />
                      </svg>
                      {new Date(p.date).toLocaleDateString('ko-KR', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                      })}
                    </time>
                  )}

                  {p.tags && p.tags.length > 0 && (
                    <div className="flex items-center gap-2">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z"
                        />
                      </svg>
                      <div className="flex gap-2 flex-wrap">
                        {p.tags.map((tag, index) => (
                          <span key={index} className="px-2 py-1 bg-primary/10 text-primary rounded-full text-xs">
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
      ))}
    </div>
  );
}
