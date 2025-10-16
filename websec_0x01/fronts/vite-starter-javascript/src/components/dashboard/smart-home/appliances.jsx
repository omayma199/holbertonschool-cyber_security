import * as React from 'react';
import Avatar from '@mui/joy/Avatar';
import Card from '@mui/joy/Card';
import Grid from '@mui/joy/Grid';
import Stack from '@mui/joy/Stack';
import Switch from '@mui/joy/Switch';
import Typography from '@mui/joy/Typography';
import { Fan as FanIcon } from '@phosphor-icons/react/dist/ssr/Fan';
import { FilmScript as FilmScriptIcon } from '@phosphor-icons/react/dist/ssr/FilmScript';
import { LightbulbFilament as LightbulbFilamentIcon } from '@phosphor-icons/react/dist/ssr/LightbulbFilament';
import { SpeakerHifi as SpeakerHifiIcon } from '@phosphor-icons/react/dist/ssr/SpeakerHifi';
import { TelevisionSimple as TelevisionSimpleIcon } from '@phosphor-icons/react/dist/ssr/TelevisionSimple';
import { VideoCamera as VideoCameraIcon } from '@phosphor-icons/react/dist/ssr/VideoCamera';
import { WifiHigh as WifiHighIcon } from '@phosphor-icons/react/dist/ssr/WifiHigh';
import { Wind as WindIcon } from '@phosphor-icons/react/dist/ssr/Wind';

const iconMapping = {
  'smart-tv': TelevisionSimpleIcon,
  'air-conditioner': WindIcon,
  'smart-lamp': LightbulbFilamentIcon,
  'smart-fans': FanIcon,
  speaker: SpeakerHifiIcon,
  cctv: VideoCameraIcon,
  refrigerator: FilmScriptIcon,
  wifi: WifiHighIcon,
};

export function Appliances({ appliances = [] }) {
  return (
    <Card>
      <Typography level="h4">Appliances</Typography>
      <Grid container spacing={3}>
        {appliances.map((appliance) => {
          const Icon = iconMapping[appliance.type];

          return (
            <Grid key={appliance.id} md={4} xs={12}>
              <Card sx={{ boxShadow: 'none' }}>
                <Stack direction="row" spacing={2} sx={{ alignItems: 'center', justifyContent: 'space-between' }}>
                  <Avatar
                    sx={{ '--Avatar-radius': 'var(--joy-radius-sm)', '--Icon-fontSize': 'var(--joy-fontSize-lg)' }}
                  >
                    {Icon ? <Icon fontSize="var(--Icon-fontSize)" weight="bold" /> : null}
                  </Avatar>
                  <Switch checked={appliance.status === 'on'} variant="solid" />
                </Stack>
                <Stack spacing={1}>
                  <Typography level="title-sm">{appliance.name}</Typography>
                  <Typography level="body-xs">Active for {appliance.uptime}</Typography>
                </Stack>
              </Card>
            </Grid>
          );
        })}
      </Grid>
    </Card>
  );
}
