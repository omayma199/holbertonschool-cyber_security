'use client';

import * as React from 'react';
import Box from '@mui/joy/Box';
import Card from '@mui/joy/Card';
import Stack from '@mui/joy/Stack';
import Typography from '@mui/joy/Typography';
import { RadialBar, RadialBarChart } from 'recharts';

import { NoSsr } from '@/components/core/no-ssr';

export function Earnings({ data = [] }) {
  const chartSize = 230;
  const chartInnerRadius = 150;
  const dataWithEmpty = [{ name: 'Empty', value: 100 }, ...data];

  return (
    <Card>
      <Typography level="h4">Earnings</Typography>
      <Stack
        direction="row"
        spacing={3}
        sx={{
          alignItems: 'center',
          justifyContent: 'center',
          flexWrap: 'wrap',
          // hide the empty bar
          '& .recharts-layer path[name="Empty"]': { display: 'none' },
        }}
      >
        <NoSsr fallback={<Box sx={{ height: `${chartSize}px`, width: `${chartSize}px` }} />}>
          <RadialBarChart
            barSize={10}
            data={dataWithEmpty}
            endAngle={-360}
            height={chartSize}
            innerRadius={chartInnerRadius}
            startAngle={90}
            width={chartSize}
          >
            <RadialBar animationDuration={300} background cornerRadius={8} dataKey="value" />
          </RadialBarChart>
        </NoSsr>
        <Stack spacing={1}>
          {data.map((entry) => (
            <Stack direction="row" key={entry.name} spacing={1} sx={{ alignItems: 'center' }}>
              <Box sx={{ bgcolor: entry.fill, borderRadius: 'var(--joy-radius-xs)', height: '8px', width: '8px' }} />
              <Typography textColor="text.secondary">{entry.name}</Typography>
            </Stack>
          ))}
        </Stack>
      </Stack>
    </Card>
  );
}
