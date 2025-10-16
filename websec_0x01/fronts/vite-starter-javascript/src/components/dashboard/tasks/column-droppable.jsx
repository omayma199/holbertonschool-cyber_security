'use client';

import * as React from 'react';
import { useDroppable } from '@dnd-kit/core';
import Stack from '@mui/joy/Stack';

import { TaskCard } from './task-card';
import { TaskDraggable } from './task-draggable';

export function ColumnDroppable({ id, onTaskOpen, tasks }) {
  const { over, setNodeRef } = useDroppable({ id, data: { type: 'column' } });

  const isOver = over ? over.id === id || tasks.find((task) => task.id === over.id) : false;

  return (
    <Stack
      ref={setNodeRef}
      spacing={3}
      sx={{
        flex: '1 1 auto',
        minHeight: '250px',
        ...(isOver &&
          {
            // bgcolor: 'var(--joy-palette-background-level2)',
          }),
      }}
    >
      {tasks.map((task) => (
        <TaskDraggable id={task.id} key={task.id}>
          <TaskCard onOpen={onTaskOpen} task={task} />
        </TaskDraggable>
      ))}
    </Stack>
  );
}
