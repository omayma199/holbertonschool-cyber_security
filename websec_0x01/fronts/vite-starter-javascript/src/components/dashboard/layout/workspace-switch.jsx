'use client';

import * as React from 'react';
import Box from '@mui/joy/Box';
import Stack from '@mui/joy/Stack';
import Typography from '@mui/joy/Typography';
import { CaretUpDown as CaretUpDownIcon } from '@phosphor-icons/react/dist/ssr/CaretUpDown';

import { usePopover } from '@/hooks/use-popover';
import { Image } from '@/components/core/image';

import { WorkspacePoppover } from './workspace-popover';

export const organizations = [
  { id: 'ORG-001', name: 'Devias IO', environment: 'prod', logo: '/assets/logo-devias.svg' },
  { id: 'ORG-002', name: 'Carpatin', environment: 'dev', logo: '/assets/logo-carpatin.svg' },
];

export function WorkspaceSwitch() {
  const [organizationId, setOrganizationId] = React.useState('ORG-002');
  const popover = usePopover();

  const organization = organizationId ? organizations.find((org) => org.id === organizationId) : null;

  return (
    <React.Fragment>
      <Box
        onClick={popover.handleOpen}
        ref={popover.anchorRef}
        sx={{
          bgcolor: 'var(--joy-palette-neutral-800)',
          borderRadius: 'var(--joy-radius-sm)',
          color: 'var(--joy-palette-common-white)',
          cursor: 'pointer',
          p: '8px',
          '&:hover': { bgcolor: 'var(--joy-palette-neutral-700)' },
        }}
      >
        <Stack direction="row" spacing={1.5} sx={{ alignItems: 'center' }}>
          <Box
            sx={{
              bgcolor: 'var(--joy-palette-neutral-950)',
              borderRadius: 'var(--joy-radius-sm)',
              fontSize: 0,
              height: '40px',
              p: '8px',
              width: '40px',
            }}
          >
            {organization?.logo ? <Image alt="" height={24} src={organization.logo} width={24} /> : null}
          </Box>
          <Box sx={{ flex: '1 1 auto' }}>
            <Typography fontSize="xs" textColor="neutral.400">
              Workspace
            </Typography>
            <Typography fontSize="sm" fontWeight="md" textColor="inherit">
              {organization?.name}
            </Typography>
          </Box>
          <CaretUpDownIcon fill="var(--joy-palette-neutral-400)" fontSize="var(--joy-fontSize-lg)" />
        </Stack>
      </Box>
      <WorkspacePoppover
        anchorEl={popover.anchorRef.current}
        onChange={setOrganizationId}
        onClose={popover.handleClose}
        open={popover.open}
        organizations={organizations}
      />
    </React.Fragment>
  );
}
