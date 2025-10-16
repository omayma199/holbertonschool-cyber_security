export const JoyTable = {
  styleOverrides: {
    root: ({ ownerState }) => ({
      '--Table-headerUnderlineThickness': '1px',
      '--TableRow-stripeBackground': 'var(--joy-palette-background-level1)',
      '--TableCell-borderColor': 'var(--joy-palette-divider)',
      ...(ownerState.borderAxis === 'header' && {
        '& thead th:not([colspan])': {
          borderBottom: 'var(--Table-headerUnderlineThickness) solid var(--TableCell-borderColor)',
        },
      }),
    }),
  },
};
