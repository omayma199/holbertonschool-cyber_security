import * as React from 'react';

import { UserContext } from '@/contexts/auth/user-context';

export function useUser() {
  const ctx = React.useContext(UserContext);

  if (!ctx) {
    throw new Error('useUser must be used within a UserProvider');
  }

  return ctx;
}
