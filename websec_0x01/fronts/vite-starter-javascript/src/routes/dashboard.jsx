import * as React from 'react';
import { Outlet } from 'react-router-dom';

import { Layout as DashboardLayout } from '@/components/dashboard/layout/layout';
import { Layout as SettingsLayout } from '@/components/dashboard/settings/layout';
import { Layout as TeamLayout } from '@/components/dashboard/team/layout';

export const route = {
  path: 'dashboard',
  element: (
    <DashboardLayout>
      <Outlet />
    </DashboardLayout>
  ),
  children: [
    {
      index: true,
      lazy: async () => {
        const { Page } = await import('@/pages/dashboard/overview');
        return { Component: Page };
      },
    },
    {
      path: 'analytics',
      lazy: async () => {
        const { Page } = await import('@/pages/dashboard/analytics');
        return { Component: Page };
      },
    },
    {
      path: 'blank',
      lazy: async () => {
        const { Page } = await import('@/pages/dashboard/blank');
        return { Component: Page };
      },
    },
    {
      path: 'crypto',
      lazy: async () => {
        const { Page } = await import('@/pages/dashboard/crypto');
        return { Component: Page };
      },
    },
    {
      path: 'customers',
      children: [
        {
          index: true,
          lazy: async () => {
            const { Page } = await import('@/pages/dashboard/customers/list');
            return { Component: Page };
          },
        },
        {
          path: 'create',
          lazy: async () => {
            const { Page } = await import('@/pages/dashboard/customers/create');
            return { Component: Page };
          },
        },
        {
          path: ':customerId',
          lazy: async () => {
            const { Page } = await import('@/pages/dashboard/customers/details');
            return { Component: Page };
          },
        },
      ],
    },
    {
      path: 'invoices',
      children: [
        {
          index: true,
          lazy: async () => {
            const { Page } = await import('@/pages/dashboard/invoices/list');
            return { Component: Page };
          },
        },
        {
          path: 'create',
          lazy: async () => {
            const { Page } = await import('@/pages/dashboard/invoices/create');
            return { Component: Page };
          },
        },
        {
          path: ':invoiceId',
          lazy: async () => {
            const { Page } = await import('@/pages/dashboard/invoices/details');
            return { Component: Page };
          },
        },
      ],
    },
    {
      path: 'logistics',
      lazy: async () => {
        const { Page } = await import('@/pages/dashboard/logistics');
        return { Component: Page };
      },
    },
    {
      path: 'orders',
      children: [
        {
          index: true,
          lazy: async () => {
            const { Page } = await import('@/pages/dashboard/orders/list');
            return { Component: Page };
          },
        },
        {
          path: 'create',
          lazy: async () => {
            const { Page } = await import('@/pages/dashboard/orders/create');
            return { Component: Page };
          },
        },
        {
          path: ':orderId',
          lazy: async () => {
            const { Page } = await import('@/pages/dashboard/orders/details');
            return { Component: Page };
          },
        },
      ],
    },
    {
      path: 'products',
      children: [
        {
          index: true,
          lazy: async () => {
            const { Page } = await import('@/pages/dashboard/products/list');
            return { Component: Page };
          },
        },
        {
          path: 'create',
          lazy: async () => {
            const { Page } = await import('@/pages/dashboard/products/create');
            return { Component: Page };
          },
        },
        {
          path: ':productId',
          lazy: async () => {
            const { Page } = await import('@/pages/dashboard/products/details');
            return { Component: Page };
          },
        },
      ],
    },
    {
      path: 'settings',
      element: (
        <SettingsLayout>
          <Outlet />
        </SettingsLayout>
      ),
      children: [
        {
          index: true,
          lazy: async () => {
            const { Page } = await import('@/pages/dashboard/settings/profile');
            return { Component: Page };
          },
        },
        {
          path: 'billing',
          lazy: async () => {
            const { Page } = await import('@/pages/dashboard/settings/billing');
            return { Component: Page };
          },
        },
        {
          path: 'security',
          lazy: async () => {
            const { Page } = await import('@/pages/dashboard/settings/security');
            return { Component: Page };
          },
        },
      ],
    },
    {
      path: 'smart-home',
      lazy: async () => {
        const { Page } = await import('@/pages/dashboard/smart-home');
        return { Component: Page };
      },
    },
    {
      path: 'tasks',
      lazy: async () => {
        const { Page } = await import('@/pages/dashboard/tasks');
        return { Component: Page };
      },
    },
    {
      path: 'team',
      element: (
        <TeamLayout>
          <Outlet />
        </TeamLayout>
      ),
      children: [
        {
          path: 'members',
          lazy: async () => {
            const { Page } = await import('@/pages/dashboard/team/members');
            return { Component: Page };
          },
        },
        {
          path: 'permissions',
          lazy: async () => {
            const { Page } = await import('@/pages/dashboard/team/permissions');
            return { Component: Page };
          },
        },
      ],
    },
  ],
};
