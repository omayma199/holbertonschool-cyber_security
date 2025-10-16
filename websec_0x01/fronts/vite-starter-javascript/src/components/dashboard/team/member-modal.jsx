'use client';

import * as React from 'react';
import Avatar from '@mui/joy/Avatar';
import Badge from '@mui/joy/Badge';
import Grid from '@mui/joy/Grid';
import Modal from '@mui/joy/Modal';
import ModalClose from '@mui/joy/ModalClose';
import ModalDialog from '@mui/joy/ModalDialog';
import Stack from '@mui/joy/Stack';
import Typography from '@mui/joy/Typography';

const statusMapping = { online: 'success', offline: 'neutral', away: 'warning', busy: 'danger' };

export function MemberModal({ member, onClose, open }) {
  const { avatar, name, status, username } = member;

  return (
    <Modal onClose={onClose} open={open}>
      <ModalDialog sx={{ '--ModalDialog-maxWidth': '800px', pt: 8, width: '100%' }} variant="plain">
        <ModalClose />
        <Stack spacing={3} sx={{ overflowY: 'auto' }}>
          <div>
            <Badge
              anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
              color={statusMapping[status]}
              sx={{ '& .MuiBadge-badge': { right: 16, bottom: 16 } }}
            >
              <Avatar src={avatar} sx={{ '--Avatar-size': '112px' }} />
            </Badge>
            <Typography level="h4" sx={{ mt: 2 }}>
              {name}
            </Typography>
            <Typography textColor="text.tertiary">@{username}</Typography>
          </div>
          <Stack spacing={2}>
            <Typography level="title-md">General Information</Typography>
            <Grid container disableEqualOverflow spacing={2}>
              {[
                {
                  label: 'About',
                  value:
                    'Ut eu sem integer vitae justo eget magna fermentum iaculis. Ultrices in iaculis nunc sed augue lacus. Aliquet eget sit amet tellus cras. Sed turpis tincidunt id aliquet risus feugiat. Vitae tempus quam',
                },
                { label: 'Position', value: 'Web Designer' },
                { label: 'Role', value: 'Member' },
                { label: 'Tag', value: 'Design' },
                { label: 'Joining Date', value: '1 August 2020' },
                { label: 'Shift', value: '10am-6pm' },
                { label: 'Employment Type', value: 'Remote' },
              ].map((item, index) => (
                <Grid key={item.label} lg={index === 0 ? 12 : 4} md={index === 0 ? 12 : 6} xs={12}>
                  <Typography level="body-xs" textTransform="uppercase">
                    {item.label}
                  </Typography>
                  <Typography level="body-sm" textColor="text.primary">
                    {item.value}
                  </Typography>
                </Grid>
              ))}
            </Grid>
          </Stack>
          <Stack spacing={2}>
            <Typography level="title-md">Contact Information</Typography>
            <Grid container disableEqualOverflow spacing={2}>
              {[
                { label: 'Email', value: 'zaid.schwartz@domain.com' },
                { label: 'Phone Number', value: '(801) 301-7140' },
              ].map((item) => (
                <Grid key={item.label} lg={4} md={6} xs={12}>
                  <Typography level="body-xs" textTransform="uppercase">
                    {item.label}
                  </Typography>
                  <Typography level="body-sm" textColor="text.primary">
                    {item.value}
                  </Typography>
                </Grid>
              ))}
            </Grid>
          </Stack>
          <Stack spacing={2}>
            <Typography level="title-md">Work Experience</Typography>
            {[
              { id: 'JOB-004', position: 'Leading Web Designer', company: 'AWS', period: 'Jun 2022 - Present' },
              { id: 'JOB-003', position: 'Leading Web Designer', company: 'Meta', period: 'Sep 2021 - Jun 2022' },
              { id: 'JOB-002', position: 'Senior Web Designer', company: 'Stripe', period: 'Jun 2020 - Sep 2021' },
              { id: 'JOB-001', position: 'Web Designer', company: 'PayPal', period: 'May 2018 - Jun 2020' },
            ].map((record, index) => (
              <Stack direction="row" key={record.id} spacing={2} sx={{ alignItems: 'center' }}>
                <Avatar
                  sx={{
                    '--Avatar-size': '48px',
                    background: `var(--joy-palette-gradient-${(index % 4) + 1})`,
                    svg: { display: 'none' },
                  }}
                />
                <div>
                  <Typography level="body-sm" textColor="text.primary">
                    {record.position}
                  </Typography>
                  <Typography level="body-xs">
                    {record.company} {record.period}
                  </Typography>
                </div>
              </Stack>
            ))}
          </Stack>
        </Stack>
      </ModalDialog>
    </Modal>
  );
}
