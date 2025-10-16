'use client';

import * as React from 'react';
import Box from '@mui/joy/Box';
import Card from '@mui/joy/Card';
import Sheet from '@mui/joy/Sheet';
import Stack from '@mui/joy/Stack';
import Typography from '@mui/joy/Typography';
import { Cell, Label, Pie, PieChart, Tooltip } from 'recharts';

import { NoSsr } from '@/components/core/no-ssr';

export function SessionsByDevice({ total, data = [] }) {
  const chartSize = 200;
  const chartTickness = 30;

  return (
    <Card sx={{ justifyContent: 'space-between' }}>
      <Typography level="h4">Sessions by Device</Typography>
      <Box sx={{ display: 'flex', justifyContent: 'center' }}>
        <NoSsr fallback={<Box sx={{ height: `${chartSize}px`, width: `${chartSize}px` }} />}>
          <PieChart height={chartSize} margin={{ top: 0, right: 0, bottom: 0, left: 0 }} width={chartSize}>
            <Pie
              animationDuration={300}
              cx={chartSize / 2}
              cy={chartSize / 2}
              data={data}
              dataKey="value"
              innerRadius={chartSize / 2 - chartTickness}
              nameKey="name"
              outerRadius={chartSize / 2}
              strokeWidth={0}
            >
              {data.map((entry) => (
                <Cell fill={entry.color} key={entry.name} />
              ))}
              <Label content={<LabelContent label="Total" value={total} />} position="center" />
            </Pie>
            <Tooltip animationDuration={50} content={<TooltipContent />} />
          </PieChart>
        </NoSsr>
      </Box>
      <Legend payload={data} />
    </Card>
  );
}

function LabelContent({ viewBox, value, label }) {
  const { cx, cy } = viewBox ?? { cx: 0, cy: 0 };

  return (
    <text dominantBaseline="middle" textAnchor="middle" x={cx} y={cy + 10}>
      <tspan dy="-1em" fill="var(--joy-palette-text-secondary)" fontSize="var(--joy-fontSize-sm)" x={cx}>
        {label}
      </tspan>
      <tspan
        dy="1em"
        fill="var(--joy-palette-text-primary)"
        fontSize="var(--joy-fontSize-lg)"
        fontWeight="var(--joy-fontWeight-lg)"
        x={cx}
      >
        {new Intl.NumberFormat('en-US').format(value)}
      </tspan>
    </text>
  );
}

function Legend({ payload }) {
  return (
    <Stack spacing={2}>
      <Stack direction="row" spacing={2} sx={{ justifyContent: 'space-between' }}>
        <Typography level="title-md">Device</Typography>
        <Typography level="title-md">Sessions</Typography>
      </Stack>
      {payload?.map((entry) => (
        <Stack direction="row" key={entry.name} spacing={2} sx={{ justifyContent: 'space-between' }}>
          <Stack direction="row" spacing={1} sx={{ alignItems: 'center' }}>
            <Box sx={{ bgcolor: entry.color, borderRadius: 'var(--joy-radius-xs)', height: '8px', width: '8px' }} />
            <Typography textColor="text.secondary">{entry.name}</Typography>
          </Stack>
          <Typography>{new Intl.NumberFormat('en-US').format(entry.value)}</Typography>
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
