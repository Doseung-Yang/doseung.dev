'use client';

import { useRouter } from 'next/navigation';

interface EditorHeaderProps {
  onSave: () => void;
  onPublish: () => void;
  isSaving: boolean;
  isPublishing: boolean;
  savedStatus: string;
  isEditMode: boolean;
}

export default function EditorHeader({
  onSave,
  onPublish,
  isSaving,
  isPublishing,
  savedStatus,
  isEditMode = false,
}: EditorHeaderProps) {
  const router = useRouter();

  return (
    <header className="sticky top-0 z-10 bg-white border-b border-gray-200 shadow-sm">
      <div className="max-w-screen-2xl mx-auto px-4 flex items-center justify-between h-16">
        <div className="flex items-center space-x-4">
          <button onClick={() => router.push('/blog')} className="text-gray-600 hover:text-gray-900">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path
                fillRule="evenodd"
                d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z"
                clipRule="evenodd"
              />
            </svg>
          </button>
          <span className="text-lg font-medium">새 게시글</span>
        </div>

        <div className="flex items-center space-x-2">
          {savedStatus && (
            <span className={`text-sm px-2 ${savedStatus === '저장됨' ? 'text-green-600' : 'text-red-600'}`}>
              {savedStatus}
            </span>
          )}

          <button
            onClick={onSave}
            disabled={isSaving}
            className="px-3 py-1.5 text-sm rounded-md border border-gray-300 text-gray-700 hover:bg-gray-50 disabled:opacity-50"
          >
            {isSaving ? '저장 중...' : '저장'}
          </button>

          <button
            onClick={onPublish}
            disabled={isPublishing}
            className="px-3 py-1.5 text-sm rounded-md bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50"
          >
            {isPublishing ? '발행 중...' : '발행하기'}
          </button>
        </div>
      </div>
    </header>
  );
}
