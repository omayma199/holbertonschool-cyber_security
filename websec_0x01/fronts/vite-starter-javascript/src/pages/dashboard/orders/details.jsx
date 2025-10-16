import * as React from 'react';
import Avatar from '@mui/joy/Avatar';
import Box from '@mui/joy/Box';
import Breadcrumbs from '@mui/joy/Breadcrumbs';
import Button from '@mui/joy/Button';
import Card from '@mui/joy/Card';
import Chip from '@mui/joy/Chip';
import Divider from '@mui/joy/Divider';
import Grid from '@mui/joy/Grid';
import Link from '@mui/joy/Link';
import Stack from '@mui/joy/Stack';
import Typography from '@mui/joy/Typography';
import { Check as CheckIcon } from '@phosphor-icons/react/dist/ssr/Check';
import { Envelope as EnvelopeIcon } from '@phosphor-icons/react/dist/ssr/Envelope';
import { Phone as PhoneIcon } from '@phosphor-icons/react/dist/ssr/Phone';
import { Printer as PrinterIcon } from '@phosphor-icons/react/dist/ssr/Printer';
import { Trash as TrashIcon } from '@phosphor-icons/react/dist/ssr/Trash';
import dayjs from 'dayjs';
import { Helmet } from 'react-helmet-async';

import { config } from '@/config';
import { paths } from '@/paths';
import { BreadcrumbsItem } from '@/components/core/breadcrumbs-item';
import { BreadcrumbsSeparator } from '@/components/core/breadcrumbs-separator';
import { Image } from '@/components/core/image';
import { PropertyItem } from '@/components/core/property-item';
import { PropertyList } from '@/components/core/property-list';
import { DeliveryProgress } from '@/components/dashboard/order/delivery-progress';
import { EventsTimeline } from '@/components/dashboard/order/events-timeline';
import { LineItemsTable } from '@/components/dashboard/order/line-items-table';
import { OrderLocation } from '@/components/dashboard/order/order-location';

const metadata = { title: `Details | Orders | Dashboard | ${config.site.name}` };

const lineItems = [
  {
    id: 'PRD-001',
    name: 'Puma XForce Sneakers',
    image: '/assets/product-1.png',
    quantity: 1,
    currency: 'USD',
    unitPrice: 150,
    amount: 150,
  },
  {
    id: 'PRD-002',
    name: 'Luxe Leather Wallet',
    image: '/assets/product-2.png',
    quantity: 1,
    currency: 'USD',
    unitPrice: 75,
    amount: 75,
  },
];

