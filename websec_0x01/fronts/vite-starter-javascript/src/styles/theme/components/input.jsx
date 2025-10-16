export const JoyInput = {
  styleOverrides: {
    root: ({ ownerState }) => ({ ...(ownerState.variant === 'outlined' && { boxShadow: 'var(--joy-shadow-xs)' }) }),
  },
};
