import * as React from 'react';
import Avatar from '@mui/joy/Avatar';
import Card from '@mui/joy/Card';
import CardOverflow from '@mui/joy/CardOverflow';
import List from '@mui/joy/List';
import ListDivider from '@mui/joy/ListDivider';
import ListItem from '@mui/joy/ListItem';
import ListItemContent from '@mui/joy/ListItemContent';
import ListItemDecorator from '@mui/joy/ListItemDecorator';
import Typography from '@mui/joy/Typography';
import dayjs from 'dayjs';

export function Inbox({ messages = [] }) {
  return (
    <Card>
      <Typography level="h4">Inbox</Typography>
      <CardOverflow sx={{ mb: 'var(--CardOverflow-offset)', mx: 'var(--CardOverflow-offset)' }}>
        <List sx={{ '--List-padding': 0, '--ListItemDecorator-size': '56px', minWidth: '1px' }}>
          {messages.map((message, index) => (
            <React.Fragment key={message.id}>
              <ListItem>
                <ListItemDecorator sx={{ alignSelf: 'flex-start' }}>
                  <Avatar color="primary" src={message.author.avatar} />
                </ListItemDecorator>
                <ListItemContent>
                  <Typography>{message.author.name}</Typography>
                  <Typography level="body-sm" noWrap>
                    {message.subject}
                  </Typography>
                </ListItemContent>
                <Typography level="body-xs" whiteSpace="nowrap">
                  {dayjs().diff(message.createdAt, 'minute')} min ago
                </Typography>
              </ListItem>
              {index < messages.length - 1 ? <ListDivider /> : null}
            </React.Fragment>
          ))}
        </List>
      </CardOverflow>
    </Card>
  );
}
