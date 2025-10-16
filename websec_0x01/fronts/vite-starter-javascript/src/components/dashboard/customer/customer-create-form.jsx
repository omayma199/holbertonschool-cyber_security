'use client';

import * as React from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import Box from '@mui/joy/Box';
import Button from '@mui/joy/Button';
import Checkbox from '@mui/joy/Checkbox';
import Divider from '@mui/joy/Divider';
import FormControl from '@mui/joy/FormControl';
import FormHelperText from '@mui/joy/FormHelperText';
import FormLabel from '@mui/joy/FormLabel';
import Grid from '@mui/joy/Grid';
import Input from '@mui/joy/Input';
import Link from '@mui/joy/Link';
import Option from '@mui/joy/Option';
import Select from '@mui/joy/Select';
import Stack from '@mui/joy/Stack';
import Textarea from '@mui/joy/Textarea';
import Typography from '@mui/joy/Typography';
import { Controller, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { z as zod } from 'zod';

import { paths } from '@/paths';
import { logger } from '@/lib/default-logger';
import { RouterLink } from '@/components/core/link';

const schema = zod.object({
  firstName: zod.string().min(1, { message: 'First name is required' }).max(255),
  lastName: zod.string().min(1, { message: 'Last name is required' }).max(255),
  email: zod.string().min(1, { message: 'Email is required' }).email(),
  phone: zod.string().min(1, { message: 'Phone is required' }).max(255),
  billingAddress: zod.object({
    country: zod.string().min(1, 'Country is required').max(255),
    state: zod.string().min(1, 'State is required').max(255),
    city: zod.string().min(1, 'City is required').max(255),
    zipCode: zod.string().min(1, 'Zip code is required').max(255),
    line1: zod.string().min(1, 'Address is required').max(255),
    line2: zod.string().max(255).optional(),
  }),
  taxStatus: zod.string().min(1, 'Tax status is required').max(255),
  taxType: zod.string().min(1, 'Tax type is required').max(255),
  taxId: zod.string().min(1, 'Tax ID is required').max(255),
  timezone: zod.string().min(1, 'Timezone is required').max(255),
  language: zod.string().min(1, 'Language is required').max(255),
  currency: zod.string().min(1, 'Currency is required').max(255),
});

const defaultValues = {
  firstName: '',
  lastName: '',
  email: '',
  phone: '',
  billingAddress: { country: '', state: '', city: '', zipCode: '', line1: '', line2: '' },
  taxStatus: 'taxable',
  taxType: '',
  taxId: '',
  timezone: 'us_new_york',
  language: 'en',
  currency: 'USD',
};

export function CustomerCreateForm() {
  const navigate = useNavigate();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({ defaultValues, resolver: zodResolver(schema) });

  const onSubmit = React.useCallback(
    async (_) => {
      try {
        // Make API request
        navigate(paths.dashboard.customers.details('1'));
      } catch (err) {
        logger.error(err);
      }
    },
    [navigate]
  );

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Stack divider={<Divider />} spacing={5}>
        <Stack spacing={3}>
          <Typography level="h4">Account Information</Typography>
          <Box sx={{ maxWidth: 'lg' }}>
            <Grid container spacing={3}>
              <Grid md={6} xs={12}>
                <Controller
                  control={control}
                  name="firstName"
                  render={({ field }) => (
                    <FormControl error={Boolean(errors.firstName)}>
                      <FormLabel>First Name</FormLabel>
                      <Input {...field} />
                      {errors.firstName ? <FormHelperText>{errors.firstName.message}</FormHelperText> : null}
                    </FormControl>
                  )}
                />
              </Grid>
              <Grid md={6} xs={12}>
                <Controller
                  control={control}
                  name="lastName"
                  render={({ field }) => (
                    <FormControl error={Boolean(errors.lastName)}>
                      <FormLabel>Last Name</FormLabel>
                      <Input {...field} />
                      {errors.lastName ? <FormHelperText>{errors.lastName.message}</FormHelperText> : null}
                    </FormControl>
                  )}
                />
              </Grid>
              <Grid md={6} xs={12}>
                <Controller
                  control={control}
                  name="email"
                  render={({ field }) => (
                    <FormControl error={Boolean(errors.email)}>
                      <FormLabel>Email Address</FormLabel>
                      <Input {...field} type="email" />
                      {errors.email ? <FormHelperText>{errors.email.message}</FormHelperText> : null}
                    </FormControl>
                  )}
                />
              </Grid>
              <Grid md={6} xs={12}>
                <Controller
                  control={control}
                  name="phone"
                  render={({ field }) => (
                    <FormControl error={Boolean(errors.phone)}>
                      <FormLabel>Phone Number</FormLabel>
                      <Input {...field} type="tel" />
                      {errors.phone ? <FormHelperText>{errors.phone.message}</FormHelperText> : null}
                    </FormControl>
                  )}
                />
              </Grid>
            </Grid>
          </Box>
        </Stack>
        <Stack spacing={3}>
          <Typography level="h4">Billing Information</Typography>
          <Box sx={{ maxWidth: 'lg' }}>
            <Grid container spacing={3}>
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
              <Grid md={6} xs={12}>
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
          </Box>
        </Stack>
        <Stack spacing={3}>
          <Typography level="h4">Shipping Details</Typography>
          <Box sx={{ maxWidth: 'lg' }}>
            <Grid container spacing={3}>
              <Grid xs={12}>
                <Checkbox checked label="Same as billing address" />
              </Grid>
              <Grid md={6} xs={12}>
                <Controller
                  control={control}
                  name="timezone"
                  render={({ field }) => (
                    <FormControl error={Boolean(errors.timezone)}>
                      <FormLabel>Timezone</FormLabel>
                      <Select
                        {...field}
                        onChange={(_, value) => {
                          field.onChange(value);
                        }}
                      >
                        <Option value="">Choose a timezone</Option>
                        <Option value="us_new_york">US - New York</Option>
                        <Option value="us_california">US - California</Option>
                        <Option value="uk_london">UK - London</Option>
                        <Option value="fr_paris">FR - Paris</Option>
                      </Select>
                      {errors.timezone ? <FormHelperText>{errors.timezone.message}</FormHelperText> : null}
                    </FormControl>
                  )}
                />
              </Grid>
              <Grid md={6} xs={12}>
                <Controller
                  control={control}
                  name="language"
                  render={({ field }) => (
                    <FormControl error={Boolean(errors.language)}>
                      <FormLabel>Language</FormLabel>
                      <Select
                        {...field}
                        onChange={(_, value) => {
                          field.onChange(value);
                        }}
                      >
                        <Option value="">Choose a language</Option>
                        <Option value="en">English</Option>
                        <Option value="fr">French</Option>
                        <Option value="es">Spanish</Option>
                      </Select>
                      {errors.language ? <FormHelperText>{errors.language.message}</FormHelperText> : null}
                    </FormControl>
                  )}
                />
              </Grid>
              <Grid md={6} xs={12}>
                <Controller
                  control={control}
                  name="currency"
                  render={({ field }) => (
                    <FormControl error={Boolean(errors.currency)}>
                      <FormLabel>Currency</FormLabel>
                      <Select
                        {...field}
                        onChange={(_, value) => {
                          field.onChange(value);
                        }}
                      >
                        <Option value="">Choose a currency</Option>
                        <Option value="USD">USD</Option>
                        <Option value="EUR">EUR</Option>
                        <Option value="GBP">GBP</Option>
                      </Select>
                      {errors.currency ? <FormHelperText>{errors.currency.message}</FormHelperText> : null}
                    </FormControl>
                  )}
                />
              </Grid>
            </Grid>
          </Box>
        </Stack>
        <Stack spacing={3}>
          <Stack spacing={1}>
            <Typography level="h4">Tax Status</Typography>
            <Typography level="body-sm">
              <Link>Review our guide</Link> on tax statuses to select the best fit for this customer.
            </Typography>
          </Stack>
          <Box sx={{ maxWidth: 'lg' }}>
            <Grid container spacing={3}>
              <Grid md={6} xs={12}>
                <Stack spacing={3}>
                  <Controller
                    control={control}
                    name="taxStatus"
                    render={({ field }) => (
                      <FormControl error={Boolean(errors.taxStatus)}>
                        <FormLabel>Tax Status</FormLabel>
                        <Select
                          {...field}
                          onChange={(_, value) => {
                            field.onChange(value);
                          }}
                        >
                          <Option value="taxable">Taxable</Option>
                          <Option value="exempt">Exempt</Option>
                          <Option value="reverse_charge">Reverse Charge</Option>
                        </Select>
                        {errors.taxStatus ? <FormHelperText>{errors.taxStatus.message}</FormHelperText> : null}
                      </FormControl>
                    )}
                  />
                  <Stack direction="row" spacing={2}>
                    <Controller
                      control={control}
                      name="taxType"
                      render={({ field }) => (
                        <FormControl error={Boolean(errors.taxType)}>
                          <FormLabel>Tax ID</FormLabel>
                          <Select
                            {...field}
                            onChange={(_, value) => {
                              field.onChange(value);
                            }}
                            sx={{ width: '150px' }}
                          >
                            <Option value="">Tax Type</Option>
                            <Option value="ad_nrt">Andora NRT</Option>
                            <Option value="ro_vat">Romania VAT</Option>
                          </Select>
                        </FormControl>
                      )}
                    />
                    <Controller
                      control={control}
                      name="taxId"
                      render={({ field }) => (
                        <FormControl error={Boolean(errors.taxId)}>
                          <FormLabel sx={{ visibility: 'hidden' }}>Value</FormLabel>
                          <Input {...field} placeholder="123456789" sx={{ flex: '1 1 auto' }} />
                          {errors.taxId ? <FormHelperText>{errors.taxId.message}</FormHelperText> : null}
                        </FormControl>
                      )}
                    />
                  </Stack>
                  <div>
                    <Link fontSize="sm">Add another ID</Link>
                  </div>
                </Stack>
              </Grid>
            </Grid>
          </Box>
        </Stack>
        <Stack direction="row" spacing={2} sx={{ alignItems: 'center', justifyContent: 'flex-end' }}>
          <Button color="neutral" component={RouterLink} href={paths.dashboard.customers.list} variant="outlined">
            Cancel
          </Button>
          <Button type="submit">Add Customer</Button>
        </Stack>
      </Stack>
    </form>
  );
}
