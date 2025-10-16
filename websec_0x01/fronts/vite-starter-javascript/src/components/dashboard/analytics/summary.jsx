import * as React from 'react';
import Box from '@mui/joy/Box';
import Card from '@mui/joy/Card';
import Chip from '@mui/joy/Chip';
import Stack from '@mui/joy/Stack';
import Typography from '@mui/joy/Typography';
import { ArrowDownRight as ArrowDownRightIcon } from '@phosphor-icons/react/dist/ssr/ArrowDownRight';
import { ArrowUpRight as ArrowUpRightIcon } from '@phosphor-icons/react/dist/ssr/ArrowUpRight';

export function Summary() {
  return (
    <Card>
      <Box
        sx={{ display: 'grid', gap: 3, gridTemplateColumns: { xs: '1fr', md: 'repeat(2, 1fr)', lg: 'repeat(4, 1fr)' } }}
      >
        <Stack spacing={2}>
          <Typography level="body-sm" textColor="text.primary">
            Page Views
          </Typography>
          <Typography level="h2">1,019,084</Typography>
          <Chip
            color="success"
            size="sm"
            startDecorator={<ArrowUpRightIcon fontSize="var(--Icon-fontSize)" weight="bold" />}
            variant="soft"
          >
            13%
          </Chip>
        </Stack>
        <Stack spacing={2}>
          <Typography level="body-sm" textColor="text.primary">
            Sessions
          </Typography>
          <Typography level="h2">591,008</Typography>
          <Chip
            color="success"
            size="sm"
            startDecorator={<ArrowUpRightIcon fontSize="var(--Icon-fontSize)" weight="bold" />}
            variant="soft"
          >
            2%
          </Chip>
        </Stack>
        <Stack spacing={2}>
          <Typography level="body-sm" textColor="text.primary">
            Bounce Rate
          </Typography>
          <Typography level="h2">13.8%</Typography>
          <Chip
            color="success"
            size="sm"
            startDecorator={<ArrowUpRightIcon fontSize="var(--Icon-fontSize)" weight="bold" />}
            variant="soft"
          >
            5.7%
          </Chip>
        </Stack>
        <Stack spacing={2}>
          <Typography level="body-sm" textColor="text.primary">
            Session Duration
          </Typography>
          <Typography level="h2">3m 40s</Typography>
          <Chip
            color="danger"
            size="sm"
            startDecorator={<ArrowDownRightIcon fontSize="var(--Icon-fontSize)" weight="bold" />}
            variant="soft"
          >
            11.5%
          </Chip>
        </Stack>
      </Box>
    </Card>
  );
}
