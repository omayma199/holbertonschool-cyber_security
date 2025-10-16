'use client';

import * as React from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import Button from '@mui/joy/Button';
import FormControl from '@mui/joy/FormControl';
import FormHelperText from '@mui/joy/FormHelperText';
import FormLabel from '@mui/joy/FormLabel';
import Input from '@mui/joy/Input';
import Stack from '@mui/joy/Stack';
import Typography from '@mui/joy/Typography';
import { Controller, useForm } from 'react-hook-form';
import { z as zod } from 'zod';

import { logger } from '@/lib/default-logger';
import { toast } from '@/components/core/toaster';

const schema = zod
  .object({
    currentPassword: zod.string().min(1, { message: 'Current password is required' }),
    password: zod.string().min(6, { message: 'Password should be at least 6 characters' }),
    confirmPassword: zod.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ['confirmPassword'],
  });

const defaultValues = { currentPassword: '', password: '', confirmPassword: '' };

export function UpdatePasswordForm() {
  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({ defaultValues, resolver: zodResolver(schema) });

  const onSubmit = React.useCallback(async (_) => {
    try {
      // Make API request
      toast.success('Password updated');
    } catch (err) {
      logger.error(err);
    }
  }, []);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Stack spacing={3}>
        <Stack spacing={3} sx={{ maxWidth: 'sm' }}>
          <Typography level="h4">Change Password</Typography>
          <Controller
            control={control}
            name="currentPassword"
            render={({ field }) => (
              <FormControl error={Boolean(errors.currentPassword)}>
                <FormLabel>Current Password</FormLabel>
                <Input {...field} type="password" />
                {errors.currentPassword ? <FormHelperText>{errors.currentPassword.message}</FormHelperText> : null}
              </FormControl>
            )}
          />
          <Controller
            control={control}
            name="password"
            render={({ field }) => (
              <FormControl error={Boolean(errors.password)}>
                <FormLabel>New Password</FormLabel>
                <Input {...field} type="password" />
                {errors.password ? (
                  <FormHelperText>{errors.password.message}</FormHelperText>
                ) : (
                  <FormHelperText>Make sure it&apos;s a secure password and stored in a safe place.</FormHelperText>
                )}
              </FormControl>
            )}
          />
          <Controller
            control={control}
            name="confirmPassword"
            render={({ field }) => (
              <FormControl error={Boolean(errors.confirmPassword)}>
                <FormLabel>Confirm New Password</FormLabel>
                <Input {...field} type="password" />
                {errors.confirmPassword ? <FormHelperText>{errors.confirmPassword.message}</FormHelperText> : null}
              </FormControl>
            )}
          />
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
