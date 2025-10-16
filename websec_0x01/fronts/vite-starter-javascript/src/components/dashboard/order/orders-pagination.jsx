'use client';

import * as React from 'react';
import Box from '@mui/joy/Box';
import { useNavigate } from 'react-router-dom';

import { paths } from '@/paths';
import { Pagination } from '@/components/core/pagination';

export function OrdersPagination({ count, page, rowsPerPage }) {
  const navigate = useNavigate();

  const handleChange = (_, newPage) => {
    // NOTE: You might want to persist the other search params, such as filters.

    const searchParams = new URLSearchParams();

    if (newPage) {
      searchParams.set('page', newPage.toString());
    }

    navigate(`${paths.dashboard.orders.list}?${searchParams.toString()}`);
  };

  const pages = Math.ceil(count / rowsPerPage);

  return (
    <Box sx={{ display: 'flex', justifyContent: 'center' }}>
      <Pagination
        count={pages}
        disabled={pages <= 1}
        onChange={handleChange}
        page={page}
        showFirstButton
        showLastButton
        size="sm"
        variant="outlined"
      />
    </Box>
  );
}
