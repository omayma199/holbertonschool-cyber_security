import React from 'react'
import { Box, Button, Breadcrumbs, Link, Typography } from '@mui/joy'

import HomeRoundedIcon from '@mui/icons-material/HomeRounded'
import ChevronRightRoundedIcon from '@mui/icons-material/ChevronRightRounded'
import DownloadRoundedIcon from '@mui/icons-material/DownloadRounded'

import OrderTable from './components/OrderTable'

export default function JoyOrderDashboardTemplate() {
    return (
        <Box
            component='main'
            className='MainContent'
            sx={{
                px: { xs: 2, md: 6 },
                pt: {
                    xs: 'calc(12px + var(--Header-height))',
                    sm: 'calc(12px + var(--Header-height))',
                    md: 3
                },
                pb: { xs: 2, sm: 2, md: 3 },
                flex: 1,
                display: 'flex',
                flexDirection: 'column',
                minWidth: 0,
                maxHeight: '100vh',
                gap: 1,
                boxSizing: 'border-box'
            }}
        >
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <Breadcrumbs
                    size='sm'
                    aria-label='breadcrumbs'
                    separator={<ChevronRightRoundedIcon fontSize='sm' />}
                    sx={{ pl: 0 }}
                >
                    <Link
                        underline='none'
                        color='neutral'
                        href='#some-link'
                        aria-label='Home'
                    >
                        <HomeRoundedIcon />
                    </Link>
                    <Link
                        underline='hover'
                        color='neutral'
                        disabled
                        fontSize={12}
                        fontWeight={500}
                    >
                        Dashboard
                    </Link>
                    <Typography color='primary' fontWeight={500} fontSize={12}>
                        Orders
                    </Typography>
                </Breadcrumbs>
            </Box>
            <OrderTable />
        </Box>
    )
}
