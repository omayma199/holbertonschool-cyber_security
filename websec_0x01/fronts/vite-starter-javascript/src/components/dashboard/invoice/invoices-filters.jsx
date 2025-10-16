'use client';

import * as React from 'react';
import Checkbox from '@mui/joy/Checkbox';
import FormControl from '@mui/joy/FormControl';
import FormLabel from '@mui/joy/FormLabel';
import Input from '@mui/joy/Input';
import Radio from '@mui/joy/Radio';
import RadioGroup from '@mui/joy/RadioGroup';
import Stack from '@mui/joy/Stack';
import { MagnifyingGlass as MagnifyingGlassIcon } from '@phosphor-icons/react/dist/ssr/MagnifyingGlass';

export function InvoicesFilters() {
  return (
    <Stack spacing={3}>
      <FormControl>
        <FormLabel>Search</FormLabel>
        <Input
          name="invoiceId"
          placeholder="Invoice ID"
          startDecorator={<MagnifyingGlassIcon fontSize="var(--Icon-fontSize)" weight="bold" />}
        />
      </FormControl>
      <Stack spacing={1}>
        <FormControl>
          <FormLabel>Date Range</FormLabel>
          <RadioGroup defaultValue="custom" name="range">
            <Radio label="Last Week" value="lastWeek" />
            <Radio label="Last Month" value="lastMonth" />
            <Radio label="Last Year" value="lastYear" />
            <Radio label="Custom" value="custom" />
          </RadioGroup>
        </FormControl>
        <FormControl>
          <FormLabel>From</FormLabel>
          <Input defaultValue="2024-03-24" name="rangeFrom" type="date" />
        </FormControl>
        <FormControl>
          <FormLabel>To</FormLabel>
          <Input defaultValue="2024-09-24" name="rangeTo" type="date" />
        </FormControl>
      </Stack>
      <Stack spacing={1}>
        <FormControl>
          <FormLabel>Customer</FormLabel>
          <Input
            name="customer"
            startDecorator={<MagnifyingGlassIcon fontSize="var(--Icon-fontSize)" weight="bold" />}
          />
        </FormControl>
        <Stack spacing={1}>
          <Checkbox label="Sienna Hewitt" />
          <Checkbox label="Iva Ryan" />
        </Stack>
      </Stack>
    </Stack>
  );
}
