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
import { ProductsFiltersButton } from '@/components/dashboard/product/products-filters-button';
import { ProductsPagination } from '@/components/dashboard/product/products-pagination';
import { ProductsTable } from '@/components/dashboard/product/products-table';

const metadata = { title: `List | Products | Dashboard | ${config.site.name}` };

const products = [
  {
    id: 'PRD-005',
    name: 'Retro Polaroid Camera',
    image: '/assets/product-5.png',
    quantity: 4,
    category: 'Camera',
    currency: 'USD',
    price: 256,
    status: 'draft',
  },
  {
    id: 'PRD-004',
    name: 'Bose Headphones',
    image: '/assets/product-4.png',
    category: 'Headphones',
    quantity: 42,
    currency: 'USD',
    price: 45,
    status: 'published',
  },
  {
    id: 'PRD-003',
    name: 'Nike Sportswear Unisex Backpack',
    image: '/assets/product-3.png',
    category: 'Backpack',
    quantity: 37,
    currency: 'USD',
    price: 67.25,
    status: 'draft',
  },
  {
    id: 'PRD-002',
    name: 'Luxe Leather Wallet',
    image: '/assets/product-2.png',
    category: 'Wallet',
    quantity: 120,
    currency: 'USD',
    price: 75,
    status: 'published',
  },
  {
    id: 'PRD-001',
    name: 'Puma XForce Sneakers',
    image: '/assets/product-1.png',
    category: 'Shoes',
    quantity: 12,
    currency: 'USD',
    price: 150,
    status: 'published',
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
                Products
              </Typography>
              <Breadcrumbs separator={<BreadcrumbsSeparator />}>
                <BreadcrumbsItem href={paths.dashboard.overview} type="start" />
                <BreadcrumbsItem type="end">Products</BreadcrumbsItem>
              </Breadcrumbs>
            </Stack>
            <Stack direction="row" spacing={2} sx={{ alignItems: 'center' }}>
              <Button
                component={RouterLink}
                href={paths.dashboard.products.create}
                startDecorator={<PlusIcon fontSize="var(--Icon-fontSize)" weight="bold" />}
              >
                Create
              </Button>
            </Stack>
          </Stack>
          <Stack direction="row" spacing={3} sx={{ justifyContent: 'flex-end' }}>
            <ProductsFiltersButton />
          </Stack>
          <Card sx={{ '--Card-padding': 0, overflowX: 'auto' }}>
            <ProductsTable rows={products} />
          </Card>
          <ProductsPagination count={products.length} page={1} rowsPerPage={5} />
        </Stack>
      </Box>
    </React.Fragment>
  );
}
