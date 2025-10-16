import * as React from 'react';
import Box from '@mui/joy/Box';
import Button from '@mui/joy/Button';
import Grid from '@mui/joy/Grid';
import Stack from '@mui/joy/Stack';
import Typography from '@mui/joy/Typography';
import { ArrowsLeftRight as ArrowsLeftRightIcon } from '@phosphor-icons/react/dist/ssr/ArrowsLeftRight';
import dayjs from 'dayjs';
import { Helmet } from 'react-helmet-async';

import { config } from '@/config';
import { WalletCard } from '@/components/dashboard/crypto/currency-card';
import { Earnings } from '@/components/dashboard/crypto/earnings';
import { Exchange } from '@/components/dashboard/crypto/exchange';
import { MarketStockSummary } from '@/components/dashboard/crypto/market-stock-summary';
import { MarketValues } from '@/components/dashboard/crypto/market-values';
import { News } from '@/components/dashboard/crypto/news';
import { TodayBalance } from '@/components/dashboard/crypto/today-balance';
import { Transactions } from '@/components/dashboard/crypto/transactions';

const metadata = { title: `Crypto | Dashboard | ${config.site.name}` };

export function Page() {
  return (
    <React.Fragment>
      <Helmet>
        <title>{metadata.title}</title>
      </Helmet>
      <Box sx={{ p: 'var(--Content-padding)' }}>
        <Stack spacing={3}>
          <div>
            <Typography fontSize={{ xs: 'xl3', lg: 'xl4' }} level="h1">
              Crypto
            </Typography>
          </div>
          <Stack direction="row" spacing={3}>
            <Typography level="h4" sx={{ flex: '1 1 auto' }}>
              My Wallets
            </Typography>
            <Button
              color="neutral"
              size="sm"
              startDecorator={<ArrowsLeftRightIcon fontSize="var(--Icon-fontSize)" weight="bold" />}
              variant="outlined"
            >
              Swap Wallets
            </Button>
          </Stack>
          <Grid container spacing={3}>
            {[
              { coin: 'BTC', diff: 15, trend: 'up', amount: 0.2213, value: 6693.29 },
              { coin: 'ETH', diff: 1.65, trend: 'down', amount: 1.503, value: 2892.33 },
              { coin: 'USDT', diff: 1.35, trend: 'up', amount: 5345, value: 5346.36 },
              { coin: 'SOL', diff: 5.21, trend: 'down', amount: 1.193, value: 0.33 },
            ].map((wallet) => (
              <Grid key={wallet.coin} lg={3} md={6} xs={12}>
                <WalletCard wallet={wallet} />
              </Grid>
            ))}
            <Grid lg={8} md={6} xs={12}>
              <Stack spacing={3}>
                <MarketStockSummary
                  data={[
                    {
                      low: 26738.2517444796,
                      high: 26946.7084877997,
                      open: 26871.4782582668,
                      close: 26819.9732197077,
                      timestamp: 'Jun-1',
                    },
                    {
                      low: 27159.3282741192,
                      high: 27303.8616872678,
                      open: 27186.3976171703,
                      close: 27249.5889490884,
                      timestamp: 'Jun-2',
                    },
                    {
                      low: 26958.0037399252,
                      high: 27087.8815952659,
                      open: 27068.3731631839,
                      close: 27075.1293984425,
                      timestamp: 'Jun-3',
                    },
                    {
                      low: 27080.9542346369,
                      high: 27407.0185695383,
                      open: 27250.7151698128,
                      close: 27119.0671931263,
                      timestamp: 'Jun-4',
                    },
                    {
                      low: 25528.1469109988,
                      high: 25854.0115026613,
                      open: 25636.8786098328,
                      close: 25760.0969995361,
                      timestamp: 'Jun-5',
                    },
                    {
                      low: 26948.026428213,
                      high: 27313.8206824171,
                      open: 26948.026428213,
                      close: 27238.7837262174,
                      timestamp: 'Jun-6',
                    },
                    {
                      low: 26146.9888682086,
                      high: 26458.5768553117,
                      open: 26359.066452105,
                      close: 26345.9988512669,
                      timestamp: 'Jun-7',
                    },
                    {
                      low: 26503.1982860417,
                      high: 26644.7528467845,
                      open: 26644.7528467845,
                      close: 26508.2159021565,
                      timestamp: 'Jun-8',
                    },
                    {
                      low: 26443.8385459059,
                      high: 26497.1782036902,
                      open: 26443.8385459059,
                      close: 26480.3750935951,
                      timestamp: 'Jun-9',
                    },
                    {
                      low: 25718.7222216842,
                      high: 25929.3153624082,
                      open: 25771.8240965561,
                      close: 25851.2410031697,
                      timestamp: 'Jun-10',
                    },
                    {
                      low: 25790.1466058315,
                      high: 26138.4131435369,
                      open: 26137.1781219207,
                      close: 25940.1680803434,
                      timestamp: 'Jun-11',
                    },
                    {
                      low: 25882.0751602845,
                      high: 25961.2764810689,
                      open: 25891.1526401862,
                      close: 25902.499869783,
                      timestamp: 'Jun-12',
                    },
                    {
                      low: 25808.5998293341,
                      high: 25918.9584629772,
                      open: 25846.7279180058,
                      close: 25918.7284012682,
                      timestamp: 'Jun-13',
                    },
                    {
                      low: 24922.7627651996,
                      high: 25166.3795714833,
                      open: 24922.7627651996,
                      close: 25124.6766798408,
                      timestamp: 'Jun-14',
                    },
                    {
                      low: 25503.7923006826,
                      high: 25735.3085416373,
                      open: 25558.9776030396,
                      close: 25576.3940082636,
                      timestamp: 'Jun-15',
                    },
                    {
                      low: 26274.5728999426,
                      high: 26395.740268573,
                      open: 26394.1698520528,
                      close: 26327.4623942173,
                      timestamp: 'Jun-16',
                    },
                    {
                      low: 26482.6206619351,
                      high: 26579.4132319345,
                      open: 26535.0125633852,
                      close: 26510.6764468879,
                      timestamp: 'Jun-17',
                    },
                    {
                      low: 26325.8901810201,
                      high: 26483.4892882663,
                      open: 26474.3225006799,
                      close: 26336.213003281,
                      timestamp: 'Jun-18',
                    },
                    {
                      low: 26649.1803866453,
                      high: 26851.0285455213,
                      open: 26731.25753317,
                      close: 26851.0285455213,
                      timestamp: 'Jun-19',
                    },
                    {
                      low: 28107.3914039362,
                      high: 28388.9684174993,
                      open: 28158.7884119151,
                      close: 28327.4882643282,
                      timestamp: 'Jun-20',
                    },
                    {
                      low: 29847.5420404548,
                      high: 30188.7098604389,
                      open: 29989.4845151447,
                      close: 30027.296453501,
                      timestamp: 'Jun-21',
                    },
                    {
                      low: 29908.1345803352,
                      high: 30171.6681605029,
                      open: 30161.0626634326,
                      close: 29912.281714768,
                      timestamp: 'Jun-22',
                    },
                    {
                      low: 30496.0742245593,
                      high: 30934.9741956121,
                      open: 30934.9741956121,
                      close: 30695.4694074896,
                      timestamp: 'Jun-23',
                    },
                    {
                      low: 30456.5269998219,
                      high: 30587.6001675201,
                      open: 30520.2178639407,
                      close: 30548.6948247387,
                      timestamp: 'Jun-24',
                    },
                    {
                      low: 30377.9626715795,
                      high: 30564.1463788049,
                      open: 30383.5280190759,
                      close: 30480.2616057375,
                      timestamp: 'Jun-25',
                    },
                    {
                      low: 30120.1445960753,
                      high: 30294.0366403539,
                      open: 30157.7163830783,
                      close: 30271.1310167397,
                      timestamp: 'Jun-26',
                    },
                    {
                      low: 30576.6825268889,
                      high: 30732.2694401536,
                      open: 30653.1972240568,
                      close: 30688.163854246,
                      timestamp: 'Jun-27',
                    },
                    {
                      low: 30037.9837237643,
                      high: 30194.9901932887,
                      open: 30102.0223599834,
                      close: 30086.2461885249,
                      timestamp: 'Jun-28',
                    },
                    {
                      low: 30369.3225201496,
                      high: 30516.5213529024,
                      open: 30406.3501939615,
                      close: 30445.3512260882,
                      timestamp: 'Jun-29',
                    },
                    {
                      low: 30306.3723971508,
                      high: 30511.5111579856,
                      open: 30428.9478698077,
                      close: 30393.9834057068,
                      timestamp: 'Jun-30',
                    },
                  ]}
                />
                <MarketValues
                  data={[
                    {
                      id: 'BTC',
                      name: 'Bitcoin',
                      price: 30052.6,
                      diff1d: 0.64,
                      trend1d: 'down',
                      diff7d: 1.08,
                      trend7d: 'down',
                      marketCap: '$584.6B',
                      volume1d: '$9.2B',
                      summary: [
                        28363, 30341, 31841, 32385, 33657, 27051, 29299, 26677, 28111, 27386, 26010, 33147, 33332,
                        26205, 32235, 30596, 30926, 33985, 33634, 29522,
                      ],
                    },
                    {
                      id: 'ETH',
                      name: 'Ethereum',
                      price: 1901.52,
                      diff1d: 1.14,
                      trend1d: 'down',
                      diff7d: 1.6,
                      trend7d: 'down',
                      marketCap: '$228.8B',
                      volume1d: '$4.8B',
                      summary: [
                        1649, 1820, 2073, 1746, 1958, 1621, 2049, 1940, 2050, 1934, 1605, 1859, 1808, 1950, 1955, 1605,
                        2054, 2017, 2029, 1957,
                      ],
                    },
                    {
                      id: 'SOL',
                      name: 'Solana',
                      price: 26.98,
                      diff1d: 3.56,
                      trend1d: 'down',
                      diff7d: 40.23,
                      trend7d: 'up',
                      marketCap: '$10.8B',
                      volume1d: '$740.9M',
                      summary: [16, 16, 15, 20, 21, 17, 22, 17, 21, 17, 20, 18, 20, 22, 19, 18, 27, 24, 24, 27],
                    },
                  ]}
                />
              </Stack>
            </Grid>
            <Grid lg={4} md={6} xs={12}>
              <Stack spacing={3}>
                <TodayBalance amount={14932.31} diff={13} trend="up" />
                <Exchange />
                <Earnings
                  data={[
                    { name: 'BTC', value: 70, fill: 'var(--joy-palette-warning-200)' },
                    { name: 'ETH', value: 55, fill: 'var(--joy-palette-primary-400)' },
                  ]}
                />
              </Stack>
            </Grid>
            <Grid lg={4} md={6} xs={12}>
              <News
                data={[
                  {
                    id: 'POST-001',
                    image: '/assets/news-1.png',
                    title: 'Top 7 Cryptocurrencies to Invest in as the Bull Run Approaches',
                  },
                  {
                    id: 'POST-002',
                    image: '/assets/news-2.png',
                    title: '10 Best Cryptocurrencies Of July 2023 - Forbes Advisor',
                  },
                  {
                    id: 'POST-003',
                    image: '/assets/news-3.png',
                    title:
                      '2 Cryptos That Will Offer High Returns to Their Investors in 2023: Ethereum (ETH) and InQubeta (QUBE)',
                  },
                  {
                    id: 'POST-004',
                    image: '/assets/news-4.png',
                    title: 'Crypto isn`t dead, it`s evolving rapidly to create a new world',
                  },
                  {
                    id: 'POST-005',
                    image: '/assets/news-5.png',
                    title: 'Crypto isn`t dead, it`s evolving rapidly to create a new world',
                  },
                ]}
              />
            </Grid>
            <Grid lg={8} md={6} xs={12}>
              <Transactions
                transactions={[
                  {
                    id: 'TX-005',
                    coin: 'BTC',
                    value: 432.09,
                    type: 'sell',
                    status: 'active',
                    createdAt: dayjs().subtract(5, 'minute').toDate(),
                  },
                  {
                    id: 'TX-004',
                    coin: 'ETH',
                    value: 3201.99,
                    type: 'buy',
                    status: 'active',
                    createdAt: dayjs().subtract(31, 'minute').subtract(3, 'hour').subtract(2, 'day').toDate(),
                  },
                  {
                    id: 'TX-003',
                    coin: 'SOL',
                    value: 23.07,
                    type: 'buy',
                    status: 'canceled',
                    createdAt: dayjs().subtract(28, 'minute').subtract(6, 'hour').subtract(5, 'day').toDate(),
                  },
                  {
                    id: 'TX-002',
                    coin: 'BTC',
                    value: 984.01,
                    type: 'sell',
                    status: 'active',
                    createdAt: dayjs().subtract(10, 'minute').subtract(9, 'hour').subtract(6, 'day').toDate(),
                  },
                  {
                    id: 'TX-001',
                    coin: 'BTC',
                    value: 1198.0,
                    type: 'sell',
                    status: 'completed',
                    createdAt: dayjs().subtract(54, 'minute').subtract(14, 'hour').subtract(11, 'day').toDate(),
                  },
                ]}
              />
            </Grid>
          </Grid>
        </Stack>
      </Box>
    </React.Fragment>
  );
}
