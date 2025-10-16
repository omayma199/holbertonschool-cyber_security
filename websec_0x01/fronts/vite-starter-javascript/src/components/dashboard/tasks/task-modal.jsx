'use client';

import * as React from 'react';
import Avatar from '@mui/joy/Avatar';
import Box from '@mui/joy/Box';
import Button from '@mui/joy/Button';
import Checkbox from '@mui/joy/Checkbox';
import Divider from '@mui/joy/Divider';
import IconButton from '@mui/joy/IconButton';
import Input from '@mui/joy/Input';
import LinearProgress from '@mui/joy/LinearProgress';
import Link from '@mui/joy/Link';
import Modal from '@mui/joy/Modal';
import ModalClose from '@mui/joy/ModalClose';
import ModalDialog from '@mui/joy/ModalDialog';
import Sheet from '@mui/joy/Sheet';
import Stack from '@mui/joy/Stack';
import Textarea from '@mui/joy/Textarea';
import Tooltip from '@mui/joy/Tooltip';
import Typography from '@mui/joy/Typography';
import { Calendar as CalendarIcon } from '@phosphor-icons/react/dist/ssr/Calendar';
import { File as FileIcon } from '@phosphor-icons/react/dist/ssr/File';
import { PaperPlaneTilt as PaperPlaneTiltIcon } from '@phosphor-icons/react/dist/ssr/PaperPlaneTilt';
import { Pen as PenIcon } from '@phosphor-icons/react/dist/ssr/Pen';
import { Plus as PlusIcon } from '@phosphor-icons/react/dist/ssr/Plus';
import dayjs from 'dayjs';

import { Timeline, TimelineContent, TimelineItem } from '@/components/core/timeline';

import { TaskCategory } from './task-category';
import { TaskPriority } from './task-priority';

// Each task should have its own activity log events.
const events = [
  { id: 'EV-001', description: 'Task has been created', createdAt: dayjs().subtract(5, 'minute').toDate() },
];

