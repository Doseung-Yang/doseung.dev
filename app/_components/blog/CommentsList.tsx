'use client';

import { useEffect, useState } from 'react';

type Comment = { id?: string; author?: string; content: string; createdAt?: string };

export default function CommentsList({ postId, refreshKey = 0 }: { postId: string; refreshKey?: number }) {
  const [items, setItems] = useState<Comment[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let aborted = false;
    (async () => {
      setLoading(true);
      const base = process.env.NEXT_PUBLIC_API_URL!;
      const url = `${base}/comments?postId=${postId}`;
      try {
        const res = await fetch(url, { cache: 'no-store' });
        const data = res.ok ? await res.json() : [];
        if (!aborted && Array.isArray(data)) setItems(data);
      } catch {
        if (!aborted) setItems([]);
      } finally {
        if (!aborted) setLoading(false);
      }
    })();
    return () => {
      aborted = true;
    };
  }, [postId, refreshKey]);

  if (loading) return null;

  return (
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
  );
}
