import * as React from 'react';
import Box from '@mui/joy/Box';
import Breadcrumbs from '@mui/joy/Breadcrumbs';
import Button from '@mui/joy/Button';
import Card from '@mui/joy/Card';
import Chip from '@mui/joy/Chip';
import Divider from '@mui/joy/Divider';
import Link from '@mui/joy/Link';
import Stack from '@mui/joy/Stack';
import Typography from '@mui/joy/Typography';
import { Pen as PenIcon } from '@phosphor-icons/react/dist/ssr/Pen';
import { Plus as PlusIcon } from '@phosphor-icons/react/dist/ssr/Plus';
import { Helmet } from 'react-helmet-async';

import { config } from '@/config';
import { paths } from '@/paths';
import { BreadcrumbsItem } from '@/components/core/breadcrumbs-item';
import { BreadcrumbsSeparator } from '@/components/core/breadcrumbs-separator';
import { PropertyItem } from '@/components/core/property-item';
import { PropertyList } from '@/components/core/property-list';
import { FileDropzone } from '@/components/dashboard/product/file-dropzone';
import { ProductDetialsForm } from '@/components/dashboard/product/product-details-form';
import { ProductImage } from '@/components/dashboard/product/product-image';
import { VariantsTable } from '@/components/dashboard/product/variants-table';

const metadata = { title: `Details | Products | Dashboard | ${config.site.name}` };

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
                Product Details
              </Typography>
              <Breadcrumbs separator={<BreadcrumbsSeparator />}>
                <BreadcrumbsItem href={paths.dashboard.overview} type="start" />
                <BreadcrumbsItem href={paths.dashboard.products.list}>Products</BreadcrumbsItem>
                <BreadcrumbsItem type="end">Details</BreadcrumbsItem>
              </Breadcrumbs>
            </Stack>
            <Stack direction="column" spacing={2} sx={{ alignItems: { sm: 'flex-end' } }}>
              <div>
                <Button>Publish</Button>
              </div>
              <Stack>
                <Typography
                  endDecorator={
                    <Chip component="span" size="sm" variant="soft">
                      Draft
                    </Chip>
                  }
                  level="body-sm"
                >
                  Status
                </Typography>
              </Stack>
            </Stack>
          </Stack>
          <Stack divider={<Divider />} spacing={5}>
            <ProductDetialsForm />
            <Stack spacing={3}>
              <Typography level="h4">Images</Typography>
              <Stack spacing={3} sx={{ maxWidth: 'md' }}>
                <FileDropzone />
                <Stack direction="row" spacing={3} sx={{ flexWrap: 'wrap' }}>
                  {[{ id: 'PRD-IMG-001', url: '/assets/product-1.png' }].map((image) => (
                    <ProductImage key={image.id} url={image.url} />
                  ))}
                </Stack>
              </Stack>
            </Stack>
            <Stack spacing={3}>
              <Typography level="h4">Metadata</Typography>
              <Stack spacing={2}>
                <PropertyList>
                  {[
                    { key: 'Delivery', value: 'FedEx' },
                    { key: 'Manufacturer', value: 'Puma' },
                    { key: 'Audience', value: 'Business Professionals' },
                  ].map((row) => (
                    <PropertyItem key={row.key} name={row.key} value={row.value} />
                  ))}
                </PropertyList>
                <div>
                  <Link level="body-sm" startDecorator={<PenIcon fontSize="var(--joy-fontSize-md)" weight="bold" />}>
                    Edit Metadata
                  </Link>
                </div>
              </Stack>
            </Stack>
            <Stack spacing={2}>
              <Typography level="h4">Inventory</Typography>
              <Stack spacing={3} sx={{ maxWidth: 'md' }}>
                <PropertyList>
                  {[
                    { key: 'SKU', value: 'SKU-001' },
                    { key: 'Barcode', value: '' },
                    { key: 'Volume', value: '' },
                    { key: 'Dimensions', value: '' },
                  ].map((row) => (
                    <PropertyItem key={row.key} name={row.key} value={row.value} />
                  ))}
                </PropertyList>
                <div>
                  <Link level="body-sm" startDecorator={<PenIcon fontSize="var(--joy-fontSize-md)" weight="bold" />}>
                    Edit Inventory
                  </Link>
                </div>
              </Stack>
            </Stack>
            <Stack spacing={3}>
              <Typography level="h4">Pricing</Typography>
              <Stack spacing={2}>
                <PropertyList>
                  {[
                    { key: 'Pricing Model', value: 'Standard Pricing' },
                    {
                      key: 'Price',
                      value: new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(150),
                    },
                    { key: 'Payment Type', value: 'Recurring' },
                    { key: 'Billing Cycle', value: 'Monthly' },
                  ].map((row) => (
                    <PropertyItem key={row.key} name={row.key} value={row.value} />
                  ))}
                </PropertyList>
                <div>
                  <Link level="body-sm" startDecorator={<PenIcon fontSize="var(--joy-fontSize-md)" weight="bold" />}>
                    Edit Pricing
                  </Link>
                </div>
              </Stack>
            </Stack>
            <Stack spacing={3}>
              <Typography level="h4">Variants</Typography>
              <Stack spacing={2}>
                <Card sx={{ '--Card-padding': 0, overflowX: 'auto' }}>
                  <VariantsTable
                    rows={[
                      {
                        id: 'VARIANT-001',
                        name: 'Puma MXForce Sneakers',
                        image: '/assets/product-1.png',
                        quantity: 0,
                        currency: 'USD',
                        price: 250,
                        sku: 'SKU-002',
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
                    Add Variant
                  </Button>
                </div>
              </Stack>
            </Stack>
            <Stack direction="row" sx={{ justifyContent: 'flex-end' }}>
              <Button color="danger" variant="outlined">
                Delete
              </Button>
            </Stack>
          </Stack>
        </Stack>
      </Box>
    </React.Fragment>
  );
}
