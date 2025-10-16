import * as React from 'react';
import Avatar from '@mui/joy/Avatar';
import Card from '@mui/joy/Card';
import Stack from '@mui/joy/Stack';
import Typography from '@mui/joy/Typography';
import { ArrowsCounterClockwise as ArrowsCounterClockwiseIcon } from '@phosphor-icons/react/dist/ssr/ArrowsCounterClockwise';
import { CheckSquare as CheckSquareIcon } from '@phosphor-icons/react/dist/ssr/CheckSquare';
import { Truck as TruckIcon } from '@phosphor-icons/react/dist/ssr/Truck';

export function Statistics({ ongoing, shipped, delivered }) {
  return (
    <Stack spacing={3}>
      {[
        { label: 'Ongoing', value: ongoing, icon: ArrowsCounterClockwiseIcon, color: 'primary' },
        { label: 'Shipped', value: shipped, icon: TruckIcon, color: 'warning' },
        { label: 'Delivered', value: delivered, icon: CheckSquareIcon, color: 'success' },
      ].map((entry) => {
        const Icon = entry.icon;

        return (
          <Card key={entry.label}>
            <Stack direction="row" spacing={3} sx={{ alignItems: 'center' }}>
              <Avatar
                color={entry.color}
                sx={{ '--Avatar-size': '48px', '--Icon-fontSize': 'var(--joy-fontSize-xl2)' }}
              >
                <Icon fontSize="var(--Icon-fontSize)" weight="bold" />
              </Avatar>
              <Stack spacing={1}>
                <Typography>{entry.label}</Typography>
                <Typography level="h2">{new Intl.NumberFormat('en-US').format(entry.value)}</Typography>
              </Stack>
            </Stack>
          </Card>
        );
      })}
    </Stack>
  );
}
