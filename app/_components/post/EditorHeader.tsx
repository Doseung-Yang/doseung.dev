'use client';

import { useRouter } from 'next/navigation';
import { ChevronLeft } from '@/components/icons';

interface EditorHeaderProps {
  onSave: () => void;
  onPublish: () => void;
  isSaving: boolean;
  isPublishing: boolean;
  savedStatus: string;
  isEditMode?: boolean;
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
    <header className="sticky top-0 z-10 ">
      <div className="max-w-screen-2xl mx-auto px-4 flex items-center justify-between h-16">
        <div className="flex items-center space-x-4">
          <button onClick={() => router.push('/post')} className="text-foreground hover:text-primary">
            <ChevronLeft className="h-5 w-5" />
          </button>
          <span className="text-lg font-medium text-foreground">{isEditMode ? '게시글 수정' : '새 게시글'}</span>
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
            className="px-3 py-1.5 text-sm rounded-md border border-border text-foreground hover:bg-accent disabled:opacity-50"
          >
            {isSaving ? '저장 중...' : '저장'}
          </button>

          <button
            onClick={async () => {
              await onPublish();
              router.refresh();
            }}
            disabled={isPublishing}
            className="px-3 py-1.5 text-sm rounded-md bg-primary text-primary-foreground hover:opacity-90 disabled:opacity-50"
          >
            {isPublishing ? (isEditMode ? '수정 중...' : '발행 중...') : isEditMode ? '수정 완료' : '발행하기'}
          </button>
        </div>
      </div>
    </header>
  );
}
