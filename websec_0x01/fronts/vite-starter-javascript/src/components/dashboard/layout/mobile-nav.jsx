'use client';

import * as React from 'react';
import Box from '@mui/joy/Box';
import Drawer from '@mui/joy/Drawer';
import IconButton from '@mui/joy/IconButton';
import List from '@mui/joy/List';
import ListItem from '@mui/joy/ListItem';
import ListItemContent from '@mui/joy/ListItemContent';
import Stack from '@mui/joy/Stack';
import Typography from '@mui/joy/Typography';
import { CaretDown as CaretDownIcon } from '@phosphor-icons/react/dist/ssr/CaretDown';
import { CaretUp as CaretUpIcon } from '@phosphor-icons/react/dist/ssr/CaretUp';
import { X as XIcon } from '@phosphor-icons/react/dist/ssr/X';

import { paths } from '@/paths';
import { isNavItemActive } from '@/lib/is-nav-item-active';
import { useMediaQuery } from '@/hooks/use-media-query';
import { usePathname } from '@/hooks/use-pathname';
import { RouterLink } from '@/components/core/link';
import { Logo } from '@/components/core/logo';
import { NoSsr } from '@/components/core/no-ssr';

import { ColorSchemeSwitch } from './color-scheme-switch';
import { CurrentUser } from './current-user';
import { icons } from './nav-icons';
import { WorkspaceSwitch } from './workspace-switch';

export function MobileNav({ items, onClose, open }) {
  const pathname = usePathname();
  const canOpen = useMediaQuery('between', 'xs', 'lg');

  return (
    <Drawer
      anchor="left"
      onClose={onClose}
      open={canOpen ? open : false}
      sx={{
        zIndex: 'var(--MobileNav-zIndex)',
        '& > .MuiDrawer-backdrop': { backdropFilter: 'none', background: 'transparent' },
        '& > .MuiDrawer-content': {
          '--Drawer-horizontalSize': 'var(--MobileNav-width)',
          '--MobileNav-background': 'var(--Layout-bg)',
          '--MobileNav-color': 'var(--joy-palette-common-white)',
          '--NavItem-color': 'var(--joy-palette-neutral-200)',
          '--NavItem-active-background': 'var(--joy-palette-primary-solidBg)',
          '--NavItem-active-color': 'var(--joy-palette-common-white)',
          '--NavItem-active-icon-color': 'var(--joy-palette-common-white)',
          '--NavItem-open-color': 'var(--joy-palette-common-white)',
          '--NavItem-hover-background': undefined,
          '--NavItem-hover-color': 'var(--joy-palette-common-white)',
          '--NavItem-disabled-background': 'var(--joy-palette-neutral-800)',
          '--NavItem-disabled-color': 'var(--joy-palette-neutral-400)',
          '--NavItem-icon-color': 'var(--joy-palette-neutral-400)',
          bgcolor: 'var(--MobileNav-background)',
          boxShadow: 'var(--joy-shadow-md)',
          color: 'var(--MobileNav-color)',
          overflow: 'auto',
          pb: 0,
          pt: '72px', // header height
          px: 0,
        },
      }}
    >
      <Stack spacing={3} sx={{ left: 0, p: '16px', position: 'absolute', top: 0, width: '100%', zIndex: 1 }}>
        <Stack direction="row" spacing={3} sx={{ alignItems: 'center', justifyContent: 'space-between' }}>
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
      </Stack>
      <Stack
        spacing={3}
        sx={{
          height: '100%',
          overflowY: 'auto',
          pb: '16px',
          px: '16px',
          scrollbarWidth: 'none',
          '&::-webkit-scrollbar': { display: 'none' },
        }}
      >
        <WorkspaceSwitch />
        <Box component="nav" sx={{ flex: '1 1 auto' }}>
          {renderNavGroups({ items, onClose, pathname })}
        </Box>
        <NoSsr>
          <ColorSchemeSwitch />
        </NoSsr>
        <CurrentUser onNavigate={onClose} />
      </Stack>
    </Drawer>
  );
}

