'use client';

import * as React from 'react';
import Box from '@mui/joy/Box';
import Card from '@mui/joy/Card';
import IconButton from '@mui/joy/IconButton';
import Stack from '@mui/joy/Stack';
import Switch from '@mui/joy/Switch';
import Typography from '@mui/joy/Typography';
import { Drop as DropIcon } from '@phosphor-icons/react/dist/ssr/Drop';
import { Fan as FanIcon } from '@phosphor-icons/react/dist/ssr/Fan';
import { Leaf as LeafIcon } from '@phosphor-icons/react/dist/ssr/Leaf';
import { Minus as MinusIcon } from '@phosphor-icons/react/dist/ssr/Minus';
import { Plus as PlusIcon } from '@phosphor-icons/react/dist/ssr/Plus';
import { Recycle as RecycleIcon } from '@phosphor-icons/react/dist/ssr/Recycle';
import { Snowflake as SnowflakeIcon } from '@phosphor-icons/react/dist/ssr/Snowflake';
import { Sun as SunIcon } from '@phosphor-icons/react/dist/ssr/Sun';
import { RadialBar, RadialBarChart } from 'recharts';

import { NoSsr } from '@/components/core/no-ssr';

const modes = {
  Auto: RecycleIcon,
  Cool: SnowflakeIcon,
  Hot: SunIcon,
  Eco: LeafIcon,
  Fan: FanIcon,
  Dry: DropIcon,
};

export function Thermostat({ status = 'off', temp = 0, mode: currentMode = 'Auto' }) {
  const chartSize = 300;

  const data = [
    { name: 'Empty', value: 100 },
    { name: 'Temperature', value: temp },
  ];

  return (
    <Card>
      <Stack direction="row" spacing={2} sx={{ alignItems: 'center', justifyContent: 'space-between' }}>
        <Typography level="h4">Thermostat</Typography>
        <Switch checked={status === 'on'} />
      </Stack>
      <NoSsr fallback={<Box sx={{ height: `${chartSize}px` }} />}>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            position: 'relative',
            // hide the empty bar
            '& .recharts-layer path[name="Empty"]': { display: 'none' },
            '& .recharts-layer .recharts-radial-bar-background-sector': {
              fill: 'var(--joy-palette-background-level1)',
            },
          }}
        >
          <RadialBarChart
            barSize={16}
            data={data}
            endAngle={-70}
            height={chartSize}
            innerRadius={166}
            startAngle={250}
            width={chartSize}
          >
            <RadialBar
              animationDuration={300}
              background
              cornerRadius={8}
              dataKey="value"
              endAngle={-320}
              fill="var(--joy-palette-primary-solidBg)"
              startAngle={20}
            />
          </RadialBarChart>
          <Box
            sx={{
              alignItems: 'center',
              display: 'flex',
              height: '100%',
              justifyContent: 'center',
              left: 0,
              position: 'absolute',
              top: 0,
              width: '100%',
            }}
          >
            <Stack spacing={1} sx={{ alignItems: 'center', justifyContent: 'center' }}>
              <Typography level="h2">{temp}°C</Typography>
              <Stack direction="row" spacing={1} sx={{ alignItems: 'center', justifyContent: 'center' }}>
                <IconButton color="neutral" variant="outlined">
                  <PlusIcon fontSize="var(--Icon-fontSize)" weight="bold" />
                </IconButton>
                <IconButton color="neutral" variant="outlined">
                  <MinusIcon fontSize="var(--Icon-fontSize)" weight="bold" />
                </IconButton>
              </Stack>
            </Stack>
          </Box>
        </Box>
      </NoSsr>
      <Box
        sx={{
          '--Avatar-width': '88px',
          display: 'grid',
          gridTemplateColumns: 'repeat(3, var(--Avatar-width))',
          gap: 3,
          justifyContent: 'center',
        }}
      >
        {Object.entries(modes).map(([mode, Icon]) => {
          const active = mode === currentMode;

          return (
            <Stack
              key={mode}
              spacing={1}
              sx={{
                alignItems: 'center',
                bgcolor: active ? 'var(--joy-palette-primary-solidBg)' : 'var(--joy-palette-background-level1)',
                borderRadius: 'var(--joy-radius-md)',
                color: active ? 'var(--joy-palette-primary-solidColor)' : 'var(--joy-palette-text-primary)',
                cursor: 'pointer',
                justifyContent: 'center',
                height: '78px',
                width: 'var(--Mode-width)',
              }}
            >
              {Icon ? <Icon fontSize="var(--joy-fontSize-xl)" weight="bold" /> : null}
              <Typography textColor="inherit">{mode}</Typography>
            </Stack>
          );
        })}
      </Box>
    </Card>
  );
}
