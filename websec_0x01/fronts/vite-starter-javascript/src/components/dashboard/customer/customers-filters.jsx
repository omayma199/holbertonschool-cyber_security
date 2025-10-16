import * as React from 'react';
import FormControl from '@mui/joy/FormControl';
import FormLabel from '@mui/joy/FormLabel';
import Input from '@mui/joy/Input';
import Option from '@mui/joy/Option';
import Select from '@mui/joy/Select';
import Stack from '@mui/joy/Stack';

export function CustomersFilters() {
  return (
    <Stack direction={{ xs: 'column', md: 'row' }} spacing={3} sx={{ alignItems: 'flex-start', flexWrap: 'wrap' }}>
      <FormControl sx={{ maxWidth: '240px', mr: 'auto', width: '100%' }}>
        <FormLabel>Customer ID</FormLabel>
        <Input defaultValue="" name="id" />
      </FormControl>
      <FormControl sx={{ maxWidth: '240px', width: '100%' }}>
        <FormLabel>Status</FormLabel>
        <Select defaultValue="all" name="status">
          <Option value="all">All</Option>
          <Option value="active">Active</Option>
          <Option value="canceled">Canceled</Option>
          <Option value="completed">Completed</Option>
        </Select>
      </FormControl>
    </Stack>
  );
}
