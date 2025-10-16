import { useState, useEffect } from 'react'
import AspectRatio from '@mui/joy/AspectRatio'
import Box from '@mui/joy/Box'
import IconButton from '@mui/joy/IconButton'
import Avatar from '@mui/joy/Avatar'
import Stack from '@mui/joy/Stack'
import Typography from '@mui/joy/Typography'
import Breadcrumbs from '@mui/joy/Breadcrumbs'
import Link from '@mui/joy/Link'
import Table from '@mui/joy/Table'
import Divider from '@mui/joy/Divider'
import HomeRoundedIcon from '@mui/icons-material/HomeRounded'
import ChevronRightRoundedIcon from '@mui/icons-material/ChevronRightRounded'
import Favorite from '@mui/icons-material/Favorite'
import WarningIcon from '@mui/icons-material/Warning'
import CheckCircleIcon from '@mui/icons-material/CheckCircle'
import Alert from '@mui/joy/Alert'
import Sheet from '@mui/joy/Sheet'
import CloseIcon from '@mui/icons-material/Close'
import InfoIcon from '@mui/icons-material/Info'
import Card from '@mui/joy/Card'
import CardActions from '@mui/joy/CardActions'
import Button from '@mui/joy/Button'
import Confetti from 'react-confetti'
import yaySound from './assets/yaay.mp3';


