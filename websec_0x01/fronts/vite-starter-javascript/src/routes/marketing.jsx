import * as React from 'react';
import { Outlet } from 'react-router-dom';

import { Page as HomePage } from '@/pages/marketing/home';
import { Layout as MarketingLayout } from '@/components/marketing/layout/layout';

export const routes = [
  {
    element: (
      <MarketingLayout>
        <Outlet />
      </MarketingLayout>
    ),
    children: [{ index: true, element: <HomePage /> }],
  },
];
