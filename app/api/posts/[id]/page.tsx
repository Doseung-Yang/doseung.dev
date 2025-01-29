'use client';

import { useState, useEffect } from 'react';
import { use } from 'react';

interface Comment {
  id: number;
  content: string;
}

export default function PostPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);

  const [comments, setComments] = useState<Comment[]>([]);
  const [content, setContent] = useState('');

  useEffect(() => {
    if (!id) return;

    fetch(`/api/comments?postId=${id}`)
      .then(res => res.json())
      .then(setComments);
  }, [id]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const res = await fetch('/api/comments', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ postId: id, content }),
    });

    if (res.ok) {
      const newComment = await res.json();
      setComments(prev => [...prev, newComment]);
      setContent('');
    }
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">댓글</h1>
      <ul className="mb-4">
        {comments.map(comment => (
          <li key={comment.id}>{comment.content}</li>
        ))}
      </ul>
      <form onSubmit={handleSubmit}>
        <textarea
          placeholder="댓글을 입력하세요"
          value={content}
          onChange={e => setContent(e.target.value)}
          className="block w-full mb-4 p-2 border"
        />
        <button type="submit" className="px-4 py-2 bg-green-500 text-white">
          댓글 작성
        </button>
      </form>
    </div>
  );
}
