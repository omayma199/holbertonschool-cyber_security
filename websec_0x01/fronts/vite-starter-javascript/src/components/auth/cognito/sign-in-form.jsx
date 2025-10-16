'use client';

import * as React from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import Alert from '@mui/joy/Alert';
import Box from '@mui/joy/Box';
import Button from '@mui/joy/Button';
import FormControl from '@mui/joy/FormControl';
import FormHelperText from '@mui/joy/FormHelperText';
import FormLabel from '@mui/joy/FormLabel';
import IconButton from '@mui/joy/IconButton';
import Input from '@mui/joy/Input';
import Link from '@mui/joy/Link';
import Stack from '@mui/joy/Stack';
import Tab from '@mui/joy/Tab';
import TabList from '@mui/joy/TabList';
import Tabs from '@mui/joy/Tabs';
import { Eye as EyeIcon } from '@phosphor-icons/react/dist/ssr/Eye';
import { EyeSlash as EyeSlashIcon } from '@phosphor-icons/react/dist/ssr/EyeSlash';
import { resendSignUpCode, signIn } from 'aws-amplify/auth';
import { Controller, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { z as zod } from 'zod';

import { paths } from '@/paths';
import { RouterLink } from '@/components/core/link';
import { DynamicLogo } from '@/components/core/logo';

const schema = zod.object({
  email: zod.string().min(1, { message: 'Email is required' }).email(),
  password: zod.string().min(1, { message: 'Password is required' }),
});

const defaultValues = { email: '', password: '' };

export function SignInForm() {
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = React.useState();

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
        const { nextStep } = await signIn({ username: values.email, password: values.password });

        if (nextStep.signInStep === 'DONE') {
          // UserProvider will handle Router refresh
          // After refresh, GuestGuard will handle the redirect
          return;
        }

        if (nextStep.signInStep === 'CONFIRM_SIGN_UP') {
          await resendSignUpCode({ username: values.email });
          const searchParams = new URLSearchParams({ email: values.email });
          navigate(`${paths.auth.cognito.signUpConfirm}?${searchParams.toString()}`);
          return;
        }

        if (nextStep.signInStep === 'CONFIRM_SIGN_IN_WITH_NEW_PASSWORD_REQUIRED') {
          navigate(paths.auth.cognito.newPasswordRequired);
          return;
        }

        throw new Error(`Unhandled next step: ${nextStep.signInStep}`);
      } catch (err) {
        setError('root', { type: 'server', message: err.message });
        setIsPending(false);
      }
    },
    [navigate, setError]
  );

  return (
    <Stack spacing={5}>
      <Box sx={{ display: 'flex', justifyContent: 'center' }}>
        <Box component={RouterLink} href={paths.home} sx={{ display: 'inline-block', fontSize: 0 }}>
          <DynamicLogo colorDark="light" colorLight="dark" height={32} width={154} />
        </Box>
      </Box>
      <Tabs value="sign-in" variant="custom">
        <TabList>
          <Tab component={RouterLink} href={paths.auth.cognito.signIn} value="sign-in">
            Sign In
          </Tab>
          <Tab component={RouterLink} href={paths.auth.cognito.signUp} value="sign-up">
            Create Account
          </Tab>
        </TabList>
      </Tabs>
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
          <Controller
            control={control}
            name="password"
            render={({ field }) => (
              <FormControl error={Boolean(errors.password)}>
                <FormLabel>Password</FormLabel>
                <Input
                  {...field}
                  endDecorator={
                    <IconButton
                      onClick={() => {
                        setShowPassword(!showPassword);
                      }}
                    >
                      {showPassword ? (
                        <EyeSlashIcon fontSize="var(--Icon-fontSize)" weight="bold" />
                      ) : (
                        <EyeIcon fontSize="var(--Icon-fontSize)" weight="bold" />
                      )}
                    </IconButton>
                  }
                  type={showPassword ? 'text' : 'password'}
                />
                {errors.password ? <FormHelperText>{errors.password.message}</FormHelperText> : null}
              </FormControl>
            )}
          />
          <div>
            <Link component={RouterLink} href={paths.auth.cognito.resetPassword}>
              Forgot password?
            </Link>
          </div>
          {errors.root ? <Alert color="danger">{errors.root.message}</Alert> : null}
          <Button disabled={isPending} type="submit">
            Sign In
          </Button>
        </Stack>
      </form>
    </Stack>
  );
}
