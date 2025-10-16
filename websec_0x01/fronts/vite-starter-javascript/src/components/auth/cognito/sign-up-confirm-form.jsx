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
import { autoSignIn, confirmSignUp } from 'aws-amplify/auth';
import { Controller, useForm } from 'react-hook-form';
import { z as zod } from 'zod';

import { paths } from '@/paths';
import { RouterLink } from '@/components/core/link';
import { DynamicLogo } from '@/components/core/logo';

const schema = zod.object({ confirmationCode: zod.string().min(1, { message: 'Code is required' }) });

const defaultValues = { confirmationCode: '' };

export function SignUpConfirmForm({ email }) {
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
        const { nextStep } = await confirmSignUp({ username: email, confirmationCode: values.confirmationCode });

        if (nextStep.signUpStep === 'DONE') {
          // Unless you disabled `autoSignIn` in signUp
          // UserProvider will handle Router refresh
          // After refresh, GuestGuard will handle the redirect
          // Otherwise you should redirect to the sign in page.
          return;
        }

        if (nextStep.signUpStep === 'COMPLETE_AUTO_SIGN_IN') {
          await autoSignIn();
          return;
        }

        throw new Error(`Unhandled next step: ${nextStep.signUpStep}`);
      } catch (err) {
        setError('root', { type: 'server', message: err.message });
        setIsPending(false);
      }
    },
    [email, setError]
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
          Confirm Your Email
        </Typography>
        <Typography textAlign="center">
          We&apos;ve sent a verification email to <Typography fontWeight="lg">&quot;{email}&quot;</Typography>.
        </Typography>
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
            {errors.root ? <Alert color="danger">{errors.root.message}</Alert> : null}
            <Button disabled={isPending} type="submit">
              Confirm
            </Button>
          </Stack>
        </form>
      </Stack>
    </Stack>
  );
}
