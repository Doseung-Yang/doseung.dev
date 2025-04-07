'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import EditorHeader from '@/app/_components/blog/EditorHeader';
import TitleEditor from '@/app/_components/blog/TitleEditor';
import ContentEditor from '@/app/_components/blog/ContentEditor';

export default function EditPostPage({ params }: { params: { id: string } }) {
  const postId = params.id;
  const router = useRouter();

  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [isSaving, setIsSaving] = useState(false);
  const [isPublishing, setIsPublishing] = useState(false);
  const [savedStatus, setSavedStatus] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  // 기존 게시글 데이터 가져오기
  useEffect(() => {
    async function fetchPost() {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/posts/${postId}`);

        if (!response.ok) {
          throw new Error('게시글을 불러오는데 실패했습니다.');
        }

        const post = await response.json();

        // 제목 설정
        setTitle(post.title || '');

        // 본문 내용 설정 (JSON 파싱 시도)
        if (post.content) {
          try {
            // JSON 문자열인 경우
            const parsedContent = JSON.parse(post.content);
            setContent(JSON.stringify(parsedContent));
          } catch (e) {
            // 일반 문자열인 경우
            setContent(post.content);
          }
        }

        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching post:', error);
        alert('게시글을 불러오는데 실패했습니다.');
        router.push('/blog');
      }
    }

    fetchPost();
  }, [postId, router]);

  // 게시글 저장 함수 (생성과 유사하지만 PUT 메소드 사용)
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
      } catch (e) {}

      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/posts/${postId}`, {
        method: 'PUT', // 수정이므로 PUT 메소드 사용
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title: title,
          content: processedContent,
          published: publish,
        }),
      });

      if (!response.ok) {
        throw new Error('저장 실패');
      }

      const data = await response.json();

      if (publish) {
        router.push(`/blog/${data.id || postId}`);
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

  // 로딩 중 표시
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto"></div>
          <p className="mt-4">게시글을 불러오는 중입니다...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <EditorHeader
        onSave={() => savePost(false)}
        onPublish={() => savePost(true)}
        isSaving={isSaving}
        isPublishing={isPublishing}
        savedStatus={savedStatus}
        isEditMode={true}
      />

      <div className="max-w-4xl mx-auto px-4 py-8">
        <TitleEditor value={title} onChange={setTitle} />
        <div className="border-b mb-6"></div>
        <ContentEditor value={content} onChange={setContent} />
      </div>
    </div>
  );
}
