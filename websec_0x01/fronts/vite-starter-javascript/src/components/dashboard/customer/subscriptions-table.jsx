'use client';

import * as React from 'react';
import Avatar from '@mui/joy/Avatar';
import IconButton from '@mui/joy/IconButton';
import Stack from '@mui/joy/Stack';
import Typography from '@mui/joy/Typography';
import { Cube as CubeIcon } from '@phosphor-icons/react/dist/ssr/Cube';
import { Pen as PenIcon } from '@phosphor-icons/react/dist/ssr/Pen';
import dayjs from 'dayjs';

import { DataTable } from '@/components/core/data-table';

const columns = [
  {
    formatter: (row) => {
      return (
        <Stack direction="row" spacing={1}>
          <Avatar
            color="primary"
            sx={{ '--Avatar-radius': 'var(--joy-radius-sm)', '--Icon-fontSize': 'var(--joy-fontSize-xl)' }}
            variant="solid"
          >
            <CubeIcon fontSize="var(--Icon-fontSize)" weight="duotone" />
          </Avatar>
          <div>
            <Typography whiteSpace="nowrap">{row.productName}</Typography>
            <Typography level="body-sm">
              {new Intl.NumberFormat('en-US', { style: 'currency', currency: row.currency }).format(row.amount)}/
              {row.billingCycle}
            </Typography>
          </div>
        </Stack>
      );
    },
    name: 'Name',
    width: '200px',
  },
  {
    formatter: (row) => {
      return (
        <Typography level="inherit" noWrap>
          {row.stripeId}
        </Typography>
      );
    },
    name: 'Stripe ID',
    width: '150px',
  },
  {
    formatter: (row) => {
      return dayjs(row.createdAt).format('MMM D, YYYY');
    },
    name: 'Created',
    width: '150px',
  },
  {
    formatter: (row) => {
      return dayjs(row.updatedAt).format('MMM D, YYYY');
    },
    name: 'Updated',
    width: '150px',
  },
  {
    formatter: () => (
      <IconButton color="neutral" size="sm" variant="plain">
        <PenIcon fontSize="var(--Icon-fontSize)" weight="bold" />
      </IconButton>
    ),
    name: 'Actions',
    hideName: true,
    width: '80px',
    align: 'right',
  },
];

export function SubscriptionsTable({ rows }) {
  return <DataTable columns={columns} rows={rows} stripe="even" />;
}
