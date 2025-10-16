'use client';

import * as React from 'react';
import Box from '@mui/joy/Box';
import Button from '@mui/joy/Button';
import Chip from '@mui/joy/Chip';
import Stack from '@mui/joy/Stack';
import Typography from '@mui/joy/Typography';
import { TextAlignLeft as TextAlignLeftIcon } from '@phosphor-icons/react/dist/ssr/TextAlignLeft';
import { TextAlignRight as TextAlignRightIcon } from '@phosphor-icons/react/dist/ssr/TextAlignRight';

import { Popup, PopupContent } from '@/components/core/popup';

export function SettingsPopover({ anchorEl, onClose, onUpdate, open, settings }) {
  const [primaryColor, setPrimaryColor] = React.useState(settings.primaryColor);
  const [direction, setDirection] = React.useState(settings.direction || 'ltr');

  React.useEffect(() => {
    setPrimaryColor(settings.primaryColor);
    setDirection(settings.direction || 'ltr');
  }, [settings]);

  return (
    <Popup anchorEl={anchorEl} onClose={onClose} open={open} placement="top-end" sx={{ maxWidth: '320px', pb: 1 }}>
      <PopupContent sx={{ p: 2 }}>
        <Stack spacing={3}>
          <Stack spacing={2}>
            <Typography level="title-md">Primary Color</Typography>
            <Stack direction="row" spacing={2} sx={{ flexWrap: 'wrap' }}>
              {[
                { value: 'palatinateBlue', color: '#3d37dd' },
                { value: 'seaGreen', color: '#18834c' },
                { value: 'crayolaBlue', color: '#1b49f5' },
              ].map((option) => (
                <Box
                  key={option.value}
                  onClick={() => {
                    setPrimaryColor(option.value);
                  }}
                  sx={{
                    bgcolor: option.color,
                    border: '1px solid var(--joy-palette-background-surface)',
                    borderRadius: 'var(--joy-radius-sm)',
                    flex: '0 0 auto',
                    height: '32px',
                    width: '32px',
                    ...(primaryColor === option.value && { outline: `2px solid ${option.color}` }),
                  }}
                />
              ))}
            </Stack>
          </Stack>
          <Stack spacing={2}>
            <Typography level="title-md">Direction</Typography>
            <Stack direction="row" spacing={2} sx={{ flexWrap: 'wrap' }}>
              {[
                { label: 'Left to Right', value: 'ltr' },
                { label: 'Right to Left', value: 'rtl' },
              ].map((option) => (
                <Chip
                  color={direction === option.value ? 'primary' : 'neutral'}
                  key={option.value}
                  onClick={() => {
                    setDirection(option.value);
                  }}
                  startDecorator={
                    option.value === 'ltr' ? (
                      <TextAlignLeftIcon fontSize="var(--joy-fontSize-lg)" />
                    ) : (
                      <TextAlignRightIcon fontSize="var(--joy-fontSize-lg)" />
                    )
                  }
                >
                  {option.label}
                </Chip>
              ))}
            </Stack>
          </Stack>
          <Button
            color="neutral"
            onClick={() => {
              onUpdate?.({ primaryColor, direction });
            }}
            size="sm"
            variant="outlined"
          >
            Apply
          </Button>
        </Stack>
      </PopupContent>
    </Popup>
  );
}