function renderNavGroups({ items, onClose, pathname }) {
  const children = items.reduce((acc, curr) => {
    acc.push(
      <ListItem
        key={curr.key}
        sx={{ '--ListItem-paddingRight': 0, '--ListItem-paddingLeft': 0, '--ListItem-paddingY': 0 }}
      >
        <ListItemContent>
          {curr.title ? (
            <Box sx={{ py: '12px' }}>
              <Typography fontSize="xs" fontWeight="lg" textColor="neutral.500">
                {curr.title}
              </Typography>
            </Box>
          ) : null}
          {renderNavItems({ depth: 0, items: curr.items, pathname, onClose })}
        </ListItemContent>
      </ListItem>
    );

    return acc;
  }, []);

  return <List sx={{ '--List-padding': 0 }}>{children}</List>;
}

function renderNavItems({ depth = 0, items = [], onClose, pathname }) {
  const children = items.reduce((acc, curr) => {
    const { items: childItems, key, ...item } = curr;

    const forceOpen = childItems
      ? Boolean(childItems.find((childItem) => childItem.href && pathname.startsWith(childItem.href)))
      : false;

    acc.push(
      <NavItem depth={depth} forceOpen={forceOpen} key={key} onClose={onClose} pathname={pathname} {...item}>
        {childItems ? renderNavItems({ depth: depth + 1, items: childItems, pathname, onClose }) : null}
      </NavItem>
    );

    return acc;
  }, []);

  return (
    <List data-depth={depth} sx={{ '--List-gap': '4px', '--List-padding': 0 }}>
      {children}
    </List>
  );
}

function NavItem({
  children,
  depth,
  disabled,
  external,
  forceOpen = false,
  href,
  icon,
  matcher,
  onClose,
  pathname,
  title,
}) {
  const [open, setOpen] = React.useState(forceOpen);
  const active = isNavItemActive({ disabled, external, href, matcher, pathname });
  const Icon = icon ? icons[icon] : null;
  const ExpandIcon = open ? CaretUpIcon : CaretDownIcon;
  const isBranch = children && !href;
  const isLeaf = !children && href;
  const showChildren = Boolean(children && open);

  if (!(isBranch || isLeaf)) {
    throw new Error('Children or href required');
  }

  return (
    <ListItem
      data-depth={depth}
      sx={{ '--ListItem-paddingRight': 0, '--ListItem-paddingLeft': 0, '--ListItem-paddingY': 0, userSelect: 'none' }}
    >
      <ListItemContent>
        <Box
          {...(isBranch
            ? {
                component: 'a',
                onClick: () => {
                  setOpen(!open);
                },
              }
            : {
                component: RouterLink,
                href,
                target: external ? '_blank' : '',
                rel: external ? 'noreferrer' : '',
                onClick: () => {
                  onClose?.();
                },
              })}
          sx={{
            alignItems: 'center',
            borderRadius: 'var(--joy-radius-sm)',
            color: 'var(--NavItem-color)',
            cursor: 'pointer',
            display: 'flex',
            gap: 1,
            p: '12px',
            textDecoration: 'none',
            ...(disabled && {
              bgcolor: 'var(--NavItem-disabled-background)',
              color: 'var(--NavItem-disabled-color)',
              cursor: 'not-allowed',
            }),
            ...(active && { bgcolor: 'var(--NavItem-active-background)', color: 'var(--NavItem-active-color)' }),
            ...(open && { color: 'var(--NavItem-open-color)' }),
            '&:hover': {
              ...(!active && { bgcolor: 'var(--NavItem-hover-background)', color: 'var(--NavItem-hover-color)' }),
            },
          }}
        >
          {Icon ? (
            <Box sx={{ alignItems: 'center', display: 'flex', justifyContent: 'center' }}>
              <Icon
                fill={active ? 'var(--NavItem-active-icon-color)' : 'var(--NavItem-icon-color)'}
                fontSize="var(--joy-fontSize-xl)"
                weight={forceOpen || active ? 'fill' : 'bold'}
              />
            </Box>
          ) : null}
          <Box sx={{ flex: '1 1 auto' }}>
            <Typography component="span" fontSize="sm" fontWeight="md" textColor="inherit">
              {title}
            </Typography>
          </Box>
          {isBranch ? <ExpandIcon fontSize="var(--joy-fontSize-sm)" weight="bold" /> : null}
        </Box>
        {showChildren ? (
          <Box sx={{ pl: '20px' }}>
            <Box sx={{ borderLeft: '1px solid var(--joy-palette-neutral-700)', pl: '12px' }}>{children}</Box>
          </Box>
        ) : null}
      </ListItemContent>
    </ListItem>
  );
}
