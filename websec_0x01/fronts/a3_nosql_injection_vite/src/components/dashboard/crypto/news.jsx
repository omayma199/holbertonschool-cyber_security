import * as React from 'react';
import Box from '@mui/joy/Box';
import Button from '@mui/joy/Button';
import Card from '@mui/joy/Card';
import Link from '@mui/joy/Link';
import List from '@mui/joy/List';
import ListDivider from '@mui/joy/ListDivider';
import ListItem from '@mui/joy/ListItem';
import ListItemContent from '@mui/joy/ListItemContent';
import ListItemDecorator from '@mui/joy/ListItemDecorator';
import Stack from '@mui/joy/Stack';
import Typography from '@mui/joy/Typography';
import { ArrowRight as ArrowRightIcon } from '@phosphor-icons/react/dist/ssr/ArrowRight';

import { Image } from '../../core/image';

export default function News({ data = [] }) {
  return (
    <Card>
      <Stack direction="row" sx={{ alignItems: 'flex-start', justifyContent: 'space-between' }}>
        <Typography level="h4">News</Typography>
        <Button
          color="neutral"
          endDecorator={<ArrowRightIcon fontSize="var(--joy-fontSize-md)" weight="bold" />}
          size="sm"
          variant="plain"
        >
          View More
        </Button>
      </Stack>
      <List sx={{ '--List-paddingX': 0, '--List-paddingY': 0, '--ListItemDecorator-size': '55px' }}>
        {data.map((article, index) => (
          <React.Fragment key={article.id}>
            <ListItem>
              <ListItemDecorator>
                <Box sx={{ fontSize: 0, '& img': { borderRadius: 'var(--joy-radius-sm)', overflow: 'hidden' } }}>
                  <Image alt="" height={43} src={article.image} width={43} />
                </Box>
              </ListItemDecorator>
              <ListItemContent>
                <Link
                  level="body-sm"
                  sx={{ display: 'block', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}
                  textColor="text.primary"
                  underline="none"
                >
                  {article.title}
                </Link>
              </ListItemContent>
            </ListItem>
            {index < data.length - 1 ? <ListDivider /> : null}
          </React.Fragment>
        ))}
      </List>
    </Card>
  );
}
