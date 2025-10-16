'use client';

import * as React from 'react';
import Box from '@mui/joy/Box';
import Button from '@mui/joy/Button';
import IconButton from '@mui/joy/IconButton';
import Stack from '@mui/joy/Stack';
import Typography from '@mui/joy/Typography';
import { List as ListIcon } from '@phosphor-icons/react/dist/ssr/List';

import { paths } from '@/paths';
import { isNavItemActive } from '@/lib/is-nav-item-active';
import { usePathname } from '@/hooks/use-pathname';
import { RouterLink } from '@/components/core/link';
import { Logo } from '@/components/core/logo';
import { NoSsr } from '@/components/core/no-ssr';

import { ColorSchemeSwitch } from './color-scheme-switch';
import { MobileNav } from './mobile-nav';

export function MainNav() {
  const [openNav, setOpenNav] = React.useState(false);
  const pathname = usePathname();

  return (
    <React.Fragment>
      <Box
        component="header"
        sx={{ left: 0, p: '20px', position: 'fixed', top: 0, width: '100%', zIndex: 'var(--MainNav-zIndex)' }}
      >
        <Box
          sx={{
            bgcolor: 'var(--joy-palette-neutral-950)',
            borderRadius: 'var(--joy-radius-xl)',
            boxShadow: 'var(--joy-shadow-sm)',
            display: 'grid',
            gridTemplateColumns: { xs: '1fr 1fr', md: '240px 1fr 240px' },
            maxWidth: 'lg',
            minHeight: '56px',
            mx: 'auto',
            outline: '4px solid rgba(255, 255, 255, 0.12)',
            px: '16px',
            py: '8px',
          }}
        >
          <Stack direction="row" spacing={2} sx={{ alignItems: 'center' }}>
            <Box component={RouterLink} href={paths.home} sx={{ display: 'inline-block', fontSize: 0 }}>
              <Logo color="light" height={24} width={82} />
            </Box>
          </Stack>
          <Stack
            direction="row"
            spacing={2}
            sx={{ display: { xs: 'none', md: 'flex' }, flex: '1 1 auto', justifyContent: 'center' }}
          >
            <NavItem href={paths.home} pathname={pathname} title="Home" />
            <NavItem external href={paths.docs} pathname={pathname} title="Documentation" />
            <NavItem href={paths.dashboard.overview} pathname={pathname} title="Dashboard" />
          </Stack>
          <Stack direction="row" spacing={2} sx={{ alignItems: 'center', justifyContent: 'flex-end' }}>
            <NoSsr>
              <ColorSchemeSwitch />
            </NoSsr>
            <IconButton
              onClick={() => {
                setOpenNav(true);
              }}
              sx={{
                color: 'var(--joy-palette-common-white)',
                display: { md: 'none' },
                '&:hover': { bgcolor: 'var(--joy-palette-neutral-800)', color: 'var(--joy-palette-common-white)' },
              }}
            >
              <ListIcon fontSize="var(--Icon-fontSize)" weight="bold" />
            </IconButton>
            <Button
              component="a"
              href={paths.purchase}
              sx={{
                bgcolor: 'var(--joy-palette-common-white)',
                color: 'var(--joy-palette-neutral-900)',
                display: { xs: 'none', md: 'flex' },
                '&:hover': { bgcolor: 'var(--joy-palette-neutral-50)' },
              }}
              target="_blank"
            >
              Purchase
            </Button>
          </Stack>
        </Box>
      </Box>
      <MobileNav
        onClose={() => {
          setOpenNav(false);
        }}
        open={openNav}
      />
    </React.Fragment>
  );
}

function NavItem({ disabled, external, href, pathname, title }) {
  const active = isNavItemActive({ disabled, external, href, pathname });

  return (
    <Typography
      {...(href && { component: RouterLink, href, ...(external && { target: '_blank', rel: 'noreferrer' }) })}
      sx={{
        alignItems: 'center',
        color: 'var(--joy-palette-common-white)',
        fontSize: 'sm',
        fontWeight: 'md',
        display: 'inline-flex',
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
