'use client';

import * as React from 'react';
import Box from '@mui/joy/Box';
import Card from '@mui/joy/Card';
import Container from '@mui/joy/Container';
import Grid from '@mui/joy/Grid';
import Stack from '@mui/joy/Stack';
import Typography from '@mui/joy/Typography';
import { motion } from 'framer-motion';

const reviews = [
  {
    id: 'REV-006',
    author: 'Nalin Wijayasinghe',
    comment:
      'I highly recommend purchasing this template. The author is very supportive and responds quickly to questions.',
  },
  {
    id: 'REV-005',
    author: 'Victor Smith',
    comment:
      'This template is well organized, easy to understand and also easy to add other componets. Another big 5 star factor is the support from the team. I had several questions before purchasing and they were all answered promptly with code examples.',
  },
  {
    id: 'REV-004',
    author: 'Onions Daniel',
    comment:
      'I am incredibly thankful for the support I received and wanted to take this opportunity to share my positive experience with others. Your commitment to customer satisfaction is truly commendable, and I will undoubtedly continue to be a loyal customer.',
  },
  {
    id: 'REV-003',
    author: 'Laurence Bedford',
    comment:
      'This template is not only amazing, the support that comes with it is impeccable. I wanted to integrate another auth provider and was running into some issues. The support went above and beyond to help me with my integration and it works seemlessly.',
  },
  {
    id: 'REV-002',
    author: 'Vedad Burgic',
    comment:
      'This template is amazing. It is going to reduce lot of boilerplate code from my side and speed up my new SaaS.',
  },
  {
    id: 'REV-001',
    author: 'Breno Rodrigues',
    comment: "One of the best design I've ever seen for dashboard. Very clean and useful!",
  },
];

export function Reviews() {
  const half = Math.ceil(reviews.length / 2);
  const reviewsCol1 = reviews.slice(0, half);
  const reviewsCol2 = reviews.slice(half);

  return (
    <motion.section
      initial={{ opacity: 0 }}
      transition={{ duration: 0.5, delay: 0.2, ease: 'easeInOut' }}
      viewport={{ once: true }}
      whileInView={{ opacity: 1 }}
    >
      <Container>
        <Box
          sx={{
            bgcolor: 'var(--joy-palette-background-level1)',
            borderRadius: 'var(--joy-radius-lg)',
            px: 3,
            py: '200px',
          }}
        >
          <Stack spacing={6} sx={{ maxWidth: 'md', mx: 'auto' }}>
            <Stack spacing={2}>
              <Typography color="primary" level="body-sm" textAlign="center">
                Reviews
              </Typography>
              <Typography level="h1" textAlign="center">
                What are our customers are saying
              </Typography>
            </Stack>
            <Grid container spacing={3}>
              <Grid md={6} xs={12}>
                <Stack spacing={3}>
                  {reviewsCol1.map((review) => (
                    <ReviewCard key={review.id} {...review} />
                  ))}
                </Stack>
              </Grid>
              <Grid md={6} xs={12}>
                <Stack spacing={3}>
                  {reviewsCol2.map((review) => (
                    <ReviewCard key={review.id} {...review} />
                  ))}
                </Stack>
              </Grid>
            </Grid>
          </Stack>
        </Box>
      </Container>
    </motion.section>
  );
}

function ReviewCard({ author, comment }) {
  return (
    <Card sx={{ boxShadow: 'var(--joy-shadow-lg)', p: '6px' }}>
      <Box
        sx={{
          border: '1px solid var(--joy-palette-neutral-outlinedBorder)',
          borderRadius: 'var(--joy-radius-md)',
          display: 'flex',
          flexDirection: 'column',
          gap: 3,
          p: '24px',
        }}
      >
        <Typography sx={{ flex: '1 1 auto' }}>{comment}</Typography>
        <Typography level="title-sm">{author}</Typography>
      </Box>
    </Card>
  );
}
