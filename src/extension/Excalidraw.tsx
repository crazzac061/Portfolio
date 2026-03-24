import { Node, mergeAttributes, RawCommands } from '@tiptap/core';
import { ReactNodeViewRenderer } from '@tiptap/react';
import ExcalidrawComponent from '../components/ExcalidrawComponent';

declare module '@tiptap/core' {
  interface Commands<ReturnType> {
    excalidraw: {
      setExcalidraw: () => ReturnType;
    };
  }
}

export const ExcalidrawExtension = Node.create({
  name: 'excalidraw',
  group: 'block',
  atom: true,
  draggable: true,

  addAttributes() {
    return {
      data: {
        default: {
          elements: [],
          appState: {},
        },
      },
    };
  },

  parseHTML() {
    return [
      {
        tag: 'excalidraw-node',
      },
    ];
  },

  renderHTML({ HTMLAttributes }) {
    return ['excalidraw-node', mergeAttributes(HTMLAttributes)];
  },

  addNodeView() {
    return ReactNodeViewRenderer(ExcalidrawComponent);
  },

  addCommands() {
    return {
      setExcalidraw:
        () =>
        ({ commands }) => {
          return commands.insertContent({
            type: this.name,
          });
        },
    } as Partial<RawCommands>;
  },
});

