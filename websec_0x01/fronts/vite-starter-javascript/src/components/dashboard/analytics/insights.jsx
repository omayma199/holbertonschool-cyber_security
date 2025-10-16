import * as React from 'react';
import Avatar from '@mui/joy/Avatar';
import Button from '@mui/joy/Button';
import Card from '@mui/joy/Card';
import List from '@mui/joy/List';
import ListItem from '@mui/joy/ListItem';
import ListItemContent from '@mui/joy/ListItemContent';
import ListItemDecorator from '@mui/joy/ListItemDecorator';
import Stack from '@mui/joy/Stack';
import Typography from '@mui/joy/Typography';
import { CaretRight as CaretRightIcon } from '@phosphor-icons/react/dist/ssr/CaretRight';

export function Insights({ data = [] }) {
  return (
    <Card>
      <Typography level="h4">Insights</Typography>
      <List sx={{ '--List-padding': 0, '--ListItem-paddingX': 0, '--ListItemDecorator-size': '48px' }}>
        {data.map((entry, index) => (
          <ListItem key={entry.id}>
            <ListItemDecorator>
              <Avatar size="sm">{index + 1}</Avatar>
            </ListItemDecorator>
            <ListItemContent>{entry.description}</ListItemContent>
          </ListItem>
        ))}
      </List>
      <Stack direction="row" sx={{ justifyContent: 'flex-end' }}>
        <Button
          endDecorator={<CaretRightIcon fontSize="var(--Icon-fontSize)" weight="bold" />}
          size="sm"
          variant="plain"
        >
          View All Insights
        </Button>
      </Stack>
    </Card>
  );
}
