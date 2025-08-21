'use client';

import { useState } from 'react';

export default function CommentForm({ postId }: { postId: string }) {
  const [author, setAuthor] = useState('');
  const [content, setContent] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [msg, setMsg] = useState<string | null>(null);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!content.trim()) {
      setMsg('댓글 내용을 입력해주세요.');
      return;
    }
    setSubmitting(true);
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/posts/${postId}/comments`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          author: author.trim() || undefined,
          content,
        }),
        cache: 'no-store',
      });
      if (!res.ok) throw new Error(await res.text());
      setMsg('등록되었습니다.');
      setContent('');
    } catch (err) {
      setMsg('등록에 실패했습니다.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form onSubmit={onSubmit} className="mb-10 bg-secondary p-6 rounded-lg text-secondary-foreground">
      <h3 className="text-lg font-medium mb-4">댓글 작성</h3>
      <div className="mb-4">
        <input
          type="text"
          placeholder="이름"
          className="w-full p-2 border border-input bg-card text-foreground rounded"
          value={author}
          onChange={e => setAuthor(e.target.value)}
        />
      </div>
      <div className="mb-4">
        <textarea
          placeholder="댓글을 입력해주세요"
          className="w-full p-2 border border-input bg-card text-foreground rounded"
          rows={4}
          value={content}
          onChange={e => setContent(e.target.value)}
        />
      </div>
      <button
        type="submit"
        disabled={submitting}
        className="bg-primary text-primary-foreground px-4 py-2 rounded hover:opacity-90 transition disabled:opacity-50"
      >
        {submitting ? '등록 중...' : '댓글 등록'}
      </button>
      {msg && <p className="mt-3 text-sm text-muted-foreground">{msg}</p>}
    </form>
  );
}
