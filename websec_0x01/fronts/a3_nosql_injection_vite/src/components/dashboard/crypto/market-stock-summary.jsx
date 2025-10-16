import * as React from 'react';
import Avatar from '@mui/joy/Avatar';
import Box from '@mui/joy/Box';
import Card from '@mui/joy/Card';
import Sheet from '@mui/joy/Sheet';
import Stack from '@mui/joy/Stack';
import Typography from '@mui/joy/Typography';
import { Horse as CurrencyHBTNcIcon } from '@phosphor-icons/react/dist/ssr/Horse';

import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';


function prepareData(data) {
  return data.map(({ open, close, ...other }) => ({ ...other, openClose: [open, close] }));
}

export default function MarketStockSummary({ data: dataRaw = [], volume }) {
  const chartHeight = 280;
	const currentPrice = dataRaw.slice(-1)[0]?.close;
	const currentChange = currentPrice - dataRaw.slice(-1)[0]?.open;
  const data = prepareData(dataRaw);

  const minValue = data.reduce((prevMin, { low, openClose: [open, close] }) => {
    const currentMin = Math.min(low, open, close);
    return prevMin === null || currentMin < prevMin ? currentMin : prevMin;
  }, null);

  const maxValue = data.reduce((prevMax, { high, openClose: [open, close] }) => {
    const currentMax = Math.max(high, open, close);
    // @ts-expect-error -- null compare results in false
    return currentMax > prevMax ? currentMax : prevMax;
  }, minValue);

  const yAxisDomain = minValue !== null && maxValue !== null ? [minValue, maxValue] : undefined;

  return (
    <Card>
      <Typography level="h4">Stock Summary</Typography>
      <Stack direction="row" spacing={3} sx={{ flexWrap: 'wrap' }}>
        <Stack direction="row" spacing={1} sx={{ alignItems: 'center', flex: '1 1 auto' }}>
          <Avatar
            color="primary"
            sx={{
              '--Avatar-size': '40px',
              '--Avatar-radius': 'var(--joy-radius-sm)',
              '--Icon-fontSize': 'var(--joy-fontSize-xl)',
            }}
          >
            <CurrencyHBTNcIcon />
          </Avatar>
          <div>
            <Typography level="title-md">Holbie Coin</Typography>
            <Typography level="body-xs">HBTNc to USD</Typography>
          </div>
        </Stack>
        <Stack spacing={0.5}>
          <Typography level="body-xs">Current Price</Typography>
          <Typography level="h4">
            {new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(currentPrice)}
          </Typography>
        </Stack>
        <Stack spacing={0.5}>
          <Typography level="body-xs">Change (24h)</Typography>
          <Typography level="h4">
            {new Intl.NumberFormat('en-US', { style: 'percent', maximumFractionDigits: 2 }).format(currentChange / currentPrice)}
          </Typography>
        </Stack>
        <Stack spacing={0.5}>
          <Typography level="body-xs">Volume (24h)</Typography>
          <Typography level="h4">{volume}</Typography>
        </Stack>
      </Stack>
        <ResponsiveContainer height={chartHeight}>
          <BarChart data={data} margin={{ top: 0, right: 0, bottom: 0, left: -50 }}>
            <CartesianGrid strokeDasharray="4 4" vertical={false} />
            <XAxis
              axisLine={false}
              dataKey="timestamps"
              fontFamily="var(--joy-fontFamily-body)"
              fontSize="var(--joy-fontSize-xs)"
              interval={1}
              tickCount={31}
              tickLine={false}
            />
            <YAxis
              axisLine={false}
              dataKey="high"
              domain={yAxisDomain}
              tickCount={8}
              tickFormatter={() => ''}
              tickLine={false}
            />
            <Bar
              dataKey="openClose"
              maxBarSize={80}
              // @ts-expect-error -- Bar adds the props
              shape={<Candlestick />}
            />
            <Tooltip animationDuration={50} content={<TooltipContent />} cursor={false} />
          </BarChart>
        </ResponsiveContainer>
    </Card>
  );
}

function Candlestick({ x, y, width, height, low, high, openClose: [open, close] }) {
  const isGrowing = open < close;
  const color = isGrowing ? 'var(--joy-palette-success-400)' : 'var(--joy-palette-danger-400)';
  const ratio = Math.abs(height / (open - close));

  return (
    <g fill={color} stroke={color} strokeWidth={2}>
      <path
        d={`
          M ${x},${y}
          L ${x},${y + height}
          L ${x + width},${y + height}
          L ${x + width},${y}
          L ${x},${y}
        `}
      />
      {/* bottom line */}
      {isGrowing ? (
        <path
          d={`
            M ${x + width / 2}, ${y + height}
            v ${(open - low) * ratio}
          `}
        />
      ) : (
        <path
          d={`
            M ${x + width / 2}, ${y}
            v ${(close - low) * ratio}
          `}
        />
      )}
      {/* top line */}
      {isGrowing ? (
        <path
          d={`
            M ${x + width / 2}, ${y}
            v ${(close - high) * ratio}
          `}
        />
      ) : (
        <path
          d={`
            M ${x + width / 2}, ${y + height}
            v ${(open - high) * ratio}
          `}
        />
      )}
    </g>
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
        <Stack key={entry.name} spacing={1}>
          <Typography level="title-md">{entry.payload.timestamp}</Typography>
          {[
            { label: 'Open', value: entry.payload.openClose[0] },
            { label: 'Close', value: entry.payload.openClose[1] },
            { label: 'Low', value: entry.payload.low },
            { label: 'High', value: entry.payload.high },
          ].map((item) => (
            <Stack
              direction="row"
              key={item.label}
              spacing={3}
              sx={{ alignItems: 'center', justifyContent: 'space-between' }}
            >
              <Typography fontSize="sm" fontWeight="md" whiteSpace="nowrap">
                {item.label}
              </Typography>
              <Typography fontSize="sm" textColor="text.tertiary">
                {item.value}
              </Typography>
            </Stack>
          ))}
        </Stack>
      ))}
    </Sheet>
  );
}