const events = [
  {
    id: 'EV-004',
    description: 'Order is out for delivery and will be arriving today.',
    current: true,
    createdAt: dayjs().toDate(),
  },
  {
    id: 'EV-003',
    description: 'Order has been shipped and is en route to the destination.',
    createdAt: dayjs().subtract(43, 'minute').subtract(1, 'hour').subtract(1, 'day').toDate(),
  },
  {
    id: 'EV-002',
    description: 'Products have been picked from the warehouse for delivery.',
    createdAt: dayjs().subtract(15, 'minute').subtract(8, 'hour').subtract(1, 'day').toDate(),
  },
  {
    id: 'EV-001',
    description: 'Order was successfully created in the system.',
    createdAt: dayjs().subtract(3, 'minute').subtract(9, 'hour').subtract(2, 'day').toDate(),
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
                Order Details
              </Typography>
              <Breadcrumbs separator={<BreadcrumbsSeparator />}>
                <BreadcrumbsItem href={paths.dashboard.overview} type="start" />
                <BreadcrumbsItem href={paths.dashboard.orders.list}>Orders</BreadcrumbsItem>
                <BreadcrumbsItem type="end">Details</BreadcrumbsItem>
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
              <Button color="danger" startDecorator={<TrashIcon fontSize="var(--Icon-fontSize)" weight="bold" />}>
                Delete
              </Button>
            </Stack>
          </Stack>
          <Stack divider={<Divider />} spacing={5}>
            <Stack
              direction={{ xs: 'column', md: 'row' }}
              divider={<Divider orientation="vertical" />}
              spacing={{ xs: 2, md: 3 }}
            >
              <Stack spacing={1}>
                <Typography level="body-sm">Order ID</Typography>
                <Typography>ORD-001</Typography>
              </Stack>
              <Stack spacing={1}>
                <Typography level="body-sm">Status</Typography>
                <Chip color="warning" size="sm" variant="soft">
                  In Transit
                </Chip>
              </Stack>
              <Stack spacing={1}>
                <Typography level="body-sm">Payment</Typography>
                <Stack direction="row" spacing={1} sx={{ alignItems: 'center' }}>
                  <Image alt="Visa" height={20} src="/assets/logo-visa-card.svg" width={32} />
                  <Typography fontSize="sm">••••</Typography>
                  <Typography fontSize="sm">4242</Typography>
                </Stack>
              </Stack>
              <Stack spacing={1}>
                <Typography level="body-sm">Placed</Typography>
                <Typography>
                  {dayjs().subtract(28, 'minute').subtract(1, 'hour').subtract(4, 'day').format('MMM D, h:mm A')}
                </Typography>
              </Stack>
              <Stack spacing={1}>
                <Typography level="body-sm">Last Update</Typography>
                <Typography>
                  {dayjs().subtract(9, 'minute').subtract(5, 'hour').subtract(1, 'day').format('MMM D, h:mm A')}
                </Typography>
              </Stack>
            </Stack>
            <Stack spacing={3}>
              <Typography level="h4">Customer</Typography>
              <Stack spacing={1}>
                <Stack direction="row" spacing={1} sx={{ alignItems: 'center' }}>
                  <Avatar src="/assets/avatar-1.png">ZS</Avatar>
                  <div>
                    <Typography fontSize="sm" fontWeight="md">
                      Zaid Schwartz
                    </Typography>
                    <Chip size="sm" variant="soft">
                      USR-001
                    </Chip>
                  </div>
                </Stack>
                <div>
                  <div>
                    <Link
                      level="body-sm"
                      startDecorator={<EnvelopeIcon fontSize="var(--joy-fontSize-md)" weight="bold" />}
                    >
                      zaid.schwartz@domain.com
                    </Link>
                  </div>
                  <div>
                    <Link
                      level="body-sm"
                      startDecorator={<PhoneIcon fontSize="var(--joy-fontSize-md)" weight="bold" />}
                    >
                      (801) 301-7140
                    </Link>
                  </div>
                </div>
              </Stack>
              <Grid container spacing={3}>
                <Grid lg={6} xl={4} xs={12}>
                  <Stack spacing={1}>
                    <Typography level="title-md">Billing Information</Typography>
                    <Stack spacing={1}>
                      <Typography level="body-sm" textColor="text.secondary">
                        3794 Broaddus Avenue, Louisville,
                        <br /> Kentucky, United States,
                        <br /> 40202
                      </Typography>
                      <div>
                        <Link level="body-sm">Edit</Link>
                      </div>
                    </Stack>
                  </Stack>
                </Grid>
                <Grid lg={6} xl={4} xs={12}>
                  <Stack spacing={1}>
                    <Typography level="title-md">Shipping Details</Typography>
                    <Typography level="body-sm" textColor="text.secondary">
                      3964 Black Stallion Road, Lexington,
                      <br /> Kentucky, United States,
                      <br /> 40507
                    </Typography>
                    <div>
                      <Link level="body-sm">Edit</Link>
                    </div>
                  </Stack>
                </Grid>
              </Grid>
            </Stack>
            <Stack spacing={3}>
              <Typography level="h4">Checkout Summary</Typography>
              <Card sx={{ '--Card-padding': 0, overflowX: 'auto' }}>
                <LineItemsTable rows={lineItems} />
              </Card>
              <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                <Stack spacing={2}>
                  <Stack direction="row" spacing={8} sx={{ alignItems: 'center', justifyContent: 'space-between' }}>
                    <Typography fontSize="sm">Subtotal</Typography>
                    <Typography>
                      {new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(225)}
                    </Typography>
                  </Stack>
                  <Stack direction="row" spacing={8} sx={{ alignItems: 'center', justifyContent: 'space-between' }}>
                    <Typography fontSize="sm">Taxes</Typography>
                    <Typography>
                      {new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(35)}
                    </Typography>
                  </Stack>
                  <Stack direction="row" spacing={8} sx={{ alignItems: 'center', justifyContent: 'space-between' }}>
                    <Typography fontSize="sm">Shipping</Typography>
                    <Typography>
                      {new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(25)}
                    </Typography>
                  </Stack>
                  <Stack direction="row" spacing={8} sx={{ alignItems: 'center', justifyContent: 'space-between' }}>
                    <Typography fontSize="lg">Total</Typography>
                    <Typography level="h4">
                      {new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(285)}
                    </Typography>
                  </Stack>
                </Stack>
              </Box>
            </Stack>
            <Stack spacing={3}>
              <Typography level="h4">Payment Details</Typography>
              <Grid container spacing={3}>
                <Grid lg={6} xl={4} xs={12}>
                  <PropertyList>
                    {[
                      { key: 'Amount', value: 'US$ 285.00' },
                      { key: 'Fee', value: 'US$ 5.25' },
                      { key: 'Issuer', value: 'Stripe Payments UK Limited' },
                      {
                        key: 'Payment ID',
                        value: (
                          <Link
                            level="body-sm"
                            sx={{
                              display: 'block',
                              overflow: 'hidden',
                              textOverflow: 'ellipsis',
                              whiteSpace: 'nowrap',
                            }}
                          >
                            pm_1N0OA5BNhkiVZFr7OdrQnJOp
                          </Link>
                        ),
                      },
                      {
                        key: 'Status',
                        value: (
                          <Chip color="success" size="sm" variant="soft">
                            Succeeded
                          </Chip>
                        ),
                      },
                    ].map((item) => (
                      <PropertyItem key={item.key} name={item.key} value={item.value} />
                    ))}
                  </PropertyList>
                </Grid>
                <Grid lg={6} xl={4} xs={12}>
                  <PropertyList>
                    {[
                      { key: 'Method', value: 'Visa credit card' },
                      { key: 'Number', value: '•••• 4242' },
                      { key: 'Expires', value: '12 / 2024' },
                      {
                        key: 'CVC Check',
                        value: (
                          <Typography
                            endDecorator={
                              <Avatar
                                color="success"
                                component="span"
                                sx={{ '--Avatar-size': '18px', '--Icon-fontSize': 'var(--joy-fontSize-sm)' }}
                                variant="solid"
                              >
                                <CheckIcon fontSize="var(--Icon-fontSize)" weight="bold" />
                              </Avatar>
                            }
                            level="body-sm"
                            textColor="text.primary "
                          >
                            Passed
                          </Typography>
                        ),
                      },
                    ].map((item) => (
                      <PropertyItem key={item.key} name={item.key} value={item.value} />
                    ))}
                  </PropertyList>
                </Grid>
              </Grid>
            </Stack>
            <Stack spacing={3}>
              <Typography level="h4">Delivery</Typography>
              <Grid container spacing={3}>
                <Grid lg={8} md={6} xs={12}>
                  <Stack spacing={5}>
                    <Typography>
                      Estimated delivery date: <Typography textColor="text.primary">Monday, July 20 3:00PM</Typography>
                    </Typography>
                    <Stack direction="row" spacing={2} sx={{ flexWrap: 'wrap' }}>
                      {[
                        { label: 'Preparing', status: 'done' },
                        { label: 'Picked up', status: 'done' },
                        { label: 'In transit', status: 'current' },
                        { label: 'Delivered', status: 'pending' },
                      ].map((item) => (
                        <DeliveryProgress key={item.label} {...item} />
                      ))}
                    </Stack>
                    <PropertyList>
                      {[
                        { key: 'Shipping Company', value: 'FedEx' },
                        { key: 'Shipping Method', value: 'Standard' },
                        {
                          key: 'Tracking Code',
                          value: (
                            <Link
                              level="body-sm"
                              sx={{
                                display: 'block',
                                overflow: 'hidden',
                                textOverflow: 'ellipsis',
                                whiteSpace: 'nowrap',
                              }}
                            >
                              9610 1385 2890
                            </Link>
                          ),
                        },
                        { key: 'Warehouse', value: '' },
                      ].map((item) => (
                        <PropertyItem key={item.key} name={item.key} value={item.value} />
                      ))}
                    </PropertyList>
                  </Stack>
                </Grid>
                <Grid lg={6} xl={4} xs={12}>
                  <Stack spacing={1}>
                    <Typography level="title-md">Current Location</Typography>
                    <Card sx={{ '--Card-padding': 0, height: '300px', overflow: 'hidden' }}>
                      <OrderLocation latitude={40.707313} longitude={-74.012083} />
                    </Card>
                    <Stack direction="row" spacing={1} sx={{ alignItems: 'center' }}>
                      <Typography level="body-sm" textColor="text.secondary">
                        New York, NY, USA
                      </Typography>
                      <Typography level="body-xs">(40.707313, -74.012083)</Typography>
                    </Stack>
                  </Stack>
                </Grid>
              </Grid>
            </Stack>
            <Stack spacing={3}>
              <Typography level="h4">Activity</Typography>
              <EventsTimeline events={events} />
            </Stack>
            <Stack spacing={3}>
              <Typography level="h4">Notes</Typography>
              <Typography>
                &quot;Please ensure that the package is securely wrapped to protect fragile items. If no one is
                available to receive the delivery, kindly leave it with a trusted neighbor. Thank you for your excellent
                service!&quot;
              </Typography>
            </Stack>
          </Stack>
        </Stack>
      </Box>
    </React.Fragment>
  );
}
