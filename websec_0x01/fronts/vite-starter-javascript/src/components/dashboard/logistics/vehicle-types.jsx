'use client';

import * as React from 'react';
import Box from '@mui/joy/Box';
import Card from '@mui/joy/Card';
import Sheet from '@mui/joy/Sheet';
import Stack from '@mui/joy/Stack';
import Typography from '@mui/joy/Typography';
import { Cell, Pie, PieChart, Tooltip } from 'recharts';

import { NoSsr } from '@/components/core/no-ssr';

export function VehicleTypes({ data = [] }) {
  const chartSize = 240;

  return (
    <Card>
      <Typography level="h4">Types of Vehicle</Typography>
      <Stack spacing={3} sx={{ alignItems: 'center' }}>
        <NoSsr fallback={<Box sx={{ height: chartSize, width: chartSize }} />}>
          <PieChart height={chartSize} margin={{ top: 0, right: 0, bottom: 0, left: 0 }} width={chartSize}>
            <Pie
              animationDuration={300}
              cx={chartSize / 2}
              cy={chartSize / 2}
              data={data}
              dataKey="value"
              nameKey="name"
              outerRadius={chartSize / 2}
              strokeWidth={0}
            >
              {data.map((type) => (
                <Cell fill={type.color} key={type.id} />
              ))}
            </Pie>
            <Tooltip animationDuration={50} content={<TooltipContent />} />
          </PieChart>
        </NoSsr>
      </Stack>
      <Legend payload={data} />
    </Card>
  );
}

function Legend({ payload }) {
  return (
    <Stack spacing={2}>
      {payload?.map((entry) => (
        <Stack
          direction="row"
          key={entry.name}
          spacing={1}
          sx={{ alignItems: 'center', justifyContent: 'space-between' }}
        >
          <Stack direction="row" spacing={1} sx={{ alignItems: 'center' }}>
            <Box sx={{ bgcolor: entry.color, borderRadius: 'var(--joy-radius-xs)', height: '8px', width: '8px' }} />
            <Typography textColor="text.secondary">{entry.name}</Typography>
          </Stack>
          <Typography level="body-sm" textColor="text.primary">
            {new Intl.NumberFormat('en-US').format(entry.value)}
          </Typography>
        </Stack>
      ))}
    </Stack>
  );
}

function TooltipContent({ active, payload }) {
  if (!active) {
    return null;
  }

  return (
    <Sheet
      sx={{
        boxShadow: 'var(--joy-shadow-lg)',
        borderRadius: 'var(--joy-radius-sm)',
        border: '1px solid var(--joy-palette-neutral-outlinedBorder)',
        p: 1,
      }}
    >
      {payload?.map((entry) => (
        <Stack
          direction="row"
          key={entry.name}
          spacing={3}
          sx={{ alignItems: 'center', justifyContent: 'space-between' }}
        >
          <Stack direction="row" spacing={1} sx={{ alignItems: 'center' }}>
            <Box sx={{ bgcolor: entry.payload.fill, borderRadius: '2px', height: '8px', width: '8px' }} />
            <Typography fontSize="sm" fontWeight="md" whiteSpace="nowrap">
              {entry.name}
            </Typography>
          </Stack>
          <Typography fontSize="sm" textColor="text.tertiary">
            {new Intl.NumberFormat('en-US').format(entry.value)}
          </Typography>
        </Stack>
      ))}
    </Sheet>
  );
}
