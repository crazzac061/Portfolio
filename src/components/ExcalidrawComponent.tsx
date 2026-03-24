'use client';

import React, { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import { NodeViewWrapper, NodeViewProps } from '@tiptap/react';

const Excalidraw = dynamic(
  async () => (await import('@excalidraw/excalidraw')).Excalidraw,
  {
    ssr: false,
    loading: () => (
      <div className="w-full h-[400px] bg-zinc-900 animate-pulse flex items-center justify-center text-zinc-500 rounded-lg border border-zinc-800">
        Loading Whiteboard...
      </div>
    ),
  }
);

const ExcalidrawComponent = ({ node, updateAttributes }: NodeViewProps) => {
  const [data, setData] = useState(node.attrs.data || { elements: [], appState: {} });

  const onChange = (elements: any, appState: any, files: any) => {
    setData({ elements, appState });
    updateAttributes({
      data: { elements, appState },
    });
  };

  return (
    <NodeViewWrapper className="excalidraw-node my-4">
      <div className="w-full h-[300px] min-h-[200px] border border-zinc-800 rounded-xl overflow-hidden relative group"
           style={{ resize: 'vertical' }}>
        <Excalidraw
          initialData={data}
          onChange={onChange}
          theme="dark"
        />
      </div>
      <div className="text-[10px] text-zinc-600 mt-1 text-right">
        Drag bottom-right to resize whiteboard
      </div>
    </NodeViewWrapper>
  );
};


export default ExcalidrawComponent;
