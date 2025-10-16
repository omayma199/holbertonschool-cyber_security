export const JoySelect = {
  styleOverrides: {
    root: ({ ownerState }) => ({ ...(ownerState.variant === 'outlined' && { boxShadow: 'var(--joy-shadow-xs)' }) }),
  },
};
