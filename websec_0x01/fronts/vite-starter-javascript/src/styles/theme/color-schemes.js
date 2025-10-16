import { logger } from '@/lib/default-logger';

import { carminePink, crayolaBlue, gradient, malachiteGreen, metalicOrange, palatinateBlue, seaGreen } from './colors';

export function colorSchemes(config) {
  let primary = { crayolaBlue, seaGreen, palatinateBlue }[config.primaryColor];

  if (!primary) {
    logger.warn(`No primary color found for ${config.primaryColor}. Using palatinateBlue instead.`);
    primary = palatinateBlue;
  }

  return {
    dark: {
      palette: {
        background: {
          backdrop: 'rgba(9, 10, 11, 0.9)',
          body: 'var(--joy-palette-neutral-900)',
          surface: 'var(--joy-palette-neutral-900)',
          level1: 'var(--joy-palette-neutral-800)',
          level2: 'var(--joy-palette-neutral-700)',
          level3: 'var(--joy-palette-neutral-600)',
        },
        common: { black: '#000000', white: '#ffffff' },
        danger: { ...carminePink },
        divider: 'var(--joy-palette-neutral-700)',
        gradient,
        neutral: { 950: '#090a0b', outlinedBorder: 'var(--joy-palette-neutral-700)' },
        primary: { ...primary },
        success: { ...malachiteGreen },
        text: {
          primary: 'var(--joy-palette-common-white)',
          secondary: 'var(--joy-palette-neutral-200)',
          tertiary: 'var(--joy-palette-neutral-500)',
        },
        warning: { ...metalicOrange },
      },
      shadowOpacity: '0.3',
    },
    light: {
      palette: {
        background: {
          backdrop: 'rgba(9, 10, 11, 0.8)',
          body: 'var(--joy-palette-common-white)',
          surface: 'var(--joy-palette-common-white)',
          level1: 'var(--joy-palette-neutral-50)',
          level2: 'var(--joy-palette-neutral-100)',
          level3: 'var(--joy-palette-neutral-200)',
        },
        common: { black: '#000000', white: '#ffffff' },
        danger: { ...carminePink },
        divider: 'var(--joy-palette-neutral-200)',
        gradient,
        neutral: { 950: '#090a0b', outlinedBorder: 'var(--joy-palette-neutral-200)' },
        primary: { ...primary },
        text: {
          primary: 'var(--joy-palette-neutral-900)',
          secondary: 'var(--joy-palette-neutral-700)',
          tertiary: 'var(--joy-palette-neutral-500)',
        },
        warning: { ...metalicOrange },
      },
      shadowOpacity: '0.04',
    },
  };
}
