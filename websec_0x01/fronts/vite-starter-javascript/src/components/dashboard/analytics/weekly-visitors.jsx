'use client';

import * as React from 'react';
import Box from '@mui/joy/Box';
import Card from '@mui/joy/Card';
import Typography from '@mui/joy/Typography';
import { PolarAngleAxis, PolarGrid, PolarRadiusAxis, Radar, RadarChart } from 'recharts';

import { NoSsr } from '@/components/core/no-ssr';

export function WeeklyVisitors({ data = [] }) {
  const chartSize = 320;

  return (
    <Card>
      <Typography level="h4">Weekly Visitors</Typography>
      <Box sx={{ display: 'flex', justifyContent: 'center' }}>
        <NoSsr fallback={<Box sx={{ height: `${chartSize}px`, width: `${chartSize}px` }} />}>
          <RadarChart
            cx={chartSize / 2}
            cy={chartSize / 2}
            data={data}
            height={chartSize}
            margin={{ top: 0, right: 0, bottom: 0, left: 0 }}
            outerRadius={chartSize / 2 - 30}
            width={chartSize}
          >
            <PolarGrid stroke="var(--joy-palette-divider)" />
            <PolarAngleAxis axisLine={false} dataKey="name" tick={AngleTick} />
            <PolarRadiusAxis angle={90} axisLine={false} domain={[0, 150]} tick={RadiusTick} />
            <Radar
              animationDuration={200}
              dataKey="v1"
              fill="var(--joy-palette-primary-softBg)"
              fillOpacity={0.5}
              name="New Visitors"
              stroke="var(--joy-palette-primary-solidBg)"
            />
            <Radar
              animationDuration={200}
              dataKey="v2"
              fill="var(--joy-palette-success-softBg)"
              fillOpacity={0.2}
              name="Recurring Visitors"
              stroke="var(--joy-palette-success-solidBg)"
            />
          </RadarChart>
        </NoSsr>
      </Box>
    </Card>
  );
}

function AngleTick({ x, y, payload }) {
  const { value } = payload;

  return (
    <text
      fill="var(--joy-palette-text-secondary)"
      fontFamily="var(--joy-fontFamily-body)"
      fontSize="var(--joy-fontSize-sm)"
      fontWeight="var(--joy-fontWeight-md)"
      textAnchor="middle"
      x={x}
      y={y}
    >
      {value}
    </text>
  );
}

function RadiusTick({ x, y, payload }) {
  const { value } = payload;

  return (
    <g transform={`translate(${x},${y})`}>
      <rect
        fill="var(--joy-palette-neutral-200)"
        fillOpacity={0.5}
        height={20}
        rx={4}
        ry={4}
        width={30}
        x={-15}
        y={-14}
      />
      <text
        dy={0}
        fill="var(--joy-palette-text-secondary)"
        fontSize="var(--joy-fontSize-xs)"
        fontWeight="var(--joy-fontWeight-md)"
        textAnchor="middle"
        x={0}
        y={0}
      >
        {value}
      </text>
    </g>
  );
}
