import * as React from 'react';
import Alert from '@mui/joy/Alert';
import Box from '@mui/joy/Box';
import Breadcrumbs from '@mui/joy/Breadcrumbs';
import Button from '@mui/joy/Button';
import Card from '@mui/joy/Card';
import Divider from '@mui/joy/Divider';
import Stack from '@mui/joy/Stack';
import Typography from '@mui/joy/Typography';
import { Plus as PlusIcon } from '@phosphor-icons/react/dist/ssr/Plus';
import { Trash as TrashIcon } from '@phosphor-icons/react/dist/ssr/Trash';
import { Warning as WarningIcon } from '@phosphor-icons/react/dist/ssr/Warning';
import dayjs from 'dayjs';
import { Helmet } from 'react-helmet-async';

import { config } from '@/config';
import { paths } from '@/paths';
import { BreadcrumbsItem } from '@/components/core/breadcrumbs-item';
import { BreadcrumbsSeparator } from '@/components/core/breadcrumbs-separator';
import { CustomerDetailsForm } from '@/components/dashboard/customer/customer-details-form';
import { InvoicesTable } from '@/components/dashboard/customer/invoices-table';
import { ShippingAddressCard } from '@/components/dashboard/customer/shipping-address-card';
import { SubscriptionsTable } from '@/components/dashboard/customer/subscriptions-table';

const metadata = { title: `Details | Customers | Dashboard | ${config.site.name}` };

export function Page() {
  return (
    <React.Fragment>
      <Helmet>
        <title>{metadata.title}</title>
      </Helmet>
      <Box sx={{ p: 'var(--Content-padding)' }}>
        <Stack spacing={5}>
          <Stack direction={{ xs: 'column', sm: 'row' }} spacing={3} sx={{ alignItems: 'flex-start' }}>
            <Stack spacing={1} sx={{ flex: '1 1 auto' }}>
              <Typography fontSize={{ xs: 'xl3', lg: 'xl4' }} level="h1">
                Customer Details
              </Typography>
              <Breadcrumbs separator={<BreadcrumbsSeparator />}>
                <BreadcrumbsItem href={paths.dashboard.overview} type="start" />
                <BreadcrumbsItem href={paths.dashboard.customers.list}>Customers</BreadcrumbsItem>
                <BreadcrumbsItem type="end">Details</BreadcrumbsItem>
              </Breadcrumbs>
            </Stack>
            <Stack direction="row" spacing={2} sx={{ alignItems: 'center' }}>
              <Button color="danger" startDecorator={<TrashIcon fontSize="var(--Icon-fontSize)" weight="bold" />}>
                Delete
              </Button>
            </Stack>
          </Stack>
          <div>
            <Alert
              color="warning"
              startDecorator={<WarningIcon fontSize="var(--Icon-fontSize)" weight="bold" />}
              variant="soft"
            >
              Account will be suspended in 2 days due to unpaid invoices
            </Alert>
          </div>
          <Stack divider={<Divider />} spacing={5}>
            <Stack spacing={3}>
              <Typography level="h4">Basic Information</Typography>
              <Box
                sx={{
                  bgcolor: 'var(--joy-palette-background-level1)',
                  borderRadius: 'var(--joy-radius-md)',
                  display: 'grid',
                  gap: 3,
                  gridTemplateColumns: { xs: '1fr', md: 'repeat(2, 1fr)', lg: 'repeat(4, 1fr)' },
                  p: 3,
                }}
              >
                {[
                  {
                    label: 'Paid',
                    value: new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(600),
                  },
                  { label: 'Orders', value: new Intl.NumberFormat('en-US').format(1) },
                  {
                    label: 'Charged off',
                    value: new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(0),
                  },
                  {
                    label: 'Credits',
                    value: new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(100),
                  },
                ].map((item) => (
                  <Stack key={item.label} spacing={1}>
                    <Typography level="h2">{item.value}</Typography>
                    <Typography level="body-sm">{item.label}</Typography>
                  </Stack>
                ))}
              </Box>
              <CustomerDetailsForm />
            </Stack>
            <Stack spacing={3}>
              <Typography level="h4">Shipping Addresses</Typography>
              <Stack direction="row" spacing={3} sx={{ flexWrap: 'wrap' }}>
                {[
                  {
                    id: 'ADR-001',
                    country: 'United States',
                    state: 'Kentucky',
                    city: 'Louisville',
                    street: '3794 Broaddus Avenue',
                    zipCode: '40202',
                    primary: true,
                  },
                  {
                    id: 'ADR-002',
                    country: 'United States',
                    state: 'Kentucky',
                    city: 'Lexington',
                    street: '3964 Black Stallion Road',
                    zipCode: '40507',
                  },
                ].map((address) => (
                  <ShippingAddressCard address={address} key={address.id} />
                ))}
              </Stack>
              <div>
                <Button
                  color="neutral"
                  size="sm"
                  startDecorator={<PlusIcon fontSize="var(--Icon-fontSize)" weight="bold" />}
                  variant="outlined"
                >
                  Add Address
                </Button>
              </div>
            </Stack>
            <Stack spacing={3}>
              <Typography level="h4">Payments</Typography>
              <Card sx={{ '--Card-padding': 0, overflowX: 'auto' }}>
                <InvoicesTable
                  rows={[
                    {
                      id: 'INV-003',
                      description: 'Enterprise Plan',
                      currency: 'USD',
                      amount: 300,
                      status: 'pending',
                      issueDate: dayjs().set('date', 1).toDate(),
                    },
                    {
                      id: 'INV-002',
                      description: 'Enterprise Plan',
                      currency: 'USD',
                      amount: 300,
                      status: 'paid',
                      issueDate: dayjs().set('date', 1).subtract(1, 'month').toDate(),
                    },
                    {
                      id: 'INV-001',
                      description: 'Enterprise Plan',
                      currency: 'USD',
                      amount: 300,
                      status: 'paid',
                      issueDate: dayjs().set('date', 1).subtract(2, 'month').toDate(),
                    },
                  ]}
                />
              </Card>
            </Stack>
            <Stack spacing={3}>
              <Typography level="h4">Subscriptions</Typography>
              <Card sx={{ '--Card-padding': 0, overflowX: 'auto' }}>
                <SubscriptionsTable
                  rows={[
                    {
                      id: 'SUB-001',
                      billingCycle: 'month',
                      productName: 'Enterprise Plan',
                      currency: 'USD',
                      amount: 300,
                      stripeId: 'plan_2T1whhm5VhQ3Yj2',
                      createdAt: dayjs().set('date', 1).subtract(2, 'month').toDate(),
                      updatedAt: dayjs().subtract(5, 'day').toDate(),
                    },
                  ]}
                />
              </Card>
              <div>
                <Button
                  color="neutral"
                  size="sm"
                  startDecorator={<PlusIcon fontSize="var(--Icon-fontSize)" weight="bold" />}
                  variant="outlined"
                >
                  Add Subscription
                </Button>
              </div>
            </Stack>
          </Stack>
        </Stack>
      </Box>
    </React.Fragment>
  );
}
