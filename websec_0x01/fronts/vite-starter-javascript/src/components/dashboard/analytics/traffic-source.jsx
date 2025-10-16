import * as React from 'react';
import Card from '@mui/joy/Card';
import LinearProgress from '@mui/joy/LinearProgress';
import List from '@mui/joy/List';
import ListItem from '@mui/joy/ListItem';
import ListItemContent from '@mui/joy/ListItemContent';
import Stack from '@mui/joy/Stack';
import Typography from '@mui/joy/Typography';

export function TrafficSource({ data = [] }) {
  return (
    <Card>
      <Typography level="h4">Traffic Source</Typography>
      <List sx={{ '--List-padding': 0, '--ListItem-paddingX': 0, '--ListItemDecorator-size': '48px' }}>
        {data.map((source) => (
          <ListItem key={source.id}>
            <ListItemContent>
              <Stack direction="row" spacing={2} sx={{ mb: 1 }}>
                <Typography level="body-sm" sx={{ flex: '1 1 auto' }} textColor="text.primary">
                  {source.name}
                </Typography>
                <Typography level="body-xs">
                  {new Intl.NumberFormat('en-US', { style: 'percent', maximumFractionDigits: 2 }).format(
                    source.value / 100
                  )}
                </Typography>
              </Stack>
              <LinearProgress
                determinate
                sx={{ bgcolor: 'var(--joy-palette-background-level1)' }}
                value={source.value}
                variant="plain"
              />
            </ListItemContent>
          </ListItem>
        ))}
      </List>
    </Card>
  );
}
