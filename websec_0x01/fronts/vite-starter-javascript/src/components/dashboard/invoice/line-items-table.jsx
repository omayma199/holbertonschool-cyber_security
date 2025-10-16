'use client';

import * as React from 'react';

import { DataTable } from '@/components/core/data-table';

const columns = [
  { field: 'product', name: 'Item', width: '200px' },
  { field: 'quantity', name: 'Quantity', width: '100px' },
  {
    formatter: (row) => {
      return new Intl.NumberFormat('en-US', { style: 'currency', currency: row.currency }).format(row.unitPrice);
    },
    name: 'Unit Price',
    width: '100px',
  },
  {
    formatter: (row) => {
      return new Intl.NumberFormat('en-US', { style: 'currency', currency: row.currency }).format(row.amount);
    },
    name: 'Amount',
    width: '100px',
  },
];

export function LineItemsTable({ rows }) {
  return <DataTable columns={columns} rows={rows} stripe="even" />;
}
