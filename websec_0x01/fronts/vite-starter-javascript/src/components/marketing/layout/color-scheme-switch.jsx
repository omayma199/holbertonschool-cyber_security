'use client';

import * as React from 'react';
import IconButton from '@mui/joy/IconButton';
import { useColorScheme } from '@mui/joy/styles';
import { Moon as MoonIcon } from '@phosphor-icons/react/dist/ssr/Moon';
import { Sun as SunIcon } from '@phosphor-icons/react/dist/ssr/Sun';

import { setSettings as setPersistedSettings } from '@/lib/settings/set-settings';
import { useSettings } from '@/hooks/use-settings';

export function ColorSchemeSwitch() {
  const { settings, setSettings } = useSettings();
  const { colorScheme, setColorScheme } = useColorScheme();
  const Icon = colorScheme === 'light' ? MoonIcon : SunIcon;

  const handleToggle = async () => {
    const newColorScheme = colorScheme === 'light' ? 'dark' : 'light';

    const updatedSettings = { ...settings, colorScheme: newColorScheme };

    setPersistedSettings(updatedSettings);
    setSettings(updatedSettings);

    setColorScheme(newColorScheme);
  };

  return (
    <IconButton
      onClick={handleToggle}
      sx={{
        color: 'var(--joy-palette-common-white)',
        '&:hover': { bgcolor: 'var(--joy-palette-neutral-800)', color: 'var(--joy-palette-common-white)' },
      }}
    >
      <Icon fontSize="var(--Icon-fontSize)" weight="bold" />
    </IconButton>
  );
}
