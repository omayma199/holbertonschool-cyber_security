// proudly written by Yosri
// modules
import { useState } from 'react';
import { CssVarsProvider } from '@mui/joy/styles';
import CssBaseline from '@mui/joy/CssBaseline';
import Theme from './Theme';
// components
import ColorToggle from './components/ColorToggle';
import SideBar from './components/Sidebar';

const titles = JSON.parse(document.getElementById('sidebar').getAttribute('data-titles'));

export default function App() {
  const [ xsp, setXs ] = useState('none')
  return (
    <CssVarsProvider defaultMode="dark" theme={Theme}>
      <CssBaseline />
      <ColorToggle sx={{
        position: 'absolute',
        right: 0,
        m: 2,
        zIndex: 99
      }} setXs={setXs} xsp={xsp} />
      <SideBar titles={titles} xsp={xsp} />
    </CssVarsProvider>
  );
}
