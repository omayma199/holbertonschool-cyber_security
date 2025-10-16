import { useState, useEffect } from 'react'
import AspectRatio from '@mui/joy/AspectRatio'
import Box from '@mui/joy/Box'
import Button from '@mui/joy/Button'
import Divider from '@mui/joy/Divider'
import FormControl from '@mui/joy/FormControl'
import FormLabel from '@mui/joy/FormLabel'
import Input from '@mui/joy/Input'
import IconButton from '@mui/joy/IconButton'
import Avatar from '@mui/joy/Avatar'
import Stack from '@mui/joy/Stack'
import Select from '@mui/joy/Select'
import Option from '@mui/joy/Option'
import Typography from '@mui/joy/Typography'
import Breadcrumbs from '@mui/joy/Breadcrumbs'
import Link from '@mui/joy/Link'
import Card from '@mui/joy/Card'
import CardActions from '@mui/joy/CardActions'
import CardOverflow from '@mui/joy/CardOverflow'
import HomeRoundedIcon from '@mui/icons-material/HomeRounded'
import ChevronRightRoundedIcon from '@mui/icons-material/ChevronRightRounded'
import EmailRoundedIcon from '@mui/icons-material/EmailRounded'
import AccessTimeFilledRoundedIcon from '@mui/icons-material/AccessTimeFilledRounded'
import EditRoundedIcon from '@mui/icons-material/EditRounded'
import Alert from '@mui/joy/Alert'
import CloseIcon from '@mui/icons-material/Close'
import InfoIcon from '@mui/icons-material/Info'


const bearer_token = document.getElementById('main').getAttribute('csrf-token');
const user_info = {};


