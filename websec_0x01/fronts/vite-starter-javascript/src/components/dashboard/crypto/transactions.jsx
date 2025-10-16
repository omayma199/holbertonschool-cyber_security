'use client';

import * as React from 'react';
import Avatar from '@mui/joy/Avatar';
import Box from '@mui/joy/Box';
import Card from '@mui/joy/Card';
import Chip from '@mui/joy/Chip';
import Stack from '@mui/joy/Stack';
import Typography from '@mui/joy/Typography';
import { ArrowDown as ArrowDownIcon } from '@phosphor-icons/react/dist/ssr/ArrowDown';
import { ArrowUp as ArrowUpIcon } from '@phosphor-icons/react/dist/ssr/ArrowUp';
import dayjs from 'dayjs';

import { DataTable } from '@/components/core/data-table';

const statusMapping = {
  active: { label: 'Active', color: 'primary' },
  completed: { label: 'Completed', color: 'success' },
  canceled: { label: 'Canceled', color: 'danger' },
};

const columns = [
  {
    formatter: (row) => {
      const Icon = row.type === 'buy' ? ArrowDownIcon : ArrowUpIcon;
      const color = row.type === 'buy' ? 'danger' : 'success';

      return (
        <Stack direction="row" spacing={1} sx={{ alignItems: 'center' }}>
          <Avatar
            color={color}
            sx={{
              '--Avatar-size': '32px',
              '--Avatar-radius': 'var(--joy-radius-sm)',
              '--Icon-fontSize': 'var(--joy-fontSize-md)',
            }}
          >
            <Icon fontSize="var(--Icon-fontSize)" weight="bold" />
          </Avatar>
          <Typography noWrap>{row.id}</Typography>
        </Stack>
      );
    },
    name: 'ID',
    width: '140px',
  },
  {
    formatter: (row) => {
      return dayjs(row.createdAt).format('MMM D, YYYY h:mm A');
    },
    name: 'Date',
    width: '200px',
  },
  { field: 'coin', name: 'Coin', width: '60px' },
  {
    formatter: (row) => {
      return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(row.value);
    },
    name: 'Amount',
    width: '100px',
  },
  {
    formatter: (row) => {
      const { label, color } = statusMapping[row.status] ?? { label: 'Unknown', color: 'neutral' };

      return (
        <Chip color={color} size="sm" variant="soft">
          {label}
        </Chip>
      );
    },
    name: 'Status',
    width: '100px',
  },
];

export function Transactions({ transactions = [] }) {
  return (
    <Card>
      <Typography level="h4">Latest Transactions</Typography>
      <Box sx={{ overflowX: 'auto' }}>
        <DataTable
          columns={columns}
          rows={transactions}
          stripe="even"
          sx={{ '--TableCell-paddingX': '8px', '--TableCell-paddingY': '12px' }}
        />
      </Box>
    </Card>
  );
}
