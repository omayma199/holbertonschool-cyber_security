'use client';

import * as React from 'react';
import Avatar from '@mui/joy/Avatar';
import AvatarGroup from '@mui/joy/AvatarGroup';
import Card from '@mui/joy/Card';
import Stack from '@mui/joy/Stack';
import Typography from '@mui/joy/Typography';
import { ChatCenteredDots as ChatCenteredDotsIcon } from '@phosphor-icons/react/dist/ssr/ChatCenteredDots';
import { Clock as ClockIcon } from '@phosphor-icons/react/dist/ssr/Clock';
import { Eye as EyeIcon } from '@phosphor-icons/react/dist/ssr/Eye';
import { List as ListIcon } from '@phosphor-icons/react/dist/ssr/List';
import { Paperclip as PaperclipIcon } from '@phosphor-icons/react/dist/ssr/Paperclip';
import dayjs from 'dayjs';

import { TaskCategory } from './task-category';
import { TaskPriority } from './task-priority';

export function TaskCard({ onOpen, task }) {
  const {
    assignees = [],
    attachments = [],
    category,
    comments = [],
    description,
    dueDate,
    id,
    priority,
    subtasks = [],
    title,
    watchers,
  } = task;

  return (
    <Card>
      <Stack direction="row" spacing={2} sx={{ alignItems: 'center', justifyContent: 'space-between' }}>
        <div>{priority ? <TaskPriority priority={priority} /> : null}</div>
        <div>
          {dueDate ? (
            <Typography level="body-xs" startDecorator={<ClockIcon fontSize="var(--Icon-fontSize)" weight="bold" />}>
              {dayjs(dueDate).diff(dayjs(), 'day')} days
            </Typography>
          ) : null}
        </div>
      </Stack>
      {category ? <TaskCategory category={category} /> : null}
      <Stack spacing={0.5}>
        <Typography
          onClick={() => onOpen?.(id)}
          sx={{ cursor: 'pointer', ':hover': { color: 'var(--joy-palette-primary-plainColor)' } }}
        >
          {title}
        </Typography>
        <Typography level="body-sm">{description}</Typography>
      </Stack>
      <Stack direction="row" spacing={2} sx={{ alignItems: 'center', justifyContent: 'space-between' }}>
        <div>
          {assignees.length ? (
            <AvatarGroup sx={{ flex: '1 1 auto' }}>
              {assignees.map((assignee) => (
                <Avatar key={assignee.id} src={assignee.avatar} />
              ))}
            </AvatarGroup>
          ) : null}
        </div>
        <Stack direction="row" spacing={1}>
          {subtasks.length ? (
            <Typography level="body-xs" startDecorator={<ListIcon fontSize="var(--joy-fontSize-md)" weight="bold" />}>
              {subtasks.length}
            </Typography>
          ) : null}
          {attachments.length ? (
            <Typography
              level="body-xs"
              startDecorator={<PaperclipIcon fontSize="var(--joy-fontSize-md)" weight="bold" />}
            >
              {attachments.length}
            </Typography>
          ) : null}
          {comments.length ? (
            <Typography
              level="body-xs"
              startDecorator={<ChatCenteredDotsIcon fontSize="var(--joy-fontSize-md)" weight="bold" />}
            >
              {sumComments(comments)}
            </Typography>
          ) : null}
          {watchers ? (
            <Typography level="body-xs" startDecorator={<EyeIcon fontSize="var(--joy-fontSize-md)" weight="bold" />}>
              {watchers}
            </Typography>
          ) : null}
        </Stack>
      </Stack>
    </Card>
  );
}

function sumComments(comments) {
  return comments.reduce((acc, curr) => {
    let sum = acc + 1;

    if (curr.comments?.length) {
      sum += sumComments(curr.comments);
    }

    return sum;
  }, 0);
}
