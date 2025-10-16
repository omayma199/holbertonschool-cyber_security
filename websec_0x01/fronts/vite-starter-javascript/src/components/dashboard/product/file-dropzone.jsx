'use client';

import * as React from 'react';
import Box from '@mui/joy/Box';
import Link from '@mui/joy/Link';
import Typography from '@mui/joy/Typography';
import { useDropzone } from 'react-dropzone';

export function FileDropzone({ caption, onDrop }) {
  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  return (
    <Box
      {...getRootProps()}
      sx={{
        bgcolor: 'var(--joy-palette-background-level1)',
        border: '1px dotted var(--joy-palette-neutral-outlinedBorder)',
        borderRadius: 'var(--joy-radius-md)',
        p: 2,
      }}
    >
      <input {...getInputProps()} />
      {isDragActive ? (
        <Typography>Drop the files here ...</Typography>
      ) : (
        <div>
          <Typography level="body-sm" textAlign="center">
            Drag & drop files or <Link>browse files</Link>
          </Typography>
          {caption ? (
            <Typography level="body-sm" textAlign="center">
              {caption}
            </Typography>
          ) : null}
        </div>
      )}
    </Box>
  );
}
