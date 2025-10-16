import { extendTheme } from '@mui/joy/styles';

import { colorSchemes } from './color-schemes';
import { components } from './components/components';
import { typography } from './typography';

export function createTheme(config) {
  return extendTheme({
    colorSchemes: colorSchemes({ primaryColor: config.primaryColor }),
    components,
    direction: config.direction,
    fontFamily: {
      body: "'Be Vietnam Pro', var(--joy-fontFamily-fallback)",
      code: "'Roboto Mono', var(--joy-fontFamily-fallback)",
      display: "'Inter', var(--joy-fontFamily-fallback)",
    },
    typography,
  });
}
