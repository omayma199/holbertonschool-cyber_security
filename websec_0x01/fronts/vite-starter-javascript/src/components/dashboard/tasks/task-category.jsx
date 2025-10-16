import * as React from 'react';
import Chip from '@mui/joy/Chip';

const categoryMapping = { Branding: 'danger', Testing: 'primary', 'Design System': 'success' };

export function TaskCategory({ category }) {
  const color = categoryMapping[category] ?? 'neutral';

  return (
    <Chip color={color} size="sm" variant="soft">
      {category}
    </Chip>
  );
}
