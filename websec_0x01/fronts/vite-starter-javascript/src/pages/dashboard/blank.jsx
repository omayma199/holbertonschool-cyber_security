import * as React from 'react';
import Box from '@mui/joy/Box';
import Stack from '@mui/joy/Stack';
import Typography from '@mui/joy/Typography';
import { Helmet } from 'react-helmet-async';

import { config } from '@/config';

const metadata = { title: `Blank | Dashboard | ${config.site.name}` };

export function Page() {
  return (
    <React.Fragment>
      <Helmet>
        <title>{metadata.title}</title>
      </Helmet>
      <Box sx={{ p: 'var(--Content-padding)' }}>
        <Stack spacing={3}>
          <div>
            <Typography fontSize={{ xs: 'xl3', lg: 'xl4' }} level="h1">
              Blank
            </Typography>
          </div>
        </Stack>
      </Box>
    </React.Fragment>
  );
}
