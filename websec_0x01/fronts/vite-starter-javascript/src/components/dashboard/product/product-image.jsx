'use client';

import * as React from 'react';
import Box from '@mui/joy/Box';
import IconButton from '@mui/joy/IconButton';
import { Trash as TrashIcon } from '@phosphor-icons/react/dist/ssr/Trash';

import { Image } from '@/components/core/image';

export function ProductImage({ url, onDelete }) {
  return (
    <Box
      sx={{
        bgcolor: 'var(--joy-palette-background-level1)',
        border: '1px dotted var(--joy-palette-neutral-outlinedBorder)',
        borderRadius: 'var(--joy-radius-sm)',
        height: '100px',
        overflow: 'hidden',
        position: 'relative',
        width: '100px',
        '&:not(:hover) > *:nth-child(2)': { display: 'none' },
      }}
    >
      <Image alt="preview" fill src={url} style={{ objectFit: 'cover', zIndex: 1 }} />
      <Box
        sx={{
          alignItems: 'center',
          bgcolor: 'rgba(0, 0, 0, 0.5)',
          cursor: 'pointer',
          display: 'flex',
          height: '100%',
          justifyContent: 'center',
          left: 0,
          position: 'absolute',
          top: 0,
          width: '100%',
          zIndex: 2,
        }}
      >
        <IconButton color="danger" onClick={onDelete} size="sm" variant="solid">
          <TrashIcon fontSize="var(--Icon-fontSize)" weight="bold" />
        </IconButton>
      </Box>
    </Box>
  );
}
