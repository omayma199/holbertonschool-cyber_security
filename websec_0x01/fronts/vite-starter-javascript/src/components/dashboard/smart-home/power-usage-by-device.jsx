'use client';

import * as React from 'react';
import Avatar from '@mui/joy/Avatar';
import Box from '@mui/joy/Box';
import Card from '@mui/joy/Card';
import List from '@mui/joy/List';
import ListItem from '@mui/joy/ListItem';
import ListItemContent from '@mui/joy/ListItemContent';
import ListItemDecorator from '@mui/joy/ListItemDecorator';
import Typography from '@mui/joy/Typography';
import { Fan as FanIcon } from '@phosphor-icons/react/dist/ssr/Fan';
import { FilmScript as FilmScriptIcon } from '@phosphor-icons/react/dist/ssr/FilmScript';
import { LightbulbFilament as LightbulbFilamentIcon } from '@phosphor-icons/react/dist/ssr/LightbulbFilament';
import { SpeakerHifi as SpeakerHifiIcon } from '@phosphor-icons/react/dist/ssr/SpeakerHifi';
import { TelevisionSimple as TelevisionSimpleIcon } from '@phosphor-icons/react/dist/ssr/TelevisionSimple';
import { VideoCamera as VideoCameraIcon } from '@phosphor-icons/react/dist/ssr/VideoCamera';
import { WifiHigh as WifiHighIcon } from '@phosphor-icons/react/dist/ssr/WifiHigh';
import { Wind as WindIcon } from '@phosphor-icons/react/dist/ssr/Wind';
import { Bar, BarChart, CartesianGrid, ResponsiveContainer, XAxis, YAxis } from 'recharts';

import { NoSsr } from '@/components/core/no-ssr';

const iconsMapping = {
  'smart-tv': TelevisionSimpleIcon,
  'air-conditioner': WindIcon,
  'smart-lamp': LightbulbFilamentIcon,
  'smart-fans': FanIcon,
  speaker: SpeakerHifiIcon,
  cctv: VideoCameraIcon,
  refrigerator: FilmScriptIcon,
  wifi: WifiHighIcon,
};

export function PowerUsageByDevice({ data = [], dataByDevice = [] }) {
  const chartHeight = 240;

  return (
    <Card>
      <Typography level="h4">Power Consumption</Typography>
      <NoSsr fallback={<Box sx={{ height: `${chartHeight}px` }} />}>
        <ResponsiveContainer height={chartHeight} width="100%">
          <BarChart data={data} margin={{ top: 0, right: 0, bottom: 0, left: -20 }}>
            <CartesianGrid strokeDasharray="4 4" vertical={false} />
            <XAxis axisLine={false} dataKey="name" tickLine={false} type="category" />
            <YAxis axisLine={false} domain={[0, 1000]} tickLine={false} type="number" />
            <Bar
              animationDuration={300}
              barSize={16}
              dataKey="value"
              fill="var(--joy-palette-primary-solidBg)"
              name="Direct"
              radius={[6, 6, 6, 6]}
            />
          </BarChart>
        </ResponsiveContainer>
      </NoSsr>
      <Typography level="h4">Device Power Consumption</Typography>
      <List sx={{ '--List-padding': 0, '--ListItem-paddingX': 0, '--ListItemDecorator-size': '56px' }}>
        {dataByDevice.map((device) => {
          const Icon = iconsMapping[device.type];

          return (
            <ListItem key={device.id}>
              <ListItemDecorator>
                <Avatar sx={{ '--Avatar-radius': 'var(--joy-radius-sm)' }}>
                  {Icon ? <Icon fontSize="var(--Icon-fontSize)" weight="bold" /> : null}
                </Avatar>
              </ListItemDecorator>
              <ListItemContent>
                <Typography level="title-sm">{device.name}</Typography>
                <Typography level="body-sm">{device.units} units</Typography>
              </ListItemContent>
              <Typography level="body-xs">{device.value}kWh</Typography>
            </ListItem>
          );
        })}
      </List>
    </Card>
  );
}
