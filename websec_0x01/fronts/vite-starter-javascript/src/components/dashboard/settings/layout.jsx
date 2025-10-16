import * as React from 'react';
import Box from '@mui/joy/Box';
import Stack from '@mui/joy/Stack';
import Typography from '@mui/joy/Typography';

import { SettingsTabs } from '@/components/dashboard/settings/settings-tabs';

export function Layout({ children }) {
  return (
    <Box sx={{ p: 'var(--Content-padding)' }}>
      <Stack spacing={3}>
        <Typography fontSize={{ xs: 'xl3', lg: 'xl4' }} level="h1">
          Settings
        </Typography>
        <SettingsTabs />
        {children}
      </Stack>
    </Box>
  );
}
