import * as React from 'react';
import { Helmet } from 'react-helmet-async';

import { config } from '@/config';
import { Permissions } from '@/components/dashboard/team/permissions';

const metadata = { title: `Permissions | Team | Dashboard | ${config.site.name}` };

const groups = [
  {
    name: 'Messaging Management',
    permissions: [
      { name: 'Can view message', readOnly: true, member: true, manager: true, admin: true },
      { name: 'Can send message', member: true, manager: true, admin: true },
      { name: 'Can attach files', member: true, manager: true, admin: true },
      { name: 'Can share embedded links', member: true, manager: true, admin: true },
      { name: 'Can use @everyone to notify all members', manager: true, admin: true },
    ],
  },
  {
    name: 'Channel Management',
    permissions: [
      { name: 'Can create private channels', manager: true, admin: true },
      { name: 'Can create public channels', manager: true, admin: true },
      { name: 'Can delete private channels', admin: true },
      { name: 'Can delete public channels', admin: true },
      { name: 'Can archive channels', admin: true },
      { name: 'Can manage posting permissions in channels', admin: true },
    ],
  },
];

export function Page() {
  return (
    <React.Fragment>
      <Helmet>
        <title>{metadata.title}</title>
      </Helmet>
      <Permissions groups={groups} />
    </React.Fragment>
  );
}
