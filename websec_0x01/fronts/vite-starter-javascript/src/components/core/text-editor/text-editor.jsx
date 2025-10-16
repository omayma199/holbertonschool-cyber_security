'use client';

import * as React from 'react';
import Box from '@mui/joy/Box';
import { Link } from '@tiptap/extension-link';
import { Placeholder } from '@tiptap/extension-placeholder';
import { EditorContent, useEditor } from '@tiptap/react';
import { StarterKit } from '@tiptap/starter-kit';

import { TextEditorToolbar } from './text-editor-toolbar';

function noop() {
  return undefined;
}

/**
 * A thin wrapper around tiptap.
 *
 * How to get the updated content:
 * ```ts
 * <TextEditor
 *   onUpdate={({ editor }) => {
 *     console.log(editor.getHTML());
 *   }}
 * />
 * ```
 */
export function TextEditor({ content, editable = true, hideToolbar, onCreate = noop, onUpdate = noop, placeholder }) {
  const extensions = [
    StarterKit,
    Placeholder.configure({ emptyEditorClass: 'is-editor-empty', placeholder }),
    Link.configure({ openOnClick: false, autolink: true }),
  ];

  const editor = useEditor({ extensions, content, editable, onUpdate, onCreate });

  return (
    <Box
      className="tiptap-root"
      sx={{
        display: 'flex',
        flexDirection: 'column',
        ...(editable && {
          border: '1px solid var(--joy-palette-divider)',
          borderRadius: 'var(--joy-radius-sm)',
          boxShadow: 'var(--joy-shadow-xs)',
        }),
        '& .tiptap-container': { display: 'flex', flex: '1 1 auto', flexDirection: 'column', minHeight: 0 },
        '& .tiptap': {
          color: 'var(--joy-palette-text-primary)',
          flex: '1 1 auto',
          overflow: 'auto',
          p: '8px 16px',
          '&:focus-visible': { outline: 'none' },
          '&.resize-cursor': { cursor: 'ew-resize', '& table': { cursor: 'col-resize' } },
          '& .is-editor-empty:before': {
            color: 'var(--joy-palette-text-secondary)',
            content: 'attr(data-placeholder)',
            float: 'left',
            height: 0,
            pointerEvents: 'none',
          },
        },
      }}
    >
      {!hideToolbar ? <TextEditorToolbar editor={editor} /> : <div />}
      <EditorContent className="tiptap-container" editor={editor} />
    </Box>
  );
}
