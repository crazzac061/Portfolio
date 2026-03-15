'use client';

import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Placeholder from '@tiptap/extension-placeholder';
import { Bold, Italic, List, ListOrdered, Heading1, Heading2 } from 'lucide-react';

interface EditorProps {
  content: string;
  onChange: (content: string) => void;
}

const Editor = ({ content, onChange }: EditorProps) => {
  const editor = useEditor({
    extensions: [
      StarterKit,
      Placeholder.configure({
        placeholder: 'Write your story...',
      }),
    ],
    content,
    immediatelyRender: false,
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
    },
    editorProps: {
      attributes: {
        class: 'prose prose-invert max-w-none focus:outline-none min-h-[400px] text-zinc-300',
      },
    },
  });

  if (!editor) {
    return null;
  }

  return (
    <div className="border border-zinc-800 rounded-xl overflow-hidden bg-black transition-all focus-within:border-zinc-700">
      <div className="flex flex-wrap items-center gap-1 p-2 border-b border-zinc-800 bg-zinc-900/50">
        <button
          onClick={() => editor.chain().focus().toggleBold().run()}
          className={`p-2 rounded hover:bg-zinc-800 transition-colors ${editor.isActive('bold') ? 'text-white bg-zinc-800' : 'text-zinc-500'}`}
          type="button"
        >
          <Bold size={18} />
        </button>
        <button
          onClick={() => editor.chain().focus().toggleItalic().run()}
          className={`p-2 rounded hover:bg-zinc-800 transition-colors ${editor.isActive('italic') ? 'text-white bg-zinc-800' : 'text-zinc-500'}`}
          type="button"
        >
          <Italic size={18} />
        </button>
        <div className="w-[1px] h-6 bg-zinc-800 mx-1" />
        <button
          onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
          className={`p-2 rounded hover:bg-zinc-800 transition-colors ${editor.isActive('heading', { level: 1 }) ? 'text-white bg-zinc-800' : 'text-zinc-500'}`}
          type="button"
        >
          <Heading1 size={18} />
        </button>
        <button
          onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
          className={`p-2 rounded hover:bg-zinc-800 transition-colors ${editor.isActive('heading', { level: 2 }) ? 'text-white bg-zinc-800' : 'text-zinc-500'}`}
          type="button"
        >
          <Heading2 size={18} />
        </button>
        <div className="w-[1px] h-6 bg-zinc-800 mx-1" />
        <button
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          className={`p-2 rounded hover:bg-zinc-800 transition-colors ${editor.isActive('bulletList') ? 'text-white bg-zinc-800' : 'text-zinc-500'}`}
          type="button"
        >
          <List size={18} />
        </button>
        <button
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
          className={`p-2 rounded hover:bg-zinc-800 transition-colors ${editor.isActive('orderedList') ? 'text-white bg-zinc-800' : 'text-zinc-500'}`}
          type="button"
        >
          <ListOrdered size={18} />
        </button>
      </div>
      <div className="p-6">
        <style jsx global>{`
          .tiptap p.is-editor-empty:first-child::before {
            color: #52525b;
            content: attr(data-placeholder);
            float: left;
            height: 0;
            pointer-events: none;
          }
          .prose h1 { font-size: 2.25rem; margin-bottom: 1.5rem; color: white; }
          .prose h2 { font-size: 1.5rem; margin-top: 2rem; margin-bottom: 1rem; color: #d4d4d8; }
          .prose p { margin-bottom: 1.25rem; line-height: 1.75; }
          .prose ul, .prose ol { margin-left: 1.5rem; margin-bottom: 1.25rem; }
          .prose li { margin-bottom: 0.5rem; }
        `}</style>
        <EditorContent editor={editor} />
      </div>
    </div>
  );
};

export default Editor;