export function TaskModal({ onClose, onTaskDelete, onTaskUpdate, onCommentAdd, open, task }) {
  const {
    assignees,
    attachments,
    author,
    category,
    comments = [],
    description = '',
    dueDate,
    id,
    priority,
    subtasks = [],
    title,
  } = task;

  return (
    <Modal onClose={onClose} open={open}>
      <ModalDialog sx={{ '--ModalDialog-maxWidth': '1200px', pt: 8, width: '100%' }} variant="plain">
        <ModalClose />
        <Box
          sx={{
            display: { xs: 'flex', lg: 'grid' },
            flexDirection: 'column',
            overflowY: 'auto',
            gridTemplateColumns: { lg: '1fr 300px' },
            gap: 3,
          }}
        >
          <Stack spacing={3}>
            <Sheet
              sx={{ borderRadius: 'var(--joy-radius-sm)', display: 'flex', flexDirection: 'column', gap: 2, p: 3 }}
              variant="outlined"
            >
              <EditableTitle
                onUpdate={(newTitle) => {
                  onTaskUpdate?.(id, { title: newTitle });
                }}
                title={title}
              />
              <EditableDescription
                description={description}
                onUpdate={(newDescription) => {
                  onTaskUpdate?.(id, { description: newDescription });
                }}
              />
            </Sheet>
            <Sheet
              sx={{ borderRadius: 'var(--joy-radius-sm)', display: 'flex', flexDirection: 'column', gap: 2, p: 3 }}
              variant="outlined"
            >
              <Typography fontSize={{ xs: 'lg', md: 'xl' }} level="h4">
                Subtasks
              </Typography>
              {subtasks.length ? (
                <Stack spacing={2}>
                  <Stack spacing={1}>
                    <Typography level="body-xs" textAlign="right">
                      {countDoneSubtasks(subtasks)} of 5
                    </Typography>
                    <LinearProgress
                      determinate
                      sx={{ bgcolor: 'var(--joy-palette-background-level1)' }}
                      value={(100 / subtasks.length) * countDoneSubtasks(subtasks)}
                      variant="plain"
                    />
                  </Stack>
                  <Stack gap={1}>
                    {subtasks.map((subtask) => (
                      <Checkbox
                        checked={subtask.done}
                        color="neutral"
                        key={subtask.id}
                        label={subtask.title}
                        variant="outlined"
                      />
                    ))}
                  </Stack>
                </Stack>
              ) : null}
              <div>
                <Button
                  color="neutral"
                  size="sm"
                  startDecorator={<PlusIcon fontSize="var(--Icon-fontSize)" weight="bold" />}
                  variant="outlined"
                >
                  Add Subtask
                </Button>
              </div>
            </Sheet>
            <Sheet
              sx={{ borderRadius: 'var(--joy-radius-sm)', display: 'flex', flexDirection: 'column', gap: 2, p: 3 }}
              variant="outlined"
            >
              <Typography fontSize={{ xs: 'lg', md: 'xl' }} level="h4">
                Attachments
              </Typography>
              <Stack direction="row" spacing={2} sx={{ alignItems: 'center', flexWrap: 'wrap' }}>
                {attachments?.map((attachment) => (
                  <Sheet
                    key={attachment.id}
                    sx={{ borderRadius: 'var(--joy-radius-md)', p: '4px 8px' }}
                    variant="outlined"
                  >
                    <Stack direction="row" spacing={1} sx={{ alignItems: 'center' }}>
                      <div>
                        <FileIcon fontSize="var(--joy-fontSize-xl)" weight="bold" />
                      </div>
                      <div>
                        <Typography fontSize="xs">{attachment.name}</Typography>
                        <Typography level="body-xs">{attachment.size}</Typography>
                      </div>
                    </Stack>
                  </Sheet>
                ))}
                <IconButton color="neutral" size="sm">
                  <PlusIcon fontSize="var(--Icon-fontSize)" weight="bold" />
                </IconButton>
              </Stack>
            </Sheet>
            <Sheet
              sx={{ borderRadius: 'var(--joy-radius-sm)', display: 'flex', flexDirection: 'column', gap: 2, p: 3 }}
              variant="outlined"
            >
              <Typography fontSize={{ xs: 'lg', md: 'xl' }} level="h4">
                Comments
              </Typography>
              <Stack spacing={5}>
                {comments.length ? (
                  <Stack spacing={3}>
                    {comments.map((comment, index) => (
                      <CommentItem comment={comment} connector={index < comments.length - 1} key={comment.id} />
                    ))}
                  </Stack>
                ) : (
                  <Typography fontStyle="italic" level="body-sm">
                    No comments yet
                  </Typography>
                )}
                <CommentAdd
                  onAdd={(content) => {
                    onCommentAdd?.(id, content);
                  }}
                />
              </Stack>
            </Sheet>
          </Stack>
          <Stack spacing={3}>
            <Sheet sx={{ borderRadius: 'var(--joy-radius-sm)', p: 3 }} variant="outlined">
              <Stack divider={<Divider />} spacing={2}>
                <Stack spacing={2}>
                  <Typography fontSize="sm" fontWeight="xl">
                    Created By
                  </Typography>
                  <Stack direction="row" spacing={1.5} sx={{ alignItems: 'center' }}>
                    <Avatar src={author.avatar} />
                    <div>
                      <Typography fontSize="sm" fontWeight="md">
                        {author.name}
                      </Typography>
                      <Typography level="body-sm">@{author.username}</Typography>
                    </div>
                  </Stack>
                </Stack>
                <Stack spacing={2}>
                  <Typography fontSize="sm" fontWeight="xl">
                    Asignees
                  </Typography>
                  <Stack direction="row" spacing={2} sx={{ alignItems: 'center', flexWrap: 'wrap' }}>
                    {assignees?.map((assignee) => (
                      <Avatar key={assignee.id} src={assignee.avatar} />
                    ))}
                    <IconButton color="neutral" size="sm" variant="soft">
                      <PlusIcon fontSize="var(--Icon-fontSize)" weight="bold" />
                    </IconButton>
                  </Stack>
                </Stack>
                <Stack spacing={2} sx={{ '&:not(:hover) > div:first-of-type button': { visibility: 'hidden' } }}>
                  <Stack direction="row" spacing={2} sx={{ alignItems: 'center', justifyContent: 'space-between' }}>
                    <Typography fontSize="sm" fontWeight="xl">
                      Due Date
                    </Typography>
                    <IconButton
                      color="neutral"
                      size="sm"
                      sx={{ '--Icon-fontSize': 'var(--joy-fontSize-md)' }}
                      variant="plain"
                    >
                      <PenIcon fontSize="var(--Icon-fontSize)" weight="bold" />
                    </IconButton>
                  </Stack>
                  {dueDate ? (
                    <Typography
                      fontSize="sm"
                      fontWeight="md"
                      startDecorator={<CalendarIcon fontSize="var(--joy-fontSize-xl)" weight="bold" />}
                    >
                      {dayjs(dueDate).format('MMM D, YYYY h:mm A')}
                    </Typography>
                  ) : null}
                </Stack>
                <Stack spacing={2} sx={{ '&:not(:hover) > div:first-of-type button': { visibility: 'hidden' } }}>
                  <Stack direction="row" spacing={2} sx={{ alignItems: 'center', justifyContent: 'space-between' }}>
                    <Typography fontSize="sm" fontWeight="xl">
                      Priority
                    </Typography>
                    <IconButton
                      color="neutral"
                      size="sm"
                      sx={{ '--Icon-fontSize': 'var(--joy-fontSize-md)' }}
                      variant="plain"
                    >
                      <PenIcon fontSize="var(--Icon-fontSize)" weight="bold" />
                    </IconButton>
                  </Stack>
                  {priority ? <TaskPriority priority={priority} /> : null}
                </Stack>
                <Stack spacing={2} sx={{ '&:not(:hover) > div:first-of-type button': { visibility: 'hidden' } }}>
                  <Stack direction="row" spacing={2} sx={{ alignItems: 'center', justifyContent: 'space-between' }}>
                    <Typography fontSize="sm" fontWeight="xl">
                      Category
                    </Typography>
                    <IconButton
                      color="neutral"
                      size="sm"
                      sx={{ '--Icon-fontSize': 'var(--joy-fontSize-md)' }}
                      variant="plain"
                    >
                      <PenIcon fontSize="var(--Icon-fontSize)" weight="bold" />
                    </IconButton>
                  </Stack>
                  {category ? <TaskCategory category={category} /> : null}
                </Stack>
                <Stack spacing={2}>
                  <Typography fontSize="sm" fontWeight="xl">
                    Activity
                  </Typography>
                  <Timeline>
                    {events.map((event) => (
                      <TimelineItem key={event.id}>
                        <TimelineContent>
                          <Stack spacing={1}>
                            <Typography level="body-xs">
                              {dayjs(event.createdAt).format('MMM D, YYYY h:mm A')}
                            </Typography>
                            <Typography fontSize="sm">{event.description}</Typography>
                          </Stack>
                        </TimelineContent>
                      </TimelineItem>
                    ))}
                  </Timeline>
                </Stack>
              </Stack>
            </Sheet>
            <Button color="danger" onClick={() => onTaskDelete?.(id)} variant="soft">
              Delete
            </Button>
          </Stack>
        </Box>
      </ModalDialog>
    </Modal>
  );
}

