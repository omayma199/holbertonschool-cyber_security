'use client';

import * as React from 'react';
import Box from '@mui/joy/Box';
import Card from '@mui/joy/Card';
import Chip from '@mui/joy/Chip';
import Sheet from '@mui/joy/Sheet';
import Stack from '@mui/joy/Stack';
import Typography from '@mui/joy/Typography';
import { TrendDown as TrendDownIcon } from '@phosphor-icons/react/dist/ssr/TrendDown';
import { TrendUp as TrendUpIcon } from '@phosphor-icons/react/dist/ssr/TrendUp';
import { Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';

import { NoSsr } from '@/components/core/no-ssr';

export function IncomeSummary({
  income: incomeAmount,
  incomeDiff,
  incomeTrend,
  expenses: expensesAmount,
  expensesDiff,
  expensesTrend,
  data = [],
}) {
  const chartHeight = 240;

  return (
    <Card sx={{ gap: 2 }}>
      <Typography level="h4">Income Summary</Typography>
      <Box sx={{ display: 'grid', gap: 3, gridTemplateColumns: { xs: '1fr', md: '260px 1fr', lg: '320px 1fr' } }}>
        <Stack spacing={2}>
          {[
            { id: 1, label: 'Total Income', amount: incomeAmount, diff: incomeDiff, trend: incomeTrend },
            { id: 2, label: 'Total Expenses', amount: expensesAmount, diff: expensesDiff, trend: expensesTrend },
          ].map((entry) => (
            <Card
              key={entry.id}
              sx={{ bgcolor: 'var(--joy-palette-background-level1)', boxShadow: 'none' }}
              variant="soft"
            >
              <Stack direction="row" spacing={3} sx={{ alignItems: 'center', justifyContent: 'space-between' }}>
                <Stack spacing={1}>
                  <Typography level="body-sm">{entry.label}</Typography>
                  <Typography level="h2">
                    {new Intl.NumberFormat('en-US', {
                      style: 'currency',
                      currency: 'USD',
                      maximumFractionDigits: 0,
                    }).format(entry.amount)}
                  </Typography>
                </Stack>
                <Stack spacing={0.5}>
                  <Chip
                    color={entry.trend === 'up' ? 'success' : 'danger'}
                    startDecorator={
                      entry.trend === 'up' ? (
                        <TrendUpIcon fontSize="var(--Icon-fontSize)" weight="bold" />
                      ) : (
                        <TrendDownIcon fontSize="var(--Icon-fontSize)" weight="bold" />
                      )
                    }
                    variant="soft"
                  >
                    {new Intl.NumberFormat('en-US', { style: 'percent', maximumFractionDigits: 2 }).format(
                      entry.diff / 100
                    )}
                  </Chip>
                  <Typography level="body-xs">vs last year</Typography>
                </Stack>
              </Stack>
            </Card>
          ))}
        </Stack>
        <NoSsr fallback={<Box sx={{ height: `${chartHeight}px` }} />}>
          <ResponsiveContainer height={chartHeight} width="100%">
            <AreaChart data={data} margin={{ top: 0, right: 0, bottom: 0, left: -20 }}>
              <defs>
                <linearGradient id="area" x1="0" x2="0" y1="0" y2="1">
                  <stop offset="0" stopColor="var(--joy-palette-primary-400)" stopOpacity={0.1} />
                  <stop offset="100%" stopColor="var(--joy-palette-primary-100)" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="4 4" vertical={false} />
              <XAxis axisLine={false} dataKey="name" interval={2} tickLine={false} type="category" />
              <YAxis axisLine={false} domain={[0, 1000]} tickLine={false} type="number" />
              <Area
                animationDuration={300}
                dataKey="value"
                dot={<Dot />}
                fill="url(#area)"
                fillOpacity={1}
                name="Income"
                stroke="var(--joy-palette-primary-400)"
                strokeWidth={2}
                type="monotone"
              />
              <Tooltip animationDuration={50} content={<TooltipContent />} cursor={false} />
            </AreaChart>
          </ResponsiveContainer>
        </NoSsr>
      </Box>
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
              {new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(entry.value)}
            </Typography>
          </Stack>
        ))}
      </Stack>
    </Sheet>
  );
}
