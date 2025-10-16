import * as React from 'react';
import dayjs from 'dayjs';
import { Helmet } from 'react-helmet-async';
import { useSearchParams } from 'react-router-dom';

import { config } from '@/config';
import { TasksProvider } from '@/components/dashboard/tasks/tasks-context';
import { TasksView } from '@/components/dashboard/tasks/tasks-view';

const metadata = { title: `Tasks | Dashboard | ${config.site.name}` };

const columns = [
  { id: 'COL-001', name: 'To do', taskIds: ['TSK-001', 'TSK-002'] },
  { id: 'COL-002', name: 'In progress', taskIds: [] },
  { id: 'COL-003', name: 'Done', taskIds: ['TSK-003', 'TSK-004'] },
];

const tasks = [
  {
    id: 'TSK-001',
    author: { id: 'USR-002', avatar: '/assets/avatar-2.png', name: 'Sienna Hewitt', username: 'sienna' },
    title: 'Testing Dashboard',
    description: 'Review dashboard menu',
    createdAt: dayjs().subtract(3, 'day').toDate(),
    columnId: 'COL-001',
    priority: 'high',
    category: 'Testing',
    dueDate: dayjs().add(7, 'day').add(2, 'minute').toDate(),
    assignees: [{ id: 'USR-008', avatar: '/assets/avatar-8.png', name: 'Kimberly Maestra', username: 'kimberly' }],
    subtasks: [
      { id: 'STSK-001', title: 'Create a logo', done: true },
      { id: 'STSK-002', title: 'Create text styles', done: true },
      { id: 'STSK-003', title: 'Create color styles', done: true },
      { id: 'STSK-004', title: 'Create effect styles', done: false },
      { id: 'STSK-005', title: 'Create multiple elements', done: false },
    ],
    attachments: [
      { id: 'ATT-001', name: 'Documentation.pdf', extension: 'pdf', size: '1.23MB' },
      { id: 'ATT-002', name: 'brand_logo.png', extension: 'png', size: '0.23MB' },
    ],
    comments: [
      {
        id: 'MSG-001',
        author: { id: 'USR-008', avatar: '/assets/avatar-8.png', name: 'Kimberly Maestra', username: 'kimberly' },
        createdAt: dayjs().subtract(24, 'minute').toDate(),
        content: 'Could you please share the documentation that we need to follow while creating the brand identity?',
        comments: [
          {
            id: 'MSG-002',
            author: { id: 'USR-002', avatar: '/assets/avatar-2.png', name: 'Sienna Hewitt', username: 'sienna' },
            createdAt: dayjs().subtract(5, 'minute').toDate(),
            content: 'Hey @kimberly I have uploaded the file. Please check',
          },
        ],
      },
    ],
    watchers: 4,
  },
  {
    id: 'TSK-002',
    author: { id: 'USR-002', avatar: '/assets/avatar-2.png', name: 'Sienna Hewitt', username: 'sienna' },
    title: 'Create Variables',
    description: 'Create variables for all the components that are currently in the design system',
    createdAt: dayjs().subtract(2, 'day').toDate(),
    columnId: 'COL-001',
    priority: 'mid',
    category: 'Design System',
  },
  {
    id: 'TSK-003',
    author: { id: 'USR-002', avatar: '/assets/avatar-2.png', name: 'Sienna Hewitt', username: 'sienna' },
    title: 'Create Wireframe for landing page',
    description: 'Create low fidelity landing page wireframes with all the possible layouts',
    createdAt: dayjs().subtract(1, 'day').toDate(),
    columnId: 'COL-003',
    priority: 'low',
    category: 'Wireframes',
  },
  {
    id: 'TSK-004',
    author: { id: 'USR-002', avatar: '/assets/avatar-2.png', name: 'Sienna Hewitt', username: 'sienna' },
    title: 'Branding and visual identity',
    columnId: 'COL-003',
    description: 'Create a brand identity system that includes a logo, typography, color palette and brand guidelines',
    createdAt: dayjs().subtract(1, 'day').toDate(),
    category: 'Branding',
  },
];

export function Page() {
  const searchParams = useExtractSearchParams();

  const view = searchParams.view ?? 'board';

  return (
    <React.Fragment>
      <Helmet>
        <title>{metadata.title}</title>
      </Helmet>
      <TasksProvider columns={columns} tasks={tasks}>
        <TasksView mode={view} />
      </TasksProvider>
    </React.Fragment>
  );
}

function useExtractSearchParams() {
  const [searchParams] = useSearchParams();

  return { view: searchParams.get('view') || undefined };
}
