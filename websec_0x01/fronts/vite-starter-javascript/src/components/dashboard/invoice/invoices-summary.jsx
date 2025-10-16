'use client';

import * as React from 'react';
import Card from '@mui/joy/Card';
import Chip from '@mui/joy/Chip';
import Stack from '@mui/joy/Stack';
import Typography from '@mui/joy/Typography';

export function InvoicesSummary({ draft, draftAmount, due, dueAmount, invoiced, invoicedAmount, paid, paidAmount }) {
  return (
    <Card
      sx={{
        display: 'grid',
        gridTemplateColumns: { sm: 'repeat(2, 1fr)', xl: 'repeat(4, 1fr)' },
        gap: 2,
        '& > *': {
          px: { sm: 2 },
          py: { xs: 2, sm: 0 },
          '&:not(:last-of-type)': {
            borderBottom: { xs: '1px solid var(--joy-palette-divider)', sm: 'none' },
            borderRight: { xl: '1px solid var(--joy-palette-divider)' },
            pr: 4,
          },
          '&:nth-of-type(odd)': { borderRight: { sm: '1px solid var(--joy-palette-divider)' } },
        },
      }}
    >
      {[
        { id: 1, label: 'Total Invoiced', count: invoiced, amount: invoicedAmount },
        { id: 2, label: 'Total Paid', count: paid, amount: paidAmount },
        { id: 3, label: 'Total Due', count: due, amount: dueAmount },
        { id: 4, label: 'Total Draft', count: draft, amount: draftAmount },
      ].map((entry) => (
        <Stack key={entry.id} spacing={2} sx={{ alignItems: { xl: 'center' }, whiteSpace: 'nowrap' }}>
          <Stack direction="row" spacing={1} sx={{ alignItems: 'center' }}>
            <Typography level="body-sm">{entry.label}</Typography>
            <Chip size="sm">{new Intl.NumberFormat('en-US').format(entry.count)}</Chip>
          </Stack>
          <Typography level="h2">
            {new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(
              entry.amount
            )}
          </Typography>
        </Stack>
      ))}
    </Card>
  );
}
