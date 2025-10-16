import * as React from 'react';
import GlobalStyles from '@mui/joy/GlobalStyles';

import { Footer } from '@/components/marketing/layout/footer';
import { MainNav } from '@/components/marketing/layout/main-nav';

export function Layout({ children }) {
  return (
    <React.Fragment>
      <GlobalStyles
        styles={{ body: { '--MainNav-zIndex': 1000, '--MobileNav-width': '320px', '--MobileNav-zIndex': 1100 } }}
      />
      <div>
        <MainNav />
        <main>{children}</main>
        <Footer />
      </div>
    </React.Fragment>
  );
}
