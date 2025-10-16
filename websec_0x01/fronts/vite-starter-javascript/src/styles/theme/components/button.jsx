export const JoyButton = {
  styleOverrides: {
    root: ({ ownerState }) => ({
      borderRadius: 'var(--joy-radius-md)',
      ...(ownerState.variant === 'outlined' && { boxShadow: 'var(--joy-shadow-xs)' }),
      ...(ownerState.variant === 'solid' &&
        ownerState.color === 'neutral' && {
          '--variant-solidBg': 'var(--joy-palette-neutral-900)',
          '--variant-solidHoverBg': 'var(--joy-palette-neutral-700)',
        }),
    }),
  },
};
