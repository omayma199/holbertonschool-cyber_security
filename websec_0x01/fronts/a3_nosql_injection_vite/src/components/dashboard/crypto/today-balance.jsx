import * as React from 'react';
import Card from '@mui/joy/Card';
import Chip from '@mui/joy/Chip';
import Stack from '@mui/joy/Stack';
import Typography from '@mui/joy/Typography';

export default function TodayBalance({ amount, diff, trend, children }) {
  const trendColor = trend === 'up' ? 'success' : 'danger';
  const trendSymbol = trend === 'up' ? '+' : '-';

  return (
    <Card>
      <Typography level="h4">Today&apos;s Balance</Typography>
      <Stack direction="row" spacing={3} sx={{ alignItems: 'flex-start' }}>
        <Typography level="h2" sx={{ flex: '1 1 auto' }}>
          {new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(amount)}
        </Typography>
        <Chip color={trendColor} size="sm" variant="soft">
          {trendSymbol}{' '}
          {new Intl.NumberFormat('en-US', { style: 'percent', maximumFractionDigits: 2 }).format(diff / 100)}
        </Chip>
      </Stack>
		{children}
    </Card>
  );
}
