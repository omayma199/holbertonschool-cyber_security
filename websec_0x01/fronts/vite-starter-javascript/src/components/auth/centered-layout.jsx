import * as React from 'react';
import Box from '@mui/joy/Box';
import GlobalStyles from '@mui/joy/GlobalStyles';

export function CenteredLayout({ children }) {
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
        sx={{
          alignItems: 'center',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
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
            flexDirection: 'column',
            maxWidth: '500px',
            width: '100%',
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
      </Box>
    </React.Fragment>
  );
}
