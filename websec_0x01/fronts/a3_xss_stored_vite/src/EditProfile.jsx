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
import Alert from '@mui/joy/Alert'
import CloseIcon from '@mui/icons-material/Close'
import InfoIcon from '@mui/icons-material/Info'
import Textarea from '@mui/joy/Textarea'
import FormHelperText from '@mui/joy/FormHelperText'
import WarningIcon from '@mui/icons-material/Warning';


export default function EditProfile() {
    const [hints, setHints] = useState(false);
    const [loaded, setLoaded] = useState(true);
    const [ error, setError ] = useState('');
    const elem = document.getElementById("main");
    const userInfo = {
        f_name: elem.getAttribute('f_name'),
        l_name: elem.getAttribute('l_name'),
        role: elem.getAttribute('role'),
        email: elem.getAttribute('email'),
        bio: elem.getAttribute('bio'),
        tz: elem.getAttribute('tz')
    }
    return (
        <form
            onSubmit={(event) => {
                event.preventDefault();
                setLoaded(false);
                const formData = new FormData(event.currentTarget);
                const formJson = Object.fromEntries(formData.entries());
                return fetch('/api/a3/xss_stored/update', {
                    method: 'POST',
                    credentials: 'include',
                    headers: {'content-type': 'application/json'},
                    body: JSON.stringify(formJson)
                }).then((res) => res.json()).then((res) => {
                    if (res.status == 'success') {
                        setError('');
                        setLoaded(true);
                        window.location.href = '/a3/xss_stored/profile';
                    } else {
                        setError(res.message);
                        setLoaded(true);
                    }
                });
            }}
        >
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
                            href='/a3/xss_stored/'
                            aria-label='Home'
                        >
                            <HomeRoundedIcon />
                        </Link>
                        <Link
                            underline='hover'
                            color='neutral'
                            href='profile'
                            fontSize={12}
                            fontWeight={500}
                        >
                            My profile
                        </Link>
                        <Typography color='primary' fontWeight={500} fontSize={12}>
                            Edit my profile
                        </Typography>
                    </Breadcrumbs>
                    <Typography level='h2' component='h1' sx={{ mt: 1, mb: 2 }}>
                        Edit my profile
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
                <Card>
                    <Box sx={{ mb: 1 }}>
                        <Typography level='title-md'>Personal info</Typography>
                        <Typography level='body-sm'>
                            Customize how your profile information will apper to the networks.
                        </Typography>
                    </Box>
                    <Divider />
                    <Stack direction='column' spacing={2} sx={{ display: 'flex', my: 1 }}>
                    {error && (
                        <Alert
                            startDecorator={<WarningIcon />}
                            sx={{ py: 2, width: '100%' }}
                            variant='outlined'
                            component='pre'
                            color='danger'
                            endDecorator={
                                <IconButton
                                    variant='soft'
                                    size='sm'
                                    color='danger'
                                    onClick={() => setError('')}
                                >
                                    <CloseIcon />
                                </IconButton>
                            }
                        >
                            {error}
                        </Alert>
                    )}
                    {hints && (
                        <Alert
                            startDecorator={<InfoIcon />}
                            sx={{ my: 0, py: 2 }}
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
                        >
                            {hints}
                        </Alert>
                    )}
                        <Stack direction='row' spacing={2}>
                            <Stack direction='column' spacing={1}>
                                <AspectRatio
                                    ratio='1'
                                    maxHeight={100}
                                    sx={{ flex: 1, minWidth: 100, borderRadius: '100%' }}
                                >
                                    <Avatar variant='plein' />
                                </AspectRatio>
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
                                        defaultValue={userInfo.f_name}
                                        name='f_name'
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
                                        defaultValue={userInfo.l_name}
                                        name='l_name'
                                    />
                                </FormControl>
                            </Stack>
                        </Stack>
                        <FormControl>
                            <FormLabel>Role</FormLabel>
                            <Input size='sm' defaultValue={userInfo.role} name='role' />
                        </FormControl>
                        <FormControl sx={{ flexGrow: 1 }}>
                            <FormLabel>Email</FormLabel>
                            <Input
                                size='sm'
                                type='email'
                                name='email'
                                startDecorator={<EmailRoundedIcon />}
                                placeholder='email'
                                defaultValue={userInfo.email}
                                sx={{ flexGrow: 1 }}
                            />
                        </FormControl>
                        <FormControl>
                            <FormLabel>Bio</FormLabel>
                            <Stack spacing={2} sx={{ my: 1 }}>
                                <Textarea
                                    component='div'
                                    size='sm'
                                    name='bio'
                                    defaultValue={userInfo.bio}
                                    minRows={4}
                                    sx={{ mt: 1.5 }}
                                    placeholder="I'm a Cyber Security Expert based in Tunisia. My goal is to secure all vulnerabilities in my country."
                                />
                                <FormHelperText sx={{ mt: 0.75, fontSize: 'xs' }}>
                                    275 characters left
                                </FormHelperText>
                            </Stack>
                        </FormControl>

                        <div>
                            <FormControl sx={{ display: { sm: 'contents' } }}>
                                <FormLabel>Timezone</FormLabel>
                                <Select
                                    size='sm'
                                    name='tz'
                                    startDecorator={<AccessTimeFilledRoundedIcon />}
                                    defaultValue={ userInfo.tz }
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
                            <FormControl></FormControl>
                        </div>
                    </Stack>
                    <Divider />
                    <CardOverflow>               
                        <CardActions sx={{ alignSelf: 'flex-end', mb: 1 }}>
                            <Button
                                size='sm'
                                variant='outlined'
                                color='neutral'
                                onClick={() =>
                                    fetch('/api/a3/xss_stored/hints')
                                        .then(res => res.json())
                                        .then(res => setHints(res.message))
                                }
                            >
                                Hints
                            </Button>
                            <Button
                                size='sm'
                                variant='solid'
                                color='primary'
                                type='submit'
                                loading={!loaded}
                            >
                                Update
                            </Button>
                        </CardActions>
                    </CardOverflow>
                </Card>
            </Stack>
        </Box>
        </form>
    )
}
