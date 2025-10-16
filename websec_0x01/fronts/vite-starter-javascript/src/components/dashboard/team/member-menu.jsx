'use client';

import * as React from 'react';
import IconButton from '@mui/joy/IconButton';
import ListItemContent from '@mui/joy/ListItemContent';
import ListItemDecorator from '@mui/joy/ListItemDecorator';
import Menu from '@mui/joy/Menu';
import MenuItem from '@mui/joy/MenuItem';
import { ArchiveBox as ArchiveBoxIcon } from '@phosphor-icons/react/dist/ssr/ArchiveBox';
import { DotsThree as DotsThreeIcon } from '@phosphor-icons/react/dist/ssr/DotsThree';
import { Eye as EyeIcon } from '@phosphor-icons/react/dist/ssr/Eye';
import { LockSimple as LockSimpleIcon } from '@phosphor-icons/react/dist/ssr/LockSimple';
import { PaperPlaneTilt as PaperPlaneTiltIcon } from '@phosphor-icons/react/dist/ssr/PaperPlaneTilt';
import { Trash as TrashIcon } from '@phosphor-icons/react/dist/ssr/Trash';

import { usePopover } from '@/hooks/use-popover';

export function MemberMenu({ onView, onResendInvite, onPermissions, onArchive, onDelete, pending }) {
  const popover = usePopover();

  return (
    <React.Fragment>
      <IconButton color="neutral" onClick={popover.handleOpen} ref={popover.anchorRef} size="sm" variant="plain">
        <DotsThreeIcon fontSize="var(--Icon-fontSize)" weight="bold" />
      </IconButton>
      <Menu
        anchorEl={popover.anchorRef.current}
        onClose={popover.handleClose}
        open={popover.open}
        popperOptions={{ placement: 'bottom-end' }}
        sx={{
          '--ListItem-fontSize': 'var(--joy-fontSize-sm)',
          '--ListItemDecorator-color': 'var(--joy-palette-text-primary)',
          '--ListItemDecorator-size': '2rem',
        }}
      >
        <MenuItem
          onClick={() => {
            popover.handleClose();
            onView?.();
          }}
        >
          <ListItemDecorator>
            <EyeIcon fontSize="var(--Icon-fontSize)" weight="bold" />
          </ListItemDecorator>
          <ListItemContent>View</ListItemContent>
        </MenuItem>
        {pending ? (
          <MenuItem
            onClick={() => {
              popover.handleClose();
              onResendInvite?.();
            }}
          >
            <ListItemDecorator>
              <PaperPlaneTiltIcon fontSize="var(--Icon-fontSize)" weight="bold" />
            </ListItemDecorator>
            <ListItemContent>Resend Invite</ListItemContent>
          </MenuItem>
        ) : null}
        <MenuItem
          onClick={() => {
            popover.handleClose();
            onPermissions?.();
          }}
        >
          <ListItemDecorator>
            <LockSimpleIcon fontSize="var(--Icon-fontSize)" weight="bold" />
          </ListItemDecorator>
          <ListItemContent>Permissions</ListItemContent>
        </MenuItem>
        <MenuItem
          onClick={() => {
            popover.handleClose();
            onArchive?.();
          }}
        >
          <ListItemDecorator>
            <ArchiveBoxIcon fontSize="var(--Icon-fontSize)" weight="bold" />
          </ListItemDecorator>
          <ListItemContent>Archive</ListItemContent>
        </MenuItem>
        <MenuItem
          onClick={() => {
            popover.handleClose();
            onDelete?.();
          }}
        >
          <ListItemDecorator>
            <TrashIcon color="var(--joy-palette-danger-plainColor)" fontSize="var(--Icon-fontSize)" />
          </ListItemDecorator>
          <ListItemContent sx={{ color: 'var(--joy-palette-danger-plainColor)' }}>Delete</ListItemContent>
        </MenuItem>
      </Menu>
    </React.Fragment>
  );
}
