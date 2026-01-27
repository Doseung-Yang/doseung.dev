'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import CommentForm from './CommentForm';

type Comment = { id?: string; author?: string; content: string; createdAt?: string };

interface CommentsSectionProps {
  postId: string;
  initialComments?: Comment[];
}

export default function CommentsSection({ postId, initialComments = [] }: CommentsSectionProps) {
  const [items, setItems] = useState<Comment[]>(initialComments);
  const router = useRouter();

  return (
    <section className="space-y-6 mt-10">
      <CommentForm
        postId={postId}
        onSubmitted={c => {
          setItems(prev => [
            { author: c.author, content: c.content, createdAt: new Date().toISOString() },
            ...prev,
          ]);
          router.refresh();
        }}
      />
      <div className="space-y-4">
        {items.length === 0 ? (
          <p className="text-muted-foreground text-center py-4">아직 댓글이 없습니다.</p>
        ) : (
          items.map((c, i) => (
            <div key={c.id ?? i} className="bg-card text-card-foreground p-4 rounded-lg shadow-sm">
              <p className="mb-2">{c.content}</p>
              <div className="flex justify-between text-sm text-muted-foreground">
                <span>{c.author || 'anonymous'}</span>
                <time>{c.createdAt ? new Date(c.createdAt).toLocaleDateString('ko-KR') : ''}</time>
              </div>
            </div>
          ))
        )}
      </div>
    </section>
  );
}
