import * as React from 'react';
import Box from '@mui/joy/Box';
import Grid from '@mui/joy/Grid';
import Stack from '@mui/joy/Stack';
import Typography from '@mui/joy/Typography';
import { CoinVertical as CoinVerticalIcon } from '@phosphor-icons/react/dist/ssr/CoinVertical';
import { ShoppingCart as ShoppingCartIcon } from '@phosphor-icons/react/dist/ssr/ShoppingCart';
import { UsersThree as UsersThreeIcon } from '@phosphor-icons/react/dist/ssr/UsersThree';
import dayjs from 'dayjs';
import { Helmet } from 'react-helmet-async';

import { config } from '@/config';
import { Inbox } from '@/components/dashboard/overview/inbox';
import { Orders } from '@/components/dashboard/overview/orders';
import { SessionsByDevice } from '@/components/dashboard/overview/sessions-by-device';
import { Stats } from '@/components/dashboard/overview/stats';
import { Tasks } from '@/components/dashboard/overview/tasks';
import { UsersRealtime } from '@/components/dashboard/overview/users-realtime';

const metadata = { title: `Overview | Dashboard | ${config.site.name}` };

export function Page() {
  return (
    <React.Fragment>
      <Helmet>
        <title>{metadata.title}</title>
      </Helmet>
      <Box sx={{ p: 'var(--Content-padding)' }}>
        <Stack spacing={3}>
          <div>
            <Typography fontSize={{ xs: 'xl3', lg: 'xl4' }} level="h1">
              Overview
            </Typography>
          </div>
          <Grid container spacing={3}>
            <Grid md={4} sx={{ '& > *': { height: '100%' } }} xs={12}>
              <Stats
                color="primary"
                diff={35}
                icon={ShoppingCartIcon}
                label="Total Sales"
                trend="up"
                value={new Intl.NumberFormat('en-US').format(280)}
              />
            </Grid>
            <Grid md={4} sx={{ '& > *': { height: '100%' } }} xs={12}>
              <Stats
                color="danger"
                diff={16}
                icon={CoinVerticalIcon}
                label="Total Revenue"
                trend="up"
                value={new Intl.NumberFormat('en-US', {
                  style: 'currency',
                  currency: 'USD',
                  maximumFractionDigits: 0,
                }).format(92175)}
              />
            </Grid>
            <Grid md={4} sx={{ '& > *': { height: '100%' } }} xs={12}>
              <Stats
                color="success"
                diff={24}
                icon={UsersThreeIcon}
                label="Total Users"
                trend="up"
                value={new Intl.NumberFormat('en-US').format(560410)}
              />
            </Grid>
            <Grid lg={7} sx={{ '& > *': { height: '100%' } }} xl={8} xs={12}>
              <Orders
                data={[
                  { name: 'January', v1: 400, v2: 200, v3: 300 },
                  { name: 'February', v1: 300, v2: 100, v3: 500 },
                  { name: 'March', v1: 200, v2: 400, v3: 100 },
                  { name: 'April', v1: 278, v2: 300, v3: 150 },
                  { name: 'May', v1: 189, v2: 500, v3: 350 },
                  { name: 'June', v1: 239, v2: 150, v3: 450 },
                ]}
              />
            </Grid>
            <Grid lg={5} sx={{ '& > *': { height: '100%' } }} xl={4} xs={12}>
              <SessionsByDevice
                data={[
                  { name: 'Andriod', value: 11313, color: 'var(--joy-palette-primary-solidBg)' },
                  { name: 'iPhone', value: 8914, color: '#2e90fa' },
                  { name: 'Mac', value: 12966, color: '#dd2590' },
                  { name: 'Windows', value: 7293, color: '#eac54f' },
                ]}
                total={40520}
              />
            </Grid>
            <Grid xs={12}>
              <UsersRealtime
                users={2500}
                usersByCountry={[
                  { flag: '/assets/flag-us.svg', name: 'United States', value: 40 },
                  { flag: '/assets/flag-uk.svg', name: 'United Kingdom', value: 25 },
                  { flag: '/assets/flag-au.svg', name: 'Australia', value: 15 },
                  { flag: '/assets/flag-de.svg', name: 'Germany', value: 11 },
                  { flag: '/assets/flag-ca.svg', name: 'Canada', value: 7 },
                  { name: 'Other', value: 2 },
                ]}
              />
            </Grid>
            <Grid md={6} sx={{ '& > *': { height: '100%' } }} xs={12}>
              <Inbox
                messages={[
                  {
                    id: 'EM-005',
                    subject: 'Hey, would you like to collaborate?',
                    author: { name: 'Olly Schroeder', avatar: '/assets/avatar-5.png' },
                    createdAt: dayjs().subtract(5, 'minute').toDate(),
                  },
                  {
                    id: 'EM-004',
                    subject: "Well it's a really easy one, I'm sure we can make it half of the price.",
                    author: { name: 'Sienna Hewitt', avatar: '/assets/avatar-2.png' },
                    createdAt: dayjs().subtract(15, 'minute').toDate(),
                  },
                  {
                    id: 'EM-003',
                    subject: "Sure thing, I'll have a look today. They're looking great!",
                    author: { name: 'Zaid Schwartz', avatar: '/assets/avatar-1.png' },
                    createdAt: dayjs().subtract(23, 'minute').toDate(),
                  },
                  {
                    id: 'EM-002',
                    subject: "Hey, nice projects! I really liked the one in react. What's your quote on kinda...",
                    author: { name: 'Ammar Foley', avatar: '/assets/avatar-3.png' },
                    createdAt: dayjs().subtract(32, 'minute').toDate(),
                  },
                  {
                    id: 'EM-001',
                    subject: "Hey, nice projects! I really liked the one in react. What's your quote on kinda...",
                    author: { name: 'Ammar Foley', avatar: '/assets/avatar-3.png' },
                    createdAt: dayjs().subtract(32, 'minute').toDate(),
                  },
                ]}
              />
            </Grid>
            <Grid md={6} sx={{ '& > *': { height: '100%' } }} xs={12}>
              <Tasks
                tasks={[
                  {
                    id: 'TSK-001',
                    status: 'active',
                    title: 'Create a landing page for app',
                    assignee: 'John Dukes',
                    duration: '3h',
                  },
                  {
                    id: 'TSK-002',
                    status: 'active',
                    title: 'Copywriting for the website',
                    assignee: 'Ricky Smith',
                    duration: '1h',
                  },
                  {
                    id: 'TSK-003',
                    status: 'pending',
                    title: 'Landing page development',
                    assignee: 'Amélie Laurent',
                    duration: '2h',
                  },
                  {
                    id: 'TSK-004',
                    status: 'active',
                    title: 'Discuss KPI with the team',
                    assignee: 'Jerry Helfer',
                    duration: '4h',
                  },
                  {
                    id: 'TSK-005',
                    status: 'completed',
                    title: 'Product Review for market',
                    assignee: 'Rhonda Rhodes',
                    duration: '12h',
                  },
                  {
                    id: 'TSK-006',
                    status: 'completed',
                    title: 'UX research for landing page',
                    assignee: 'Paula Mora',
                    duration: '8h',
                  },
                  {
                    id: 'TSK-007',
                    status: 'completed',
                    title: 'Competitor Analysis',
                    assignee: 'Kenneth Allen',
                    duration: '5h',
                  },
                ]}
              />
            </Grid>
          </Grid>
        </Stack>
      </Box>
    </React.Fragment>
  );
}