function EditableTitle({ onUpdate, title }) {
  const [copy, setCopy] = React.useState('');
  const [edit, setEdit] = React.useState(false);

  React.useEffect(() => {
    setCopy(title);
  }, [title]);

  const handleSave = React.useCallback(() => {
    if (!copy) {
      return;
    }

    onUpdate?.(copy);
    setEdit(false);
  }, [copy, onUpdate]);

  if (edit) {
    return (
      <Stack direction="row" spacing={2} sx={{ flexWrap: 'wrap' }}>
        <Input
          name="title"
          onChange={(event) => {
            setCopy(event.target.value);
          }}
          sx={{ flex: '1 1 auto' }}
          value={copy}
        />
        <Button
          color="danger"
          onClick={() => {
            setCopy(title);
            setEdit(false);
          }}
          size="sm"
          variant="plain"
        >
          Dismiss
        </Button>
        <Button
          color="neutral"
          onClick={() => {
            handleSave();
          }}
          size="sm"
          variant="outlined"
        >
          Save
        </Button>
      </Stack>
    );
  }

  return (
    <Stack direction="row" spacing={2}>
      <Typography fontSize={{ xs: 'lg', md: 'xl2' }} level="h4" noWrap sx={{ flex: '1 1 auto' }}>
        {copy}
      </Typography>
      <div>
        <IconButton
          color="neutral"
          onClick={() => {
            setEdit(true);
          }}
          size="sm"
          sx={{ '--Icon-fontSize': 'var(--joy-fontSize-md)' }}
          variant="plain"
        >
          <PenIcon fontSize="var(--Icon-fontSize)" weight="bold" />
        </IconButton>
      </div>
    </Stack>
  );
}

