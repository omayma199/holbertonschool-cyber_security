import * as React from 'react';
import Box from '@mui/joy/Box';
import Chip from '@mui/joy/Chip';
import ListItem from '@mui/joy/ListItem';
import ListItemContent from '@mui/joy/ListItemContent';
import ListItemDecorator from '@mui/joy/ListItemDecorator';
import Stack from '@mui/joy/Stack';
import Typography from '@mui/joy/Typography';
import { Desktop as DesktopIcon } from '@phosphor-icons/react/dist/ssr/Desktop';
import { DeviceMobile as DeviceMobileIcon } from '@phosphor-icons/react/dist/ssr/DeviceMobile';
import dayjs from 'dayjs';

export function SessionItem({ session }) {
  const DeviceIcon = session.device === 'mobile' ? DeviceMobileIcon : DesktopIcon;

  return (
    <ListItem key={session.id} sx={{ alignItems: 'flex-start' }}>
      <ListItemDecorator>
        <DeviceIcon color="var(--joy-palette-text-primary)" fontSize="var(--joy-fontSize-lg)" />
      </ListItemDecorator>
      <ListItemContent>
        <Stack spacing={1}>
          <div>
            <Typography level="title-sm">{session.agent}</Typography>
            <Typography level="body-sm">
              {session.location} • {dayjs(session.createdAt).format('D MMM [at] h:mm A')}
            </Typography>
          </div>
          {session.active ? (
            <Chip
              size="sm"
              startDecorator={
                <Box
                  sx={{ bgcolor: 'var(--joy-palette-success-500)', borderRadius: '50%', height: '4px', width: '4px' }}
                />
              }
              variant="outlined"
            >
              Active now
            </Chip>
          ) : null}
        </Stack>
      </ListItemContent>
    </ListItem>
  );
}
