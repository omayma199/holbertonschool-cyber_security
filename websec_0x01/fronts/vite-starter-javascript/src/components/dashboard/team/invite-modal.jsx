'use client';

import * as React from 'react';
import FormControl from '@mui/joy/FormControl';
import FormLabel from '@mui/joy/FormLabel';
import IconButton from '@mui/joy/IconButton';
import Input from '@mui/joy/Input';
import Link from '@mui/joy/Link';
import Modal from '@mui/joy/Modal';
import ModalClose from '@mui/joy/ModalClose';
import ModalDialog from '@mui/joy/ModalDialog';
import Option from '@mui/joy/Option';
import Select from '@mui/joy/Select';
import Stack from '@mui/joy/Stack';
import Switch from '@mui/joy/Switch';
import Typography from '@mui/joy/Typography';
import { CaretLeft as CaretLeftIcon } from '@phosphor-icons/react/dist/ssr/CaretLeft';
import { GearSix as GearSixIcon } from '@phosphor-icons/react/dist/ssr/GearSix';
import { Link as LinkIcon } from '@phosphor-icons/react/dist/ssr/Link';
import { PaperPlaneTilt as PaperPlaneTiltIcon } from '@phosphor-icons/react/dist/ssr/PaperPlaneTilt';

export function InviteModal({ onClose, open }) {
  const [showSettings, setShowSettings] = React.useState(false);

  const inviteUrl = 'https://lotru.devias.io/members/invite/1';

  return (
    <Modal onClose={onClose} open={open} sx={{}}>
      <ModalDialog sx={{ '--ModalDialog-maxWidth': '550px', pt: 8, width: '100%' }} variant="plain">
        {showSettings ? (
          <Stack spacing={8}>
            <Stack spacing={1}>
              <div>
                <IconButton
                  color="neutral"
                  onClick={() => {
                    setShowSettings(false);
                  }}
                  variant="soft"
                >
                  <CaretLeftIcon fontSize="var(--Icon-fontSize)" weight="bold" />
                </IconButton>
              </div>
              <Stack spacing={2}>
                <Typography level="h4">Link Settings</Typography>
                <Typography
                  endDecorator={<Switch defaultChecked />}
                  level="body-sm"
                  sx={{ justifyContent: 'space-between' }}
                  textColor="text.primary"
                >
                  Enable Link
                </Typography>
                <Typography
                  endDecorator={<Switch defaultChecked />}
                  level="body-sm"
                  sx={{ justifyContent: 'space-between' }}
                  textColor="text.primary"
                >
                  Expiration Date
                </Typography>
                <Typography
                  endDecorator={<Input defaultValue="2024-03-24" name="expirationDate" type="date" />}
                  level="body-sm"
                  sx={{ justifyContent: 'space-between' }}
                  textColor="text.primary"
                >
                  Select Expiration Date
                </Typography>
                <FormControl>
                  <FormLabel>Role</FormLabel>
                  <Select defaultValue="member" name="role">
                    <Option value="admin">Admin</Option>
                    <Option value="member">Member</Option>
                    <Option value="readOnly">Read Only</Option>
                  </Select>
                </FormControl>
              </Stack>
            </Stack>
            <FormControl>
              <FormLabel>Link To Share</FormLabel>
              <Stack direction="row" spacing={1} sx={{ alignItems: 'center' }}>
                <Input name="inviteUrl" readOnly sx={{ flex: '1 1 auto' }} value={inviteUrl} />
                <IconButton color="neutral" variant="outlined">
                  <LinkIcon fontSize="var(--Icon-fontSize)" weight="bold" />
                </IconButton>
              </Stack>
            </FormControl>
          </Stack>
        ) : (
          <React.Fragment>
            <ModalClose />
            <Stack spacing={8}>
              <Stack spacing={3}>
                <Typography level="h4">Invite Team Member</Typography>
                <Stack spacing={1}>
                  <FormControl>
                    <FormLabel>Email Address</FormLabel>
                    <Stack direction="row" spacing={1} sx={{ alignItems: 'center' }}>
                      <Input name="email" sx={{ flex: '1 1 auto' }} type="email" />
                      <IconButton color="primary" variant="solid">
                        <PaperPlaneTiltIcon fontSize="var(--Icon-fontSize)" weight="bold" />
                      </IconButton>
                    </Stack>
                  </FormControl>
                  <div>
                    <Link component="span" level="title-sm">
                      Or import list from a CSV file
                    </Link>
                  </div>
                  <FormControl>
                    <FormLabel>Role</FormLabel>
                    <Select defaultValue="member" name="role">
                      <Option value="admin">Admin</Option>
                      <Option value="member">Member</Option>
                      <Option value="readOnly">Read Only</Option>
                    </Select>
                  </FormControl>
                </Stack>
              </Stack>
              <FormControl>
                <FormLabel>Link To Share</FormLabel>
                <Stack direction="row" spacing={1} sx={{ alignItems: 'center' }}>
                  <Input name="inviteUrl" readOnly sx={{ flex: '1 1 auto' }} value={inviteUrl} />
                  <IconButton color="neutral" variant="outlined">
                    <LinkIcon fontSize="var(--Icon-fontSize)" weight="bold" />
                  </IconButton>
                  <IconButton
                    color="neutral"
                    onClick={() => {
                      setShowSettings(true);
                    }}
                    variant="outlined"
                  >
                    <GearSixIcon fontSize="var(--Icon-fontSize)" weight="bold" />
                  </IconButton>
                </Stack>
              </FormControl>
            </Stack>
          </React.Fragment>
        )}
      </ModalDialog>
    </Modal>
  );
}