function EditableDescription({ onUpdate, description }) {
  const [copy, setCopy] = React.useState('');

  React.useEffect(() => {
    setCopy(description);
  }, [description]);

  const handleSave = React.useCallback(() => {
    onUpdate?.(copy);
  }, [copy, onUpdate]);

  return (
    <Box sx={{ position: 'relative' }}>
      <Textarea
        maxRows={5}
        minRows={3}
        onChange={(event) => {
          setCopy(event.target.value);
        }}
        placeholder="No description"
        sx={{ pb: '40px' }}
        value={copy}
      />
      <Stack
        direction="row"
        spacing={1}
        sx={{
          bottom: 0,
          justifyContent: 'flex-end',
          left: 0,
          p: 1,
          pointerEvents: 'none',
          position: 'absolute',
          width: '100%',
          '& > *': { pointerEvents: 'auto' },
        }}
      >
        <Button
          color="neutral"
          onClick={() => {
            setCopy(description);
          }}
          size="sm"
          variant="plain"
        >
          Cancel
        </Button>
        <Button onClick={handleSave} size="sm">
          Save
        </Button>
      </Stack>
    </Box>
  );
}

function CommentItem({ comment, connector }) {
  const { author, content, createdAt, comments } = comment;
  const canReply = author.id !== 'USR-000'; // authenticated user

  return (
    <Stack direction="row" spacing={2}>
      <Box sx={{ display: 'flex', flexDirection: 'column' }}>
        <Avatar src={author.avatar} />
        {connector ? (
          <Box sx={{ flex: '1 1 auto', pt: 3 }}>
            <Box
              sx={{
                bgcolor: 'var(--joy-palette-divider)',
                height: '100%',
                minHeight: '24px',
                mx: 'auto',
                width: '1px',
              }}
            />
          </Box>
        ) : null}
      </Box>
      <Stack spacing={3} sx={{ flex: '1 1 auto' }}>
        <div>
          <Stack direction="row" spacing={1} sx={{ flexWrap: 'wrap', justifyContent: 'space-between' }}>
            <Tooltip arrow title={`@${author.username}`}>
              <Typography fontSize="sm" fontWeight="md" whiteSpace="nowrap">
                {author.name}
              </Typography>
            </Tooltip>
            {createdAt ? (
              <Typography level="body-xs" whiteSpace="nowrap">
                {dayjs().diff(createdAt, 'minute')} min ago
              </Typography>
            ) : null}
          </Stack>
          <Typography level="body-sm">{content}</Typography>
          {canReply ? (
            <div>
              <Link fontSize="xs" fontWeight="lg" underline="none">
                Reply
              </Link>
            </div>
          ) : null}
        </div>
        {comments?.length ? (
          <Stack spacing={2}>
            {comments.map((subComment, index) => (
              <CommentItem comment={subComment} connector={index < comments.length - 1} key={subComment.id} />
            ))}
          </Stack>
        ) : null}
      </Stack>
    </Stack>
  );
}

function CommentAdd({ onAdd }) {
  const [content, setContent] = React.useState('');

  const handleAdd = React.useCallback(() => {
    if (!content) {
      return;
    }

    onAdd?.(content);
    setContent('');
  }, [content, onAdd]);

  return (
    <Input
      endDecorator={
        <IconButton
          color="neutral"
          onClick={() => {
            handleAdd();
          }}
          variant="plain"
        >
          <PaperPlaneTiltIcon fontSize="var(--Icon-fontSize)" weight="bold" />
        </IconButton>
      }
      name="comment"
      onChange={(event) => {
        setContent(event.target.value);
      }}
      onKeyUp={(event) => {
        if (event.key === 'Enter') {
          handleAdd();
        }
      }}
      placeholder="Add a comment..."
      startDecorator={<Avatar src="/assets/avatar.png" />}
      sx={{ '--Input-radius': 'var(--joy-radius-md)', px: '12px', py: '8px' }}
      value={content}
    />
  );
}

function countDoneSubtasks(subtasks = []) {
  return subtasks.reduce((acc, curr) => acc + (curr.done ? 1 : 0), 0);
}
