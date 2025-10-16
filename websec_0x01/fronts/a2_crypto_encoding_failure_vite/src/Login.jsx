import { useState } from 'react';
import Sheet from '@mui/joy/Sheet';
import Typography from '@mui/joy/Typography';
import FormControl from '@mui/joy/FormControl';
import FormLabel from '@mui/joy/FormLabel';
import Input from '@mui/joy/Input';
import Button from '@mui/joy/Button';
import Link from '@mui/joy/Link';
import Box from '@mui/joy/Box';
import Alert from '@mui/joy/Alert';
import WarningIcon from '@mui/icons-material/Warning';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CloseIcon from '@mui/icons-material/Close';
import IconButton from '@mui/joy/IconButton';
import Confetti from 'react-confetti'
import yaySound from './assets/yaay.mp3';


export default function Login() {
    const [ loaded, setLoaded ] = useState(true);
    const [ error, setError ] = useState('');
    const [ success, setSuccess ] = useState('');
    const [ confetti, setConfetti ] = useState(false);
    const [ yay ] = useState(new Audio(yaySound));
    const { innerWidth, innerHeight } = window;
    return (
        <form
            onSubmit={(event) => {
                event.preventDefault();
                setLoaded(false);
                const formData = new FormData(event.currentTarget);
                const formJson = Object.fromEntries(formData.entries());
                return fetch('/api/a2/crypto_encoding_failure/login', {
                    method: 'POST',
                    credentials: 'include',
                    headers: {'content-type': 'application/json'},
                    body: JSON.stringify(formJson)
                }).then((res) => res.json()).then((res) => {
                    if (res.status == 'success') {
                        setError('');
                        setConfetti(true);
                        yay.play();
                        setSuccess(res.message);
                        setLoaded(true);
                    } else {
                        setSuccess('');
                        setError(res.message);
                        setLoaded(true);
                    }
                });
            }}
        >
        <Sheet
            sx={{
                height: '100vh',
                width: '100%',
                display: 'flex',
                overflow: 'auto'
            }}
        >
            { confetti && <Confetti
                width={innerWidth}
                height={innerHeight}
                recycle={false}
                numberOfPieces={150}
                tweenDuration={3000}
                gravity={0.3}
                onConfettiComplete={() => setConfetti(false)} 
            /> }
            <Box
                sx={{
                    width: 320,
                    height: 'fit-content',
                    m: 'auto auto',
                    py: 3, // padding top & bottom
                    px: 2, // padding left & right
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 2,
                    borderRadius: 'sm',
                    boxShadow: 'md',
                }}
            >
                <div>
                    { error &&
                    <Alert
                        startDecorator={<WarningIcon />}
                        sx={{ my: 2 }}
                        variant="outlined"
                        component="pre"
                        color="danger"
                        endDecorator={
                            <IconButton
                                variant="soft"
                                size="sm"
                                color="danger"
                                onClick={() => setError('') }
                            ><CloseIcon /></IconButton>}
                    >{ error }</Alert>}
                    { success &&
                    <Alert
                        startDecorator={<CheckCircleIcon />}
                        sx={{ my: 2, wordWrap: 'break-word', wordBreak: 'break-word',  whiteSpace: 'pre-wrap' }}
                        variant="soft"
                        component="pre"
                        color="success"
                        endDecorator={
                            <IconButton
                                variant="soft"
                                size="sm"
                                color="success"
                                onClick={() => setSuccess('') }
                            ><CloseIcon /></IconButton>}
                    >{ success }</Alert>}
                    <Typography level="h4" component="h1">
                        Welcome!
                    </Typography>
                    <Typography level="body-sm">
                        Sign in to continue.
                    </Typography>
                </div>
                <FormControl>
                    <FormLabel>Username</FormLabel>
                    <Input
                        // html input attribute
                        name="username"
                        placeholder="John"
                        required
                    />
                </FormControl>
                <FormControl>
                    <FormLabel>Password</FormLabel>
                    <Input
                        name="password"
                        type="password"
                        placeholder="Password"
                        required
                    />
                </FormControl>
                <Button sx={{ mt: 1 /* margin top */ }} type='submit' loading={ loaded ? false : true}>
                    Sign in
                </Button>
                <Typography
                    endDecorator={
                        <Link
                            component='a'
                            href="/a2/crypto_encoding_failure/"
                        >
                            Return to Profile
                        </Link>}
                    fontSize="sm"
                    sx={{ alignSelf: 'center' }}
                >
                    Don't have a clue ?
                </Typography>
            </Box>
        </Sheet>
        </form>
    );
}
