import * as React from 'react';
import Box from '@mui/joy/Box';
import Link from '@mui/joy/Link';
import Typography from '@mui/joy/Typography';
import { House as HouseIcon } from '@phosphor-icons/react/dist/ssr/House';

import { RouterLink } from '@/components/core/link';

export function BreadcrumbsItem({ children, href, type }) {
  if (type === 'start' && href) {
    return (
      <Box component={RouterLink} href={href} sx={{ display: 'inline-flex' }}>
        <HouseIcon color="var(--joy-palette-text-primary)" />
      </Box>
    );
  }

  if (type === 'end') {
    return (
      <Typography fontSize="sm" fontWeight="md" textColor="text.secondary">
        {children}
      </Typography>
    );
  }

  if (href) {
    return (
      <Link component={RouterLink} fontSize="sm" fontWeight="md" href={href} textColor="text.primary" underline="none">
        {children}
      </Link>
    );
  }

  return null;
}
