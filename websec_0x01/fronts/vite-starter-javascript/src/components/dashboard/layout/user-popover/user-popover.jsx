'use client';

import * as React from 'react';
import Avatar from '@mui/joy/Avatar';
import List from '@mui/joy/List';
import ListItemButton from '@mui/joy/ListItemButton';
import ListItemContent from '@mui/joy/ListItemContent';
import ListItemDecorator from '@mui/joy/ListItemDecorator';
import Stack from '@mui/joy/Stack';
import Typography from '@mui/joy/Typography';
import { CreditCard as CreditCardIcon } from '@phosphor-icons/react/dist/ssr/CreditCard';
import { GearSix as GearSixIcon } from '@phosphor-icons/react/dist/ssr/GearSix';
import { User as UserIcon } from '@phosphor-icons/react/dist/ssr/User';

import { config } from '@/config';
import { paths } from '@/paths';
import { AuthStrategy } from '@/lib/auth/strategy';
import { RouterLink } from '@/components/core/link';
import { Popup, PopupContent } from '@/components/core/popup';

import { Auth0SignOut } from './auth0-sign-out';
import { CognitoSignOut } from './cognito-sign-out';
import { CustomSignOut } from './custom-sign-out';
import { FirebaseSignOut } from './firebase-sign-out';
import { SupabaseSignOut } from './supabase-sign-out';

const user = {
  id: 'USR-000',
  avatar: '/assets/avatar.png',
  firstName: 'Rene',
  lastName: 'Wells',
  email: 'rene@devias.io',
};

export function UserPopover({ anchorEl, onClose, open }) {
  return (
    <Popup
      anchorEl={anchorEl}
      onClose={onClose}
      open={open}
      placement="bottom-end"
      sx={{ maxWidth: '340px', px: 2, py: 1 }}
    >
      <PopupContent sx={{ p: 3 }}>
        <Stack spacing={2}>
          <Stack direction="row" spacing={2} sx={{ alignItems: 'flex-start' }}>
            <Avatar src={user.avatar} />
            <div>
              <Typography fontWeight="lg" textColor="inherit">
                {user.firstName} {user.lastName}
              </Typography>
              <Typography level="body-sm" textColor="neutral.500">
                {user.email}
              </Typography>
            </div>
          </Stack>
          <List
            sx={{
              '--List-padding': 0,
              bgcolor: 'var(--joy-palette-background-level1)',
              borderRadius: 'var(--joy-radius-sm)',
              overflow: 'hidden',
              fontSize: 'var(--joy-fontSize-md)',
              fontWeight: 'var(--joy-fontWeight-md)',
              '& .MuiListItemButton-root': {
                '&:not(.Mui-selected):hover': { bgcolor: 'var(--joy-palette-background-level2)' },
              },
            }}
          >
            <ListItemButton component={RouterLink} href={paths.dashboard.settings.profile} onClick={onClose}>
              <ListItemDecorator>
                <UserIcon fontSize="var(--Icon-fontSize)" weight="bold" />
              </ListItemDecorator>
              <ListItemContent>Profile</ListItemContent>
            </ListItemButton>
            <ListItemButton component={RouterLink} href={paths.dashboard.settings.security} onClick={onClose}>
              <ListItemDecorator>
                <GearSixIcon fontSize="var(--Icon-fontSize)" weight="bold" />
              </ListItemDecorator>
              <ListItemContent>Security</ListItemContent>
            </ListItemButton>
            <ListItemButton component={RouterLink} href={paths.dashboard.settings.billing} onClick={onClose}>
              <ListItemDecorator>
                <CreditCardIcon fontSize="var(--Icon-fontSize)" weight="bold" />
              </ListItemDecorator>
              <ListItemContent>Billing</ListItemContent>
            </ListItemButton>
            {config.auth.strategy === AuthStrategy.CUSTOM ? <CustomSignOut /> : null}
            {config.auth.strategy === AuthStrategy.AUTH0 ? <Auth0SignOut /> : null}{' '}
            {config.auth.strategy === AuthStrategy.COGNITO ? <CognitoSignOut /> : null}
            {config.auth.strategy === AuthStrategy.FIREBASE ? <FirebaseSignOut /> : null}
            {config.auth.strategy === AuthStrategy.SUPABASE ? <SupabaseSignOut /> : null}
          </List>
        </Stack>
      </PopupContent>
    </Popup>
  );
}
