import * as React from 'react';
import Alert from '@mui/joy/Alert';
import Box from '@mui/joy/Box';
import Link from '@mui/joy/Link';
import Stack from '@mui/joy/Stack';
import Typography from '@mui/joy/Typography';
import { Helmet } from 'react-helmet-async';
import { useSearchParams } from 'react-router-dom';

import { config } from '@/config';
import { paths } from '@/paths';
import { GuestGuard } from '@/components/auth/guest-guard';
import { SplitLayout } from '@/components/auth/split-layout';
import { ResetPasswordButton } from '@/components/auth/supabase/reset-password-button';
import { RouterLink } from '@/components/core/link';
import { DynamicLogo } from '@/components/core/logo';

const metadata = { title: `Recovery link sent | Supabase | Auth | ${config.site.name}` };

export function Page() {
  const { email } = useExtractSearchParams();

  if (!email) {
    return (
      <Box sx={{ p: 3 }}>
        <Alert color="danger">Email is required</Alert>
      </Box>
    );
  }

  return (
    <React.Fragment>
      <Helmet>
        <title>{metadata.title}</title>
      </Helmet>
      <GuestGuard>
        <SplitLayout>
          <Stack spacing={5}>
            <Box sx={{ display: 'flex', justifyContent: 'center' }}>
              <Box component={RouterLink} href={paths.home} sx={{ display: 'inline-block', fontSize: 0 }}>
                <DynamicLogo colorDark="light" colorLight="dark" height={32} width={154} />
              </Box>
            </Box>
            <Stack spacing={3}>
              <Typography level="h3" textAlign="center">
                Recovery Link Sent
              </Typography>
              <Stack spacing={1} sx={{ alignItems: 'center' }}>
                <Typography textAlign="center">
                  If an account exists with email <Typography fontWeight="lg">&quot;{email}&quot;</Typography>, you will
                  receive a recovery email.
                </Typography>
                <div>
                  <Link component={RouterLink} href={paths.auth.supabase.resetPassword} textAlign="center">
                    Use another email
                  </Link>
                </div>
              </Stack>
              <ResetPasswordButton email={email}>Resend</ResetPasswordButton>
            </Stack>
          </Stack>
        </SplitLayout>
      </GuestGuard>
    </React.Fragment>
  );
}

function useExtractSearchParams() {
  const [searchParams] = useSearchParams();

  return { email: searchParams.get('email') || undefined };
}
