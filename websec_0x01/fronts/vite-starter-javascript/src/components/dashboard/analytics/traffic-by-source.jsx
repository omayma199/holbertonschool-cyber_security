import * as React from 'react';
import Box from '@mui/joy/Box';
import Card from '@mui/joy/Card';
import Stack from '@mui/joy/Stack';
import Typography from '@mui/joy/Typography';

import { Image } from '@/components/core/image';

const logos = {
  facebook: '/assets/logo-facebook.svg',
  google: '/assets/logo-google.svg',
  linkedin: '/assets/logo-linkedin.svg',
  twitter: '/assets/logo-twitter.svg',
};

export function TrafficBySource({ data = [] }) {
  return (
    <Card>
      <Typography level="h4">Traffic by Source</Typography>
      <Box sx={{ display: 'grid', gap: 2, gridTemplateColumns: 'repeat(2, 1fr)' }}>
        {data.map((entry) => {
          const logo = logos[entry.icon];

          return (
            <Card key={entry.name} sx={{ p: 3 }}>
              <Stack spacing={1} sx={{ alignItems: 'center' }}>
                {logo ? (
                  <Image alt="" height={32} src={logo} width={32} />
                ) : (
                  <Box sx={{ bgcolor: 'var(--joy-palette-background-level1)', height: '32px', width: '32px' }} />
                )}
                <div>
                  <Typography level="h4" textAlign="center">
                    {new Intl.NumberFormat('en-US', { notation: 'compact' }).format(entry.value)}
                  </Typography>
                  <Typography level="body-sm" textAlign="center">
                    {entry.name}
                  </Typography>
                </div>
              </Stack>
            </Card>
          );
        })}
      </Box>
    </Card>
  );
}
