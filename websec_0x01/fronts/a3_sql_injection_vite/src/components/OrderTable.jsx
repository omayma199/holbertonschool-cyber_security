/* eslint-disable jsx-a11y/anchor-is-valid */
import { useState, useEffect, Fragment } from 'react'
import {
    Avatar,
    Box,
    Button,
    Chip,
    FormControl,
    FormLabel,
    Link,
    Input,
    Select,
    Option,
    Table,
    Typography,
    Checkbox,
    Sheet
} from '@mui/joy'
import IconButton, { iconButtonClasses } from '@mui/joy/IconButton'
import SearchIcon from '@mui/icons-material/Search'
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown'
import CheckRoundedIcon from '@mui/icons-material/CheckRounded'
import BlockIcon from '@mui/icons-material/Block'
import AutorenewRoundedIcon from '@mui/icons-material/AutorenewRounded'
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight'
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft'
import RunningWithErrorsIcon from '@mui/icons-material/RunningWithErrors';




export default function OrderTable() {
    const [order, setOrder] = useState('desc')
    const [selected, setSelected] = useState([])
    const [open, setOpen] = useState(false)
    const [page, setPage] = useState(0)
    const [rows_default, setRows_default] = useState([])
    const [rows, setRows] = useState(rows_default.slice(0, 10))
    const [customers, setCustomers] = useState([])
    const setRow = pageId => {
        setPage(pageId)
        setRows([...rows_default.slice(pageId * 10, pageId * 10 + 10)])
    }
    const resetDefault = (defaults) => {
        setRows_default(defaults)
        setRows(defaults.slice(0, 10))
        setPage(0)
    }
    const fetch_rows = (url) => fetch(url).then((res) => res.json()).then((res) => {
        resetDefault(res.map((row) => {
            return {
                id: row[0],
                date: row[1],
                status: row[2],
                customer: {
                    name: row[3],
                    email: row[4]
                }
            }
        }))
    })
    useEffect(() => {
        fetch_rows('/api/a3/sql_injection/all_orders')
        fetch('/api/a3/sql_injection/all_customers').then((res) => res.json()).then((res) => setCustomers(res))
    }, [])
    return (
        <Fragment>
            <Box
                className='SearchAndFilters-tabletUp'
                sx={{
                    borderRadius: 'sm',
                    py: 2,
                    display: 'flex',
                    flexWrap: 'wrap',
                    gap: 1.5,
                    '& > *': {
                        minWidth: { xs: '120px', md: '160px' }
                    }
                }}
            >
                <FormControl sx={{ flex: 1 }} size='sm'>
                    <FormLabel>Search for order</FormLabel>
                    <Input
                        size='sm'
                        placeholder='Search'
                        startDecorator={<SearchIcon />}
                        onKeyUp={async ({ target }) => {
                            await fetch_rows(`/api/a3/sql_injection/all_orders?search=${target.value}`)
                        }}
                    />
                </FormControl>
                <Fragment>
                    <FormControl size='sm'>
                        <FormLabel>Status</FormLabel>
                        <Select
                            size='sm'
                            placeholder='Filter by status'
                            slotProps={{ button: { sx: { whiteSpace: 'nowrap' } } }}
                            onChange={async (_, value) => {
                                await fetch_rows(`/api/a3/sql_injection/all_orders?status=${value}`)
                            }}
                        >
                            <Option value=''>All</Option>
                            <Option value='paid'>Paid</Option>
                            <Option value='pending'>Pending</Option>
                            <Option value='refunded'>Refunded</Option>
                            <Option value='cancelled'>Cancelled</Option>
                        </Select>
                    </FormControl>
                    <FormControl size='sm'>
                        <FormLabel>Customer</FormLabel>
                        <Select size='sm' placeholder='All' onChange={async (_, value) => {
                            await fetch_rows(`/api/a3/sql_injection/all_orders?customer=${value}`)
                        }}>
                            <Option value=''>All</Option>
                            {customers.map((customer, customerId) => (
                                <Option value={customer.toLowerCase()} key={customerId}>
                                    {customer}
                                </Option>
                            ))}
                        </Select>
                    </FormControl>
                </Fragment>
            </Box>
            <Sheet
                className='OrderTableContainer'
                variant='outlined'
                sx={{
                    display: 'initial',
                    width: '100%',
                    borderRadius: 'sm',
                    flexShrink: 1,
                    overflow: 'auto',
                    minHeight: 0
                }}
            >
                <Table
                    aria-labelledby='tableTitle'
                    stickyHeader
                    hoverRow
                    sx={{
                        '--TableCell-headBackground':
                            'var(--joy-palette-background-level1)',
                        '--Table-headerUnderlineThickness': '1px',
                        '--TableRow-hoverBackground':
                            'var(--joy-palette-background-level1)',
                        '--TableCell-paddingY': '4px',
                        '--TableCell-paddingX': '8px'
                    }}
                >
                    <thead>
                        <tr>
                            <th
                                style={{ width: 80, padding: '12px 6px', textAlign: 'center' }}
                            >
                                <Link
                                    underline='none'
                                    color='primary'
                                    component='button'
                                    onClick={() => {
                                        setOrder(order === 'asc' ? 'desc' : 'asc')
                                        setRows(rows.reverse())
                                    }}
                                    fontWeight='lg'
                                    endDecorator={<ArrowDropDownIcon />}
                                    sx={{
                                        '& svg': {
                                            transition: '0.2s',
                                            transform:
                                                order === 'desc' ? 'rotate(0deg)' : 'rotate(180deg)'
                                        }
                                    }}
                                >
                                    Invoice
                                </Link>
                            </th>
                            <th style={{ width: 140, padding: '12px 6px' }}>Date</th>
                            <th style={{ width: 140, padding: '12px 6px' }}>Status</th>
                            <th style={{ width: 240, padding: '12px 6px' }}>Customer</th>
                        </tr>
                    </thead>
                    <tbody>
                        {rows.map(row => (
                            <tr key={row.id}>
                                <td>
                                    <Typography
                                        level='body-xs'
                                        sx={{ textAlign: 'center', pr: 7 }}
                                    >
                                        {row.id}
                                    </Typography>
                                </td>
                                <td>
                                    <Typography level='body-xs'>{row.date}</Typography>
                                </td>
                                <td>
                                    <Chip
                                        variant='soft'
                                        size='sm'
                                        startDecorator={
                                            {
                                                Paid: <CheckRoundedIcon />,
                                                Refunded: <AutorenewRoundedIcon />,
                                                Cancelled: <BlockIcon />,
                                                Pending: <RunningWithErrorsIcon />
                                            }[row.status]
                                        }
                                        color={
                                            {
                                                Paid: 'success',
                                                Refunded: 'neutral',
                                                Cancelled: 'danger',
                                                Pending: 'warning'
                                            }[row.status]
                                        }
                                    >
                                        {row.status}
                                    </Chip>
                                </td>
                                <td>
                                    <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
                                        <Avatar size='sm'>{row.customer.initial}</Avatar>
                                        <div>
                                            <Typography level='body-xs'>
                                                {row.customer.name}
                                            </Typography>
                                            <Typography level='body-xs'>
                                                {row.customer.email}
                                            </Typography>
                                        </div>
                                    </Box>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            </Sheet>
            <Box
                className='Pagination-laptopUp'
                sx={{
                    pt: 2,
                    gap: 1,
                    [`& .${iconButtonClasses.root}`]: { borderRadius: '50%' },
                    display: 'flex'
                }}
            >
                <Button
                    size='sm'
                    variant='outlined'
                    color='neutral'
                    startDecorator={<KeyboardArrowLeftIcon />}
                    onClick={() => setRow(page - 1)}
                    disabled={page > 0 ? false : true}
                >
                    Previous
                </Button>

                <Box sx={{ flex: 1 }} />
                {[...Array(Math.ceil(rows_default.length / 10))].map((_, pageId) => (
                    <IconButton
                        key={pageId}
                        size='sm'
                        variant={page == pageId ? 'plain' : 'outlined'}
                        color='neutral'
                        onClick={() => setRow(pageId)}
                    >
                        {pageId}
                    </IconButton>
                ))}
                <Box sx={{ flex: 1 }} />

                <Button
                    size='sm'
                    variant='outlined'
                    color='neutral'
                    endDecorator={<KeyboardArrowRightIcon />}
                    onClick={() => setRow(page + 1)}
                    disabled={Math.ceil(rows_default.length / 10) - 1 > page ? false : true}
                >
                    Next
                </Button>
            </Box>
        </Fragment>
    )
}
