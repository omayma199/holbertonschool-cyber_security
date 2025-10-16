'use client';

import * as React from 'react';
import Card from '@mui/joy/Card';
import Typography from '@mui/joy/Typography';

import { InvoicesFilters } from './invoices-filters';

export function InvoicesFiltersCard() {
  return (
    <Card sx={{ display: { xs: 'none', lg: 'flex' } }}>
      <Typography fontSize="sm" fontWeight="xl">
        Filters
      </Typography>
      <InvoicesFilters />
    </Card>
  );
}
