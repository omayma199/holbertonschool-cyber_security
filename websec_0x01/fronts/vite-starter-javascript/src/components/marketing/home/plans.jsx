'use client';

import * as React from 'react';
import Avatar from '@mui/joy/Avatar';
import Box from '@mui/joy/Box';
import Button from '@mui/joy/Button';
import Card from '@mui/joy/Card';
import Container from '@mui/joy/Container';
import Divider from '@mui/joy/Divider';
import Grid from '@mui/joy/Grid';
import Stack from '@mui/joy/Stack';
import { useColorScheme } from '@mui/joy/styles';
import Typography from '@mui/joy/Typography';
import { Check as CheckIcon } from '@phosphor-icons/react/dist/ssr/Check';
import { motion } from 'framer-motion';

import { paths } from '@/paths';
import { RouterLink } from '@/components/core/link';
import { NoSsr } from '@/components/core/no-ssr';

const plans = [
  {
    id: 'standard',
    name: 'Standard',
    price: 69,
    features: [
      { id: 'oneEndProduct', label: 'One End Product', included: true },
      { id: '12monthsUpdates', label: '12 Months Updates', included: true },
      { id: '6monthsSupport', label: '6 Months Support', included: true },
      { id: 'javascript', label: 'JavaScript Version', included: true },
      { id: 'typescript', label: 'TypeScript Version', included: false },
      { id: 'design', label: 'Design Resources', included: false },
      { id: 'commercial', label: 'Commercial Applications', included: false },
    ],
  },
  {
    id: 'standardPlus',
    name: 'Standard Plus',
    price: 129,
    features: [
      { id: 'oneEndProduct', label: 'One End Product', included: true },
      { id: '12monthsUpdates', label: '12 Months Updates', included: true },
      { id: '6monthsSupport', label: '6 Months Support', included: true },
      { id: 'javascript', label: 'JavaScript Version', included: true },
      { id: 'typescript', label: 'TypeScript Version', included: true },
      { id: 'design', label: 'Design Resources', included: true },
      { id: 'commercial', label: 'Commercial Applications', included: false },
    ],
  },
  {
    id: 'extended',
    name: 'Extended',
    price: 599,
    features: [
      { id: 'oneEndProduct', label: 'One End Product', included: true },
      { id: '12monthsUpdates', label: '12 Months Updates', included: true },
      { id: '6monthsSupport', label: '6 Months Support', included: true },
      { id: 'javascript', label: 'JavaScript Version', included: true },
      { id: 'typescript', label: 'TypeScript Version', included: true },
      { id: 'design', label: 'Design Resources', included: true },
      { id: 'commercial', label: 'Commercial Applications', included: true },
    ],
  },
];

export function Plans() {
  return (
    <motion.section
      initial={{ opacity: 0 }}
      transition={{ duration: 0.5, delay: 0.2, ease: 'easeInOut' }}
      viewport={{ once: true }}
      whileInView={{ opacity: 1 }}
    >
      <Container sx={{ py: '100px' }}>
        <Stack spacing={6}>
          <Typography level="h1" textAlign="center">
            Pricing Plans
          </Typography>
          <Grid container spacing={3}>
            {plans.map((plan, index) => (
              <Grid key={plan.id} lg={4} md={6} xs={12}>
                <PlanCard delay={0.2 * index + 0.2} {...plan} />
              </Grid>
            ))}
          </Grid>
          <Stack spacing={1.5} sx={{ alignItems: 'center', maxWidth: 'sm', mx: 'auto' }}>
            <Typography textAlign="center" textColor="text.secondary">
              Not ready to pay yet? Experience the product firsthand before making a purchase.
            </Typography>
            <Button component={RouterLink} href={paths.dashboard.overview}>
              Live Demo
            </Button>
          </Stack>
        </Stack>
      </Container>
    </motion.section>
  );
}

function PlanCard({ features, name, price, delay }) {
  const { colorScheme } = useColorScheme();

  return (
    <NoSsr>
      <motion.div
        initial={{ opacity: 0, scale: 0.5 }}
        transition={{ duration: 0.5, delay, ease: 'easeInOut' }}
        viewport={{ once: true }}
        whileInView={{ opacity: 1, scale: 1 }}
      >
        <Card
          sx={{ ...(colorScheme === 'light' && { boxShadow: 'var(--joy-shadow-md)' }) }}
          variant={colorScheme === 'dark' ? 'outlined' : 'plain'}
        >
          <Typography level="title-md" textColor="primary.plainColor">
            {name}
          </Typography>
          <Box sx={{ display: 'flex' }}>
            <Typography textColor="text.secondary">$</Typography>
            <Typography level="h1">{price}</Typography>
          </Box>
          <Stack component="ul" spacing={2} sx={{ listStyle: 'none', m: 0, p: 0 }}>
            {features.map((feature, index) => (
              <React.Fragment key={feature.id}>
                <Stack component="li" direction="row" spacing={1.5}>
                  <Avatar
                    color={feature.included ? 'primary' : 'neutral'}
                    sx={{ '--Avatar-size': '24px', '--Icon-fontSize': 'var(--joy-fontSize-sm)' }}
                    variant="outlined"
                  >
                    <CheckIcon fontSize="var(--Icon-fontSize)" weight="bold" />
                  </Avatar>
                  <Typography textColor={feature.included ? 'text.primary' : 'text.tertiary'}>
                    {feature.label}
                  </Typography>
                </Stack>
                {index === 2 ? <Divider /> : null}
              </React.Fragment>
            ))}
          </Stack>
        </Card>
      </motion.div>
    </NoSsr>
  );
}
