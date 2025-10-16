import * as React from 'react';
import Box from '@mui/joy/Box';
import GlobalStyles from '@mui/joy/GlobalStyles';
import Stack from '@mui/joy/Stack';
import Typography from '@mui/joy/Typography';

import { config } from '@/config';
import { Image } from '@/components/core/image';

export function SplitLayout({ children }) {
  return (
    <React.Fragment>
      <GlobalStyles
        styles={{
          body: {
            // When RTL is used, for some reason, Global styles are applied before default styles.
            // The !important is needed to override this behavior.
            background: 'var(--joy-palette-neutral-950) !important',
          },
        }}
      />
      <Box
        component="main"
        sx={{
          display: { xs: 'flex', md: 'grid' },
          flexDirection: 'column',
          gap: 3,
          gridTemplateColumns: { md: 'repeat(2, 1fr)' },
          minHeight: '100%',
          p: { xs: 2, md: 3 },
        }}
      >
        <Box
          sx={{
            bgcolor: 'var(--joy-palette-background-body)',
            borderRadius: 'var(--joy-radius-xl)',
            color: 'var(--joy-palette-text-primary)',
            display: 'flex',
            flex: '1 1 auto',
            flexDirection: 'column',
            height: '100%',
          }}
        >
          <Box
            sx={{
              alignItems: 'center',
              display: 'flex',
              flex: '1 1 auto',
              flexDirection: 'column',
              justifyContent: 'center',
              p: 3,
            }}
          >
            <Box sx={{ maxWidth: '420px', width: '100%' }}>{children}</Box>
          </Box>
        </Box>
        <Box
          sx={{
            alignItems: 'center',
            color: 'var(--joy-palette-common-white)',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            order: { xs: -1, md: 2 },
            p: 3,
            position: 'relative',
          }}
        >
          <Stack spacing={{ xs: '48px', sm: '64px', lg: '96px' }} sx={{ maxWidth: 'sm', mx: 'auto' }}>
            <Stack spacing={3}>
              <Typography fontSize="38px" fontWeight="xl" lineHeight="48px" textAlign="center" textColor="inherit">
                Save Time and Simply Build Better with {config.site.name}
              </Typography>
              <Typography textAlign="center" textColor="neutral.400">
                Experience A Game-Changing Transformation With Our Powerful Template Designed To Revolutionize Your SaaS
                Application.
              </Typography>
            </Stack>
            <Box sx={{ display: { xs: 'none', md: 'block' }, width: '70%', mx: 'auto', position: 'relative' }}>
              <Box
                sx={{
                  borderRadius: 'var(--joy-radius-lg)',
                  height: 0,
                  overflow: 'hidden',
                  position: 'relative',
                  pt: 'calc(500 / 400 * 100%)',
                }}
              >
                <Image
                  alt="photo"
                  fill
                  priority
                  quality={100}
                  sizes="400px"
                  src="/assets/auth-photo.png"
                  style={{ objectFit: 'cover' }}
                />
              </Box>
              <Box
                sx={{
                  borderRadius: 'var(--joy-radius-sm)',
                  boxShadow: 'var(--joy-shadow-lg)',
                  left: '-100px',
                  overflow: 'hidden',
                  position: 'absolute',
                  top: '-60px',
                  fontSize: 0,
                  zIndex: 1,
                }}
              >
                <Image alt="floating" height={122} quality={100} src="/assets/auth-floating-image-1.png" width={246} />
              </Box>
              <Box
                sx={{
                  borderRadius: 'var(--joy-radius-sm)',
                  top: '200px',
                  boxShadow: 'var(--joy-shadow-lg)',
                  fontSize: 0,
                  overflow: 'hidden',
                  position: 'absolute',
                  left: '-100px',
                  zIndex: 2,
                }}
              >
                <Image alt="floating" height={82} quality={100} src="/assets/auth-floating-image-2.png" width={256} />
              </Box>
              <Box
                sx={{
                  borderRadius: 'var(--joy-radius-sm)',
                  bottom: '-20px',
                  boxShadow: 'var(--joy-shadow-lg)',
                  fontSize: 0,
                  overflow: 'hidden',
                  position: 'absolute',
                  right: '-100px',
                  zIndex: 3,
                }}
              >
                <Image alt="floating" height={190} quality={100} src="/assets/auth-floating-image-3.png" width={240} />
              </Box>
            </Box>
          </Stack>
        </Box>
      </Box>
    </React.Fragment>
  );
}
