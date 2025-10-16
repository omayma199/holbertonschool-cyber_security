'use client';

import * as React from 'react';
import Box from '@mui/joy/Box';
import Container from '@mui/joy/Container';
import Stack from '@mui/joy/Stack';
import Typography from '@mui/joy/Typography';
import { motion } from 'framer-motion';
import Ticker from 'framer-motion-ticker';

import { Image } from '@/components/core/image';

export function Customers() {
  return (
    <motion.section
      initial={{ opacity: 0, y: 100 }}
      transition={{ duration: 0.5, delay: 0.2, ease: 'easeInOut' }}
      viewport={{ once: true }}
      whileInView={{ opacity: 1, y: 0 }}
    >
      <Container sx={{ py: '100px' }}>
        <Stack spacing={6}>
          <Typography level="h1" textAlign="center">
            Trusted by big players
          </Typography>
          <Box sx={{ '& .FMT__container__contents': { '& > *': { gap: 6 } } }}>
            <Ticker>
              <Image alt="Samsung" height={16} src="/assets/logo-samsung--grey.svg" width={105} />
              <Image alt="Visma" height={18} src="/assets/logo-visma--grey.svg" width={90} />
              <Image alt="Bolt" height={21} src="/assets/logo-bolt--grey.svg" width={38} />
              <Image alt="AWS" height={28} src="/assets/logo-aws--grey.svg" width={40} />
              <Image alt="Accenture" height={24} src="/assets/logo-accenture--grey.svg" width={92} />
              <Image alt="Att" height={24} src="/assets/logo-att--grey.svg" width={58} />
            </Ticker>
          </Box>
          <Typography fontSize="xl" textAlign="center" textColor="text.secondary">
            Devias products are used by over 10,000+ companies across the globe
          </Typography>
        </Stack>
      </Container>
    </motion.section>
  );
}
