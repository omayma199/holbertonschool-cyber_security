import * as React from 'react';
import Card from '@mui/joy/Card';
import LinearProgress from '@mui/joy/LinearProgress';
import List from '@mui/joy/List';
import ListItem from '@mui/joy/ListItem';
import ListItemContent from '@mui/joy/ListItemContent';
import Stack from '@mui/joy/Stack';
import Typography from '@mui/joy/Typography';

import { Image } from '@/components/core/image';

const countries = {
  us: { name: 'United States', flag: '/assets/flag-us.svg' },
  uk: { name: 'United Kingdom', flag: '/assets/flag-uk.svg' },
  au: { name: 'Australia', flag: '/assets/flag-au.svg' },
  de: { name: 'Germany', flag: '/assets/flag-de.svg' },
  ca: { name: 'Canada', flag: '/assets/flag-ca.svg' },
  ae: { name: 'UAE', flag: '/assets/flag-ae.svg' },
};

export function TopCountries({ data = [] }) {
  return (
    <Card>
      <Typography level="h4">Top Countries</Typography>
      <List sx={{ '--List-gap': '16px', '--List-padding': 0, '--ListItem-paddingX': 0, '--ListItem-paddingY': 0 }}>
        {data.map((entry) => {
          const country = entry.country ? countries[entry.country] : { name: 'Other', flag: null };

          return (
            <ListItem key={country.name}>
              <ListItemContent>
                <Stack spacing={1}>
                  <Stack direction="row" spacing={1} sx={{ alignItems: 'center' }}>
                    <Stack direction="row" spacing={1} sx={{ alignItems: 'center', flex: '1 1 auto' }}>
                      {country.flag ? <Image alt="" height={24} src={country.flag} width={34} /> : null}
                      <Typography level="title-sm">{country.name}</Typography>
                    </Stack>
                    <Typography level="body-xs">
                      {new Intl.NumberFormat('en-US', { style: 'percent', maximumFractionDigits: 2 }).format(
                        entry.amount / 100
                      )}
                    </Typography>
                  </Stack>
                  <LinearProgress
                    determinate
                    sx={{ bgcolor: 'var(--joy-palette-background-level1)' }}
                    value={entry.amount}
                    variant="plain"
                  />
                </Stack>
              </ListItemContent>
            </ListItem>
          );
        })}
      </List>
    </Card>
  );
}
