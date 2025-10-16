'use client';

import * as React from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import Alert from '@mui/joy/Alert';
import Box from '@mui/joy/Box';
import Button from '@mui/joy/Button';
import Checkbox from '@mui/joy/Checkbox';
import Divider from '@mui/joy/Divider';
import FormControl from '@mui/joy/FormControl';
import FormHelperText from '@mui/joy/FormHelperText';
import FormLabel from '@mui/joy/FormLabel';
import Input from '@mui/joy/Input';
import Link from '@mui/joy/Link';
import Stack from '@mui/joy/Stack';
import Tab from '@mui/joy/Tab';
import TabList from '@mui/joy/TabList';
import Tabs from '@mui/joy/Tabs';
import { Controller, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { z as zod } from 'zod';

import { paths } from '@/paths';
import { createClient as createSupabaseClient } from '@/lib/supabase/client';
import { Image } from '@/components/core/image';
import { RouterLink } from '@/components/core/link';
import { DynamicLogo } from '@/components/core/logo';
import { toast } from '@/components/core/toaster';

const oAuthProviders = [
  { id: 'google', name: 'Google', logo: '/assets/logo-google.svg' },
  { id: 'discord', name: 'Discord', logo: '/assets/logo-discord.svg' },
];

const schema = zod.object({
  firstName: zod.string().min(1, { message: 'First name is required' }),
  lastName: zod.string().min(1, { message: 'Last name is required' }),
  email: zod.string().min(1, { message: 'Email is required' }).email(),
  password: zod.string().min(6, { message: 'Password should be at least 6 characters' }),
  terms: zod.boolean().refine((value) => value, 'You must accept the terms and conditions'),
});

const defaultValues = { firstName: '', lastName: '', email: '', password: '', terms: false };

export function SignUpForm() {
  const [supabaseClient] = React.useState(createSupabaseClient());

  const navigate = useNavigate();

  const [isPending, setIsPending] = React.useState(false);

  const {
    control,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm({ defaultValues, resolver: zodResolver(schema) });

  const onAuth = React.useCallback(
    async (providerId) => {
      setIsPending(true);

      const redirectToUrl = new URL(paths.auth.supabase.callback, window.location.origin);
      redirectToUrl.searchParams.set('next', paths.dashboard.overview);

      const { data, error } = await supabaseClient.auth.signInWithOAuth({
        provider: providerId,
        options: { redirectTo: redirectToUrl.href },
      });

      if (error) {
        setIsPending(false);
        toast.error(error.message);
        return;
      }

      window.location.href = data.url;
    },
    [supabaseClient]
  );

  const onSubmit = React.useCallback(
    async (values) => {
      setIsPending(true);

      // It is really important that you read the official notes
      // under "If signUp() is called for an existing confirmed user"
      // https://supabase.com/docs/reference/javascript/auth-signup
      // If a user already exists with this email, they will not
      // receive a confirmation email.

      const redirectToUrl = new URL(paths.auth.supabase.callback, window.location.origin);
      redirectToUrl.searchParams.set('next', paths.dashboard.overview);

      const { data, error } = await supabaseClient.auth.signUp({
        email: values.email,
        password: values.password,
        options: { emailRedirectTo: redirectToUrl.href },
      });

      if (error) {
        setError('root', { type: 'server', message: error.message });
        setIsPending(false);
        return;
      }

      if (data.session) {
        // UserProvider will handle Router refresh
        // After refresh, GuestGuard will handle the redirect
        return;
      }

      if (data.user) {
        const searchParams = new URLSearchParams({ email: values.email });
        navigate(`${paths.auth.supabase.signUpConfirm}?${searchParams.toString()}`);
        return;
      }

      setIsPending(false);
    },
    [supabaseClient, navigate, setError]
  );

  return (
    <Stack spacing={5}>
      <Box sx={{ display: 'flex', justifyContent: 'center' }}>
        <Box component={RouterLink} href={paths.home} sx={{ display: 'inline-block', fontSize: 0 }}>
          <DynamicLogo colorDark="light" colorLight="dark" height={32} width={154} />
        </Box>
      </Box>
      <Tabs value="sign-up" variant="custom">
        <TabList>
          <Tab component={RouterLink} href={paths.auth.supabase.signIn} value="sign-in">
            Sign In
          </Tab>
          <Tab component={RouterLink} href={paths.auth.supabase.signUp} value="sign-up">
            Create Account
          </Tab>
        </TabList>
      </Tabs>
      <Stack spacing={3}>
        <Stack spacing={2}>
          {oAuthProviders.map((provider) => (
            <Button
              color="neutral"
              disabled={isPending}
              endDecorator={<Image alt="" height={24} src={provider.logo} width={24} />}
              key={provider.id}
              onClick={() => {
                onAuth(provider.id).catch(() => {
                  // noop
                });
              }}
              variant="outlined"
            >
              Continue with {provider.name}
            </Button>
          ))}
        </Stack>
        <Divider>or</Divider>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Stack spacing={2}>
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
              name="terms"
              render={({ field }) => (
                <FormControl error={Boolean(errors.terms)}>
                  <Checkbox
                    checked={field.value}
                    label={
                      <React.Fragment>
                        I have read the <Link>terms and conditions</Link>
                      </React.Fragment>
                    }
                    name={field.name}
                    onChange={field.onChange}
                  />
                  {errors.terms ? <FormHelperText>{errors.terms.message}</FormHelperText> : null}
                </FormControl>
              )}
            />
            {errors.root ? <Alert color="danger">{errors.root.message}</Alert> : null}
            <Button disabled={isPending} type="submit">
              Create Account
            </Button>
          </Stack>
        </form>
      </Stack>
    </Stack>
  );
}
