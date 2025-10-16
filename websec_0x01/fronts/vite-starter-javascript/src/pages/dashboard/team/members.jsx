import * as React from 'react';
import Button from '@mui/joy/Button';
import Grid from '@mui/joy/Grid';
import Stack from '@mui/joy/Stack';
import { Plus as PlusIcon } from '@phosphor-icons/react/dist/ssr/Plus';
import { Helmet } from 'react-helmet-async';
import { useNavigate, useSearchParams } from 'react-router-dom';

import { config } from '@/config';
import { paths } from '@/paths';
import { RouterLink } from '@/components/core/link';
import { InviteModal } from '@/components/dashboard/team/invite-modal';
import { MemberCard } from '@/components/dashboard/team/member-card';
import { MemberModal } from '@/components/dashboard/team/member-modal';
import { MembersFilter } from '@/components/dashboard/team/members-filter';
import { MembersPagination } from '@/components/dashboard/team/members-pagination';

const metadata = { title: `Members | Team | Dashboard | ${config.site.name}` };

const members = [
  {
    id: 'USR-001',
    name: 'Zaid Schwartz',
    username: 'zaid',
    avatar: '/assets/avatar-1.png',
    role: 'member',
    position: 'Web Designer',
    tags: ['Design', 'Marketing'],
    status: 'online',
  },
  {
    id: 'USR-008',
    name: 'Kimberly Maestra',
    username: 'kimberly',
    avatar: '/assets/avatar-8.png',
    role: 'admin',
    position: 'CEO',
    tags: ['All'],
    status: 'online',
  },
  {
    id: 'USR-003',
    name: 'Ammar Foley',
    username: 'ammar',
    avatar: '/assets/avatar-3.png',
    role: 'readOnly',
    position: 'Marketing Coordinator',
    tags: ['Design', 'Marketing'],
    status: 'busy',
  },
  {
    id: 'USR-004',
    name: 'Pippa Wilkinson',
    username: 'pippa',
    avatar: '/assets/avatar-4.png',
    role: 'member',
    position: 'Software Tester',
    tags: ['Development'],
    status: 'away',
    pending: true,
  },
];

export function Page() {
  const { memberId, invite } = useExtractSearchParams();

  const navigate = useNavigate();

  return (
    <React.Fragment>
      <Helmet>
        <title>{metadata.title}</title>
      </Helmet>
      <Stack spacing={3}>
        <Stack direction="row" spacing={3} sx={{ alignItems: 'center', flexWrap: 'wrap' }}>
          <MembersFilter />
          <Button
            component={RouterLink}
            href={paths.dashboard.team.members.invite}
            startDecorator={<PlusIcon fontSize="var(--Icon-fontSize)" weight="bold" />}
          >
            Add Member
          </Button>
        </Stack>
        <Grid container spacing={3}>
          {members.map((member) => (
            <Grid key={member.id} lg={4} md={6} xl={3} xs={12}>
              <MemberCard member={member} />
            </Grid>
          ))}
        </Grid>
        <MembersPagination count={members.length} page={1} rowsPerPage={5} />
      </Stack>
      <MemberModal
        member={{ name: 'Zaid Schwartz', username: 'zaid', avatar: '/assets/avatar-1.png', status: 'online' }}
        onClose={() => {
          navigate(paths.dashboard.team.members.list);
        }}
        open={Boolean(memberId)}
      />
      <InviteModal
        onClose={() => {
          navigate(paths.dashboard.team.members.list);
        }}
        open={Boolean(invite)}
      />
    </React.Fragment>
  );
}

function useExtractSearchParams() {
  const [searchParams] = useSearchParams();

  return { memberId: searchParams.get('memberId') || undefined, invite: searchParams.get('invite') === 'true' };
}
