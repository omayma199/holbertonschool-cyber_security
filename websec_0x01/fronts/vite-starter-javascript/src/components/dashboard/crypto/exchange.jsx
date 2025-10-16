import * as React from 'react';
import Button from '@mui/joy/Button';
import Card from '@mui/joy/Card';
import FormControl from '@mui/joy/FormControl';
import FormLabel from '@mui/joy/FormLabel';
import Input from '@mui/joy/Input';
import Option from '@mui/joy/Option';
import Select from '@mui/joy/Select';
import Stack from '@mui/joy/Stack';
import Tab from '@mui/joy/Tab';
import TabList from '@mui/joy/TabList';
import Tabs from '@mui/joy/Tabs';
import Typography from '@mui/joy/Typography';

export function Exchange() {
  return (
    <Card>
      <Tabs size="sm" value="buy" variant="custom">
        <TabList>
          <Tab value="buy">Buy</Tab>
          <Tab value="sell">Sell</Tab>
        </TabList>
      </Tabs>
      <FormControl>
        <FormLabel>Chain</FormLabel>
        <Select name="chain" value="btc">
          <Option value="btc">BTC</Option>
          <Option value="eth">ETH</Option>
          <Option value="usdt">USDT</Option>
          <Option value="sol">SOL</Option>
        </Select>
      </FormControl>
      <FormControl>
        <FormLabel>Amount</FormLabel>
        <Input name="amount" type="number" value={1} />
      </FormControl>
      <Stack direction="row" spacing={2} sx={{ justifyContent: 'space-between' }}>
        <Typography level="title-md">Total</Typography>
        <Typography>
          {new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(32594.3)}
        </Typography>
      </Stack>
      <Button color="primary" variant="solid">
        Buy BTC
      </Button>
    </Card>
  );
}
