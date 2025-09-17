'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import EditorHeader from '@/app/_components/post/EditorHeader';
import TitleEditor from '@/app/_components/post/TitleEditor';
import ContentEditor from '@/app/_components/post/ContentEditor';

export default function EditPage() {
  const router = useRouter();
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [author, setAuthor] = useState('');
  const [isSaving, setIsSaving] = useState(false);
  const [isPublishing, setIsPublishing] = useState(false);
  const [savedStatus, setSavedStatus] = useState('');

  async function savePost(publish = false) {
    if (!title.trim()) {
      setSavedStatus('제목을 입력하세요');
      setTimeout(() => setSavedStatus(''), 5000);
      return;
    }

    if (publish) {
      setIsPublishing(true);
    } else {
      setIsSaving(true);
    }

    try {
      let processedContent = content;
      try {
        processedContent = JSON.parse(content);
      } catch (_e) {}

      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/posts`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title,
          content,
          author,
          published: publish,
        }),
      });

      if (!response.ok) {
        throw new Error('저장 실패');
      }

      const data = await response.json();

      if (publish) {
        router.push(`/post/${data.id}`);
      } else {
        setSavedStatus('저장됨');
        setTimeout(() => setSavedStatus(''), 5000);
      }
    } catch (error) {
      console.error('Error saving post:', error);
      setSavedStatus('저장 실패');
    } finally {
      setIsSaving(false);
      setIsPublishing(false);
    }
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      <EditorHeader
        onSave={() => savePost(false)}
        onPublish={() => savePost(true)}
        isSaving={isSaving}
        isPublishing={isPublishing}
        savedStatus={savedStatus}
      />

      <div className="max-w-4xl mx-auto px-4 py-8">
        <label className="block text-sm font-medium mb-2">작성자(닉네임)</label>
        <input
          value={author}
          onChange={e => setAuthor(e.target.value)}
          className="w-fit mb-6 px-3 py-2 rounded-md border border-border bg-background text-foreground"
        />
        <TitleEditor value={title} onChange={setTitle} />
        <div className="border-b border-border mb-6"></div>
        <ContentEditor value={content} onChange={setContent} />
      </div>
    </div>
  );
}
