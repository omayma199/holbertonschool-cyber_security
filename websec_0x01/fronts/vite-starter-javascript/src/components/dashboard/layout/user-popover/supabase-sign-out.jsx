'use client';

import * as React from 'react';
import ListItemButton from '@mui/joy/ListItemButton';
import ListItemContent from '@mui/joy/ListItemContent';
import ListItemDecorator from '@mui/joy/ListItemDecorator';
import { SignOut as SignOutIcon } from '@phosphor-icons/react/dist/ssr/SignOut';

import { logger } from '@/lib/default-logger';
import { createClient as createSupabaseClient } from '@/lib/supabase/client';
import { toast } from '@/components/core/toaster';

export function SupabaseSignOut() {
  const [supabaseClient] = React.useState(createSupabaseClient());

  const handleSignOut = React.useCallback(async () => {
    try {
      const { error } = await supabaseClient.auth.signOut();

      if (error) {
        logger.error('Sign out error', error);
        toast.error('Something went wrong, unable to sign out');
      } else {
        // UserProvider will handle Router refresh
        // After refresh, GuestGuard will handle the redirect
      }
    } catch (err) {
      logger.error('Sign out error', err);
      toast.error('Something went wrong, unable to sign out');
    }
  }, [supabaseClient]);

  return (
    <ListItemButton onClick={handleSignOut}>
      <ListItemDecorator>
        <SignOutIcon fontSize="var(--Icon-fontSize)" weight="bold" />
      </ListItemDecorator>
      <ListItemContent>Sign Out</ListItemContent>
    </ListItemButton>
  );
}
