'use client';

import * as React from 'react';
import Chip from '@mui/joy/Chip';
import IconButton from '@mui/joy/IconButton';
import Link from '@mui/joy/Link';
import { Printer as PrinterIcon } from '@phosphor-icons/react/dist/ssr/Printer';
import dayjs from 'dayjs';

import { DataTable } from '@/components/core/data-table';

const statusMapping = {
  pending: { label: 'Pending', color: 'warning' },
  paid: { label: 'Paid', color: 'success' },
  canceled: { label: 'Canceled', color: 'danger' },
};

const columns = [
  {
    formatter: (row) => (
      <Link fontSize="sm" fontWeight="md" underline="none">
        {row.id}
      </Link>
    ),
    name: 'Invoice ID',
    width: '150px',
  },
  { field: 'description', name: 'Description', width: '150px' },
  {
    formatter: (row) => {
      return dayjs(row.issueDate).format('MMM D, YYYY');
    },
    name: 'Billing Date',
    width: '150px',
  },
  {
    formatter: (row) => {
      return new Intl.NumberFormat('en-US', { style: 'currency', currency: row.currency }).format(row.amount);
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
  {
    formatter: () => (
      <IconButton color="neutral" size="sm" variant="plain">
        <PrinterIcon fontSize="var(--Icon-fontSize)" weight="bold" />
      </IconButton>
    ),
    name: 'Actions',
    hideName: true,
    width: '100px',
    align: 'right',
  },
];

export function InvoicesTable({ rows }) {
  return (
    <DataTable
      columns={columns}
      rows={rows}
      stripe="even"
      sx={{ '--TableCell-paddingX': '20px', '--TableCell-paddingY': '12px' }}
    />
  );
}
