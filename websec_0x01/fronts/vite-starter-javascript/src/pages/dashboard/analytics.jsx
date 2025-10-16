import * as React from 'react';
import Box from '@mui/joy/Box';
import Grid from '@mui/joy/Grid';
import Stack from '@mui/joy/Stack';
import Typography from '@mui/joy/Typography';
import dayjs from 'dayjs';
import { Helmet } from 'react-helmet-async';

import { config } from '@/config';
import { Audience } from '@/components/dashboard/analytics/audience';
import { Insights } from '@/components/dashboard/analytics/insights';
import { MostVisitedPages } from '@/components/dashboard/analytics/most-visited-pages';
import { RecentEvents } from '@/components/dashboard/analytics/recent-events';
import { SessionDuration } from '@/components/dashboard/analytics/session-duration';
import { Summary } from '@/components/dashboard/analytics/summary';
import { TrafficBySource } from '@/components/dashboard/analytics/traffic-by-source';
import { TrafficSource } from '@/components/dashboard/analytics/traffic-source';
import { VisitsByTime } from '@/components/dashboard/analytics/visits-by-time';
import { WeeklyVisitors } from '@/components/dashboard/analytics/weekly-visitors';

const metadata = { title: `Analytics | Dashboard | ${config.site.name}` };

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
              Analytics
            </Typography>
          </div>
          <Grid container spacing={3}>
            <Grid xs={12}>
              <Summary />
            </Grid>
            <Grid lg={4} md={6} sx={{ '& > *': { height: '100%' } }} xs={12}>
              <TrafficSource
                data={[
                  { id: 'direct', name: 'Direct', value: 30 },
                  { id: 'social', name: 'Social Media', value: 25 },
                  { id: 'organic', name: 'Organic Search', value: 20 },
                  { id: 'ads', name: 'Paid Advertising', value: 15 },
                  { id: 'referral', name: 'Referral', value: 5 },
                  { id: 'affiliate', name: 'Affiliate Marketing', value: 5 },
                ]}
              />
            </Grid>
            <Grid lg={4} md={6} sx={{ '& > *': { height: '100%' } }} xs={12}>
              <RecentEvents
                events={[
                  {
                    id: 'EV-005',
                    createdAt: dayjs().subtract(1, 'minute').toDate(),
                    type: 'refund_request',
                    orderId: 'ORD-0068',
                  },
                  {
                    id: 'EV-004',
                    createdAt: dayjs().subtract(3, 'minute').toDate(),
                    type: 'purchase',
                    orderId: 'ORD-0068',
                  },
                  {
                    id: 'EV-003',
                    createdAt: dayjs().subtract(7, 'minute').toDate(),
                    type: 'add_product',
                    productId: 'PRD-0016',
                  },
                  {
                    id: 'EV-002',
                    createdAt: dayjs().subtract(10, 'minute').toDate(),
                    type: 'click',
                    text: 'Buy Product',
                  },
                  {
                    id: 'EV-001',
                    createdAt: dayjs().subtract(12, 'minute').toDate(),
                    type: 'page_view',
                    url: '/products/1',
                  },
                ]}
              />
            </Grid>
            <Grid lg={4} md={6} sx={{ '& > *': { height: '100%' } }} xs={12}>
              <Insights
                data={[
                  { id: 1, description: '39% of your visitors are coming from Twitter' },
                  { id: 2, description: 'Current MRR is highest in last 12 Months' },
                  { id: 3, description: 'Your highest growth in a day is 103 customers' },
                  { id: 4, description: 'Your bounce rate is 13% now' },
                  { id: 5, description: 'Engaged Organic Search: 2m 45s avg.' },
                ]}
              />
            </Grid>
            <Grid lg={6} sx={{ '& > *': { height: '100%' } }} xl={7} xs={12}>
              <SessionDuration
                data={[
                  { name: 'Jan-1', v1: 450, v2: 271, v3: 184 },
                  { name: 'Jan-2', v1: 475, v2: 285, v3: 179 },
                  { name: 'Jan-3', v1: 454, v2: 336, v3: 194 },
                  { name: 'Jan-4', v1: 498, v2: 331, v3: 187 },
                  { name: 'Jan-5', v1: 553, v2: 375, v3: 194 },
                  { name: 'Jan-6', v1: 673, v2: 396, v3: 240 },
                  { name: 'Jan-7', v1: 650, v2: 362, v3: 221 },
                  { name: 'Jan-8', v1: 656, v2: 390, v3: 224 },
                  { name: 'Jan-9', v1: 632, v2: 401, v3: 205 },
                  { name: 'Jan-10', v1: 667, v2: 323, v3: 231 },
                  { name: 'Jan-11', v1: 684, v2: 406, v3: 241 },
                  { name: 'Jan-12', v1: 675, v2: 422, v3: 224 },
                  { name: 'Jan-13', v1: 694, v2: 450, v3: 241 },
                  { name: 'Jan-14', v1: 644, v2: 412, v3: 221 },
                  { name: 'Jan-15', v1: 682, v2: 420, v3: 241 },
                  { name: 'Jan-16', v1: 612, v2: 467, v3: 215 },
                  { name: 'Jan-17', v1: 724, v2: 489, v3: 217 },
                  { name: 'Jan-18', v1: 737, v2: 451, v3: 249 },
                  { name: 'Jan-19', v1: 721, v2: 493, v3: 257 },
                  { name: 'Jan-20', v1: 780, v2: 499, v3: 230 },
                  { name: 'Jan-21', v1: 785, v2: 482, v3: 217 },
                  { name: 'Jan-22', v1: 770, v2: 496, v3: 241 },
                  { name: 'Jan-23', v1: 775, v2: 522, v3: 269 },
                  { name: 'Jan-24', v1: 793, v2: 513, v3: 235 },
                  { name: 'Jan-25', v1: 760, v2: 517, v3: 241 },
                  { name: 'Jan-26', v1: 842, v2: 490, v3: 275 },
                  { name: 'Jan-27', v1: 860, v2: 505, v3: 280 },
                  { name: 'Jan-28', v1: 866, v2: 572, v3: 305 },
                  { name: 'Jan-29', v1: 824, v2: 549, v3: 303 },
                  { name: 'Jan-30', v1: 950, v2: 580, v3: 297 },
                  { name: 'Jan-31', v1: 972, v2: 589, v3: 310 },
                ]}
              />
            </Grid>
            <Grid lg={6} sx={{ '& > *': { height: '100%' } }} xl={5} xs={12}>
              <Audience
                segments={[
                  {
                    name: 'Device',
                    data: [
                      { name: 'Desktop', value: 5894, color: '#1570EF' },
                      { name: 'Mobile', value: 2004, color: '#84CAFF' },
                    ],
                  },
                  {
                    name: 'Language',
                    data: [
                      { name: 'English', value: 6503, color: '#099250' },
                      { name: 'Other', value: 1395, color: '#73E2A3' },
                    ],
                  },
                ]}
              />
            </Grid>
            <Grid lg={8} md={6} sx={{ '& > *': { height: '100%' } }} xs={12}>
              <VisitsByTime
                data={[
                  { name: '2AM', values: [500, 500, 1000, 1000, 1000, 500, 500] },
                  { name: '4AM', values: [500, 1000, 1000, 2000, 1000, 1000, 500] },
                  { name: '6AM', values: [1000, 1000, 1000, 2000, 2000, 1000, 1000] },
                  { name: '8AM', values: [1000, 1000, 2000, 3000, 2000, 2000, 1000] },
                  { name: '10AM', values: [1000, 2000, 2000, 3000, 3000, 2000, 2000] },
                  { name: '12PM', values: [1000, 3000, 3000, 3000, 3000, 3000, 2000] },
                  { name: '2PM', values: [1000, 3000, 3000, 3000, 3000, 3000, 3000] },
                  { name: '4PM', values: [1000, 3000, 3000, 3000, 3000, 3000, 3000] },
                  { name: '6PM', values: [2000, 2000, 2000, 3000, 3000, 2000, 2000] },
                  { name: '8PM', values: [1000, 1000, 2000, 2000, 2000, 2000, 1000] },
                  { name: '10PM', values: [500, 1000, 1000, 1000, 1000, 1000, 500] },
                  { name: '12AM', values: [500, 500, 1000, 1000, 1000, 500, 500] },
                ]}
              />
            </Grid>
            <Grid lg={4} md={6} sx={{ '& > *': { height: '100%' } }} xs={12}>
              <WeeklyVisitors
                data={[
                  { name: 'Mon', v1: 120, v2: 110, fullMark: 150 },
                  { name: 'Tue', v1: 98, v2: 130, fullMark: 150 },
                  { name: 'Wed', v1: 86, v2: 130, fullMark: 150 },
                  { name: 'Thu', v1: 99, v2: 100, fullMark: 150 },
                  { name: 'Fri', v1: 85, v2: 90, fullMark: 150 },
                  { name: 'Sat', v1: 65, v2: 85, fullMark: 150 },
                  { name: 'Sun', v1: 65, v2: 85, fullMark: 150 },
                ]}
              />
            </Grid>
            <Grid lg={4} md={6} sx={{ '& > *': { height: '100%' } }} xs={12}>
              <TrafficBySource
                data={[
                  { name: 'Google', value: 9953, icon: 'google' },
                  { name: 'Twitter', value: 4490, icon: 'twitter' },
                  { name: 'LinkedIn', value: 4010, icon: 'linkedin' },
                  { name: 'Facebook', value: 1955, icon: 'facebook' },
                ]}
              />
            </Grid>
            <Grid lg={8} md={6} sx={{ '& > *': { height: '100%' } }} xs={12}>
              <MostVisitedPages
                data={[
                  { title: 'Home', clicks: 35490, impressions: 560773, ctr: 15.8 },
                  { title: 'Contact', clicks: 30986, impressions: 457097, ctr: 13.3 },
                  { title: 'Dashboard', clicks: 27560, impressions: 312098, ctr: 12.7 },
                  { title: 'Settings', clicks: 13775, impressions: 231987, ctr: 10.6 },
                  { title: 'Help and support', clicks: 9708, impressions: 209875, ctr: 9.65 },
                ]}
              />
            </Grid>
          </Grid>
        </Stack>
      </Box>
    </React.Fragment>
  );
}
