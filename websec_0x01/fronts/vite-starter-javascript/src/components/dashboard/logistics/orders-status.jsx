'use client';

import * as React from 'react';
import Box from '@mui/joy/Box';
import Card from '@mui/joy/Card';
import Sheet from '@mui/joy/Sheet';
import Stack from '@mui/joy/Stack';
import Typography from '@mui/joy/Typography';
import { Cell, Label, Pie, PieChart, Tooltip } from 'recharts';

import { NoSsr } from '@/components/core/no-ssr';

export function OrdersStatus({ onTime, delayed, inProgress }) {
  const chartSize = 160;
  const chartThickness = 20;

  const data = [
    { name: 'On Time', value: onTime, color: '#fb6514' },
    { name: 'Delayed', value: delayed, color: '#16b364' },
    { name: 'In Progress', value: inProgress, color: 'var(--joy-palette-primary-solidBg)' },
  ];

  const total = data.reduce((acc, entry) => acc + entry.value, 0);

  return (
    <Card>
      <Typography level="h4">Orders Status</Typography>
      <Stack direction="row" spacing={3} sx={{ alignItems: 'center', flexWrap: 'wrap' }}>
        <NoSsr fallback={<Box sx={{ height: chartSize, width: chartSize }} />}>
          <PieChart height={chartSize} margin={{ top: 0, right: 0, bottom: 0, left: 0 }} width={chartSize}>
            <Pie
              animationDuration={300}
              cx={chartSize / 2}
              cy={chartSize / 2}
              data={data}
              dataKey="value"
              innerRadius={chartSize / 2 - chartThickness}
              nameKey="name"
              outerRadius={chartSize / 2}
              strokeWidth={0}
            >
              {data.map((entry) => (
                <Cell fill={entry.color} key={entry.name} />
              ))}
              <Label content={<LabelContent value={total} />} position="center" />
            </Pie>
            <Tooltip animationDuration={50} content={<TooltipContent />} />
          </PieChart>
        </NoSsr>
        <Legend payload={data} />
      </Stack>
    </Card>
  );
}

function LabelContent({ viewBox, value }) {
  const { cx, cy } = viewBox ?? { cx: 0, cy: 0 };

  return (
    <text dominantBaseline="middle" textAnchor="middle" x={cx} y={cy}>
      <tspan dy="-0.5em" fill="var(--joy-palette-text-secondary)" fontSize="var(--joy-fontSize-sm)" x={cx}>
        Total Orders
      </tspan>
      <tspan
        dy="1em"
        fill="var(--joy-palette-text-primary)"
        fontSize="var(--joy-fontSize-lg)"
        fontWeight="var(--joy-fontWeight-lg)"
        x={cx}
      >
        {new Intl.NumberFormat('en-US').format(Number(value))}
      </tspan>
    </text>
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
