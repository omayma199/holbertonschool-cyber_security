import * as React from 'react';
import { useTheme } from '@mui/joy/styles';

// https://github.com/mui/material-ui/issues/23885#issuecomment-1475450249
export function useCurrentBreakpoint() {
  const globalTheme = useTheme();

  const mqs = globalTheme.breakpoints.keys.map((key, index, breakpoints) => {
    let mq = '';
    if (index === breakpoints.length - 1) {
      mq = globalTheme.breakpoints.up(key);
    } else {
      mq = globalTheme.breakpoints.between(key, breakpoints[index + 1]);
    }
    return [key, mq.replace(/^@media(?: ?)/m, '')];
  });

  const [currentBreakpoint, setCurrentBreakpoint] = React.useState(() => {
    return 'xs';
    // const bp = mqs.find(([, mq]) => window.matchMedia(mq).matches);
    // return bp ? bp[0] : 'xs';
  });

  React.useEffect(() => {
    function handleCurrentBreakpointChange(key, e) {
      if (e.matches) {
        setCurrentBreakpoint(key);
      }
    }

    const handlers = mqs.map(([key, mq]) => {
      const handler = (e) => {
        handleCurrentBreakpointChange(key, e);
      };
      return [mq, handler];
    });

    handlers.forEach(([mq, handler]) => {
      window.matchMedia(mq).addEventListener('change', handler);
    });

    return () => {
      handlers.forEach(([mq, handler]) => {
        window.matchMedia(mq).removeEventListener('change', handler);
      });
    };
  }, [mqs]);

  return currentBreakpoint;
}
