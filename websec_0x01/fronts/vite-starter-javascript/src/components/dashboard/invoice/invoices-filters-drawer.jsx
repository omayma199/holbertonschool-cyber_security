'use client';

import * as React from 'react';
import Box from '@mui/joy/Box';
import Divider from '@mui/joy/Divider';
import Drawer from '@mui/joy/Drawer';
import ModalClose from '@mui/joy/ModalClose';
import Typography from '@mui/joy/Typography';

import { InvoicesFilters } from './invoices-filters';

export function InvoicesFiltersDrawer({ onClose, open }) {
  return (
    <Drawer
      anchor="left"
      onClose={onClose}
      open={open}
      sx={{
        '& > .MuiDrawer-backdrop': { backdropFilter: 'none', backgroundColor: 'transparent' },
        '& > .MuiDrawer-content': { '--Drawer-horizontalSize': '320px', p: 2 },
      }}
    >
      <Box sx={{ alignItems: 'center', display: 'flex' }}>
        <Typography fontSize="lg" fontWeight="lg" sx={{ flex: 1 }}>
          Filters
        </Typography>
        <ModalClose sx={{ position: 'initial' }} />
      </Box>
      <Divider sx={{ mt: 1, mb: 1.5 }} />
      <InvoicesFilters />
    </Drawer>
  );
}
