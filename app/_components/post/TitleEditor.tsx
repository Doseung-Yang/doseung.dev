'use client';

import React, { useRef } from 'react';

interface TitleEditorProps {
  value: string;
  onChange: (value: string) => void;
}

export default function TitleEditor({ value, onChange }: TitleEditorProps) {
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  return (
    <div className="mb-8 mt-6">
      <textarea
        ref={textareaRef}
        value={value}
        onChange={e => onChange(e.target.value)}
        placeholder="제목을 입력하세요"
        className="w-full text-4xl font-bold"
        rows={1}
      />
    </div>
  );
}
