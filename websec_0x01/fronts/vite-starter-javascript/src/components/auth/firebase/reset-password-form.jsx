'use client';

import * as React from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import Alert from '@mui/joy/Alert';
import Box from '@mui/joy/Box';
import Button from '@mui/joy/Button';
import FormControl from '@mui/joy/FormControl';
import FormHelperText from '@mui/joy/FormHelperText';
import FormLabel from '@mui/joy/FormLabel';
import Input from '@mui/joy/Input';
import Stack from '@mui/joy/Stack';
import Typography from '@mui/joy/Typography';
import { sendPasswordResetEmail } from 'firebase/auth';
import { Controller, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { z as zod } from 'zod';

import { paths } from '@/paths';
import { getFirebaseAuth } from '@/lib/auth/firebase/client';
import { RouterLink } from '@/components/core/link';
import { DynamicLogo } from '@/components/core/logo';

const schema = zod.object({ email: zod.string().min(1, { message: 'Email is required' }).email() });

const defaultValues = { email: '' };

export function ResetPasswordForm() {
  const [firebaseAuth] = React.useState(getFirebaseAuth());

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

      // If you receive a link that opens a page with the error "The selected page mode is invalid"
      // you might have this issue https://github.com/firebase/firebase-js-sdk/issues/7981
      // In our case, we had to wait some time and then it started to work as expected.

      try {
        await sendPasswordResetEmail(firebaseAuth, values.email);
        const searchParams = new URLSearchParams({ email: values.email });
        navigate(`${paths.auth.firebase.recoveryLinkSent}?${searchParams.toString()}`);
      } catch (err) {
        setError('root', { type: 'server', message: err.message });
        setIsPending(false);
      }
    },
    [firebaseAuth, navigate, setError]
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
          Reset Password
        </Typography>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Stack spacing={2}>
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
            {errors.root ? <Alert color="danger">{errors.root.message}</Alert> : null}
            <Button disabled={isPending} type="submit">
              Send Recovery Link
            </Button>
          </Stack>
        </form>
      </Stack>
    </Stack>
  );
}
