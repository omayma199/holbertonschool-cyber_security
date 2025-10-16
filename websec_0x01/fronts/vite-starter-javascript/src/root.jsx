'use client';

import * as React from 'react';
import { Helmet, HelmetProvider } from 'react-helmet-async';

import '@/styles/global.css';

import { config } from '@/config';
import { applyDefaultSettings } from '@/lib/settings/apply-default-settings';
import { getSettings as getPersistedSettings } from '@/lib/settings/get-settings';
import { UserProvider } from '@/contexts/auth/user-context';
import { SettingsProvider } from '@/contexts/settings';
import { Analytics } from '@/components/core/analytics';
import { LocalizationProvider } from '@/components/core/localization-provider';
import { SettingsButton } from '@/components/core/settings/settings-button';
import { ThemeProvider } from '@/components/core/theme-provider/theme-provider';
import { Toaster } from '@/components/core/toaster';

const metadata = { title: config.site.name };

export function Root({ children }) {
  const settings = React.useRef(applyDefaultSettings(getPersistedSettings()));

  return (
    <HelmetProvider>
      <Helmet>
        <title>{metadata.title}</title>
        <meta content={config.site.themeColor} name="theme-color" />
      </Helmet>
      <Analytics>
        <LocalizationProvider>
          <UserProvider>
            <SettingsProvider settings={settings.current}>
              <ThemeProvider>
                {children}
                <SettingsButton />
                <Toaster position="bottom-right" />
              </ThemeProvider>
            </SettingsProvider>
          </UserProvider>
        </LocalizationProvider>
      </Analytics>
    </HelmetProvider>
  );
}
