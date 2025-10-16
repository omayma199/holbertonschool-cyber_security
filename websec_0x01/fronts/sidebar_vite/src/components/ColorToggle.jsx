import * as React from 'react';
import { useColorScheme } from '@mui/joy/styles';
import IconButton from '@mui/joy/IconButton';
import Box from '@mui/joy/Box';
import DarkModeRoundedIcon from '@mui/icons-material/DarkModeRounded';
import LightModeIcon from '@mui/icons-material/LightMode';
import Menu from '@mui/icons-material/Menu';

export default function ColorToggle(props) {
  const { onClick, sx, setXs, xsp, ...other } = props;
  const { mode, setMode } = useColorScheme();
  const [mounted, setMounted] = React.useState(false);
  React.useEffect(() => {
    setMounted(true);
  }, []);
  if (!mounted) {
    return (
      <IconButton
        size="sm"
        variant="outlined"
        color="neutral"
        {...other}
        sx={sx}
        disabled
      />
    );
  }
  return (
    <Box
    {...other}
    sx={[
      {
        display: 'initial'
      },
      ...(Array.isArray(sx) ? sx : [sx]),
    ]}>

        <IconButton
          id="toggle-mode"
          size="sm"
          variant="outlined"
          color="primary"
          onClick={(event) => {
            if (mode === 'light') {
              setMode('dark');
            } else {
              setMode('light');
            }
            onClick?.(event);
          }}
        >
          { mode === 'light' ? <DarkModeRoundedIcon /> : <LightModeIcon /> }
        </IconButton>
        <IconButton
          id="toggle-mode"
          size="sm"
          variant="solid"
          color="primary"
          sx={{ mx: 1, display: {sm: 'none'} }}
          onClick={(event) => {
            if (xsp === 'none') {
              setXs('flex');
            } else {
              setXs('none');
            }
            onClick?.(event);
          }}
        >
            <Menu />
          </IconButton>
    </Box>
  );
}
