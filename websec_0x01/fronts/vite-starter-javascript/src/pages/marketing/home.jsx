import * as React from 'react';
import { Helmet } from 'react-helmet-async';

import { config } from '@/config';
import { Customers } from '@/components/marketing/home/customers';
import { Faqs } from '@/components/marketing/home/faqs';
import { Features } from '@/components/marketing/home/features';
import { GetStarted } from '@/components/marketing/home/get-started';
import { Hero } from '@/components/marketing/home/hero';
import { Plans } from '@/components/marketing/home/plans';
import { Reviews } from '@/components/marketing/home/reviews';

const metadata = {
  title: `Redefining SaaS Product Management | ${config.site.name}`,
  description: config.site.description,
};

export function Page() {
  return (
    <React.Fragment>
      <Helmet>
        <title>{metadata.title}</title>
        <meta content={metadata.description} name="description" />
      </Helmet>
      <div>
        <Hero />
        <Customers />
        <Features />
        <GetStarted />
        <Reviews />
        <Plans />
        <Faqs />
      </div>
    </React.Fragment>
  );
}