export default function Profile() {
    const [hints, setHints] = useState(false);
    const [error, setError] = useState('');
    const [loaded, setLoaded] = useState(false);
    const [userData, setUserData] = useState({});
    const [success, setSuccess] = useState('');
    const [confetti, setConfetti] = useState(false);
    const [yay] = useState(new Audio(yaySound));
    const { innerWidth, innerHeight } = window;
    const elem = document.getElementById('main');
    const userInfo = {
        f_name: elem.getAttribute('f_name'),
        l_name: elem.getAttribute('l_name'),
        role: elem.getAttribute('role'),
        email: elem.getAttribute('email'),
        bio: elem.getAttribute('bio'),
        tz: elem.getAttribute('tz')
    }
    const current_path = window.location.pathname.split('/');
    const current_dir = current_path[current_path.length - 1];
    useEffect(() => {
        function fetch_profile() {
            setLoaded(false);
            fetch(
                current_dir == 'profile'
                    ? '/api/a3/xss_stored/profile'
                    : '/api/a3/xss_stored/profile/' + current_dir
            ).then(res => res.json()).then(res => {
                setUserData(res.user_data);
                setLoaded(true);
                let FLAG = '';
                if (res.user_data.FLAG_1) {
                    FLAG += '\nFLAG_1/2:\n' + res.user_data.FLAG_1;
                    setSuccess('Congratulations!' + FLAG);
                }
                if (res.user_data.FLAG_2) {
                    yay.play();
                    FLAG += '\nFLAG_2/2:\n' + res.user_data.FLAG_2;
                    setSuccess('Congratulations!' + FLAG);
                    setConfetti(true);
                } else {
                    setTimeout(fetch_profile, 3000);
                }
                
            });
        }
        fetch_profile();
    }, [setUserData, setLoaded, current_dir])

    return (
        <Box sx={{ flex: 1, width: '100%', height: '100vh', overflow: 'auto' }}>

            <Box
                sx={{
                    position: 'relative',
                    bgcolor: 'background.body',
                    mt: 1
                }}
            >
                <Box sx={{ px: { xs: 2, md: 6 } }}>
                    {confetti && <Confetti
                        width={innerWidth}
                        height={innerHeight}
                        recycle={false}
                        numberOfPieces={150}
                        tweenDuration={3000}
                        gravity={0.3}
                        onConfettiComplete={() => setConfetti(false)}
                    />}
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
                        {current_dir == 'profile' ? (
                            <Typography color='primary' fontWeight={500} fontSize={12}>
                                My profile
                            </Typography>
                        ) : (
                            <Link
                                underline='hover'
                                color='primary'
                                href='/a3/xss_stored/profile'
                                fontSize={12}
                                fontWeight={500}
                            >
                                My profile
                            </Link>
                        )}

                        <Link
                            underline='hover'
                            color='neutral'
                            href='edit'
                            fontSize={12}
                            fontWeight={500}
                        >
                            Edit my profile
                        </Link>
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
                    mt: 10,
                    px: { xs: 2, md: 6 },
                    py: { xs: 2, md: 3 }
                }}
            >
                <Card sx={{ position: 'relative' }}>
                    <Stack
                        direction='row'
                        gap={1.5}
                        sx={{
                            position: 'relative',
                            width: '100%',
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignContent: 'center',
                            alignItems: 'center',
                            flexDirection: 'column',
                            flexWrap: 'nowrap'
                        }}
                    >
                        <AspectRatio
                            ratio='1'
                            sx={{
                                flex: 1,
                                width: 120,
                                height: 120,
                                borderRadius: '100%',
                                mt: '-80px'
                            }}
                        >
                            <Avatar variant='outlined' />
                        </AspectRatio>
                        <IconButton
                            size='sm'
                            loading={!loaded}
                            variant='solid'
                            color='danger'
                            sx={{
                                position: 'absolute',
                                zIndex: 2,
                                borderRadius: '50%',
                                ml: 10,
                                mt: 1,
                                boxShadow: 'sm'
                            }}
                            onClick={() =>
                                fetch(
                                    current_dir == 'profile'
                                        ? '/api/a3/xss_stored/like/58263966'
                                        : '/api/a3/xss_stored/like/' + current_dir
                                )
                                    .then(res => res.json())
                                    .then(res => {
                                        if (res.status == 'success') {
                                            setSuccess(res.message);
                                        } else {
                                            setError(res.message);
                                        }
                                    })
                            }
                        >
                            <Favorite />
                        </IconButton>
                        <Typography level='h1'>
                            {userInfo.f_name} {userInfo.l_name}
                        </Typography>
                        {success && (
                            <Alert
                                startDecorator={<CheckCircleIcon />}
                                sx={{ py: 2, width: '100%', wordWrap: 'break-word', wordBreak: 'break-word', whiteSpace: 'pre-wrap' }}
                                variant="soft"
                                component="pre"
                                color="success"
                                endDecorator={
                                    <IconButton
                                        variant="soft"
                                        size="sm"
                                        color="success"
                                        onClick={() => setSuccess('')}
                                    ><CloseIcon /></IconButton>}
                            >{success}</Alert>
                        )}
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
                                variant='soft'
                                component='pre'
                                color='neutral'
                                sx={{
                                    py: 2,
                                    width: '100%'
                                }}
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
                        <Sheet
                            onClick={() => window.location.reload()}
                            sx={{
                                bgcolor: 'background.level1',
                                borderRadius: 'sm',
                                cursor: 'pointer',
                                p: 1.5,
                                display: 'flex',
                                position: { xs: 'relative', sm: 'absolute' },
                                top: 0,
                                textAlign: 'center',
                                right: 0,
                                gap: 2,
                                '& > div': { flex: 1 }
                            }}
                        >
                            <div>
                                <Typography level='body-xs' fontWeight='lg'>
                                    Following
                                </Typography>
                                <Typography fontWeight='lg'>
                                    {userData.following?.length}
                                </Typography>
                            </div>
                            <div>
                                <Typography level='body-xs' fontWeight='lg'>
                                    Followers
                                </Typography>
                                <Typography fontWeight='lg'>
                                    {userData.followers?.length}
                                </Typography>
                            </div>
                        </Sheet>
                        <Typography
                            level='body-sm'
                            fontWeight='lg'
                            textColor='text.tertiary'
                        >
                            {userInfo.role}
                        </Typography>
                        <Box sx={{ mb: 1 }}>
                            <Typography level='title-md' textAlign='center'>
                                Bio
                            </Typography>
                            <Typography level='body-sm'>{userInfo.bio}</Typography>
                        </Box>
                        <Divider />
                        <Box>
                            <Typography level='title-md' textAlign='center' sx={{ mb: 2 }}>
                                Latest Activities
                            </Typography>
                            <Card sx={{ mb: 1, pt: 0.5 }}>
                                <Table aria-label='striped table' stripe='odd'>
                                    <thead>
                                        <tr>
                                            <th style={{ width: '12.5%' }}>User</th>
                                            <th style={{ width: '52.5%' }}>Activity</th>
                                            <th style={{ width: '30%' }}>Date</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {userData.last_actions
                                            ?.toReversed()
                                            .map((activity, activityKey) => (
                                                <tr key={activityKey}>
                                                    <td>{activity.split('-')[0]}</td>
                                                    <td>{activity.split('-')[1]}</td>
                                                    <td>{activity.split('-')[2]}</td>
                                                </tr>
                                            ))}
                                    </tbody>
                                </Table>
                            </Card>
                        </Box>
                        <CardActions sx={{ alignSelf: 'flex-end', pt: 0, mb: 1, mt: 0.5 }}>
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
                                color='danger'
                                onClick={() =>
                                    fetch('/api/a3/xss_stored/reset')
                                        .then(res => res.json())
                                        .then(res => window.location.reload())
                                }
                            >
                                Reset
                            </Button>
                        </CardActions>
                    </Stack>
                </Card>
            </Stack>
        </Box>
    )
}
