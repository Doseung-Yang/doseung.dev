'use client';

import { useMemo, useState } from 'react';
import CommentForm from './CommentForm';
import { pickCommentsById } from '@/app/util/mock-comments';

type UIComment = { author?: string; content: string; createdAt?: string };

export default function CommentsSection({ postId }: { postId: string }) {
  const seed = useMemo<UIComment[]>(
    () =>
      (pickCommentsById?.(postId, 1) ?? []).map(c => ({
        author: c.author,
        content: c.message,
        createdAt: new Date().toISOString(),
      })),
    [postId]
  );

  const [items, setItems] = useState<UIComment[]>(seed);

  return (
    <section className="space-y-6 mt-10">
      <CommentForm
        postId={postId}
        onSubmitted={c => setItems(prev => [{ ...c, createdAt: new Date().toISOString() }, ...prev])}
      />
      <div className="space-y-4">
        {items.map((c, i) => (
          <div key={i} className="bg-card text-card-foreground p-4 rounded-lg shadow-sm">
            <p className="mb-2">{c.content}</p>
            <div className="flex justify-between text-sm text-muted-foreground">
              <span>{c.author || 'anonymous'}</span>
              <time>{c.createdAt ? new Date(c.createdAt).toLocaleDateString('ko-KR') : ''}</time>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
