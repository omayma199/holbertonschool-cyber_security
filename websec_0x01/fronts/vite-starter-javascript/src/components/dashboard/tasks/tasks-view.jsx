'use client';

import * as React from 'react';
import Box from '@mui/joy/Box';
import Input from '@mui/joy/Input';
import Stack from '@mui/joy/Stack';
import Tab from '@mui/joy/Tab';
import TabList from '@mui/joy/TabList';
import Tabs from '@mui/joy/Tabs';
import Typography from '@mui/joy/Typography';
import { Kanban as KanbanIcon } from '@phosphor-icons/react/dist/ssr/Kanban';
import { MagnifyingGlass as MagnifyingGlassIcon } from '@phosphor-icons/react/dist/ssr/MagnifyingGlass';
import { Table as TableIcon } from '@phosphor-icons/react/dist/ssr/Table';

import { paths } from '@/paths';
import { RouterLink } from '@/components/core/link';

import { BoardView } from './board-view';
import { ColumnModal } from './column-modal';
import { ListView } from './list-view';
import { TaskModal } from './task-modal';
import { TasksContext } from './tasks-context';

export function TasksView({ mode }) {
  const {
    columns,
    tasks,
    currentColumnId,
    currentTaskId,
    setCurrentColumnId,
    setCurrentTaskId,
    updateColumn,
    updateTask,
    deleteTask,
    addComment,
  } = React.useContext(TasksContext);

  const currentColumn = currentColumnId ? columns.get(currentColumnId) : undefined;
  const currentTask = currentTaskId ? tasks.get(currentTaskId) : undefined;

  return (
    <React.Fragment>
      <Box
        sx={{
          display: 'flex',
          flex: '1 1 auto',
          flexDirection: 'column',
          px: 'var(--Content-paddingX)',
          py: 'var(--Content-paddingY)',
        }}
      >
        <Stack spacing={3} sx={{ flex: '1 1 auto' }}>
          <div>
            <Typography fontSize={{ xs: 'xl3', lg: 'xl4' }} level="h1">
              Tasks
            </Typography>
          </div>
          <Stack direction="row" spacing={3} sx={{ flexWrap: 'wrap' }}>
            <Box sx={{ flex: '1 1 auto' }}>
              <Input
                name="task"
                placeholder="Search"
                startDecorator={<MagnifyingGlassIcon fontSize="var(--Icon-fontSize)" weight="bold" />}
                sx={{ maxWidth: '420px' }}
              />
            </Box>
            <Tabs value={mode} variant="custom">
              <TabList>
                <Tab component={RouterLink} href={`${paths.dashboard.tasks}?view=board`} value="board">
                  <KanbanIcon fontSize="var(--Icon-fontSize)" weight="bold" />
                  Board
                </Tab>
                <Tab component={RouterLink} href={`${paths.dashboard.tasks}?view=list`} value="list">
                  <TableIcon fontSize="var(--Icon-fontSize)" weight="bold" />
                  List
                </Tab>
              </TabList>
            </Tabs>
          </Stack>
          {mode === 'board' ? <BoardView /> : <ListView />}
        </Stack>
      </Box>
      {currentColumn ? (
        <ColumnModal
          column={currentColumn}
          onClose={() => {
            setCurrentColumnId(undefined);
          }}
          onColumnUpdate={updateColumn}
          open
        />
      ) : null}
      {currentTask ? (
        <TaskModal
          onClose={() => {
            setCurrentTaskId(undefined);
          }}
          onCommentAdd={addComment}
          onTaskDelete={(taskId) => {
            setCurrentColumnId(undefined);
            deleteTask(taskId);
          }}
          onTaskUpdate={updateTask}
          open
          task={currentTask}
        />
      ) : null}
    </React.Fragment>
  );
}
