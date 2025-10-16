import * as React from 'react';
import Card from '@mui/joy/Card';
import Stack from '@mui/joy/Stack';
import Typography from '@mui/joy/Typography';
import dayjs from 'dayjs';

import { Timeline, TimelineContent, TimelineItem } from '@/components/core/timeline';

export function Activity({ data = [] }) {
  return (
    <Card>
      <Typography level="h4">Recent Activity</Typography>
      <Timeline>
        {data.map((event) => {
          const isToday = dayjs(event.createdAt).isSame(dayjs(), 'day');

          return (
            <TimelineItem key={event.id}>
              <TimelineContent>
                <Stack spacing={1}>
                  <Typography level="body-xs">
                    {isToday
                      ? dayjs(event.createdAt).format('[Today at] h:mm A')
                      : dayjs(event.createdAt).format('MMM D [at] h:mm A')}
                  </Typography>
                  <Typography>{event.description}</Typography>
                </Stack>
              </TimelineContent>
            </TimelineItem>
          );
        })}
      </Timeline>
    </Card>
  );
}