export default function MyProfile() {
    const [hints, setHints] = useState(false);
    const [loaded, setLoaded] = useState(false);
    useEffect(() => {
        fetch('/api/a2/crypto_encoding_failure/profile', {
            headers: {'Authorization': `bearer ${bearer_token}`}
        }).then((res) => res.json()).then((res) => {
            user_info.f_name = res.f_name;
            user_info.l_name = res.l_name;
            user_info.email = res.email;
            user_info.role = res.role;
            setLoaded(true);
        });
    }, [user_info, setLoaded])
    return (
        <Box sx={{ flex: 1, width: '100%', maxHeight: '100vh', overflow: 'auto' }}>
            <Box
                sx={{
                    position: 'relative',
                    bgcolor: 'background.body',
                    mt: 1
                }}
            >
                <Box sx={{ px: { xs: 2, md: 6 } }}>
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
                            href='#some-link'
                            fontSize={12}
                            fontWeight={500}
                        >
                            Users
                        </Link>
                        <Typography color='primary' fontWeight={500} fontSize={12}>
                            My profile
                        </Typography>
                    </Breadcrumbs>
                    <Typography level='h2' component='h1' sx={{ mt: 1, mb: 2 }}>
                        My profile
                    </Typography>
                </Box>
            </Box>
            <Stack
                spacing={4}
                sx={{
                    display: 'flex',
                    maxWidth: '800px',
                    mx: 'auto',
                    px: { xs: 2, md: 6 },
                    py: { xs: 2, md: 3 }
                }}
            >
                {hints && (
                        <Alert
                            startDecorator={<InfoIcon />}
                            sx={{ my: 1, py: 2 }}
                            variant='soft'
                            component='pre'
                            color='neutral'
                            endDecorator={
                                <IconButton
                                    variant='soft'
                                    size='sm'
                                    color='neutral'
                                    onClick={() => setHints('')}
                                >
                                    <CloseIcon />
                                </IconButton>
                            }
                        >{hints}
                    </Alert>)}
                <Card>
                    <Box sx={{ mb: 1 }}>
                        <Typography level='title-md'>Personal info</Typography>
                        <Typography level='body-sm'>
                            Customize how your profile information will apper to the networks.
                        </Typography>
                    </Box>
                    <Divider />
                    <Stack direction='column' spacing={2} sx={{ display: 'flex', my: 1 }}>
                        <Stack direction='row' spacing={2}>
                            <Stack direction='column' spacing={1}>
                                <AspectRatio
                                    ratio='1'
                                    maxHeight={100}
                                    sx={{ flex: 1, minWidth: 100, borderRadius: '100%' }}
                                >
                                    <Avatar variant='plein'/>
                                </AspectRatio>
                                <IconButton
                                    loading={!loaded}
                                    aria-label='upload new picture'
                                    size='sm'
                                    disabled
                                    variant='outlined'
                                    color='neutral'
                                    sx={{
                                        bgcolor: 'background.body',
                                        position: 'absolute',
                                        zIndex: 2,
                                        borderRadius: '50%',
                                        left: 85,
                                        top: 180,
                                        boxShadow: 'sm'
                                    }}
                                >
                                    <EditRoundedIcon />
                                </IconButton>
                            </Stack>
                            <Stack spacing={1} sx={{ flexGrow: 1 }}>
                                <FormLabel>Name</FormLabel>
                                <FormControl
                                    sx={{
                                        display: {
                                            sm: 'flex-column',
                                            md: 'flex-row'
                                        },
                                        gap: 2
                                    }}
                                >
                                    <Input
                                        size='sm'
                                        placeholder='First name'
                                        value={user_info.f_name}
                                        disabled
                                    />
                                </FormControl>
                                <FormControl
                                    sx={{
                                        display: {
                                            sm: 'flex-column',
                                            md: 'flex-row'
                                        },
                                        gap: 2
                                    }}
                                >
                                    <Input
                                        size='sm'
                                        placeholder='Last name'
                                        value={user_info.l_name}
                                        disabled
                                    />
                                </FormControl>
                            </Stack>
                        </Stack>
                        <FormControl>
                            <FormLabel>Role</FormLabel>
                            <Input size='sm' value={user_info.role} disabled />
                        </FormControl>
                        <FormControl sx={{ flexGrow: 1 }}>
                            <FormLabel>Email</FormLabel>
                            <Input
                                size='sm'
                                type='email'
                                disabled
                                startDecorator={<EmailRoundedIcon />}
                                placeholder='email'
                                value={user_info.email}
                                sx={{ flexGrow: 1 }}
                            />
                        </FormControl>
                        <div>
                            <FormControl sx={{ display: { sm: 'contents' } }}>
                                <FormLabel>Timezone</FormLabel>
                                <Select
                                    size='sm'
                                    startDecorator={<AccessTimeFilledRoundedIcon />}
                                    defaultValue='1'
                                >
                                    <Option value='1'>
                                        Tunisia Time (Tunis){' '}
                                        <Typography textColor='text.tertiary' ml={0.5}>
                                            — GMT+01:00
                                        </Typography>
                                    </Option>
                                    <Option value='2'>
                                        France Time (Paris){' '}
                                        <Typography textColor='text.tertiary' ml={0.5}>
                                            — GMT+01:00
                                        </Typography>
                                    </Option>
                                </Select>
                            </FormControl>
                        </div>
                    </Stack>
                    <CardOverflow sx={{ borderTop: '1px solid', borderColor: 'divider' }}>
                        <CardActions sx={{ alignSelf: 'flex-end', pt: 2 }}>
                            <Button
                                size='sm'
                                variant='outlined'
                                color='neutral'
                                onClick={() =>
                                    fetch('/api/a2/crypto_encoding_failure/hints')
                                        .then(res => res.json())
                                        .then(res => setHints(res.message))
                                }
                            >
                                Hints
                            </Button>
                            <Button size='sm' variant='solid'
                                component='a'
                                color='danger'
                                href="/a2/crypto_encoding_failure/login">
                                Logout
                            </Button>
                        </CardActions>
                    </CardOverflow>
                </Card>
            </Stack>
        </Box>
    )
}
