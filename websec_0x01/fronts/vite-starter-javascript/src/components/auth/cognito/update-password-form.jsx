'use client';

import * as React from 'react';
import { confirmResetPassword } from '@aws-amplify/auth';
import { zodResolver } from '@hookform/resolvers/zod';
import Alert from '@mui/joy/Alert';
import Box from '@mui/joy/Box';
import Button from '@mui/joy/Button';
import FormControl from '@mui/joy/FormControl';
import FormHelperText from '@mui/joy/FormHelperText';
import FormLabel from '@mui/joy/FormLabel';
import Input from '@mui/joy/Input';
import Link from '@mui/joy/Link';
import Stack from '@mui/joy/Stack';
import Typography from '@mui/joy/Typography';
import { Controller, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { z as zod } from 'zod';

import { paths } from '@/paths';
import { RouterLink } from '@/components/core/link';
import { DynamicLogo } from '@/components/core/logo';
import { toast } from '@/components/core/toaster';

import { ResetPasswordButton } from './reset-password-button';

const schema = zod
  .object({
    confirmationCode: zod.string().min(1, { message: 'Confirmation code is required' }),
    password: zod.string().min(6, { message: 'Password should be at least 6 characters' }),
    confirmPassword: zod.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ['confirmPassword'],
  });

const defaultValues = { confirmationCode: '', password: '', confirmPassword: '' };

export function UpdatePasswordForm({ email }) {
  const navigate = useNavigate();

  const [isPending, setIsPending] = React.useState(false);

  const {
    control,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm({ defaultValues, resolver: zodResolver(schema) });

  const onSubmit = React.useCallback(
    async (values) => {
      setIsPending(true);

      try {
        await confirmResetPassword({
          username: email,
          newPassword: values.password,
          confirmationCode: values.confirmationCode,
        });
        toast.success('Password updated');
        navigate(paths.auth.cognito.signIn);
      } catch (err) {
        setError('root', { type: 'server', message: err.message });
        setIsPending(false);
      }
    },
    [navigate, email, setError]
  );

  return (
    <Stack spacing={5}>
      <Box sx={{ display: 'flex', justifyContent: 'center' }}>
        <Box component={RouterLink} href={paths.home} sx={{ display: 'inline-block', fontSize: 0 }}>
          <DynamicLogo colorDark="light" colorLight="dark" height={32} width={154} />
        </Box>
      </Box>
      <Stack spacing={3}>
        <Typography level="h3" textAlign="center">
          Update Password
        </Typography>
        <Stack spacing={1} sx={{ alignItems: 'center' }}>
          <Typography textAlign="center">
            If an account exists with email <Typography fontWeight="lg">&quot;{email}&quot;</Typography>, you will
            receive a recovery email.
          </Typography>
          <div>
            <Link component={RouterLink} href={paths.auth.cognito.resetPassword} textAlign="center">
              Use another email
            </Link>
          </div>
        </Stack>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Stack spacing={2}>
            <Controller
              control={control}
              name="confirmationCode"
              render={({ field }) => (
                <FormControl error={Boolean(errors.confirmationCode)}>
                  <FormLabel>Confirmation Code</FormLabel>
                  <Input {...field} />
                  {errors.confirmationCode ? <FormHelperText>{errors.confirmationCode.message}</FormHelperText> : null}
                </FormControl>
              )}
            />
            <Controller
              control={control}
              name="password"
              render={({ field }) => (
                <FormControl error={Boolean(errors.password)}>
                  <FormLabel>Password</FormLabel>
                  <Input {...field} type="password" />
                  {errors.password ? <FormHelperText>{errors.password.message}</FormHelperText> : null}
                </FormControl>
              )}
            />
            <Controller
              control={control}
              name="confirmPassword"
              render={({ field }) => (
                <FormControl error={Boolean(errors.confirmPassword)}>
                  <FormLabel>Confirm Password</FormLabel>
                  <Input {...field} type="password" />
                  {errors.confirmPassword ? <FormHelperText>{errors.confirmPassword.message}</FormHelperText> : null}
                </FormControl>
              )}
            />
            {errors.root ? <Alert color="danger">{errors.root.message}</Alert> : null}
            <Button disabled={isPending} type="submit">
              Update Password
            </Button>
          </Stack>
        </form>
        <ResetPasswordButton email={email}>Resend</ResetPasswordButton>
      </Stack>
    </Stack>
  );
}
