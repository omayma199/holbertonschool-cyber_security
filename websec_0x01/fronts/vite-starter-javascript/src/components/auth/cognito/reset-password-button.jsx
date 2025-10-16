'use client';

import * as React from 'react';
import { resetPassword } from '@aws-amplify/auth';
import Alert from '@mui/joy/Alert';
import Button from '@mui/joy/Button';
import Stack from '@mui/joy/Stack';
import Typography from '@mui/joy/Typography';

import { toast } from '@/components/core/toaster';

export function ResetPasswordButton({ children, email }) {
  const [isPending, setIsPending] = React.useState(false);
  const [submitError, setSubmitError] = React.useState();

  const handle = React.useCallback(async () => {
    setIsPending(true);
    setSubmitError(undefined);

    try {
      await resetPassword({ username: email });

      setIsPending(false);
      toast.success('Recovery code sent');
    } catch (err) {
      setSubmitError(err.message);
      setIsPending(false);
    }
  }, [email]);

  return (
    <Stack spacing={2}>
      {submitError ? <Alert color="danger">{submitError}</Alert> : null}
      <Stack spacing={1}>
        <Button disabled={!email || isPending} onClick={handle} variant="plain">
          {children}
        </Button>
        <Typography level="body-sm" textAlign="center">
          Wait a few minutes then try again
        </Typography>
      </Stack>
    </Stack>
  );
}
