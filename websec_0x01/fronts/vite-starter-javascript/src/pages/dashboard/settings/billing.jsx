import * as React from 'react';
import Box from '@mui/joy/Box';
import Button from '@mui/joy/Button';
import Card from '@mui/joy/Card';
import Chip from '@mui/joy/Chip';
import Divider from '@mui/joy/Divider';
import Grid from '@mui/joy/Grid';
import Stack from '@mui/joy/Stack';
import Typography from '@mui/joy/Typography';
import { ArrowUpRight as ArrowUpRightIcon } from '@phosphor-icons/react/dist/ssr/ArrowUpRight';
import { Export as ExportIcon } from '@phosphor-icons/react/dist/ssr/Export';
import { Plus as PlusIcon } from '@phosphor-icons/react/dist/ssr/Plus';
import dayjs from 'dayjs';
import { Helmet } from 'react-helmet-async';

import { config } from '@/config';
import { InvoicesTable } from '@/components/dashboard/settings/invoices-table';
import { PaymentMethodCard } from '@/components/dashboard/settings/payment-method-card';

const metadata = { title: `Billing | Settings | Dashboard | ${config.site.name}` };

export function Page() {
  return (
    <React.Fragment>
      <Helmet>
        <title>{metadata.title}</title>
      </Helmet>
      <Stack divider={<Divider />} spacing={5}>
        <Stack spacing={5}>
          <Typography level="h4">Billing Information</Typography>
          <Box
            sx={{
              display: 'grid',
              gridTemplateColumns: { sm: 'repeat(2, 1fr)', lg: 'repeat(4, 1fr)' },
              gap: 2,
              '& > *': {
                px: { sm: 2 },
                py: { xs: 2, sm: 0 },
                '&:not(:last-of-type)': {
                  borderBottom: { xs: '1px solid var(--joy-palette-divider)', sm: 'none' },
                  borderRight: { lg: '1px solid var(--joy-palette-divider)' },
                  pr: 4,
                },
                '&:nth-of-type(odd)': { borderRight: { sm: '1px solid var(--joy-palette-divider)' } },
              },
            }}
          >
            <Stack spacing={2}>
              <Typography level="body-sm">Start Date</Typography>
              <Typography level="h4">{dayjs().subtract(4, 'month').format('MMM D, YYYY')}</Typography>
            </Stack>
            <Stack spacing={2}>
              <Typography level="body-sm">Next Payment</Typography>
              <Typography level="h4">{dayjs().add(1, 'month').format('MMM D, YYYY')}</Typography>
            </Stack>
            <Stack spacing={2}>
              <Typography level="body-sm">Plan</Typography>
              <Stack direction="row" spacing={1} sx={{ alignItems: 'center', justifyContent: 'space-between' }}>
                <Typography level="h4">Starter</Typography>
                <Chip
                  color="primary"
                  size="sm"
                  startDecorator={<ArrowUpRightIcon fontSize="var(--joy-fontSize-md)" weight="bold" />}
                  variant="outlined"
                >
                  Manage
                </Chip>
              </Stack>
            </Stack>
            <Stack spacing={2}>
              <Typography level="body-sm">Upcoming Invoice</Typography>
              <Typography level="h4">
                {new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(99)}
              </Typography>
            </Stack>
          </Box>
        </Stack>
        <Stack spacing={3}>
          <Typography level="h4">Payment Method</Typography>
          <Grid container spacing={3}>
            {[
              { id: 'PMT-001', brand: 'Visa', cardNumber: '•••• •••• •••• 7707', expiry: '12/2026', primary: true },
              { id: 'PMT-002', brand: 'Visa', cardNumber: '•••• •••• •••• 5932', expiry: '11/2025' },
            ].map((paymentMethod) => (
              <Grid key={paymentMethod.id} lg={4} md={6} xl={3} xs={12}>
                <PaymentMethodCard paymentMethod={paymentMethod} />
              </Grid>
            ))}
          </Grid>
          <div>
            <Button
              color="neutral"
              size="sm"
              startDecorator={<PlusIcon fontSize="var(--Icon-fontSize)" weight="bold" />}
              variant="outlined"
            >
              Add Payment Method
            </Button>
          </div>
        </Stack>
        <Stack spacing={3}>
          <Stack direction="row" spacing={2} sx={{ alignItems: 'center', justifyContent: 'space-between' }}>
            <Typography level="h4">Billing History</Typography>
            <Button
              color="neutral"
              startDecorator={<ExportIcon fontSize="var(--Icon-fontSize)" weight="bold" />}
              variant="outlined"
            >
              Export
            </Button>
          </Stack>
          <Card sx={{ '--Card-padding': 0, overflowX: 'auto' }}>
            <InvoicesTable
              rows={[
                {
                  id: 'INV-005',
                  description: 'Starter Plan',
                  currency: 'USD',
                  amount: 99,
                  status: 'pending',
                  issueDate: dayjs().toDate(),
                },
                {
                  id: 'INV-004',
                  description: 'Starter Plan',
                  currency: 'USD',
                  amount: 99,
                  status: 'canceled',
                  issueDate: dayjs().subtract(1, 'month').toDate(),
                },
                {
                  id: 'INV-003',
                  description: 'Starter Plan',
                  currency: 'USD',
                  amount: 99,
                  status: 'paid',
                  issueDate: dayjs().subtract(2, 'month').toDate(),
                },
                {
                  id: 'INV-002',
                  description: 'Starter Plan',
                  currency: 'USD',
                  amount: 99,
                  status: 'paid',
                  issueDate: dayjs().subtract(3, 'month').toDate(),
                },
                {
                  id: 'INV-001',
                  description: 'Basic Plan',
                  currency: 'USD',
                  amount: 15,
                  status: 'paid',
                  issueDate: dayjs().subtract(4, 'month').toDate(),
                },
              ]}
            />
          </Card>
        </Stack>
      </Stack>
    </React.Fragment>
  );
}
