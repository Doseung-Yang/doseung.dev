'use client';

import { useState, useEffect, useRef } from 'react';

interface ContentEditorProps {
  value: string;
  onChange: (value: string) => void;
}

export default function ContentEditor({ value, onChange }: ContentEditorProps) {
  const editorRef = useRef<HTMLDivElement>(null);
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    if (editorRef.current && !isInitialized) {
      editorRef.current.innerHTML = value || '';
      setIsInitialized(true);
    }
  }, [value, isInitialized]);

  const handleInput = () => {
    if (editorRef.current) {
      const html = editorRef.current.innerHTML;
      onChange(html);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      setTimeout(() => {
        handleInput();
      }, 0);
    }
  };

  return (
    <div className="prose prose-lg max-w-none">
      <div
        ref={editorRef}
        contentEditable
        suppressContentEditableWarning
        className="outline-none min-h-[300px] leading-relaxed focus:ring-2 focus:ring-blue-100 rounded p-1"
        onInput={handleInput}
        onKeyDown={handleKeyDown}
      />

      <div className="text-center mt-8 text-gray-400">
        <p className="text-sm">본문 내용을 입력하세요. 줄바꿈과 띄어쓰기가 모두 유지됩니다.</p>
      </div>
    </div>
  );
}
