import * as React from 'react';
import Box from '@mui/joy/Box';
import Breadcrumbs from '@mui/joy/Breadcrumbs';
import Button from '@mui/joy/Button';
import Card from '@mui/joy/Card';
import Stack from '@mui/joy/Stack';
import Tab from '@mui/joy/Tab';
import TabList from '@mui/joy/TabList';
import Tabs from '@mui/joy/Tabs';
import Typography from '@mui/joy/Typography';
import { Plus as PlusIcon } from '@phosphor-icons/react/dist/ssr/Plus';
import { Printer as PrinterIcon } from '@phosphor-icons/react/dist/ssr/Printer';
import dayjs from 'dayjs';
import { Helmet } from 'react-helmet-async';

import { config } from '@/config';
import { paths } from '@/paths';
import { BreadcrumbsItem } from '@/components/core/breadcrumbs-item';
import { BreadcrumbsSeparator } from '@/components/core/breadcrumbs-separator';
import { RouterLink } from '@/components/core/link';
import { InvoicesFiltersButton } from '@/components/dashboard/invoice/invoices-filters-button';
import { InvoicesFiltersCard } from '@/components/dashboard/invoice/invoices-filters-card';
import { InvoicesPagination } from '@/components/dashboard/invoice/invoices-pagination';
import { InvoicesSummary } from '@/components/dashboard/invoice/invoices-summary';
import { InvoicesTable } from '@/components/dashboard/invoice/invoices-table';

const metadata = { title: `List | Invoices | Dashboard | ${config.site.name}` };

const invoices = [
  {
    id: 'INV-005',
    status: 'draft',
    customer: { name: 'Zaid Schwartz', email: 'zaid.schwartz@domain.com', avatar: '/assets/avatar-1.png' },
    currency: 'USD',
    amount: 99,
    issueDate: dayjs().subtract(1, 'day').toDate(),
    dueDate: dayjs().add(14, 'day').toDate(),
  },
  {
    id: 'INV-004',
    status: 'pending',
    customer: { name: 'Olly Schroeder', email: 'olly.schroeder@domain.com', avatar: '/assets/avatar-5.png' },
    currency: 'USD',
    amount: 192,
    issueDate: dayjs().subtract(5, 'day').toDate(),
    dueDate: dayjs().add(10, 'day').toDate(),
  },
  {
    id: 'INV-003',
    status: 'late',
    customer: { name: 'Ammar Foley', email: 'ammar.foley@domain.com', avatar: '/assets/avatar-3.png' },
    currency: 'USD',
    amount: 41.4,
    issueDate: dayjs().subtract(6, 'day').toDate(),
    dueDate: dayjs().subtract(1, 'day').toDate(),
  },
  {
    id: 'INV-002',
    status: 'paid',
    customer: { avatar: '/assets/avatar-4.png', name: 'Pippa Wilkinson', email: 'pippa.wilkinson@domain.com' },
    currency: 'USD',
    amount: 52.86,
    issueDate: dayjs().subtract(9, 'day').toDate(),
    dueDate: dayjs().subtract(2, 'day').toDate(),
  },
  {
    id: 'INV-001',
    status: 'canceled',
    customer: { avatar: '/assets/avatar-2.png', name: 'sienna.hewitt@domain.com', email: 'Sienna Hewitt' },
    currency: 'USD',
    amount: 432.09,
    issueDate: dayjs().subtract(12, 'day').toDate(),
    dueDate: dayjs().subtract(3, 'day').toDate(),
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
                Invoices
              </Typography>
              <Breadcrumbs separator={<BreadcrumbsSeparator />}>
                <BreadcrumbsItem href={paths.dashboard.overview} type="start" />
                <BreadcrumbsItem type="end">Invoices</BreadcrumbsItem>
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
                href={paths.dashboard.invoices.create}
                startDecorator={<PlusIcon fontSize="var(--Icon-fontSize)" weight="bold" />}
              >
                Create
              </Button>
            </Stack>
          </Stack>
          <Box sx={{ display: 'grid', gap: 3, gridTemplateColumns: { lg: '340px 1fr' } }}>
            <InvoicesFiltersCard />
            <Stack spacing={3} sx={{ overflow: 'hidden' }}>
              <InvoicesSummary
                draft={4}
                draftAmount={4521.64}
                due={12}
                dueAmount={3081.18}
                invoiced={76}
                invoicedAmount={75189.08}
                paid={64}
                paidAmount={72104.9}
              />
              <Stack direction="row" spacing={3} sx={{ alignItems: 'center' }}>
                <Stack sx={{ alignItems: 'flex-start', flex: '1 1 auto' }}>
                  <Tabs size="sm" value="all" variant="custom">
                    <TabList>
                      <Tab value="all">All</Tab>
                      <Tab value="paid">Paid</Tab>
                    </TabList>
                  </Tabs>
                </Stack>
                <Stack direction="row" spacing={1} sx={{ alignItems: 'center' }}>
                  <InvoicesFiltersButton />
                </Stack>
              </Stack>
              <Card sx={{ '--Card-padding': 0, overflowX: 'auto' }}>
                <InvoicesTable rows={invoices} />
              </Card>
              <InvoicesPagination count={invoices.length} page={1} rowsPerPage={5} />
            </Stack>
          </Box>
        </Stack>
      </Box>
    </React.Fragment>
  );
}
