'use client';

import * as React from 'react';
import Input from '@mui/joy/Input';
import Option from '@mui/joy/Option';
import Select from '@mui/joy/Select';
import Stack from '@mui/joy/Stack';
import { MagnifyingGlass as MagnifyingGlassIcon } from '@phosphor-icons/react/dist/ssr/MagnifyingGlass';

export function MembersFilter() {
  // Handle the input change action.
  return (
    <Stack direction="row" spacing={3} sx={{ alignItems: 'center', flex: '1 1 auto', flexWrap: 'wrap' }}>
      <Input
        defaultValue=""
        name="member"
        placeholder="Search"
        startDecorator={<MagnifyingGlassIcon fontSize="var(--Icon-fontSize)" weight="bold" />}
        sx={{ maxWidth: '320px', width: '100%' }}
      />
      <Select defaultValue="all" name="role" sx={{ maxWidth: '130px', width: '100%' }}>
        <Option value="all">All</Option>
        <Option value="admin">Admin</Option>
        <Option value="member">Member</Option>
        <Option value="readOnly">Read Only</Option>
      </Select>
    </Stack>
  );
}
