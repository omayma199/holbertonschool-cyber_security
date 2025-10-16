'use client';

import * as React from 'react';
import Avatar from '@mui/joy/Avatar';
import IconButton from '@mui/joy/IconButton';
import Stack from '@mui/joy/Stack';
import Typography from '@mui/joy/Typography';
import { Package as PackageIcon } from '@phosphor-icons/react/dist/ssr/Package';
import { Pen as PenIcon } from '@phosphor-icons/react/dist/ssr/Pen';

import { DataTable } from '@/components/core/data-table';

const columns = [
  { field: 'id', name: 'ID', width: '150px' },
  {
    formatter: (row) => (
      <Stack direction="row" spacing={1} sx={{ alignItems: 'center' }}>
        <Avatar
          src={row.image}
          sx={{
            '--Avatar-radius': 'var(--joy-radius-sm)',
            '--Icon-fontSize': 'var(--joy-fontSize-xl)',
            height: '42px',
            width: '42px',
          }}
        >
          <PackageIcon fontSize="var(--Icon-fontSize)" weight="bold" />
        </Avatar>
        <Typography>{row.name}</Typography>
      </Stack>
    ),
    name: 'Name',
    width: '250px',
  },
  {
    formatter: (row) => {
      return row.quantity === 0 ? 'N/A' : new Intl.NumberFormat('en-US').format(row.quantity);
    },
    name: 'Inventory',
    width: '120px',
  },
  {
    formatter: (row) => {
      return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(row.price);
    },
    name: 'Price',
    width: '120px',
  },
  { field: 'sku', name: 'SKU', width: '150px' },
  {
    formatter: () => (
      <IconButton size="sm">
        <PenIcon fontSize="var(--Icon-fontSize)" weight="bold" />
      </IconButton>
    ),
    name: 'Actions',
    hideName: true,
    width: '80px',
    align: 'right',
  },
];

export function VariantsTable({ rows }) {
  return <DataTable columns={columns} rows={rows} stripe="even" />;
}
