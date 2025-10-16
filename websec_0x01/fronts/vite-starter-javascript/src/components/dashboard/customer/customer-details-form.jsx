'use client';

import * as React from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import Avatar from '@mui/joy/Avatar';
import Box from '@mui/joy/Box';
import Button from '@mui/joy/Button';
import FormControl from '@mui/joy/FormControl';
import FormHelperText from '@mui/joy/FormHelperText';
import FormLabel from '@mui/joy/FormLabel';
import Grid from '@mui/joy/Grid';
import Input from '@mui/joy/Input';
import Option from '@mui/joy/Option';
import Select from '@mui/joy/Select';
import Stack from '@mui/joy/Stack';
import Typography from '@mui/joy/Typography';
import { Pen as PenIcon } from '@phosphor-icons/react/dist/ssr/Pen';
import dayjs from 'dayjs';
import { Controller, useForm } from 'react-hook-form';
import { z as zod } from 'zod';

import { logger } from '@/lib/default-logger';
import { toast } from '@/components/core/toaster';

const schema = zod.object({
  firstName: zod.string().min(1, { message: 'First name is required' }).max(255),
  lastName: zod.string().min(1, { message: 'Last name is required' }).max(255),
  email: zod.string().min(1, { message: 'Email is required' }).email(),
  phone: zod.string().max(255).optional(),
  country: zod.string().min(1, 'Country is required').max(255),
  state: zod.string().min(1, 'State is required').max(255),
  city: zod.string().min(1, 'City is required').max(255),
});

const defaultValues = {
  firstName: 'Zaid',
  lastName: 'Schwartz',
  email: 'zaid.schwartz@domain.com',
  phone: '',
  country: 'us',
  state: 'Kentucky',
  city: 'Louisville',
};

export function CustomerDetailsForm() {
  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({ defaultValues, resolver: zodResolver(schema) });

  const onSubmit = React.useCallback(async (_) => {
    try {
      // Make API request
      toast.success('Customer details updated');
    } catch (err) {
      logger.error(err);
    }
  }, []);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Stack spacing={3}>
        <Stack direction="row" spacing={3} sx={{ alignItems: 'center' }}>
          <Box sx={{ '--Avatar-size': '120px', position: 'relative' }}>
            <Avatar src="/assets/avatar-1.png">ZS</Avatar>
            <Box
              sx={{
                alignItems: 'center',
                borderRadius: '100%',
                color: 'var(--joy-palette-common-white)',
                cursor: 'pointer',
                display: 'flex',
                height: '100%',
                justifyContent: 'center',
                left: 0,
                position: 'absolute',
                top: 0,
                width: '100%',
                '&:hover': { bgcolor: 'rgba(0, 0, 0, 0.4)' },
                '&:not(:hover) > *': { display: 'none' },
              }}
            >
              <PenIcon fontSize="var(--joy-fontSize-lg)" weight="bold" />
            </Box>
          </Box>
          <div>
            <Typography level="title-md">Profile Picture</Typography>
            <Typography level="body-sm">Supports PNGs, JPEGs and GIFs under 3MB</Typography>
          </div>
        </Stack>
        <Box sx={{ maxWidth: 'lg' }}>
          <Grid container spacing={3}>
            <Grid md={6} xs={12}>
              <FormControl>
                <FormLabel>ID</FormLabel>
                <Input disabled name="customerId" readOnly value="USR-001" />
              </FormControl>
            </Grid>
            <Grid md={6} xs={12}>
              <FormControl>
                <FormLabel>Created At</FormLabel>
                <Input
                  disabled
                  name="createdAt"
                  readOnly
                  value={dayjs().subtract(3, 'month').format('MMM D, YYYY h:mm A')}
                />
              </FormControl>
            </Grid>
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
                  <FormControl>
                    <FormLabel>Phone Number</FormLabel>
                    <Input {...field} type="tel" />
                    {errors.phone ? <FormHelperText>{errors.phone.message}</FormHelperText> : null}
                  </FormControl>
                )}
              />
            </Grid>
            <Grid md={6} xs={12}>
              <Controller
                control={control}
                name="country"
                render={({ field }) => (
                  <FormControl error={Boolean(errors.country)}>
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
                    {errors.country ? <FormHelperText>{errors.country.message}</FormHelperText> : null}
                  </FormControl>
                )}
              />
            </Grid>
            <Grid md={6} xs={12}>
              <Controller
                control={control}
                name="state"
                render={({ field }) => (
                  <FormControl error={Boolean(errors.state)}>
                    <FormLabel>State</FormLabel>
                    <Input {...field} />
                    {errors.state ? <FormHelperText>{errors.state.message}</FormHelperText> : null}
                  </FormControl>
                )}
              />
            </Grid>
            <Grid md={6} xs={12}>
              <Controller
                control={control}
                name="city"
                render={({ field }) => (
                  <FormControl error={Boolean(errors.city)}>
                    <FormLabel>City</FormLabel>
                    <Input {...field} />
                    {errors.city ? <FormHelperText>{errors.city.message}</FormHelperText> : null}
                  </FormControl>
                )}
              />
            </Grid>
          </Grid>
        </Box>
        <Stack direction="row" spacing={1} sx={{ alignItems: 'center', justifyContent: 'flex-end' }}>
          <Button
            color="neutral"
            onClick={() => {
              reset();
            }}
            variant="outlined"
          >
            Discard
          </Button>
          <Button type="submit">Save Changes</Button>
        </Stack>
      </Stack>
    </form>
  );
}
