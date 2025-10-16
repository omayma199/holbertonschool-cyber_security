import * as React from 'react';
import Box from '@mui/joy/Box';
import Card from '@mui/joy/Card';
import Stack from '@mui/joy/Stack';
import Typography from '@mui/joy/Typography';

export function VisitsByTime({ data = [] }) {
  const chartWidth = '100%';
  const cellWidth = '1fr';
  const cellHeight = '30px';

  return (
    <Card>
      <Typography level="h4">Visits by Time</Typography>
      <Stack direction={{ lg: 'row' }} spacing={3}>
        <Box sx={{ flex: '1 1 auto' }}>
          <Box
            sx={{
              display: 'grid',
              gridTemplateColumns: `50px repeat(7, ${cellWidth})`,
              gridTemplateRows: `repeat(12, ${cellHeight})`,
              maxWidth: chartWidth,
            }}
          >
            {data.map((row, rowIndex) => (
              <React.Fragment key={row.name}>
                <Box sx={{ alignItems: 'center', display: 'flex' }}>
                  {rowIndex % 2 === 0 ? <Typography level="body-xs">{row.name}</Typography> : null}
                </Box>
                {row.values.map((value, colIndex) => (
                  <Box
                    // eslint-disable-next-line react/no-array-index-key -- Expected
                    key={colIndex}
                    sx={{
                      bgcolor: getCellColor(value),
                      border: '1px solid var(--joy-palette-background-surface)',
                      p: '8px',
                    }}
                  />
                ))}
              </React.Fragment>
            ))}
            <div />
            {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((day) => (
              <Box key={day} sx={{ alignItems: 'center', display: 'flex', justifyContent: 'center' }}>
                <Typography level="body-xs">{day}</Typography>
              </Box>
            ))}
          </Box>
        </Box>
        <Stack direction={{ xs: 'row', lg: 'column' }} spacing={{ xs: 3, lg: 2 }} sx={{ flexWrap: 'wrap' }}>
          {[
            { label: '500', color: 'var(--joy-palette-primary-100)' },
            { label: '1,000', color: 'var(--joy-palette-primary-300)' },
            { label: '2,000', color: 'var(--joy-palette-primary-500)' },
            { label: '3,000', color: 'var(--joy-palette-primary-700)' },
          ].map((item) => (
            <Stack direction="row" key={item.label} spacing={1} sx={{ alignItems: 'center' }}>
              <Box sx={{ bgcolor: item.color, borderRadius: 'var(--joy-radius-xs)', height: '8px', width: '8px' }} />
              <Typography sx={{ whiteSpace: 'nowrap' }} textColor="text.secondary">
                {item.label} &gt;
              </Typography>
            </Stack>
          ))}
        </Stack>
      </Stack>
    </Card>
  );
}

function getCellColor(value) {
  return value >= 3000
    ? 'var(--joy-palette-primary-700)'
    : value >= 2000
      ? 'var(--joy-palette-primary-500)'
      : value >= 1000
        ? 'var(--joy-palette-primary-300)'
        : 'var(--joy-palette-primary-100)';
}
