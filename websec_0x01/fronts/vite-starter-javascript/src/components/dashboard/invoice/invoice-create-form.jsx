'use client';

import * as React from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
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
import Link from '@mui/joy/Link';
import Option from '@mui/joy/Option';
import Select from '@mui/joy/Select';
import Stack from '@mui/joy/Stack';
import Textarea from '@mui/joy/Textarea';
import Typography from '@mui/joy/Typography';
import { Pen as PenIcon } from '@phosphor-icons/react/dist/ssr/Pen';
import { Plus as PlusIcon } from '@phosphor-icons/react/dist/ssr/Plus';
import dayjs from 'dayjs';
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
  issueDate: zod.date(),
  dueDate: zod.date().nullable(),
  isRecurring: zod.boolean(),
  billingCycle: zod.string().min(1, 'Billing cycle is required').max(255),
  nextCycleDate: zod.date().nullable(),
  recipients: zod.string().max(255).optional(),
  lineItems: zod.array(
    zod.object({
      id: zod.string(),
      product: zod.string().max(255),
      quantity: zod.number().min(1, 'Quantity must be greater than or equal to 1'),
      unitPrice: zod.number().min(0, 'Unit price must be greater than or equal to 0'),
    })
  ),
  notes: zod.string().max(255).optional(),
});

const defaultValues = {
  customer: '',
  issueDate: dayjs().toDate(),
  dueDate: null,
  isRecurring: true,
  billingCycle: 'monthly',
  nextCycleDate: dayjs().add(1, 'month').toDate(),
  recipients: '',
  lineItems: [
    { id: 'LI-001', product: 'Puma XForce Sneakers', quantity: 1, unitPrice: 150 },
    { id: 'LI-002', product: 'Luxe Leather Wallet', quantity: 1, unitPrice: 75 },
  ],
  notes: '',
};

const lineItemColumns = [
  { field: 'product', name: 'Name', width: '200px' },
  { field: 'quantity', name: 'Quantity', width: '100px' },
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

// The business logic, how I see it, should make use of a React context located a level up, in the page component.
// It should handle the form data, state update and submit action.
// By doing so, you can place the submit button anyware, and be able to preview the invoice in a modal outside of this
// component.

export function InvoiceCreateForm() {
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
        navigate(paths.dashboard.invoices.details('1'));
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
          <Typography level="h4">Payment</Typography>
          <Box sx={{ maxWidth: 'md' }}>
            <Grid container spacing={3}>
              <Grid md={6} xs={12}>
                <Controller
                  control={control}
                  name="issueDate"
                  render={({ field }) => (
                    <FormControl error={Boolean(errors.issueDate)}>
                      <FormLabel>Issue Date</FormLabel>
                      <Input
                        {...field}
                        onChange={(event) => {
                          field.onChange(event.target.value ? dayjs(event.target.value).toDate() : null);
                        }}
                        type="date"
                        value={field.value ? dayjs(field.value).format('YYYY-MM-DD') : ''}
                      />
                      {errors.issueDate ? <FormHelperText>{errors.issueDate.message}</FormHelperText> : null}
                    </FormControl>
                  )}
                />
              </Grid>
              <Grid md={6} xs={12}>
                <Controller
                  control={control}
                  name="dueDate"
                  render={({ field }) => (
                    <FormControl error={Boolean(errors.dueDate)}>
                      <FormLabel>Due Date</FormLabel>
                      <Input
                        {...field}
                        onChange={(event) => {
                          field.onChange(event.target.value ? dayjs(event.target.value).toDate() : null);
                        }}
                        type="date"
                        value={field.value ? dayjs(field.value).format('YYYY-MM-DD') : ''}
                      />
                      {errors.dueDate ? <FormHelperText>{errors.dueDate.message}</FormHelperText> : null}
                    </FormControl>
                  )}
                />
              </Grid>
              <Grid xs={12}>
                <Controller
                  control={control}
                  name="isRecurring"
                  render={({ field: { value, ...field } }) => (
                    <Checkbox {...field} checked={value} label="This is a recurring invoice" />
                  )}
                />
              </Grid>
              <Grid md={6} xs={12}>
                <Controller
                  control={control}
                  name="billingCycle"
                  render={({ field }) => (
                    <FormControl error={Boolean(errors.billingCycle)}>
                      <FormLabel>Billing Cycle</FormLabel>
                      <Select
                        {...field}
                        onChange={(_, value) => {
                          field.onChange(value);
                        }}
                      >
                        <Option value="daily">Daily</Option>
                        <Option value="weekly">Weekly</Option>
                        <Option value="monthly">Monthly</Option>
                        <Option value="yearly">Yearly</Option>
                      </Select>
                      {errors.billingCycle ? <FormHelperText>{errors.billingCycle.message}</FormHelperText> : null}
                    </FormControl>
                  )}
                />
              </Grid>
              <Grid md={6} xs={12}>
                <Controller
                  control={control}
                  name="nextCycleDate"
                  render={({ field }) => (
                    <FormControl error={Boolean(errors.nextCycleDate)}>
                      <FormLabel>Next Cycle Date</FormLabel>
                      <Input
                        {...field}
                        onChange={(event) => {
                          field.onChange(event.target.value ? dayjs(event.target.value).toDate() : null);
                        }}
                        type="date"
                        value={field.value ? dayjs(field.value).format('YYYY-MM-DD') : ''}
                      />
                      {errors.nextCycleDate ? <FormHelperText>{errors.nextCycleDate.message}</FormHelperText> : null}
                    </FormControl>
                  )}
                />
              </Grid>
              <Grid xs={12}>
                <Controller
                  control={control}
                  name="recipients"
                  render={({ field }) => (
                    <FormControl error={Boolean(errors.recipients)}>
                      <FormLabel>Recipients</FormLabel>
                      <Input {...field} placeholder="Add emails" />
                      {errors.recipients ? <FormHelperText>{errors.recipients.message}</FormHelperText> : null}
                    </FormControl>
                  )}
                />
              </Grid>
              <Grid xs={12}>
                <Link fontSize="sm">Copy payment link</Link>
              </Grid>
            </Grid>
          </Box>
        </Stack>
        <Stack spacing={3}>
          <Typography level="h4">Items</Typography>
          <Card sx={{ '--Card-padding': 0, overflowX: 'auto' }}>
            <DataTable columns={lineItemColumns} rows={lineItems} stripe="even" />
          </Card>
          <Stack direction="row" spacing={3} sx={{ flexWrap: 'wrap' }}>
            <Box sx={{ flex: '1 1 auto' }}>
              <Button
                color="neutral"
                size="sm"
                startDecorator={<PlusIcon fontSize="var(--Icon-fontSize)" weight="bold" />}
                variant="outlined"
              >
                Add Item
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
          <Typography level="h4">Additional Note</Typography>
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
            <Typography level="body-sm">* This is a public note, it will appear on the invoice</Typography>
          </Stack>
        </Stack>
      </Stack>
    </form>
  );
}
