import * as React from 'react';
import Card from '@mui/joy/Card';
import Chip from '@mui/joy/Chip';
import IconButton from '@mui/joy/IconButton';
import Stack from '@mui/joy/Stack';
import Typography from '@mui/joy/Typography';
import { Pen as PenIcon } from '@phosphor-icons/react/dist/ssr/Pen';

export function ShippingAddressCard({ address }) {
  return (
    <Card key={address.id} sx={{ maxWidth: '320px', minWidth: '200px' }}>
      <Typography>
        {address.street},
        <br /> {address.city}, {address.state}, {address.country},
        <br /> {address.zipCode}
      </Typography>
      <Stack direction="row" sx={{ justifyContent: 'space-between' }}>
        {address.primary ? (
          <Chip color="warning" variant="soft">
            Primary
          </Chip>
        ) : (
          <span />
        )}
        <IconButton color="neutral" size="sm" variant="plain">
          <PenIcon fontSize="var(--Icon-fontSize)" weight="bold" />
        </IconButton>
      </Stack>
    </Card>
  );
}
