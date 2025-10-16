import * as React from 'react';
import Box from '@mui/joy/Box';
import Breadcrumbs from '@mui/joy/Breadcrumbs';
import Button from '@mui/joy/Button';
import Stack from '@mui/joy/Stack';
import Typography from '@mui/joy/Typography';
import { ArrowLeft as ArrowLeftIcon } from '@phosphor-icons/react/dist/ssr/ArrowLeft';
import { Helmet } from 'react-helmet-async';

import { config } from '@/config';
import { paths } from '@/paths';
import { BreadcrumbsItem } from '@/components/core/breadcrumbs-item';
import { BreadcrumbsSeparator } from '@/components/core/breadcrumbs-separator';
import { RouterLink } from '@/components/core/link';
import { OrderCreateForm } from '@/components/dashboard/order/order-create-form';

const metadata = { title: `Create | Orders | Dashboard | ${config.site.name}` };

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
                Create an Order
              </Typography>
              <Breadcrumbs separator={<BreadcrumbsSeparator />}>
                <BreadcrumbsItem href={paths.dashboard.overview} type="start" />
                <BreadcrumbsItem href={paths.dashboard.orders.list}>Orders</BreadcrumbsItem>
                <BreadcrumbsItem type="end">Create</BreadcrumbsItem>
              </Breadcrumbs>
            </Stack>
            <Stack direction="row" spacing={2} sx={{ alignItems: 'center' }}>
              <Button
                color="neutral"
                component={RouterLink}
                href={paths.dashboard.orders.list}
                startDecorator={<ArrowLeftIcon fontSize="var(--Icon-fontSize)" weight="bold" />}
                variant="outlined"
              >
                Cancel
              </Button>
            </Stack>
          </Stack>
          <OrderCreateForm />
        </Stack>
      </Box>
    </React.Fragment>
  );
}
