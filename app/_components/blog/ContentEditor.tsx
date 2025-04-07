'use client';

import { useState, useEffect, useRef } from 'react';

interface ContentEditorProps {
  value: string;
  onChange: (value: string) => void;
}

export default function ContentEditor({ value, onChange }: ContentEditorProps) {
  const [content, setContent] = useState(() => {
    try {
      const parsedValue = value ? JSON.parse(value) : '';
      if (typeof parsedValue === 'string') {
        return parsedValue;
      }
      return '';
    } catch (e) {
      return value || '';
    }
  });

  const editorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (content) {
      onChange(JSON.stringify(content));
    }
  }, [content, onChange]);

  useEffect(() => {
    if (editorRef.current && content) {
      editorRef.current.innerHTML = content;
    }
  }, []);

  const handleInput = () => {
    if (editorRef.current) {
      setTimeout(() => {
        const rawHTML = editorRef.current?.innerHTML || '';
        setContent(rawHTML);
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
        <p className="text-sm">본문 내용을 입력하세요. 서식과 줄바꿈이 그대로 유지됩니다.</p>
      </div>
    </div>
  );
}
