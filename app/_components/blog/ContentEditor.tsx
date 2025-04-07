'use client';

import { useState, useEffect, useRef } from 'react';

interface Block {
  id: string;
  content: string;
}

interface ContentEditorProps {
  value: string;
  onChange: (value: string) => void;
}

export default function ContentEditor({ value, onChange }: ContentEditorProps) {
  const [content, setContent] = useState(() => {
    try {
      const parsedValue = value ? JSON.parse(value) : '';
      return typeof parsedValue === 'string' ? parsedValue : '';
    } catch (e) {
      return value || '';
    }
  });

  const editorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    onChange(JSON.stringify(content));
  }, [content, onChange]);

  useEffect(() => {
    if (editorRef.current && content) {
      editorRef.current.innerHTML = content;
    }
  }, []);

  const handleInput = () => {
    if (editorRef.current) {
      setTimeout(() => {
        setContent(editorRef.current?.innerHTML || '');
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
      />

      <div className="text-center mt-8 text-gray-400">
        <p className="text-sm">본문 내용을 입력하세요. 줄바꿈과 띄어쓰기가 모두 유지됩니다.</p>
      </div>
    </div>
  );
}
