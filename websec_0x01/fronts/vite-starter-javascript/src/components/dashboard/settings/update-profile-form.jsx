'use client';

import * as React from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import Avatar from '@mui/joy/Avatar';
import Box from '@mui/joy/Box';
import Button from '@mui/joy/Button';
import Chip from '@mui/joy/Chip';
import Divider from '@mui/joy/Divider';
import FormControl from '@mui/joy/FormControl';
import FormHelperText from '@mui/joy/FormHelperText';
import FormLabel from '@mui/joy/FormLabel';
import Grid from '@mui/joy/Grid';
import Input from '@mui/joy/Input';
import Option from '@mui/joy/Option';
import Select from '@mui/joy/Select';
import Stack from '@mui/joy/Stack';
import Textarea from '@mui/joy/Textarea';
import Typography from '@mui/joy/Typography';
import { Pen as PenIcon } from '@phosphor-icons/react/dist/ssr/Pen';
import { Controller, useForm } from 'react-hook-form';
import { z as zod } from 'zod';

import { logger } from '@/lib/default-logger';
import { toast } from '@/components/core/toaster';

const schema = zod.object({
  avatar: zod.string().optional(),
  firstName: zod.string().min(1, { message: 'First name is required' }).max(255),
  lastName: zod.string().min(1, { message: 'Last name is required' }).max(255),
  email: zod.string().min(1, { message: 'Email is required' }).email(),
  bio: zod.string().max(500).optional(),
  website: zod.string().max(255).optional(),
  country: zod.string().min(1, 'Country is required').max(255),
  state: zod.string().min(1, 'State is required').max(255),
  city: zod.string().min(1, 'City is required').max(255),
  zipCode: zod.string().min(1, 'Zip code is required').max(255),
  line1: zod.string().min(1, 'Address is required').max(255),
  line2: zod.string().max(255).optional(),
});

const defaultValues = {
  avatar: '/assets/avatar.png',
  firstName: 'Rene',
  lastName: 'Wells',
  email: 'rene@devias.io',
  bio: "Hi there! I'm Rene, a seasoned developer with a heart that belongs to both the digital realm and the breathtaking mountains. Let's connect and code the future together!",
  website: 'devias.io',
  country: 'us',
  state: 'Colorado',
  city: 'Denver',
  zipCode: '80218',
  line1: 'Street Roy Alley 1155, house 1B',
};

export function UpdateProfileForm() {
  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({ defaultValues, resolver: zodResolver(schema) });

  const onSubmit = React.useCallback(async (_) => {
    try {
      // Make API request
      toast.success('Details updated');
    } catch (err) {
      logger.error(err);
    }
  }, []);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Stack divider={<Divider />} spacing={5}>
        <Stack direction="row" spacing={3} sx={{ alignItems: 'center' }}>
          <Controller
            control={control}
            name="avatar"
            render={({ field }) => (
              <Box sx={{ '--Avatar-size': '120px', position: 'relative' }}>
                <Avatar src={field.value} />
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
                  <PenIcon fontSize="var(--joy-fontSize-md)" weight="bold" />
                </Box>
              </Box>
            )}
          />
          <div>
            <Typography level="h4">Profile Picture</Typography>
            <Typography level="body-sm">Supports PNGs, JPEGs and GIFs under 3MB</Typography>
          </div>
        </Stack>
        <Stack spacing={3}>
          <Typography level="h4">Basic details</Typography>
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
                <Stack spacing={3}>
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
                  <Controller
                    control={control}
                    name="bio"
                    render={({ field }) => (
                      <FormControl error={Boolean(errors.bio)}>
                        <FormLabel>Bio</FormLabel>
                        <Textarea {...field} maxRows={5} minRows={3} />
                        {errors.bio ? <FormHelperText>{errors.bio.message}</FormHelperText> : null}
                      </FormControl>
                    )}
                  />
                  <Controller
                    control={control}
                    name="website"
                    render={({ field }) => (
                      <FormControl error={Boolean(errors.website)}>
                        <FormLabel>Website</FormLabel>
                        <Input
                          {...field}
                          startDecorator={
                            <Chip size="sm" variant="soft">
                              www.
                            </Chip>
                          }
                        />
                      </FormControl>
                    )}
                  />
                </Stack>
              </Grid>
            </Grid>
          </Box>
        </Stack>
        <Stack spacing={3}>
          <Stack spacing={3}>
            <Typography level="h4">Location</Typography>
            <Box sx={{ maxWidth: 'lg' }}>
              <Grid container spacing={3}>
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
                <Grid md={6} xs={12}>
                  <Controller
                    control={control}
                    name="zipCode"
                    render={({ field }) => (
                      <FormControl error={Boolean(errors.zipCode)}>
                        <FormLabel>Zip Code</FormLabel>
                        <Input {...field} />
                        {errors.zipCode ? <FormHelperText>{errors.zipCode.message}</FormHelperText> : null}
                      </FormControl>
                    )}
                  />
                </Grid>
                <Grid md={6} xs={12}>
                  <Controller
                    control={control}
                    name="line1"
                    render={({ field }) => (
                      <FormControl error={Boolean(errors.line1)}>
                        <FormLabel>Address</FormLabel>
                        <Textarea {...field} maxRows={3} minRows={2} />
                        {errors.line1 ? <FormHelperText>{errors.line1.message}</FormHelperText> : null}
                      </FormControl>
                    )}
                  />
                </Grid>
              </Grid>
            </Box>
          </Stack>
        </Stack>
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
