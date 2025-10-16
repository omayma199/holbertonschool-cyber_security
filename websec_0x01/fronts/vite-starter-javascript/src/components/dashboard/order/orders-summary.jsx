import * as React from 'react';
import Avatar from '@mui/joy/Avatar';
import Card from '@mui/joy/Card';
import Stack from '@mui/joy/Stack';
import Typography from '@mui/joy/Typography';
import { CheckSquare as CheckSquareIcon } from '@phosphor-icons/react/dist/ssr/CheckSquare';
import { Receipt as ReceiptIcon } from '@phosphor-icons/react/dist/ssr/Receipt';
import { ShoppingCart as ShoppingCartIcon } from '@phosphor-icons/react/dist/ssr/ShoppingCart';
import { XSquare as XSquareIcon } from '@phosphor-icons/react/dist/ssr/XSquare';

export function OrdersSummary({ total, active, completed, canceled }) {
  return (
    <Card
      sx={{
        display: 'grid',
        gridTemplateColumns: { sm: 'repeat(2, 1fr)', lg: 'repeat(4, 1fr)' },
        gap: 2,
        '& > *': {
          px: { sm: 2 },
          py: { xs: 2, sm: 0 },
          '&:not(:last-of-type)': {
            borderBottom: { xs: '1px solid var(--joy-palette-divider)', sm: 'none' },
            borderRight: { lg: '1px solid var(--joy-palette-divider)' },
            pr: 4,
          },
          '&:nth-of-type(odd)': { borderRight: { sm: '1px solid var(--joy-palette-divider)' } },
        },
      }}
    >
      {[
        { id: 1, label: 'Total Orders', value: total, icon: ShoppingCartIcon },
        { id: 2, label: 'Active Orders', value: active, icon: ReceiptIcon },
        { id: 3, label: 'Completed Orders', value: completed, icon: CheckSquareIcon },
        { id: 4, label: 'Canceled Orders', value: canceled, icon: XSquareIcon },
      ].map((entry) => {
        const Icon = entry.icon;

        return (
          <Stack direction="row" key={entry.id} spacing={2} sx={{ alignItems: 'center' }}>
            <Avatar sx={{ '--Icon-fontSize': 'var(--joy-fontSize-xl)' }} variant="soft">
              <Icon fontSize="var(--Icon-fontSize)" weight="bold" />
            </Avatar>
            <div>
              <Typography level="body-sm">{entry.label}</Typography>
              <Typography level="h2">{entry.value}</Typography>
            </div>
          </Stack>
        );
      })}
    </Card>
  );
}
