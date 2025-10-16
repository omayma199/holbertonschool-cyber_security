export const JoyTabs = {
  styleOverrides: {
    root: ({ ownerState }) => ({
      ...(ownerState.variant === 'custom' && {
        backgroundColor: 'transparent',
        '& .MuiTabList-root': {
          backgroundColor: 'var(--joy-palette-background-level1)',
          borderRadius: 'var(--joy-radius-md)',
          boxShadow: 'none',
          gap: '4px',
          padding: '4px',
        },
        '& .MuiTab-root': {
          borderRadius: 'var(--joy-radius-md)',
          flex: '1 1 auto',
          '&:after': { display: 'none' },
          '&.Mui-selected': {
            backgroundColor: 'var(--joy-palette-background-surface)',
            boxShadow: 'var(--joy-shadow-sm)',
          },
          '&:not(&.Mui-selected):hover': { backgroundColor: 'var(--joy-palette-background-level2)' },
        },
      }),
    }),
  },
};
