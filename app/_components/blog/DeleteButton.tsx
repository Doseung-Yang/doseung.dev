'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';

interface EditDeleteButtonsProps {
  postId: string;
}

export default function EditDeleteButtons({ postId }: EditDeleteButtonsProps) {
  const router = useRouter();
  const [isDeleting, setIsDeleting] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const handleEdit = () => {
    router.push(`/blog/edit/${postId}`);
  };

  const handleDeleteClick = () => {
    setShowConfirm(true);
  };

  const handleDelete = async () => {
    try {
      setIsDeleting(true);
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/posts/${postId}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        router.push('/blog');
        router.refresh();
      } else {
        throw new Error('삭제 실패');
      }
    } catch (error) {
      console.error('Error deleting post:', error);
      alert('게시글 삭제에 실패했습니다.');
    } finally {
      setIsDeleting(false);
      setShowConfirm(false);
    }
  };

  return (
    <div className="flex items-center space-x-2">
      <button
        onClick={handleEdit}
        className="px-3 py-1 text-sm border border-primary text-primary rounded hover:opacity-90"
      >
        수정
      </button>
      <button
        onClick={handleDeleteClick}
        className="px-3 py-1 text-sm border border-red-500 text-red-500 rounded hover:opacity-90"
        disabled={isDeleting}
      >
        {isDeleting ? '삭제 중...' : '삭제'}
      </button>

      {showConfirm && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-card text-card-foreground border border-border p-6 rounded-lg shadow-lg max-w-md w-full">
            <h3 className="text-lg font-medium mb-4">게시글 삭제</h3>
            <p>정말로 이 게시글을 삭제하시겠습니까?</p>
            <div className="mt-6 flex justify-end space-x-3">
              <button
                onClick={() => setShowConfirm(false)}
                className="px-4 py-2 text-sm border border-border rounded"
                disabled={isDeleting}
              >
                취소
              </button>
              <button
                onClick={handleDelete}
                className="px-4 py-2 text-sm bg-red-600 text-white rounded hover:bg-red-700"
                disabled={isDeleting}
              >
                {isDeleting ? '삭제 중...' : '삭제'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
