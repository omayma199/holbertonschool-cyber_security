import * as React from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import ListItemButton from '@mui/joy/ListItemButton';
import ListItemContent from '@mui/joy/ListItemContent';
import ListItemDecorator from '@mui/joy/ListItemDecorator';
import { SignOut as SignOutIcon } from '@phosphor-icons/react/dist/ssr/SignOut';

import { logger } from '@/lib/default-logger';
import { toast } from '@/components/core/toaster';

export function Auth0SignOut() {
  const { logout } = useAuth0();

  const handleSignOut = React.useCallback(async () => {
    try {
      await logout();
      // This will redirect to the Auth0 and then redirect back to the app
    } catch (err) {
      logger.error('Sign out error', err);
      toast.error('Something went wrong, unable to sign out');
    }
  }, [logout]);

  return (
    <ListItemButton onClick={handleSignOut}>
      <ListItemDecorator>
        <SignOutIcon fontSize="var(--Icon-fontSize)" weight="bold" />
      </ListItemDecorator>
      <ListItemContent>Sign Out</ListItemContent>
    </ListItemButton>
  );
}
