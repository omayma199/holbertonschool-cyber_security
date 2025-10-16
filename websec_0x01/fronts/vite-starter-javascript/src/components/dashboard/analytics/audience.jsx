'use client';

import * as React from 'react';
import Box from '@mui/joy/Box';
import Card from '@mui/joy/Card';
import Sheet from '@mui/joy/Sheet';
import Stack from '@mui/joy/Stack';
import Typography from '@mui/joy/Typography';
import { Cell, Pie, PieChart, Tooltip } from 'recharts';

import { useCurrentBreakpoint } from '@/hooks/use-current-breakpoint';
import { NoSsr } from '@/components/core/no-ssr';

export function Audience({ segments = [] }) {
  const breakpoint = useCurrentBreakpoint();
  const [chartSize, chartTickness] = { xs: [160, 20], sm: [160, 20], md: [140, 20], lg: [140, 20], xl: [160, 20] }[
    breakpoint
  ];

  return (
    <Card>
      <Typography level="h4">Audience</Typography>
      <Stack spacing={2} sx={{ flex: '1 1 auto' }}>
        {segments.map((segment) => {
          return (
            <Sheet
              key={segment.name}
              sx={{
                bgcolor: 'var(--joy-palette-background-level1)',
                borderRadius: 'var(--joy-radius-sm)',
                display: 'flex',
                flex: '1 1 auto',
                flexDirection: 'column',
                gap: 3,
                p: 3,
              }}
            >
              <Typography level="title-md">{segment.name}</Typography>
              <Box sx={{ alignItems: 'center', display: 'flex', flexWrap: 'wrap', gap: 3 }}>
                <NoSsr fallback={<Box sx={{ height: `${chartSize}px`, width: `${chartSize}px` }} />}>
                  <PieChart height={chartSize} margin={{ top: 0, right: 0, bottom: 0, left: 0 }} width={chartSize}>
                    <Pie
                      animationDuration={300}
                      cx={chartSize / 2}
                      cy={chartSize / 2}
                      data={segment.data}
                      dataKey="value"
                      innerRadius={chartSize / 2 - chartTickness}
                      nameKey="name"
                      outerRadius={chartSize / 2}
                      paddingAngle={0}
                      strokeWidth={0}
                    >
                      {segment.data.map((entry) => (
                        <Cell fill={entry.color} key={entry.name} />
                      ))}
                    </Pie>
                    <Tooltip animationDuration={50} content={<TooltipContent />} />
                  </PieChart>
                </NoSsr>
                <Legend payload={segment.data} />
              </Box>
            </Sheet>
          );
        })}
      </Stack>
    </Card>
  );
}

function Legend({ payload }) {
  return (
    <Stack spacing={1} sx={{ pb: 3, pt: 2 }}>
      {payload?.map((entry) => (
        <Stack direction="row" key={entry.name} spacing={1} sx={{ alignItems: 'center', justifyContent: 'flex-start' }}>
          <Box sx={{ bgcolor: entry.color, borderRadius: 'var(--joy-radius-xs)', height: '8px', width: '8px' }} />
          <Typography textColor="text.primary">{entry.name}</Typography>
          <Typography textColor="text.secondary">{new Intl.NumberFormat('en-US').format(entry.value)}</Typography>
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
