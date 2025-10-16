'use client';

import * as React from 'react';
import Box from '@mui/joy/Box';
import Button from '@mui/joy/Button';
import Stack from '@mui/joy/Stack';
import Typography from '@mui/joy/Typography';
import { Plus as PlusIcon } from '@phosphor-icons/react/dist/ssr/Plus';

import { Popup, PopupContent } from '@/components/core/popup';

const environmentMapping = { dev: 'Development', staging: 'Staging', prod: 'Production' };

export function WorkspacePoppover({ anchorEl, onChange, onClose, open, organizations = [] }) {
  return (
    <Popup
      anchorEl={anchorEl}
      disablePortal
      onClose={onClose}
      open={open}
      placement="bottom"
      sx={{ maxWidth: '272px', py: 1 }}
    >
      <PopupContent
        sx={{
          bgcolor: 'var(--joy-palette-neutral-800)',
          border: 'none',
          borderRadius: 'var(--joy-radius-sm)',
          color: 'var(--joy-palette-common-white)',
          p: 1,
        }}
      >
        <Stack spacing={1}>
          {organizations.map((organization) => {
            const environment = environmentMapping[organization.environment] ?? 'Unknown';

            return (
              <Box
                key={organization.id}
                onClick={() => {
                  onChange?.(organization.id);
                  onClose?.();
                }}
                role="button"
                sx={{
                  borderRadius: 'var(--joy-radius-sm)',
                  cursor: 'pointer',
                  p: '8px 12px',
                  '&:hover': { bgcolor: 'var(--joy-palette-neutral-700)' },
                }}
              >
                <Typography level="title-sm" textColor="inherit">
                  {organization.name}
                </Typography>
                <Typography fontSize="xs" textColor="neutral.400">
                  {environment}
                </Typography>
              </Box>
            );
          })}
          <Button
            color="neutral"
            size="sm"
            startDecorator={<PlusIcon fontSize="var(--Icon-fontSize)" weight="bold" />}
            sx={{
              '--variant-outlinedActiveBg': 'var(--joy-palette-neutral-900)',
              '--variant-outlinedBorder': 'var(--joy-palette-neutral-700)',
              '--variant-outlinedColor': 'var(--joy-palette-common-white)',
              '--variant-outlinedHoverBg': 'var(--joy-palette-neutral-700)',
            }}
            variant="outlined"
          >
            Create Workspace
          </Button>
        </Stack>
      </PopupContent>
    </Popup>
  );
}
