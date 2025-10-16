'use client';

import * as React from 'react';
import Box from '@mui/joy/Box';
import Drawer from '@mui/joy/Drawer';
import IconButton from '@mui/joy/IconButton';
import Stack from '@mui/joy/Stack';
import Typography from '@mui/joy/Typography';
import { X as XIcon } from '@phosphor-icons/react/dist/ssr/X';

import { paths } from '@/paths';
import { isNavItemActive } from '@/lib/is-nav-item-active';
import { useMediaQuery } from '@/hooks/use-media-query';
import { usePathname } from '@/hooks/use-pathname';
import { RouterLink } from '@/components/core/link';
import { Logo } from '@/components/core/logo';

export function MobileNav({ onClose, open }) {
  const canOpen = useMediaQuery('between', 'xs', 'lg');
  const pathname = usePathname();

  return (
    <Drawer
      anchor="right"
      onClose={onClose}
      open={canOpen ? open : false}
      sx={{
        zIndex: 'var(--MobileNav-zIndex)',
        '& > .MuiDrawer-content': {
          '--Drawer-horizontalSize': 'var(--MobileNav-width)',
          bgcolor: 'var(--joy-palette-neutral-950)',
          boxShadow: 'var(--joy-shadow-md)',
          color: 'var(--joy-palette-common-white)',
          p: 0,
        },
      }}
    >
      <Stack direction="row" spacing={3} sx={{ alignItems: 'center', justifyContent: 'space-between', p: '16px' }}>
        <Box component={RouterLink} href={paths.home} sx={{ display: 'inline-block', fontSize: 0 }}>
          <Logo color="light" height={16} width={77} />
        </Box>
        <IconButton
          onClick={onClose}
          sx={{
            bgcolor: 'transparent',
            color: 'inherit',
            '&:hover': { bgcolor: 'var(--joy-palette-neutral-800)', color: 'var(--joy-palette-common-white)' },
          }}
          variant="plain"
        >
          <XIcon fontSize="var(--Icon-fontSize)" weight="bold" />
        </IconButton>
      </Stack>
      <Stack spacing={2} sx={{ p: '16px' }}>
        <NavItem href={paths.home} pathname={pathname} title="Home" />
        <NavItem external href={paths.docs} pathname={pathname} title="Documentation" />
        <NavItem href={paths.dashboard.overview} pathname={pathname} title="Dashboard" />
      </Stack>
    </Drawer>
  );
}

function NavItem({ disabled, external, href, pathname, title }) {
  const active = isNavItemActive({ disabled, external, href, pathname });

  return (
    <Typography
      {...(href && { component: RouterLink, href })}
      sx={{
        alignItems: 'center',
        color: 'var(--joy-palette-common-white)',
        fontSize: 'md',
        fontWeight: 'md',
        display: 'flex',
        px: '8px',
        textDecoration: 'none',
        ...(active && { color: 'var(--joy-palette-neutral-500)' }),
        '&:hover': { ...(!active && { color: 'var(--joy-palette-neutral-500)' }) },
      }}
    >
      <span>{title}</span>
    </Typography>
  );
}
