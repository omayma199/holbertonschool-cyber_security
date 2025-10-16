import * as React from 'react';
import Box from '@mui/joy/Box';
import Breadcrumbs from '@mui/joy/Breadcrumbs';
import Button from '@mui/joy/Button';
import Card from '@mui/joy/Card';
import Stack from '@mui/joy/Stack';
import Typography from '@mui/joy/Typography';
import { Plus as PlusIcon } from '@phosphor-icons/react/dist/ssr/Plus';
import { Helmet } from 'react-helmet-async';

import { config } from '@/config';
import { paths } from '@/paths';
import { BreadcrumbsItem } from '@/components/core/breadcrumbs-item';
import { BreadcrumbsSeparator } from '@/components/core/breadcrumbs-separator';
import { RouterLink } from '@/components/core/link';
import { CustomersFilters } from '@/components/dashboard/customer/customers-filters';
import { CustomersPagination } from '@/components/dashboard/customer/customers-pagination';
import { CustomersTable } from '@/components/dashboard/customer/customers-table';

const metadata = { title: `List | Customers | Dashboard | ${config.site.name}` };

const customers = [
  {
    id: 'USR-005',
    name: 'Olly Schroeder',
    avatar: '/assets/avatar-5.png',
    email: 'olly.schroeder@domain.com',
    phone: '(269) 278-4358',
    country: 'United States',
    state: 'Michigan',
    city: 'Three Rivers',
    zipCode: '49093',
    orders: 0,
    currency: 'USD',
    paid: 0,
  },
  {
    id: 'USR-004',
    name: 'Pippa Wilkinson',
    avatar: '/assets/avatar-4.png',
    email: 'pippa.wilkinson@domain.com',
    country: 'United States',
    state: 'Connecticut',
    city: 'Bridgeport',
    zipCode: '06604',
    orders: 3,
    currency: 'USD',
    paid: 154,
  },
  {
    id: 'USR-003',
    name: 'Ammar Foley',
    avatar: '/assets/avatar-3.png',
    email: 'ammar.foley@domain.com',
    phone: '(787) 992-6937',
    country: 'United States',
    state: 'Michigan',
    city: 'Watton',
    zipCode: '49970',
    orders: 1,
    currency: 'USD',
    paid: 75.25,
  },
  {
    id: 'USR-002',
    name: 'Sienna Hewitt',
    avatar: '/assets/avatar-2.png',
    email: 'sienna.hewitt@domain.com',
    phone: '(907) 555-0101',
    country: 'United States',
    state: 'Nebraska',
    city: 'Omaha',
    zipCode: '68164',
    orders: 8,
    currency: 'USD',
    paid: 432.09,
  },
  {
    id: 'USR-001',
    name: 'Zaid Schwartz',
    avatar: '/assets/avatar-1.png',
    email: 'zaid.schwartz@domain.com',
    phone: '(801) 301-7140',
    country: 'United States',
    state: 'Kentucky',
    city: 'Louisville',
    zipCode: '40202',
    orders: 1,
    currency: 'USD',
    paid: 600,
  },
];

export function Page() {
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
                Customers
              </Typography>
              <Breadcrumbs separator={<BreadcrumbsSeparator />}>
                <BreadcrumbsItem href={paths.dashboard.overview} type="start" />
                <BreadcrumbsItem type="end">Customers</BreadcrumbsItem>
              </Breadcrumbs>
            </Stack>
            <Stack direction="row" spacing={2} sx={{ alignItems: 'center' }}>
              <Button
                component={RouterLink}
                href={paths.dashboard.customers.create}
                startDecorator={<PlusIcon fontSize="var(--Icon-fontSize)" weight="bold" />}
              >
                Create
              </Button>
            </Stack>
          </Stack>
          <CustomersFilters />
          <Card sx={{ '--Card-padding': 0, overflowX: 'auto' }}>
            <CustomersTable rows={customers} />
          </Card>
          <CustomersPagination count={customers.length} page={1} rowsPerPage={5} />
        </Stack>
      </Box>
    </React.Fragment>
  );
}
