'use client';

import * as React from 'react';
import Box from '@mui/joy/Box';
import Card from '@mui/joy/Card';
import Sheet from '@mui/joy/Sheet';
import Stack from '@mui/joy/Stack';
import Typography from '@mui/joy/Typography';
import { CartesianGrid, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';

import { NoSsr } from '@/components/core/no-ssr';

const lines = [
  { name: 'New Users', dataKey: 'v1', stroke: 'var(--joy-palette-primary-400)' },
  { name: 'Sessions', dataKey: 'v2', stroke: 'var(--joy-palette-warning-200)' },
  { name: 'Avg Duration', dataKey: 'v3', stroke: 'var(--joy-palette-danger-200)' },
];

export function SessionDuration({ data = [] }) {
  const chartHeight = 440;

  return (
    <Card>
      <Typography level="h4">Session Duration</Typography>
      <Box sx={{ display: 'flex', justifyContent: 'flex-end', mb: 7 }}>
        <Legend />
      </Box>
      <NoSsr fallback={<Box sx={{ height: `${chartHeight}px` }} />}>
        <ResponsiveContainer height={chartHeight} width="100%">
          <LineChart data={data} margin={{ top: 0, right: 0, bottom: 0, left: -20 }}>
            <CartesianGrid strokeDasharray="4 4" vertical={false} />
            <XAxis axisLine={false} dataKey="name" interval={4} tickLine={false} type="category" />
            <YAxis
              axisLine={false}
              tickFormatter={(value) => {
                const mins = Math.floor(value / 60);
                return mins.toString();
              }}
              tickLine={false}
              type="number"
            />
            {lines.map((line) => (
              <Line
                animationDuration={300}
                dataKey={line.dataKey}
                dot={<Dot />}
                key={line.name}
                name={line.name}
                stroke={line.stroke}
                strokeWidth={2}
                type="monotone"
              />
            ))}
            <Tooltip animationDuration={50} content={<TooltipContent />} cursor={false} />
          </LineChart>
        </ResponsiveContainer>
      </NoSsr>
    </Card>
  );
}

function Dot({ active, cx, cy, payload }) {
  if (active && payload?.name === active) {
    return <circle cx={cx} cy={cy} fill="var(--joy-palette-primary-solidBg)" r={6} />;
  }

  return null;
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
      <Stack spacing={2}>
        {payload?.map((entry) => (
          <Stack
            direction="row"
            key={entry.name}
            spacing={3}
            sx={{ alignItems: 'center', justifyContent: 'space-between' }}
          >
            <Stack direction="row" spacing={1} sx={{ alignItems: 'center' }}>
              <Box sx={{ bgcolor: entry.stroke, borderRadius: '2px', height: '8px', width: '8px' }} />
              <Typography fontSize="sm" fontWeight="md" whiteSpace="nowrap">
                {entry.name}
              </Typography>
            </Stack>
            <Typography fontSize="sm" textColor="text.tertiary">
              {entry.dataKey === 'v3'
                ? `${secondsToMinutes(entry.value)}min`
                : new Intl.NumberFormat('en-US').format(entry.value)}
            </Typography>
          </Stack>
        ))}
      </Stack>
    </Sheet>
  );
}

function Legend() {
  return (
    <Stack direction="row" spacing={2}>
      {lines.map((line) => (
        <Stack direction="row" key={line.name} spacing={1} sx={{ alignItems: 'center' }}>
          <Box sx={{ bgcolor: line.stroke, borderRadius: '2px', height: '8px', width: '8px' }} />
          <Typography component="span" display="inline" fontSize="sm" textColor="text.secondary">
            {line.name}
          </Typography>
        </Stack>
      ))}
    </Stack>
  );
}

function secondsToMinutes(s) {
  const mins = Math.floor(s / 60);
  const remaining = s % 60;
  return `${mins}:${remaining < 10 ? '0' : ''}${remaining}`;
}
