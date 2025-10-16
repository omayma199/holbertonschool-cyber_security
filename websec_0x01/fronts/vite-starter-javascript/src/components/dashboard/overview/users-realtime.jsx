'use client';

import * as React from 'react';
import Box from '@mui/joy/Box';
import Card from '@mui/joy/Card';
import List from '@mui/joy/List';
import ListItem from '@mui/joy/ListItem';
import ListItemContent from '@mui/joy/ListItemContent';
import Stack from '@mui/joy/Stack';
import Typography from '@mui/joy/Typography';
import { ComposableMap, Geographies, Geography, Marker } from 'react-simple-maps';

import { Image } from '@/components/core/image';

const geoUrl = '/assets/world-countries.json';

const markers = [
  { name: 'North Carolina', coordinates: [-79.5077, 35.9313] },
  { name: 'Los Angeles', coordinates: [-118.2298, 34.0392] },
  { name: 'London', coordinates: [-0.0818, 51.433] },
  { name: 'Nice', coordinates: [7.254, 43.7065] },
  { name: 'Cape Town', coordinates: [18.5676, -33.9671] },
  { name: 'Hyderabad', coordinates: [78.4897, 17.3995] },
  { name: 'Suzhou', coordinates: [120.595, 31.2176] },
  { name: 'Perth', coordinates: [115.9054, -31.9655] },
  { name: 'Sydney', coordinates: [150.8872, -33.7712] },
];

const countryColors = ['#def0ff', '#fbe17d', '#f4e9ff', '#d7f5dd', '#ebebef'];

export function UsersRealtime({ usersByCountry, users }) {
  return (
    <Card>
      <Typography level="h4">Users Real-Time</Typography>
      <Box sx={{ display: 'grid', gap: 3, gridTemplateColumns: { xs: '1fr', lg: '1fr 300px', xl: '1fr 500px' } }}>
        <Box sx={{ maxHeight: '450px', maxWidth: '950px', overflow: 'hidden' }}>
          <ComposableMap height={500} width={950}>
            <Geographies geography={geoUrl}>
              {({ geographies }) =>
                geographies.map((geo) => {
                  // Hide Antartica
                  if (geo.id === 'ATA') {
                    return null;
                  }

                  return (
                    <Geography
                      fill="var(--joy-palette-neutral-100)"
                      geography={geo}
                      key={geo.rsmKey}
                      stroke="var(--joy-palette-neutral-100)"
                    />
                  );
                })
              }
            </Geographies>
            {markers.map(({ name, coordinates }) => (
              <Marker coordinates={coordinates} key={name}>
                <circle fill="var(--joy-palette-primary-solidBg)" r={4} />
              </Marker>
            ))}
          </ComposableMap>
        </Box>
        <Stack spacing={3}>
          <div>
            <Typography level="body-sm">Total Active Users</Typography>
            <Typography level="h4">{new Intl.NumberFormat('en-US').format(users)}</Typography>
          </div>
          <List sx={{ '--List-gap': '16px', '--ListItem-paddingX  ': 0, '--ListItem-paddingY': 0 }}>
            {usersByCountry.map((country, index) => (
              <ListItem
                key={country.name}
                sx={{
                  alignItems: 'stretch',
                  bgcolor: 'var(--joy-palette-background-level1)',
                  borderRadius: 'var(--joy-radius-sm)',
                  position: 'relative',
                }}
                variant="soft"
              >
                <ListItemContent
                  sx={{
                    alignItems: 'center',
                    bgcolor: countryColors[index % countryColors.length],
                    borderRadius: 'var(--joy-radius-sm)',
                    color: 'var(--joy-palette-neutral-900)',
                    display: 'flex',
                    flexBasis: country.value,
                    flexGrow: 0,
                    gap: 1,
                    minWidth: 'fit-content',
                    p: '8px 12px',
                  }}
                >
                  {country.flag ? <Image alt="" height={24} src={country.flag} width={34} /> : null}
                  <Typography fontSize="sm" fontWeight="lg" textColor="inherit">
                    {country.name}
                  </Typography>
                </ListItemContent>
                <Box
                  sx={{
                    alignItems: 'center',
                    display: 'flex',
                    height: '100%',
                    justifyContent: 'flex-end',
                    p: '8px',
                    position: 'absolute',
                    width: '100%',
                  }}
                >
                  <Typography level="body-xs">
                    {new Intl.NumberFormat('en-US', { style: 'percent', maximumFractionDigits: 2 }).format(
                      country.value / 100
                    )}
                  </Typography>
                </Box>
              </ListItem>
            ))}
          </List>
        </Stack>
      </Box>
    </Card>
  );
}
