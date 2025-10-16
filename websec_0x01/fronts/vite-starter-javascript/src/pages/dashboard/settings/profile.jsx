import * as React from 'react';
import { Helmet } from 'react-helmet-async';

import { config } from '@/config';
import { UpdateProfileForm } from '@/components/dashboard/settings/update-profile-form';

const metadata = { title: `Profile | Settings | Dashboard | ${config.site.name}` };

export function Page() {
  return (
    <React.Fragment>
      <Helmet>
        <title>{metadata.title}</title>
      </Helmet>
      <UpdateProfileForm />
    </React.Fragment>
  );
}
