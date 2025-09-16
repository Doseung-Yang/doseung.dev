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
    <div className="prose prose-lg max-w-none dark:prose-invert text-foreground relative">
      <div
        ref={editorRef}
        contentEditable
        suppressContentEditableWarning
        className="outline-none min-h-[300px] leading-relaxed focus:ring-2 focus:ring-primary/10 rounded p-1"
        onInput={handleInput}
        onKeyDown={handleKeyDown}
        data-placeholder="본문 내용을 입력하세요..."
      />
      {!value && (
        <div className="absolute top-0 left-0 pointer-events-none  text-lg leading-relaxed p-1">
          본문 내용을 입력하세요
        </div>
      )}
    </div>
  );
}
