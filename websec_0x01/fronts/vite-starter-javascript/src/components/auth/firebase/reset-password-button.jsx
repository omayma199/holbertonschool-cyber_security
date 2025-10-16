'use client';

import * as React from 'react';
import Alert from '@mui/joy/Alert';
import Button from '@mui/joy/Button';
import Stack from '@mui/joy/Stack';
import Typography from '@mui/joy/Typography';
import { sendPasswordResetEmail } from 'firebase/auth';

import { getFirebaseAuth } from '@/lib/auth/firebase/client';

export function ResetPasswordButton({ children, email }) {
  const [firebaseAuth] = React.useState(getFirebaseAuth());

  const [isPending, setIsPending] = React.useState(false);
  const [submitError, setSubmitError] = React.useState();

  const handle = React.useCallback(async () => {
    try {
      await sendPasswordResetEmail(firebaseAuth, email);
    } catch (err) {
      setSubmitError(err.message);
      setIsPending(false);
    }
  }, [firebaseAuth, email]);

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
