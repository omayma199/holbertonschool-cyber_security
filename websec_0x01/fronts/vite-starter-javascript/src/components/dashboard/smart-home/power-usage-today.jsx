'use client';

import * as React from 'react';
import Box from '@mui/joy/Box';
import Card from '@mui/joy/Card';
import Sheet from '@mui/joy/Sheet';
import Stack from '@mui/joy/Stack';
import Typography from '@mui/joy/Typography';
import { Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';

import { useCurrentBreakpoint } from '@/hooks/use-current-breakpoint';
import { NoSsr } from '@/components/core/no-ssr';

export function PowerUsageToday({ data = [] }) {
  const breakpoint = useCurrentBreakpoint();
  const chartHeight = 300;
  const xTicksInterval = { xs: 4, sm: 3, md: 2, lg: 1, xl: 1 }[breakpoint] ?? 1;

  return (
    <Card>
      <Typography level="h4">Today&apos;s Power Usage</Typography>
      <NoSsr fallback={<Box sx={{ height: `${chartHeight}px` }} />}>
        <ResponsiveContainer height={chartHeight} width="100%">
          <AreaChart data={data} margin={{ top: 0, right: -40, bottom: 0, left: -20 }}>
            <defs>
              <linearGradient id="area1" x1="0" x2="0" y1="0" y2="1">
                <stop offset="0" stopColor="var(--joy-palette-warning-400)" stopOpacity={0.2} />
                <stop offset="100%" stopColor="var(--joy-palette-warning-200)" stopOpacity={0} />
              </linearGradient>
            </defs>
            <defs>
              <linearGradient id="area2" x1="0" x2="0" y1="0" y2="1">
                <stop offset="0" stopColor="var(--joy-palette-primary-400)" stopOpacity={0.2} />
                <stop offset="100%" stopColor="var(--joy-palette-primary-200)" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="4 4" vertical={false} />
            <XAxis axisLine={false} dataKey="name" interval={xTicksInterval} tickLine={false} type="category" />
            <YAxis axisLine={false} domain={[0, 1000]} tickLine={false} type="number" />
            <Area
              animationDuration={300}
              dataKey="v1"
              fill="url(#area1)"
              stroke="var(--joy-palette-warning-400)"
              strokeWidth={2}
              type="monotone"
            />
            <Area
              animationDuration={300}
              dataKey="v2"
              dot={<Dot active="10AM" />}
              fill="url(#area2)"
              fillOpacity={1}
              stroke="var(--joy-palette-primary-solidBg)"
              strokeWidth={2}
              type="monotone"
            />
            <Tooltip animationDuration={50} content={<TooltipContent />} cursor={false} />
          </AreaChart>
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
    null;
  }

  const time = payload?.[0]?.payload.name;
  const yesterday = payload?.[0]?.value;
  const today = payload?.[1]?.value;

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
        <Typography level="title-lg">{time}</Typography>
        <Stack spacing={1}>
          <Stack direction="row" spacing={3} sx={{ alignItems: 'center', justifyContent: 'space-between' }}>
            <Typography fontSize="sm" fontWeight="md" whiteSpace="nowrap">
              Yesterday
            </Typography>
            <Typography fontSize="sm" textColor="text.tertiary">
              {yesterday}kWh
            </Typography>
          </Stack>
          <Stack direction="row" spacing={3} sx={{ alignItems: 'center', justifyContent: 'space-between' }}>
            <Typography fontSize="sm" fontWeight="md" whiteSpace="nowrap">
              Today
            </Typography>
            <Typography fontSize="sm" textColor="text.tertiary">
              {today}kWh
            </Typography>
          </Stack>
        </Stack>
      </Stack>
    </Sheet>
  );
}
