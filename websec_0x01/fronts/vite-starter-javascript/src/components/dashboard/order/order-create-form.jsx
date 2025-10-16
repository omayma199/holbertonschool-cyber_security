'use client';

import * as React from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import Avatar from '@mui/joy/Avatar';
import Box from '@mui/joy/Box';
import Button from '@mui/joy/Button';
import Card from '@mui/joy/Card';
import Checkbox from '@mui/joy/Checkbox';
import Divider from '@mui/joy/Divider';
import FormControl from '@mui/joy/FormControl';
import FormHelperText from '@mui/joy/FormHelperText';
import FormLabel from '@mui/joy/FormLabel';
import Grid from '@mui/joy/Grid';
import IconButton from '@mui/joy/IconButton';
import Input from '@mui/joy/Input';
import Option from '@mui/joy/Option';
import Select from '@mui/joy/Select';
import Stack from '@mui/joy/Stack';
import Textarea from '@mui/joy/Textarea';
import Typography from '@mui/joy/Typography';
import { Package as PackageIcon } from '@phosphor-icons/react/dist/ssr/Package';
import { Pen as PenIcon } from '@phosphor-icons/react/dist/ssr/Pen';
import { Plus as PlusIcon } from '@phosphor-icons/react/dist/ssr/Plus';
import { Controller, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { z as zod } from 'zod';

import { paths } from '@/paths';
import { logger } from '@/lib/default-logger';
import { DataTable } from '@/components/core/data-table';

function calculateSubtotal(lineItems) {
  const subtotal = lineItems.reduce((acc, lineItem) => acc + lineItem.quantity * lineItem.unitPrice, 0);
  return parseFloat(subtotal.toFixed(2));
}

function calculateTotalWithoutTaxes(subtotal, discount, shippingRate) {
  return subtotal - discount + shippingRate;
}

function calculateTax(totalWithoutTax, taxRate) {
  const tax = totalWithoutTax * (taxRate / 100);
  return parseFloat(tax.toFixed(2));
}

function calculateTotal(totalWithoutTax, taxes) {
  return totalWithoutTax + taxes;
}

const schema = zod.object({
  customer: zod.string().min(1, 'Customer is required').max(255),
  lineItems: zod.array(
    zod.object({
      id: zod.string(),
      product: zod.string().max(255),
      image: zod.string(),
      quantity: zod.number().min(1, 'Quantity must be greater than or equal to 1'),
      unitPrice: zod.number().min(0, 'Unit price must be greater than or equal to 0'),
    })
  ),
  billingAddress: zod.object({
    country: zod.string().min(1, 'Country is required').max(255),
    state: zod.string().min(1, 'State is required').max(255),
    city: zod.string().min(1, 'City is required').max(255),
    zipCode: zod.string().min(1, 'Zip code is required').max(255),
    line1: zod.string().min(1, 'Address is required').max(255),
    line2: zod.string().max(255).optional(),
  }),
  notes: zod.string().max(255).optional(),
});

const defaultValues = {
  customer: '',
  lineItems: [
    { id: 'PRD-001', product: 'Puma XForce Sneakers', image: '/assets/product-1.png', quantity: 1, unitPrice: 150 },
  ],
  billingAddress: { country: '', state: '', city: '', zipCode: '', line1: '', line2: '' },
  notes: '',
};

const lineItemsColumns = [
  { field: 'id', name: 'ID', width: '100px' },
  {
    formatter: (row) => (
      <Stack direction="row" spacing={1} sx={{ alignItems: 'center' }}>
        <Avatar
          src={row.image}
          sx={{
            '--Avatar-radius': 'var(--joy-radius-sm)',
            '--Icon-fontSize': 'var(--joy-fontSize-xl)',
            height: '42px',
            width: '42px',
          }}
        >
          <PackageIcon fontSize="var(--Icon-fontSize)" weight="bold" />
        </Avatar>
        <Typography>{row.product}</Typography>
      </Stack>
    ),
    name: 'Name',
    width: '200px',
  },
  { field: 'quantity', name: 'Qty', width: '100px' },
  {
    formatter: (row) => {
      return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(row.unitPrice);
    },
    name: 'Unit Price',
    width: '100px',
  },
  {
    formatter: (row) => {
      return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(
        row.unitPrice * row.quantity
      );
    },
    name: 'Amount',
    width: '100px',
  },
  {
    formatter: () => (
      <IconButton color="neutral" size="sm" variant="plain">
        <PenIcon fontSize="var(--Icon-fontSize)" weight="bold" />
      </IconButton>
    ),
    name: 'Actions',
    hideName: true,
    width: '80px',
    align: 'right',
  },
];

export function OrderCreateForm() {
  const navigate = useNavigate();

  const {
    control,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm({ defaultValues, resolver: zodResolver(schema) });

  const onSubmit = React.useCallback(
    async (_) => {
      try {
        // Make API request
        navigate(paths.dashboard.orders.details('1'));
      } catch (err) {
        logger.error(err);
      }
    },
    [navigate]
  );

  const lineItems = watch('lineItems');

  const shippingRate = 0;
  const discount = 0;
  const taxRate = 10;
  const subtotal = calculateSubtotal(lineItems);
  const totalWithoutTaxes = calculateTotalWithoutTaxes(subtotal, discount, shippingRate);
  const tax = calculateTax(totalWithoutTaxes, taxRate);
  const total = calculateTotal(totalWithoutTaxes, tax);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Stack divider={<Divider />} spacing={5}>
        <Stack spacing={3}>
          <Typography level="h4">Customer</Typography>
          <Box sx={{ maxWidth: 'md' }}>
            <Controller
              control={control}
              name="customer"
              render={({ field }) => (
                <FormControl error={Boolean(errors.customer)}>
                  <Input {...field} placeholder="Find a customer" />
                  {errors.customer ? <FormHelperText>{errors.customer.message}</FormHelperText> : null}
                </FormControl>
              )}
            />
          </Box>
        </Stack>
        <Stack spacing={3}>
          <Typography level="h4">Products</Typography>
          <Card sx={{ '--Card-padding': 0, overflowX: 'auto' }}>
            <DataTable columns={lineItemsColumns} rows={lineItems} stripe="even" />
          </Card>
          <Stack direction="row" spacing={3} sx={{ flexWrap: 'wrap' }}>
            <Box sx={{ flex: '1 1 auto' }}>
              <Button
                color="neutral"
                size="sm"
                startDecorator={<PlusIcon fontSize="var(--Icon-fontSize)" weight="bold" />}
                variant="outlined"
              >
                Add Product
              </Button>
            </Box>
            <Stack spacing={2}>
              <Stack direction="row" spacing={8} sx={{ alignItems: 'center', justifyContent: 'space-between' }}>
                <Typography fontSize="sm">Subtotal</Typography>
                <Typography>
                  {new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(subtotal)}
                </Typography>
              </Stack>
              <Stack direction="row" spacing={8} sx={{ alignItems: 'center', justifyContent: 'space-between' }}>
                <Typography fontSize="sm">Shipping</Typography>
                <Typography>
                  {shippingRate
                    ? new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(shippingRate)
                    : '-'}
                </Typography>
              </Stack>
              <Stack direction="row" spacing={8} sx={{ alignItems: 'center', justifyContent: 'space-between' }}>
                <Typography fontSize="sm">Taxes</Typography>
                <Typography>
                  {new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(tax)}
                </Typography>
              </Stack>
              <Stack direction="row" spacing={8} sx={{ alignItems: 'center', justifyContent: 'space-between' }}>
                <Typography fontSize="lg">Total</Typography>
                <Typography level="h4">
                  {new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(total)}
                </Typography>
              </Stack>
            </Stack>
          </Stack>
        </Stack>
        <Stack spacing={3}>
          <Typography level="h4">Billing Information</Typography>
          <Grid container disableEqualOverflow spacing={3} sx={{ maxWidth: 'md' }}>
            <Grid md={6} xs={12}>
              <Controller
                control={control}
                name="billingAddress.country"
                render={({ field }) => (
                  <FormControl error={Boolean(errors.billingAddress?.country)}>
                    <FormLabel>Country</FormLabel>
                    <Select
                      {...field}
                      onChange={(_, value) => {
                        field.onChange(value);
                      }}
                    >
                      <Option value="">Choose a country</Option>
                      <Option value="ca">Canada</Option>
                      <Option value="uk">United Kingdom</Option>
                      <Option value="us">United States</Option>
                    </Select>
                    {errors.billingAddress?.country ? (
                      <FormHelperText>{errors.billingAddress.country.message}</FormHelperText>
                    ) : null}
                  </FormControl>
                )}
              />
            </Grid>
            <Grid md={6} xs={12}>
              <Controller
                control={control}
                name="billingAddress.state"
                render={({ field }) => (
                  <FormControl error={Boolean(errors.billingAddress?.state)}>
                    <FormLabel>State</FormLabel>
                    <Input {...field} />
                    {errors.billingAddress?.state ? (
                      <FormHelperText>{errors.billingAddress.state.message}</FormHelperText>
                    ) : null}
                  </FormControl>
                )}
              />
            </Grid>
            <Grid md={6} xs={12}>
              <Controller
                control={control}
                name="billingAddress.city"
                render={({ field }) => (
                  <FormControl error={Boolean(errors.billingAddress?.city)}>
                    <FormLabel>City</FormLabel>
                    <Input {...field} />
                    {errors.billingAddress?.city ? (
                      <FormHelperText>{errors.billingAddress.city.message}</FormHelperText>
                    ) : null}
                  </FormControl>
                )}
              />
            </Grid>
            <Grid md={6} xs={12}>
              <Controller
                control={control}
                name="billingAddress.zipCode"
                render={({ field }) => (
                  <FormControl error={Boolean(errors.billingAddress?.zipCode)}>
                    <FormLabel>Zip Code</FormLabel>
                    <Input {...field} />
                    {errors.billingAddress?.zipCode ? (
                      <FormHelperText>{errors.billingAddress.zipCode.message}</FormHelperText>
                    ) : null}
                  </FormControl>
                )}
              />
            </Grid>
            <Grid xs={12}>
              <Controller
                control={control}
                name="billingAddress.line1"
                render={({ field }) => (
                  <FormControl error={Boolean(errors.billingAddress?.line1)}>
                    <FormLabel>Address</FormLabel>
                    <Textarea {...field} maxRows={3} minRows={2} />
                    {errors.billingAddress?.line1 ? (
                      <FormHelperText>{errors.billingAddress.line1.message}</FormHelperText>
                    ) : null}
                  </FormControl>
                )}
              />
            </Grid>
          </Grid>
        </Stack>
        <Stack spacing={3}>
          <Typography level="h4">Shipping Details</Typography>
          <Checkbox checked label="Same as billing address" />
        </Stack>
        <Stack spacing={3}>
          <Typography level="h4">Additional Notes</Typography>
          <Stack spacing={1} sx={{ maxWidth: 'md' }}>
            <Controller
              control={control}
              name="notes"
              render={({ field }) => (
                <FormControl error={Boolean(errors.notes)}>
                  <Textarea {...field} maxRows={5} minRows={3} />
                  {errors.notes ? <FormHelperText>{errors.notes.message}</FormHelperText> : null}
                </FormControl>
              )}
            />
            <Typography level="body-sm">* This is a public note, it will appear on the order</Typography>
          </Stack>
        </Stack>
        <Stack direction="row" spacing={2} sx={{ alignItems: 'center', justifyContent: 'flex-end' }}>
          <Button color="neutral" type="submit" variant="outlined">
            Save as Draft
          </Button>
          <Button type="submit">Publish</Button>
        </Stack>
      </Stack>
    </form>
  );
}
