'use client';

import { useEffect } from 'react';
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Placeholder from '@tiptap/extension-placeholder';
import Image from '@tiptap/extension-image';
import { Table } from '@tiptap/extension-table';
import { TableRow } from '@tiptap/extension-table-row';
import { TableHeader } from '@tiptap/extension-table-header';
import { TableCell } from '@tiptap/extension-table-cell';
import { Bold, Italic, List, ListOrdered, Heading1, Heading2, Image as ImageIcon, Table as TableIcon, Palmtree, Square, Type } from 'lucide-react';
import { ExcalidrawExtension } from '../extension/Excalidraw';

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
      Image.configure({
        allowBase64: true,
        HTMLAttributes: {
          class: 'rounded-lg border border-zinc-800 my-4 max-w-full h-auto',
        },
      }),
      Table.configure({
        resizable: true,
        HTMLAttributes: {
          class: 'border-collapse table-auto w-full my-4 border border-zinc-800',
        },
      }),
      TableRow,
      TableHeader.configure({
        HTMLAttributes: {
          class: 'bg-zinc-900 border border-zinc-800 p-2 font-bold text-left',
        },
      }),
      TableCell.configure({
        HTMLAttributes: {
          class: 'border border-zinc-800 p-2 min-w-[100px]',
        },
      }),
      ExcalidrawExtension,
    ],
    content,
    immediatelyRender: false,
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
    },
    editorProps: {
      attributes: {
        class: 'prose prose-invert max-w-4xl mx-auto focus:outline-none min-h-[400px] text-zinc-300 overflow-x-hidden',
      },
      handlePaste: (view, event) => {
        const items = Array.from(event.clipboardData?.items || []);
        const imageItem = items.find(item => item.type.startsWith('image'));

        if (imageItem) {
          const file = imageItem.getAsFile();
          if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
              const src = e.target?.result as string;
              if (src && editor) {
                editor.chain().focus().setImage({ src }).run();
              }
            };
            reader.readAsDataURL(file);
            return true;
          }
        }
        return false;
      },
    },
  });

  // Keep editor content in sync with prop for manual updates (like Edit/Restore)
  useEffect(() => {
    if (editor && content !== editor.getHTML()) {
      editor.commands.setContent(content);
    }
  }, [content, editor]);

  if (!editor) {
    return null;
  }

  const addImage = () => {
    const url = window.prompt('URL');
    if (url) {
      editor.chain().focus().setImage({ src: url }).run();
    }
  };

  return (
    <div className="border border-zinc-800 rounded-xl overflow-hidden bg-black transition-all focus-within:border-zinc-700">
      <div className="flex flex-wrap items-center gap-1 p-2 border-b border-zinc-800 bg-zinc-900/50">
        <button
          onClick={() => editor.chain().focus().toggleBold().run()}
          className={`p-2 rounded hover:bg-zinc-800 transition-colors ${editor.isActive('bold') ? 'text-white bg-zinc-800' : 'text-zinc-500'}`}
          type="button"
          title="Bold"
        >
          <Bold size={18} />
        </button>
        <button
          onClick={() => editor.chain().focus().toggleItalic().run()}
          className={`p-2 rounded hover:bg-zinc-800 transition-colors ${editor.isActive('italic') ? 'text-white bg-zinc-800' : 'text-zinc-500'}`}
          type="button"
          title="Italic"
        >
          <Italic size={18} />
        </button>
        <div className="w-[1px] h-6 bg-zinc-800 mx-1" />
        <button
          onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
          className={`p-2 rounded hover:bg-zinc-800 transition-colors ${editor.isActive('heading', { level: 1 }) ? 'text-white bg-zinc-800' : 'text-zinc-500'}`}
          type="button"
          title="Heading 1"
        >
          <Heading1 size={18} />
        </button>
        <button
          onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
          className={`p-2 rounded hover:bg-zinc-800 transition-colors ${editor.isActive('heading', { level: 2 }) ? 'text-white bg-zinc-800' : 'text-zinc-500'}`}
          type="button"
          title="Heading 2"
        >
          <Heading2 size={18} />
        </button>
        <div className="w-[1px] h-6 bg-zinc-800 mx-1" />
        <button
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          className={`p-2 rounded hover:bg-zinc-800 transition-colors ${editor.isActive('bulletList') ? 'text-white bg-zinc-800' : 'text-zinc-500'}`}
          type="button"
          title="Bullet List"
        >
          <List size={18} />
        </button>
        <button
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
          className={`p-2 rounded hover:bg-zinc-800 transition-colors ${editor.isActive('orderedList') ? 'text-white bg-zinc-800' : 'text-zinc-500'}`}
          type="button"
          title="Ordered List"
        >
          <ListOrdered size={18} />
        </button>
        <div className="w-[1px] h-6 bg-zinc-800 mx-1" />
        <button
          onClick={addImage}
          className="p-2 rounded hover:bg-zinc-800 transition-colors text-zinc-500"
          type="button"
          title="Insert Image URL"
        >
          <ImageIcon size={18} />
        </button>
        <button
          onClick={() => editor.chain().focus().insertTable({ rows: 3, cols: 3, withHeaderRow: true }).run()}
          className={`p-2 rounded hover:bg-zinc-800 transition-colors ${editor.isActive('table') ? 'text-white bg-zinc-800' : 'text-zinc-500'}`}
          type="button"
          title="Insert Table"
        >
          <TableIcon size={18} />
        </button>
        <button
          onClick={() => editor.chain().focus().setExcalidraw().run()}
          className={`p-2 rounded hover:bg-zinc-800 transition-colors ${editor.isActive('excalidraw') ? 'text-white bg-zinc-800' : 'text-zinc-500'}`}
          type="button"
          title="Insert Whiteboard"
        >
          <Square size={18} />
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
          
          /* Table Styles */
          .tiptap table {
            border-collapse: collapse;
            margin: 1.5rem 0;
            width: 100%;
          }
          .tiptap th, .tiptap td {
            border: 1px solid #27272a;
            padding: 0.5rem;
            position: relative;
          }
          .tiptap th {
            background-color: #18181b;
            font-weight: bold;
          }
          .selectedCell:after {
            background: rgba(200, 200, 255, 0.4);
            content: "";
            left: 0; right: 0; top: 0; bottom: 0;
            pointer-events: none;
            position: absolute;
            z-index: 2;
          }
        `}</style>
        <EditorContent editor={editor} />
      </div>
    </div>
  );
};

export default Editor;
