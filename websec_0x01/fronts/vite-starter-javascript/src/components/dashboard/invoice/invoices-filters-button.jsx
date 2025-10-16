'use client';

import * as React from 'react';
import Button from '@mui/joy/Button';
import { Funnel as FunnelIcon } from '@phosphor-icons/react/dist/ssr/Funnel';

import { InvoicesFiltersDrawer } from './invoices-filters-drawer';

export function InvoicesFiltersButton() {
  const [open, setOpen] = React.useState(false);

  return (
    <React.Fragment>
      <Button
        color="neutral"
        onClick={() => {
          setOpen(!open);
        }}
        startDecorator={<FunnelIcon fontSize="var(--Icon-fontSize)" weight="bold" />}
        sx={{ display: { lg: 'none' } }}
        variant="outlined"
      >
        Filters
      </Button>
      <InvoicesFiltersDrawer
        onClose={() => {
          setOpen(false);
        }}
        open={open}
      />
    </React.Fragment>
  );
}
