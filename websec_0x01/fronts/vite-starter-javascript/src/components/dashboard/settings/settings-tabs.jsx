'use client';

import * as React from 'react';
import Box from '@mui/joy/Box';
import Tab from '@mui/joy/Tab';
import TabList from '@mui/joy/TabList';
import Tabs from '@mui/joy/Tabs';

import { paths } from '@/paths';
import { usePathname } from '@/hooks/use-pathname';
import { RouterLink } from '@/components/core/link';

export function SettingsTabs() {
  const pathname = usePathname();
  const segments = pathname.split('/').filter(Boolean);
  const segment = segments.length > 2 ? segments.pop() : 'profile';

  return (
    <Box sx={{ display: 'flex' }}>
      <Tabs value={segment} variant="custom">
        <TabList>
          <Tab component={RouterLink} href={paths.dashboard.settings.profile} value="profile">
            Profile
          </Tab>
          <Tab component={RouterLink} href={paths.dashboard.settings.security} value="security">
            Security
          </Tab>
          <Tab component={RouterLink} href={paths.dashboard.settings.billing} value="billing">
            Billing
          </Tab>
        </TabList>
      </Tabs>
    </Box>
  );
}
