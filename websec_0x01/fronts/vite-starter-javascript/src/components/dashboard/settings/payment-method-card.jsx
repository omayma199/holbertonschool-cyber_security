import * as React from 'react';
import Box from '@mui/joy/Box';
import Card from '@mui/joy/Card';
import Chip from '@mui/joy/Chip';
import IconButton from '@mui/joy/IconButton';
import Stack from '@mui/joy/Stack';
import Typography from '@mui/joy/Typography';
import { Pen as PenIcon } from '@phosphor-icons/react/dist/ssr/Pen';

import { Image } from '@/components/core/image';

export function PaymentMethodCard({ paymentMethod }) {
  return (
    <Card sx={{ height: '100%' }}>
      <Stack direction="row" sx={{ alignItems: 'flex-start' }}>
        <Box
          sx={{
            border: '1px solid var(--joy-palette-neutral-outlinedBorder)',
            borderRadius: 'var(--joy-radius-sm)',
            mr: 2,
            p: '4px',
          }}
        >
          <Image alt="Visa" height={16} src="/assets/logo-visa.svg" width={49.44} />
        </Box>
        <Box sx={{ flex: '1 1 auto' }}>
          <Typography whiteSpace="nowrap">{paymentMethod.cardNumber}</Typography>
          <Typography level="body-xs">Expiry {paymentMethod.expiry}</Typography>
          <Stack direction="row" sx={{ alignItems: 'center', justifyContent: 'space-between', mt: 1 }}>
            {paymentMethod.primary ? (
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
        </Box>
      </Stack>
    </Card>
  );
}
