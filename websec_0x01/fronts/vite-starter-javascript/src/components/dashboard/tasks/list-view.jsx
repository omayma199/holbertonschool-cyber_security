'use client';

import * as React from 'react';
import Card from '@mui/joy/Card';
import Table from '@mui/joy/Table';

import { TaskRow } from './task-row';
import { TasksContext } from './tasks-context';

export function ListView() {
  const { columns, tasks, setCurrentTaskId } = React.useContext(TasksContext);

  const tasksSorted = React.useMemo(() => {
    return Array.from(tasks.values()).sort((a, b) => {
      if (a.createdAt === b.createdAt) {
        return 0;
      }

      return a.createdAt > b.createdAt ? 1 : -1;
    });
  }, [tasks]);

  return (
    <div>
      <Card sx={{ '--Card-padding': 0, overflowX: 'auto' }}>
        <Table stripe="even" sx={{ '--TableCell-paddingX': '12px', '--TableCell-paddingY': '8px' }}>
          <thead>
            <tr>
              <th style={{ width: '340px' }}>Task</th>
              <th style={{ width: '180px' }}>Category</th>
              <th style={{ width: '140px' }}>Due Date</th>
              <th style={{ width: '120px' }}>Priority</th>
              <th style={{ width: '120px' }}>Status</th>
            </tr>
          </thead>
          <tbody>
            {tasksSorted.map(({ columnId, ...task }) => (
              <TaskRow column={columns.get(columnId)} key={task.id} onOpen={setCurrentTaskId} task={task} />
            ))}
          </tbody>
        </Table>
      </Card>
    </div>
  );
}
