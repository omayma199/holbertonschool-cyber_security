import * as React from 'react';
import Chip from '@mui/joy/Chip';
import Stack from '@mui/joy/Stack';
import Typography from '@mui/joy/Typography';
import dayjs from 'dayjs';

import { Timeline, TimelineContent, TimelineItem } from '@/components/core/timeline';

export function EventsTimeline({ events }) {
  return (
    <Timeline>
      {events.map((event) => (
        <TimelineItem key={event.id}>
          <TimelineContent>
            <Stack spacing={1}>
              <Stack direction="row" spacing={1}>
                <Typography level="body-sm" textColor="text.primary">
                  {dayjs(event.createdAt).format('MMM D, YYYY h:mm A')}
                </Typography>
                {event.current ? (
                  <Chip color="success" size="sm" variant="soft">
                    Current
                  </Chip>
                ) : null}
              </Stack>
              <Typography level="body-xs">{event.description}</Typography>
            </Stack>
          </TimelineContent>
        </TimelineItem>
      ))}
    </Timeline>
  );
}
