'use client';

import * as React from 'react';
import Box from '@mui/joy/Box';
import Container from '@mui/joy/Container';
import Grid from '@mui/joy/Grid';
import Stack from '@mui/joy/Stack';
import Typography from '@mui/joy/Typography';
import { motion } from 'framer-motion';

import { config } from '@/config';
import { Image } from '@/components/core/image';

export function GetStarted() {
  return (
    <motion.section
      initial={{ opacity: 0 }}
      transition={{ duration: 0.5, delay: 0.2, ease: 'easeInOut' }}
      viewport={{ once: true }}
      whileInView={{ opacity: 1 }}
    >
      <Container sx={{ py: '200px' }}>
        <Grid alignItems="center" container spacing={3}>
          <Grid md={6} xs={12}>
            <Stack spacing={3} sx={{ maxWidth: '400px' }}>
              <Typography color="primary" level="body-sm">
                Get Started
              </Typography>
              <Typography level="h1">Start your {config.site.name} journey today.</Typography>
              <Typography fontSize="xl" textColor="text.secondary">
                Unlock the power of development analytics and gain actionable insights to make informed business
                decisions.
              </Typography>
            </Stack>
          </Grid>
          <Grid md={6} xs={12}>
            <Box sx={{ position: 'relative', mt: { md: 0, xs: '120px' } }}>
              <motion.div
                initial={{ opacity: 0, scale: 0 }}
                transition={{ duration: 0.4, delay: 0.6, ease: 'easeInOut' }}
                viewport={{ once: true }}
                whileInView={{ opacity: 1, scale: 1 }}
              >
                <Box
                  sx={{
                    bgcolor: 'var(--joy-palette-background-level1)',
                    borderRadius: '50%',
                    height: { xs: '300px', sm: '385px' },
                    overflow: 'hidden',
                    position: 'relative',
                    mx: 'auto',
                    width: { xs: '300px', sm: '385px' },
                    '&:after': {
                      background: 'linear-gradient(to top, var(--joy-palette-background-level1) 10%, transparent 100%)',
                      bottom: 0,
                      content: '" "',
                      height: '200px',
                      left: 0,
                      position: 'absolute',
                      width: '100%',
                      zIndex: 2,
                    },
                  }}
                >
                  <Image
                    alt="pattern"
                    height={200}
                    src="/assets/home-grid-pattern.png"
                    style={{
                      bottom: 0,
                      left: '50%',
                      position: 'absolute',
                      transform: 'translateX(-50%)',
                      userSelect: 'none',
                      zIndex: 1,
                    }}
                    width={600}
                  />
                </Box>
              </motion.div>
              <motion.div
                initial={{ opacity: 0 }}
                transition={{ duration: 0.2, ease: 'easeInOut' }}
                viewport={{ once: true }}
                whileInView={{ opacity: 1 }}
              >
                <Box
                  sx={{
                    bgcolor: 'var(--joy-palette-background-surface)',
                    borderRadius: 'var(--joy-radius-md)',
                    boxShadow: 'var(--joy-shadow-md)',
                    left: '16px',
                    p: '8px',
                    position: 'absolute',
                    top: { xs: '-120px', sm: '-80px' },
                    zIndex: 2,
                  }}
                >
                  <Box
                    sx={{
                      border: '1px solid var(--joy-palette-neutral-outlinedBorder)',
                      borderRadius: 'var(--joy-radius-md)',
                      overflow: 'hidden',
                    }}
                  >
                    <Image alt="demo" height={183} src="/assets/home-floating-image-1.png" width={263} />
                  </Box>
                </Box>
              </motion.div>
              <motion.div
                initial={{ opacity: 0 }}
                transition={{ duration: 0.4, delay: 0.2, ease: 'easeInOut' }}
                viewport={{ once: true }}
                whileInView={{ opacity: 1 }}
              >
                <Box
                  sx={{
                    bgcolor: 'var(--joy-palette-background-surface)',
                    borderRadius: 'var(--joy-radius-md)',
                    bottom: { xs: '-120px', sm: '-80px' },
                    boxShadow: 'var(--joy-shadow-md)',
                    p: '8px',
                    position: 'absolute',
                    right: '16px',
                    zIndex: 3,
                  }}
                >
                  <Box
                    sx={{
                      border: '1px solid var(--joy-palette-neutral-outlinedBorder)',
                      borderRadius: 'var(--joy-radius-md)',
                      overflow: 'hidden',
                    }}
                  >
                    <Image alt="demo" height={232} src="/assets/home-floating-image-2.png" width={180} />
                  </Box>
                </Box>
              </motion.div>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </motion.section>
  );
}
