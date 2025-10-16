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
import { createUserWithEmailAndPassword, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { Controller, useForm } from 'react-hook-form';
import { z as zod } from 'zod';

import { paths } from '@/paths';
import { getFirebaseAuth } from '@/lib/auth/firebase/client';
import { Image } from '@/components/core/image';
import { RouterLink } from '@/components/core/link';
import { DynamicLogo } from '@/components/core/logo';
import { toast } from '@/components/core/toaster';

const oAuthProviders = [{ id: 'google', name: 'Google', logo: '/assets/logo-google.svg' }];

const schema = zod.object({
  firstName: zod.string().min(1, { message: 'First name is required' }),
  lastName: zod.string().min(1, { message: 'Last name is required' }),
  email: zod.string().min(1, { message: 'Email is required' }).email(),
  password: zod.string().min(6, { message: 'Password should be at least 6 characters' }),
  terms: zod.boolean().refine((value) => value, 'You must accept the terms and conditions'),
});

const defaultValues = { firstName: '', lastName: '', email: '', password: '', terms: false };

export function SignUpForm() {
  const [firebaseAuth] = React.useState(getFirebaseAuth());

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

      let provider;

      switch (providerId) {
        case 'google':
          provider = new GoogleAuthProvider();
          break;
        default:
          throw new Error(`Unknown provider: ${providerId}`);
      }

      try {
        await signInWithPopup(firebaseAuth, provider);
        // UserProvider will handle Router refresh
        // After refresh, GuestGuard will handle the redirect
      } catch (err) {
        setIsPending(false);
        toast.error(err.message);
      }
    },
    [firebaseAuth]
  );

  const onSubmit = React.useCallback(
    async (values) => {
      setIsPending(true);

      try {
        await createUserWithEmailAndPassword(firebaseAuth, values.email, values.password);
        // UserProvider will handle Router refresh
        // After refresh, GuestGuard will handle the redirect
      } catch (err) {
        setError('root', { type: 'server', message: err.message });
        setIsPending(false);
      }
    },
    [firebaseAuth, setError]
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
          <Tab component={RouterLink} href={paths.auth.firebase.signIn} value="sign-in">
            Sign In
          </Tab>
          <Tab component={RouterLink} href={paths.auth.firebase.signUp} value="sign-up">
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
