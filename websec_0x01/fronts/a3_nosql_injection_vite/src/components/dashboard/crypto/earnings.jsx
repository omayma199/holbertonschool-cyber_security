import * as React from 'react';
import Box from '@mui/joy/Box';
import Card from '@mui/joy/Card';
import Stack from '@mui/joy/Stack';
import Typography from '@mui/joy/Typography';
import { RadialBar, RadialBarChart } from 'recharts';


export default function Earnings({ data = [] }) {
  const chartSize = 280;
  const chartInnerRadius = 40;
  const dataWithEmpty = [{ name: 'Empty', value: 100 }, ...data];

  return (
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
        <Stack spacing={1}>
          {data.reverse().map((entry) => (
            <Stack direction="row" key={entry.name} spacing={1} sx={{ alignItems: 'center' }}>
              <Box sx={{ bgcolor: entry.fill, borderRadius: 'var(--joy-radius-xs)', height: '8px', width: '8px' }} />
              <Typography textColor="text.secondary">{entry.name}</Typography>
            </Stack>
          ))}
        </Stack>
      </Stack>
  );
}
