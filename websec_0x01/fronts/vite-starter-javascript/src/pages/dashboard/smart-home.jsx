import * as React from 'react';
import Box from '@mui/joy/Box';
import Grid from '@mui/joy/Grid';
import IconButton from '@mui/joy/IconButton';
import Stack from '@mui/joy/Stack';
import Tab from '@mui/joy/Tab';
import TabList from '@mui/joy/TabList';
import Tabs from '@mui/joy/Tabs';
import Typography from '@mui/joy/Typography';
import { Plus as PlusIcon } from '@phosphor-icons/react/dist/ssr/Plus';
import dayjs from 'dayjs';
import { Helmet } from 'react-helmet-async';

import { config } from '@/config';
import { Activity } from '@/components/dashboard/smart-home/activity';
import { Appliances } from '@/components/dashboard/smart-home/appliances';
import { PowerUsageByDevice } from '@/components/dashboard/smart-home/power-usage-by-device';
import { PowerUsageByRoom } from '@/components/dashboard/smart-home/power-usage-by-room';
import { PowerUsageToday } from '@/components/dashboard/smart-home/power-usage-today';
import { Thermostat } from '@/components/dashboard/smart-home/thermostat';

const metadata = { title: `Smart home | Dashboard | ${config.site.name}` };

export function Page() {
  return (
    <React.Fragment>
      <Helmet>
        <title>{metadata.title}</title>
      </Helmet>
      <Box sx={{ p: 'var(--Content-padding)' }}>
        <Stack spacing={3}>
          <Stack direction={{ lg: 'row' }} spacing={3} sx={{ alignItems: 'flex-start' }}>
            <Stack spacing={1} sx={{ flex: '1 1 auto' }}>
              <Typography fontSize={{ xs: 'xl3', lg: 'xl4' }} level="h1">
                Smart Home
              </Typography>
            </Stack>
            <div>
              <Tabs size="sm" value="all" variant="custom">
                <TabList>
                  <Tab disableIndicator value="all">
                    All
                  </Tab>
                  <Tab disableIndicator value="bedroom">
                    Bedroom
                  </Tab>
                  <Tab disableIndicator value="living-room">
                    Living Room
                  </Tab>
                  <IconButton color="neutral" variant="plain">
                    <PlusIcon fontSize="var(--Icon-fontSize)" weight="bold" />
                  </IconButton>
                </TabList>
              </Tabs>
            </div>
          </Stack>
          <Grid container spacing={3}>
            <Grid lg={8} md={6} xs={12}>
              <Stack spacing={3}>
                <PowerUsageToday
                  data={[
                    { name: '12AM', v1: 506, v2: 549 },
                    { name: '1AM', v1: 479, v2: 531 },
                    { name: '2AM', v1: 678, v2: 504 },
                    { name: '3AM', v1: 642, v2: 438 },
                    { name: '4AM', v1: 523, v2: 409 },
                    { name: '5AM', v1: 575, v2: 611 },
                    { name: '6AM', v1: 588, v2: 518 },
                    { name: '7AM', v1: 697, v2: 662 },
                    { name: '8AM', v1: 615, v2: 561 },
                    { name: '9AM', v1: 672, v2: 547 },
                    { name: '10AM', v1: 631, v2: 521 },
                    { name: '11AM', v1: 624, v2: 0 },
                    { name: '12PM', v1: 437, v2: 0 },
                    { name: '1PM', v1: 482, v2: 0 },
                    { name: '2PM', v1: 663, v2: 0 },
                    { name: '3PM', v1: 459, v2: 0 },
                    { name: '4PM', v1: 460, v2: 0 },
                    { name: '5PM', v1: 500, v2: 0 },
                    { name: '6PM', v1: 623, v2: 0 },
                    { name: '7PM', v1: 474, v2: 0 },
                    { name: '8PM', v1: 400, v2: 0 },
                    { name: '9PM', v1: 513, v2: 0 },
                    { name: '10PM', v1: 547, v2: 0 },
                    { name: '11PM', v1: 409, v2: 0 },
                  ]}
                />
                <Grid container spacing={3}>
                  <Grid sx={{ '& > *': { height: '100%' } }} xl={6} xs={12}>
                    <PowerUsageByRoom
                      data={[
                        { id: 'ROOM-005', name: 'Living Room', value: 80, color: '#3CCB7F' },
                        { id: 'ROOM-004', name: 'Kitchen', value: 50, color: '#EAC54F' },
                        { id: 'ROOM-003', name: 'Study', value: 30, color: '#FD853A' },
                        { id: 'ROOM-002', name: 'Washroom', value: 90, color: '#2E90FA' },
                        { id: 'ROOM-001', name: 'Bedroom', value: 60, color: '#DD2590' },
                      ]}
                    />
                  </Grid>
                  <Grid sx={{ '& > *': { height: '100%' } }} xl={6} xs={12}>
                    <Activity
                      data={[
                        {
                          id: 'EV-005',
                          description: 'Activate home wake up mode.',
                          createdAt: dayjs().subtract(5, 'minute').subtract(1, 'hour').toDate(),
                        },
                        {
                          id: 'EV-004',
                          description: '2 lights and 1 fan are switched on.',
                          createdAt: dayjs().subtract(17, 'minute').subtract(1, 'hour').toDate(),
                        },
                        {
                          id: 'EV-003',
                          description: '1 Air Conditioner was switched on and was set to Cool mode.',
                          createdAt: dayjs().subtract(51, 'minute').subtract(1, 'hour').toDate(),
                        },
                        {
                          id: 'EV-002',
                          description: '1 TV was switched on.',
                          createdAt: dayjs().subtract(3, 'minute').subtract(9, 'hour').subtract(1, 'day').toDate(),
                        },
                        {
                          id: 'EV-001',
                          description: '1 Air Conditioner was turned off.',
                          createdAt: dayjs().subtract(44, 'minute').subtract(9, 'hour').subtract(1, 'day').toDate(),
                        },
                      ]}
                    />
                  </Grid>
                </Grid>
                <Appliances
                  appliances={[
                    { id: 'DEV-009', name: 'Smart Lamp', type: 'smart-lamp', status: 'on', uptime: '12 hours' },
                    { id: 'DEV-008', name: 'Smart TV', type: 'smart-tv', status: 'off', uptime: '12 hours' },
                    {
                      id: 'DEV-007',
                      name: 'Air Conditioner',
                      type: 'air-conditioner',
                      status: 'on',
                      uptime: '12 hours',
                    },
                    { id: 'DEV-006', name: 'Wifi', type: 'wifi', status: 'on', uptime: '12 hours' },
                    { id: 'DEV-005', name: 'Smart Fans', type: 'smart-fans', status: 'on', uptime: '12 hours' },
                    { id: 'DEV-004', name: 'Speaker', type: 'speaker', status: 'off', uptime: '12 hours' },
                    { id: 'DEV-003', name: 'Refrigerator', type: 'refrigerator', status: 'on', uptime: '12 hours' },
                    { id: 'DEV-002', name: 'Smart Lamp', type: 'smart-lamp', status: 'off', uptime: '12 hours' },
                    { id: 'DEV-001', name: 'CCTV', type: 'cctv', status: 'off', uptime: '12 hours' },
                  ]}
                />
              </Stack>
            </Grid>
            <Grid lg={4} md={6} xs={12}>
              <Stack spacing={3}>
                <PowerUsageByDevice
                  data={[
                    { name: 'Mon', value: 800 },
                    { name: 'Tue', value: 970 },
                    { name: 'Wed', value: 620 },
                    { name: 'Thu', value: 820 },
                    { name: 'Fri', value: 630 },
                    { name: 'Sat', value: 100 },
                    { name: 'Sun', value: 0 },
                  ]}
                  dataByDevice={[
                    { id: 'DEV-008', name: 'Smart TV', type: 'smart-tv', units: 2, value: 42 },
                    { id: 'DEV-007', name: 'Air Conditioner', type: 'air-conditioner', units: 2, value: 87 },
                    { id: 'DEV-006', name: 'Smart Lamp', type: 'smart-lamp', units: 18, value: 25 },
                    { id: 'DEV-005', name: 'Smart Fans', type: 'smart-fans', units: 11, value: 37 },
                    { id: 'DEV-004', name: 'Speaker', type: 'speaker', units: 5, value: 58 },
                    { id: 'DEV-003', name: 'CCTV', type: 'cctv', units: 9, value: 63 },
                    { id: 'DEV-002', name: 'Refrigerator', type: 'refrigerator', units: 1, value: 13 },
                    { id: 'DEV-001', name: 'Wifi', type: 'wifi', units: 1, value: 10 },
                  ]}
                />
                <Thermostat mode="Cool" status="on" temp={32} />
              </Stack>
            </Grid>
          </Grid>
        </Stack>
      </Box>
    </React.Fragment>
  );
}
