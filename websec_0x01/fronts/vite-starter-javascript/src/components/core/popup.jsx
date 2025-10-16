'use client';

import * as React from 'react';
import { ClickAwayListener } from '@mui/base/ClickAwayListener';
import { Popper } from '@mui/base/Popper';
import Sheet from '@mui/joy/Sheet';
import { styled } from '@mui/joy/styles';

const PopupRoot = styled(Popper)({ zIndex: 'var(--joy-zIndex-popup)', width: '100%' });

export const PopupContent = styled(Sheet)({
  border: '1px solid var(--joy-palette-neutral-outlinedBorder)',
  borderRadius: 'var(--joy-radius-lg)',
  boxShadow:
    'var(--joy-shadowRing, 0 0 #000),0px 2px 8px -2px rgba(var(--joy-shadowChannel, 21 21 21) / var(--joy-shadowOpacity, 0.04)),0px 6px 12px -2px rgba(var(--joy-shadowChannel, 21 21 21) / var(--joy-shadowOpacity, 0.04))',
});

export function Popup({ children, onClose, ...props }) {
  return (
    <PopupRoot {...props} role={undefined}>
      <ClickAwayListener
        onClickAway={() => {
          onClose?.();
        }}
      >
        {children}
      </ClickAwayListener>
    </PopupRoot>
  );
}
