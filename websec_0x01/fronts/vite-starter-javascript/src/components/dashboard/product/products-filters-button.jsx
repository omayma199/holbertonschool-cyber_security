'use client';

import * as React from 'react';
import Button from '@mui/joy/Button';
import { Funnel as FunnelIcon } from '@phosphor-icons/react/dist/ssr/Funnel';

import { ProductsFiltersDialog } from './products-filters-dialog';

export function ProductsFiltersButton() {
  const [open, setOpen] = React.useState(false);

  return (
    <React.Fragment>
      <Button
        color="neutral"
        onClick={() => {
          setOpen(!open);
        }}
        startDecorator={<FunnelIcon fontSize="var(--Icon-fontSize)" weight="bold" />}
        variant="outlined"
      >
        Filters
      </Button>
      <ProductsFiltersDialog
        onClose={() => {
          setOpen(false);
        }}
        open={open}
      />
    </React.Fragment>
  );
}
