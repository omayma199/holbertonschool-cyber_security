import * as React from 'react';
import Avatar from '@mui/joy/Avatar';
import LinearProgress from '@mui/joy/LinearProgress';
import Stack from '@mui/joy/Stack';
import Typography from '@mui/joy/Typography';
import { Check as CheckIcon } from '@phosphor-icons/react/dist/ssr/Check';
import { ClockCountdown as ClockCountdownIcon } from '@phosphor-icons/react/dist/ssr/ClockCountdown';

const typeMapping = {
  pending: {
    icon: (
      <Avatar color="neutral" sx={{ '--Avatar-size': '24px', borderWidth: '2px' }} variant="outlined">
        &nbsp;
      </Avatar>
    ),
    progress: 0,
    textColor: 'text.tertiary',
  },
  current: {
    icon: (
      <Avatar
        color="warning"
        sx={{ '--Avatar-size': '24px', '--Icon-fontSize': 'var(--joy-fontSize-xl)' }}
        variant="soft"
      >
        <ClockCountdownIcon fontSize="var(--Icon-fontSize)" weight="bold" />
      </Avatar>
    ),
    progress: 40,
    textColor: 'text.tertiary',
  },
  done: {
    icon: (
      <Avatar
        color="success"
        sx={{ '--Avatar-size': '24px', '--Icon-fontSize': 'var(--joy-fontSize-md)' }}
        variant="solid"
      >
        <CheckIcon fontSize="var(--Icon-fontSize)" weight="bold" />
      </Avatar>
    ),
    progress: 100,
    textColor: 'text.primary',
  },
};

export function DeliveryProgress({ label, status }) {
  const { icon, progress, textColor } = typeMapping[status] ?? { icon: null, progress: 0 };

  return (
    <Stack spacing={1}>
      <LinearProgress
        color="success"
        determinate
        sx={{ bgcolor: 'var(--joy-palette-background-level2)', width: '200px' }}
        value={progress}
        variant="plain"
      />
      <Stack direction="row" spacing={1} sx={{ alignItems: 'center' }}>
        {icon}
        <Typography level="body-sm" textColor={textColor}>
          {label}
        </Typography>
      </Stack>
    </Stack>
  );
}
