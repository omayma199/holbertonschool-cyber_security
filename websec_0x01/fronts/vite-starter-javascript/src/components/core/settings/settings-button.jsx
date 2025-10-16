'use client';

import * as React from 'react';
import IconButton from '@mui/joy/IconButton';
import { GearSix as GearSixIcon } from '@phosphor-icons/react/dist/ssr/GearSix';

import { setSettings as setPersistedSettings } from '@/lib/settings/set-settings';
import { usePopover } from '@/hooks/use-popover';
import { useSettings } from '@/hooks/use-settings';

import { SettingsPopover } from './settings-popover';

export function SettingsButton() {
  const { settings, setSettings } = useSettings();
  const popover = usePopover();

  const handleUpdate = async (values) => {
    popover.handleClose();

    const updatedSettings = { ...settings, ...values };

    setPersistedSettings(updatedSettings);
    setSettings(updatedSettings);
  };

  return (
    <React.Fragment>
      <IconButton
        color="neutral"
        onClick={popover.handleOpen}
        ref={popover.anchorRef}
        sx={{
          bottom: 0,
          boxShadow: 'var(--joy-shadow-lg)',
          m: '40px',
          position: 'fixed',
          right: 0,
          zIndex: 'var(--joy-zIndex-popup)',
          '& svg': {
            animation: 'spin 4s linear infinite',
            '@keyframes spin': { '0%': { rotate: '0' }, '100%': { rotate: '360deg' } },
          },
        }}
        variant="solid"
      >
        <GearSixIcon fontSize="var(--Icon-fontSize)" weight="bold" />
      </IconButton>
      <SettingsPopover
        anchorEl={popover.anchorRef.current}
        onClose={popover.handleClose}
        onUpdate={handleUpdate}
        open={popover.open}
        settings={settings}
      />
    </React.Fragment>
  );
}
