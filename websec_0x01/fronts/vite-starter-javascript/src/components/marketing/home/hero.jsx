'use client';

import * as React from 'react';
import Box from '@mui/joy/Box';
import Button from '@mui/joy/Button';
import Container from '@mui/joy/Container';
import Stack from '@mui/joy/Stack';
import Typography from '@mui/joy/Typography';
import { motion } from 'framer-motion';

import { config } from '@/config';
import { paths } from '@/paths';
import { Image } from '@/components/core/image';
import { RouterLink } from '@/components/core/link';

export function Hero() {
  return (
    // NOTE: Transform style property is required to fix
    // Safari issue with perspective property messing the zIndex of other elements.
    <Box component="section" sx={{ position: 'relative', transformStyle: 'preserve-3d' }}>
      <Box
        sx={{
          bgcolor: 'var(--joy-palette-neutral-950)',
          color: 'var(--joy-palette-common-white)',
          overflow: 'hidden',
          pb: { xs: '180px', sm: '240px', md: '440px' },
          position: 'relative',
          pt: { xs: '180px', md: '240px' },
          zIndex: 1,
        }}
      >
        <Box
          sx={{
            height: '600px',
            left: '50%',
            opacity: 0.5,
            pointerEvents: 'none',
            position: 'absolute',
            top: '-140px',
            transform: 'translate(-50%, 0)',
            width: '1600px',
            zIndex: 1,
          }}
        >
          <Image alt="pattern" fill priority sizes="1600px" src="/assets/home-hero-pattern.png" />
        </Box>
        <Container maxWidth="md" sx={{ position: 'relative', zIndex: 3 }}>
          <motion.div
            animate={{ opacity: 1, scale: 1, y: 0 }}
            initial={{ opacity: 0, scale: 0.9, y: '-40px' }}
            transition={{ duration: 0.5, ease: 'easeInOut' }}
          >
            <Stack spacing={3}>
              <Typography
                fontSize={{ xs: '32px', sm: '46px', md: '56px' }}
                fontWeight="xl"
                textAlign="center"
                textColor="inherit"
              >
                {config.site.name} Dashboard: Redefining SaaS Product Management
              </Typography>
              <Typography
                fontSize={{ xs: 'md', sm: 'lg', md: 'xl' }}
                fontWeight="sm"
                textAlign="center"
                textColor="neutral.400"
              >
                Premium template that comes with ready-to-use Joy UI components, developed to help you build apps faster
                and with a beautiful design.
              </Typography>
              <Stack direction="row" spacing={3} sx={{ justifyContent: 'center' }}>
                <Button
                  color="neutral"
                  component="a"
                  href={paths.purchase}
                  sx={{
                    bgcolor: 'var(--joy-palette-common-white)',
                    color: 'var(--joy-palette-neutral-900)',
                    '&:hover': { bgcolor: 'var(--joy-palette-neutral-50)' },
                  }}
                  target="_blank"
                >
                  Purchase
                </Button>
                <Button component={RouterLink} href={paths.dashboard.overview}>
                  Live Demo
                </Button>
              </Stack>
            </Stack>
          </motion.div>
        </Container>
      </Box>
      <Box
        sx={{
          position: 'relative',
          mt: { xs: '-100px', sm: '-200px', md: '-300px', lg: '-324px' },
          px: { xs: 2, lg: 3 },
          zIndex: 1,
        }}
      >
        <motion.div
          initial={{ transformPerspective: '250rem', rotateX: -40, scale: 0.9 }}
          style={{ maxWidth: '1200px', margin: '0 auto' }}
          transformTemplate={({ transformPerspective, rotateX, scale }) => {
            return `perspective(${transformPerspective}) rotateX(${rotateX}) scale(${scale})`;
          }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true, amount: 0.8 }}
          whileInView={{ transformPerspective: '100rem', rotateX: 0, scale: 1 }}
        >
          <Box
            sx={{
              borderRadius: 'var(--joy-radius-lg)',
              boxShadow: 'var(--joy-shadow-md)',
              height: 0,
              outline: '4px solid rgba(255, 255, 255, 0.12)',
              overflow: 'hidden',
              position: 'relative',
              pt: 'calc(598 / 1200 * 100%)',
            }}
          >
            <Image
              alt="screen"
              fill
              priority
              sizes="1200px"
              src="/assets/home-hero-screen.png"
              style={{ objectFit: 'cover' }}
            />
          </Box>
        </motion.div>
      </Box>
    </Box>
  );
}
