import { paths } from '@/paths';

export const layoutConfig = {
  navItems: [
    {
      key: 'dashboards',
      title: 'Dashboards',
      items: [
        { key: 'overview', title: 'Overview', href: paths.dashboard.overview, icon: 'grid-four' },
        { key: 'smart-home', title: 'Smart Home', href: paths.dashboard.smartHome, icon: 'thermometer' },
        { key: 'logistics', title: 'Logistics', href: paths.dashboard.logistics, icon: 'truck' },
        { key: 'analytics', title: 'Analytics', href: paths.dashboard.analytics, icon: 'chart-pie' },
        { key: 'crypto', title: 'Crypto', href: paths.dashboard.crypto, icon: 'currency-btc' },
      ],
    },
    {
      key: 'general',
      title: 'General',
      items: [
        {
          key: 'orders',
          title: 'Orders',
          icon: 'shopping-cart',
          items: [
            { key: 'orders', title: 'List Orders', href: paths.dashboard.orders.list },
            { key: 'orders:create', title: 'Create Order', href: paths.dashboard.orders.create },
            { key: 'orders:details', title: 'Order Details', href: paths.dashboard.orders.details('1') },
          ],
        },
        {
          key: 'invoices',
          title: 'Invoices',
          icon: 'receipt',
          items: [
            { key: 'invoices', title: 'List Invoices', href: paths.dashboard.invoices.list },
            { key: 'invoices:create', title: 'Create Invoice', href: paths.dashboard.invoices.create },
            { key: 'invoices:details', title: 'Invoice Details', href: paths.dashboard.invoices.details('1') },
          ],
        },
        {
          key: 'products',
          title: 'Products',
          icon: 'package',
          items: [
            { key: 'products', title: 'List Products', href: paths.dashboard.products.list },
            { key: 'products:create', title: 'Create Product', href: paths.dashboard.products.create },
            { key: 'products:details', title: 'Product Details', href: paths.dashboard.products.details('1') },
          ],
        },
        {
          key: 'customer',
          title: 'Customers',
          icon: 'users',
          items: [
            { key: 'customer', title: 'List Customers', href: paths.dashboard.customers.list },
            { key: 'customer:create', title: 'Create Customer', href: paths.dashboard.customers.create },
            { key: 'customer:details', title: 'Customer Details', href: paths.dashboard.customers.details('1') },
          ],
        },
        {
          key: 'team',
          title: 'Team',
          href: paths.dashboard.team.members.list,
          icon: 'buildings',
          matcher: { type: 'startsWith', href: '/dashboard/team' },
        },
        { key: 'tasks', title: 'Tasks', href: paths.dashboard.tasks, icon: 'kanban' },
        {
          key: 'settings',
          title: 'Settings',
          href: paths.dashboard.settings.profile,
          icon: 'gear-six',
          matcher: { type: 'startsWith', href: paths.dashboard.settings.profile },
        },
        { key: 'blank', title: 'Blank', href: paths.dashboard.blank, icon: 'file' },
      ],
    },
  ],
};
