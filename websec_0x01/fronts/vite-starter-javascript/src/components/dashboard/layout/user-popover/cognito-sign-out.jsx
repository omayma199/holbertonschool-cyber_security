'use client';

import * as React from 'react';
import { signOut } from '@aws-amplify/auth';
import ListItemButton from '@mui/joy/ListItemButton';
import ListItemContent from '@mui/joy/ListItemContent';
import ListItemDecorator from '@mui/joy/ListItemDecorator';
import { SignOut as SignOutIcon } from '@phosphor-icons/react/dist/ssr/SignOut';

import { logger } from '@/lib/default-logger';
import { toast } from '@/components/core/toaster';

export function CognitoSignOut() {
  const handleSignOut = React.useCallback(async () => {
    try {
      await signOut();
      // UserProvider will handle Router refresh
      // After refresh, GuestGuard will handle the redirect
    } catch (err) {
      logger.error('Sign out error', err);
      toast.error('Something went wrong, unable to sign out');
    }
  }, []);

  return (
    <ListItemButton onClick={handleSignOut}>
      <ListItemDecorator>
        <SignOutIcon fontSize="var(--Icon-fontSize)" weight="bold" />
      </ListItemDecorator>
      <ListItemContent>Sign Out</ListItemContent>
    </ListItemButton>
  );
}
