import * as React from 'react';
import Box from '@mui/joy/Box';
import Breadcrumbs from '@mui/joy/Breadcrumbs';
import Button from '@mui/joy/Button';
import Card from '@mui/joy/Card';
import Stack from '@mui/joy/Stack';
import Typography from '@mui/joy/Typography';
import { Plus as PlusIcon } from '@phosphor-icons/react/dist/ssr/Plus';
import { Printer as PrinterIcon } from '@phosphor-icons/react/dist/ssr/Printer';
import dayjs from 'dayjs';
import { Helmet } from 'react-helmet-async';
import { useSearchParams } from 'react-router-dom';

import { config } from '@/config';
import { paths } from '@/paths';
import { BreadcrumbsItem } from '@/components/core/breadcrumbs-item';
import { BreadcrumbsSeparator } from '@/components/core/breadcrumbs-separator';
import { RouterLink } from '@/components/core/link';
import { OrdersFilters } from '@/components/dashboard/order/orders-filters';
import { OrdersPagination } from '@/components/dashboard/order/orders-pagination';
import { OrdersSummary } from '@/components/dashboard/order/orders-summary';
import { OrdersTable } from '@/components/dashboard/order/orders-table';

const metadata = { title: `List | Orders | Dashboard | ${config.site.name}` };

const orders = [
  {
    id: 'ORD-006',
    customer: { name: 'Zaid Schwartz', email: 'zaid.schwartz@domain.com', avatar: '/assets/avatar-1.png' },
    lineItems: 1,
    currency: 'USD',
    amount: 49.1,
    status: 'pending',
    createdAt: dayjs().subtract(5, 'minute').toDate(),
  },
  {
    id: 'ORD-005',
    customer: { name: 'Mathilde Lewis', email: 'mathilde.lewis@domain.com', avatar: '/assets/avatar-6.png' },
    lineItems: 1,
    currency: 'USD',
    amount: 600,
    status: 'completed',
    createdAt: dayjs().subtract(16, 'minute').subtract(1, 'hour').subtract(1, 'day').toDate(),
  },
  {
    id: 'ORD-004',
    customer: { name: 'Ammar Foley', email: 'ammar.foley@domain.com', avatar: '/assets/avatar-3.png' },
    lineItems: 2,
    currency: 'USD',
    amount: 240,
    status: 'canceled',
    createdAt: dayjs().subtract(45, 'minute').subtract(2, 'hour').subtract(1, 'day').toDate(),
  },
  {
    id: 'ORD-003',
    customer: { name: 'Julius Vaughan', email: 'julius.vaughan@domain.com', avatar: '/assets/avatar-7.png' },
    lineItems: 1,
    currency: 'USD',
    amount: 56.24,
    status: 'completed',
    createdAt: dayjs().subtract(23, 'minute').subtract(6, 'hour').subtract(3, 'day').toDate(),
  },
  {
    id: 'ORD-002',
    customer: { name: 'Pippa Wilkinson', email: 'pippa.wilkinson@domain.com', avatar: '/assets/avatar-4.png' },
    lineItems: 1,
    currency: 'USD',
    amount: 14.99,
    status: 'completed',
    createdAt: dayjs().subtract(51, 'minute').subtract(8, 'hour').subtract(3, 'day').toDate(),
  },
  {
    id: 'ORD-001',
    customer: { name: 'Zaid Schwartz', email: 'zaid.schwartz@domain.com', avatar: '/assets/avatar-1.png' },
    lineItems: 2,
    currency: 'USD',
    amount: 285,
    status: 'pending',
    createdAt: dayjs().subtract(28, 'minute').subtract(1, 'hour').subtract(4, 'day').toDate(),
  },
];

export function Page() {
  const searchParams = useExtractSearchParams();

  const page = searchParams.page ? parseInt(searchParams.page, 10) : 1;
  const rowsPerPage = 5;
  const paginatedOrders = applyPagination(orders, page, rowsPerPage);

  return (
    <React.Fragment>
      <Helmet>
        <title>{metadata.title}</title>
      </Helmet>
      <Box sx={{ p: 'var(--Content-padding)' }}>
        <Stack spacing={3}>
          <Stack direction={{ xs: 'column', sm: 'row' }} spacing={3} sx={{ alignItems: 'flex-start' }}>
            <Stack spacing={1} sx={{ flex: '1 1 auto' }}>
              <Typography fontSize={{ xs: 'xl3', lg: 'xl4' }} level="h1">
                Orders
              </Typography>
              <Breadcrumbs separator={<BreadcrumbsSeparator />}>
                <BreadcrumbsItem href={paths.dashboard.overview} type="start" />
                <BreadcrumbsItem type="end">Orders</BreadcrumbsItem>
              </Breadcrumbs>
            </Stack>
            <Stack direction="row" spacing={2} sx={{ alignItems: 'center' }}>
              <Button
                color="neutral"
                startDecorator={<PrinterIcon fontSize="var(--Icon-fontSize)" weight="bold" />}
                variant="outlined"
              >
                Download
              </Button>
              <Button
                component={RouterLink}
                href={paths.dashboard.orders.create}
                startDecorator={<PlusIcon fontSize="var(--Icon-fontSize)" weight="bold" />}
              >
                Create
              </Button>
            </Stack>
          </Stack>
          <OrdersSummary active={268} canceled={4} completed={623} total={891} />
          <OrdersFilters />
          <Card sx={{ '--Card-padding': 0, overflowX: 'auto' }}>
            <OrdersTable rows={paginatedOrders} />
          </Card>
          <OrdersPagination count={orders.length} page={page} rowsPerPage={rowsPerPage} />
        </Stack>
      </Box>
    </React.Fragment>
  );
}

function useExtractSearchParams() {
  const [searchParams] = useSearchParams();

  return { page: searchParams.get('page') || undefined };
}

// Pagination has to be done on the server.

function applyPagination(items, page, rowsPerPage) {
  const start = (page - 1) * rowsPerPage;
  const end = start + rowsPerPage;

  return items.slice(start, end);
}
