'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import CommentForm from './CommentForm';

type Comment = { id?: string; author?: string; content: string; createdAt?: string };

export default function CommentsSection({ postId }: { postId: string }) {
  const [items, setItems] = useState<Comment[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    let aborted = false;
    (async () => {
      setLoading(true);
      const base = process.env.NEXT_PUBLIC_API_URL!;
      const tryUrls = [`${base}/posts/${postId}/comments`, `${base}/comments?postId=${postId}`];
      for (const url of tryUrls) {
        try {
          const res = await fetch(url, { cache: 'no-store' });
          if (!res.ok) continue;
          const data = await res.json();
          if (!aborted && Array.isArray(data)) setItems(data);
          break;
        } catch {}
      }
      if (!aborted) setLoading(false);
    })();
    return () => {
      aborted = true;
    };
  }, [postId]);

  return (
    <section className="space-y-6 mt-10">
      <CommentForm
        postId={postId}
        onSubmitted={c => {
          // 낙관적 UI: 즉시 화면에 반영
          setItems(prev => [{ author: c.author, content: c.content, createdAt: new Date().toISOString() }, ...prev]);
          // 서버 캐시/SSG 무시하고 재검증
          router.refresh();
        }}
      />
      {!loading && (
        <div className="space-y-4">
          {items.map((c, i) => (
            <div key={c.id ?? i} className="bg-card text-card-foreground p-4 rounded-lg shadow-sm">
              <p className="mb-2">{c.content}</p>
              <div className="flex justify-between text-sm text-muted-foreground">
                <span>{c.author || 'anonymous'}</span>
                <time>{c.createdAt ? new Date(c.createdAt).toLocaleDateString('ko-KR') : ''}</time>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
