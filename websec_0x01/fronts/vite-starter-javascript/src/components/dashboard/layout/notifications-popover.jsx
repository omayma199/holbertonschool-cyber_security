'use client';

import * as React from 'react';
import Avatar from '@mui/joy/Avatar';
import Box from '@mui/joy/Box';
import Button from '@mui/joy/Button';
import Divider from '@mui/joy/Divider';
import Sheet from '@mui/joy/Sheet';
import Stack from '@mui/joy/Stack';
import Typography from '@mui/joy/Typography';
import dayjs from 'dayjs';

import { Popup, PopupContent } from '@/components/core/popup';

const notifications = [
  {
    id: 'EV-001',
    createdAt: dayjs().subtract(5, 'minute').toDate(),
    read: false,
    type: 'follow',
    author: { username: 'ammar', avatar: '/assets/avatar-3.png' },
  },
  {
    id: 'EV-002',
    createdAt: dayjs().subtract(3, 'hours').toDate(),
    read: false,
    type: 'mention',
    author: { username: 'zaid', avatar: '/assets/avatar-1.png' },
    message: 'This looks great @rene. Lets start with the next step.',
  },
  {
    id: 'EV-003',
    createdAt: dayjs().subtract(2, 'days').toDate(),
    read: true,
    type: 'project_invite',
    author: { username: 'wilkinson', avatar: '/assets/avatar-4.png' },
    project: 'Devias IO',
  },
];

export function NotificationsPopover({ anchorEl, onClose, open }) {
  return (
    <Popup
      anchorEl={anchorEl}
      onClose={onClose}
      open={open}
      placement="bottom-end"
      sx={{ maxWidth: '500px', px: 2, py: 1 }}
    >
      <PopupContent sx={{ p: 3 }}>
        <Stack spacing={2}>
          <Stack
            direction="row"
            spacing={2}
            sx={{ alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap' }}
          >
            <Typography level="h4">Notifications</Typography>
            <Button color="neutral" size="sm" variant="outlined">
              Mark as read
            </Button>
          </Stack>
          <Stack divider={<Divider />}>
            {notifications.map((notification) => (
              <Stack direction="row" key={notification.id} spacing={2} sx={{ p: 2 }}>
                <NotificationContent notification={notification} />
                {!notification.read ? (
                  <Box
                    sx={{
                      bgcolor: 'var(--joy-palette-primary-solidBg)',
                      borderRadius: '50%',
                      flexGrow: 0,
                      flexShrink: 0,
                      height: '6px',
                      mt: '3px',
                      width: '6px',
                    }}
                  />
                ) : null}
              </Stack>
            ))}
          </Stack>
          <Stack sx={{ alignItems: 'center' }}>
            <Button color="neutral" variant="plain">
              View all
            </Button>
          </Stack>
        </Stack>
      </PopupContent>
    </Popup>
  );
}

function NotificationContent({ notification }) {
  if (notification.type === 'follow') {
    return (
      <Stack direction="row" spacing={2} sx={{ flex: '1 1 auto' }}>
        <Avatar src={notification.author.avatar} />
        <div>
          <Typography fontSize="sm">
            <Typography fontWeight="lg" sx={{ cursor: 'pointer' }}>
              @{notification.author.username}
            </Typography>{' '}
            started following you
          </Typography>
          <Typography level="body-xs">{dayjs(notification.createdAt).format('dddd h:mm A')}</Typography>
        </div>
      </Stack>
    );
  }

  if (notification.type === 'mention') {
    return (
      <Stack direction="row" spacing={2} sx={{ flex: '1 1 auto' }}>
        <Avatar src={notification.author.avatar} />
        <Stack spacing={1}>
          <div>
            <Typography fontSize="sm">
              <Typography fontWeight="lg" sx={{ cursor: 'pointer' }}>
                @{notification.author.username}
              </Typography>{' '}
              mentioned you in a post
            </Typography>
            <Typography level="body-xs">{dayjs(notification.createdAt).format('dddd h:mm A')}</Typography>
          </div>
          <Sheet
            sx={{
              border: '1px solid var(--joy-palette-neutral-outlinedBorder)',
              borderRadius: 'var(--joy-radius-md)',
              boxShadow: 'var(--joy-shadow-sm)',
              p: 1,
            }}
          >
            <Typography fontSize="sm">{notification.message}</Typography>
          </Sheet>
        </Stack>
      </Stack>
    );
  }

  if (notification.type === 'project_invite') {
    return (
      <Stack direction="row" spacing={2} sx={{ flex: '1 1 auto' }}>
        <Avatar src={notification.author.avatar} />
        <Stack spacing={1}>
          <div>
            <Typography fontSize="sm">
              <Typography fontWeight="lg" sx={{ cursor: 'pointer' }}>
                @{notification.author.username}
              </Typography>{' '}
              invited you to{' '}
              <Typography fontWeight="lg" sx={{ cursor: 'pointer' }}>
                {notification.project}
              </Typography>{' '}
              project
            </Typography>
            <Typography level="body-xs">{dayjs(notification.createdAt).format('dddd h:mm A')}</Typography>
          </div>
          <Stack direction="row" spacing={1} sx={{ flexWrap: 'wrap' }}>
            <Button color="neutral" size="sm" variant="outlined">
              Decline
            </Button>
            <Button size="sm">Accept</Button>
          </Stack>
        </Stack>
      </Stack>
    );
  }

  return <Box sx={{ flex: '1 1 auto' }} />;
}
