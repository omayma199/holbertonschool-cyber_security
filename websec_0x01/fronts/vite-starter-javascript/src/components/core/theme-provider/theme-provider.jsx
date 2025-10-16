'use client';

import * as React from 'react';
import CssBaseline from '@mui/joy/CssBaseline';
import { CssVarsProvider } from '@mui/joy/styles';
import { Helmet } from 'react-helmet-async';

import { useSettings } from '@/hooks/use-settings';
import { createTheme } from '@/styles/theme/create-theme';

import { Rtl } from './rtl';

export function ThemeProvider({ children }) {
  const { settings } = useSettings();

  const theme = createTheme({ primaryColor: settings.primaryColor, direction: settings.direction });

  return (
    <CssVarsProvider defaultColorScheme={settings.colorScheme} defaultMode={settings.colorScheme} theme={theme}>
      <Helmet>
        <meta content={settings.colorScheme} name="color-scheme" />
      </Helmet>
      <CssBaseline />
      <Rtl direction={settings.direction}>{children}</Rtl>
    </CssVarsProvider>
  );
}
