'use client';

import * as React from 'react';
import Alert from '@mui/joy/Alert';
import Button from '@mui/joy/Button';
import Stack from '@mui/joy/Stack';
import Typography from '@mui/joy/Typography';

import { paths } from '@/paths';
import { createClient as createSupabaseClient } from '@/lib/supabase/client';
import { toast } from '@/components/core/toaster';

export function ResetPasswordButton({ children, email }) {
  const [supabaseClient] = React.useState(createSupabaseClient());

  const [isPending, setIsPending] = React.useState(false);
  const [submitError, setSubmitError] = React.useState();

  const handle = React.useCallback(async () => {
    setIsPending(true);
    setSubmitError(undefined);

    const redirectToUrl = new URL(paths.auth.supabase.callback, window.location.origin);
    redirectToUrl.searchParams.set('next', paths.auth.supabase.updatePassword);

    const { error } = await supabaseClient.auth.resetPasswordForEmail(email, { redirectTo: redirectToUrl.href });

    if (error) {
      setSubmitError(error.message);
      setIsPending(false);
      return;
    }

    setIsPending(false);
    toast.success('Recovery link sent');
  }, [supabaseClient, email]);

  return (
    <Stack spacing={2}>
      {submitError ? <Alert color="danger">{submitError}</Alert> : null}
      <Stack spacing={1}>
        <Button disabled={!email || isPending} onClick={handle}>
          {children}
        </Button>
        <Typography level="body-sm" textAlign="center">
          Wait a few minutes then try again
        </Typography>
      </Stack>
    </Stack>
  );
}
