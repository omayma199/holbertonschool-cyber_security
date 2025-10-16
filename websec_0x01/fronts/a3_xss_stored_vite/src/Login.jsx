import { useState } from 'react';
import Sheet from '@mui/joy/Sheet';
import Typography from '@mui/joy/Typography';
import FormControl from '@mui/joy/FormControl';
import FormLabel from '@mui/joy/FormLabel';
import Input from '@mui/joy/Input';
import Button from '@mui/joy/Button';
import Box from '@mui/joy/Box';
import Alert from '@mui/joy/Alert';
import WarningIcon from '@mui/icons-material/Warning';
import CloseIcon from '@mui/icons-material/Close';
import IconButton from '@mui/joy/IconButton';


export default function Login() {
    const [ loaded, setLoaded ] = useState(true);
    const [ error, setError ] = useState('');
    return (
        <form
            onSubmit={(event) => {
                event.preventDefault();
                setLoaded(false);
                const formData = new FormData(event.currentTarget);
                const formJson = Object.fromEntries(formData.entries());
                return fetch('/api/a3/xss_stored/login', {
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
        <Sheet
            sx={{
                height: '100vh',
                width: '100%',
                display: 'flex',
                overflow: 'auto'
            }}
        >
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
                    <Typography level="h4" component="h1">
                        Welcome!
                    </Typography>
                    
                    <Typography level="body-sm">
                        Sign in to continue.
                    </Typography>
                    <Sheet
                            sx={{
                                bgcolor: 'background.level1',
                                borderRadius: 'sm',
                                py: 1,
                                my: 1,
                                display: 'flex',
                                textAlign: 'center',
                                gap: 0.5,
                                '& > div': { flex: 1 }
                            }}
                        >
                            <div>
                                <Typography level='body-xs' fontWeight='lg'>
                                    Username
                                </Typography>
                                <Typography fontWeight='lg'>yosri</Typography>
                            </div>
                            <div>
                                <Typography level='body-xs' fontWeight='lg'>
                                    Password
                                </Typography>
                                <Typography fontWeight='lg'>yosri</Typography>
                            </div>
                        </Sheet>
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
            </Box>
        </Sheet>
        </form>
    );
}
