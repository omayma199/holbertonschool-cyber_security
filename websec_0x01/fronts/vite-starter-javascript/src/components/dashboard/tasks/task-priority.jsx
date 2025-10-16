import * as React from 'react';
import Typography from '@mui/joy/Typography';
import { Diamond as DiamondIcon } from '@phosphor-icons/react/dist/ssr/Diamond';

const priorityMapping = {
  high: { label: 'High', color: 'var(--joy-palette-danger-400)' },
  mid: { label: 'Mid', color: 'var(--joy-palette-warning-200)' },
  low: { label: 'Low', color: 'var(--joy-palette-success-400)' },
};

export function TaskPriority({ priority }) {
  const { label, color } = priorityMapping[priority] ?? { label: 'Unknown', color: 'var(--joy-palette-neutral-600)' };

  return (
    <Typography level="body-xs" startDecorator={<DiamondIcon fill={color} weight="fill" />}>
      {label}
    </Typography>
  );
}
