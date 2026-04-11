import React from 'react';
import { AppShell } from '@mantine/core';
import Sidebar from './components/Sidebar';
import MapContainer from './components/MapContainer';

const App: React.FC = () => {
  return (
    <AppShell
      padding={0}
      navbar={{ width: 350, breakpoint: 'sm' }}
    >
      <AppShell.Navbar p={0} style={{ borderRight: 'none', zIndex: 100 }}>
        <Sidebar />
      </AppShell.Navbar>

      <AppShell.Main style={{ height: '100vh', width: '100vw', paddingLeft: 350 }}>
        <MapContainer />
      </AppShell.Main>
    </AppShell>
  );
};

export default App;
