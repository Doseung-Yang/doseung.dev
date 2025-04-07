'use client';

import React, { useRef, useEffect } from 'react';

interface TitleEditorProps {
  value: string;
  onChange: (value: string) => void;
}

export default function TitleEditor({ value, onChange }: TitleEditorProps) {
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  }, [value]);

  return (
    <div className="mb-8 mt-6">
      <textarea
        ref={textareaRef}
        value={value}
        onChange={e => onChange(e.target.value)}
        placeholder="제목을 입력하세요"
        className="w-full text-4xl font-bold resize-none overflow-hidden border-none focus:outline-none focus:ring-0"
        style={{ height: 'auto', minHeight: '60px' }}
        rows={1}
      />
    </div>
  );
}
