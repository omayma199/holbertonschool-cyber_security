
import { useState } from 'react';
import Card from '@mui/joy/Card';
import Typography from '@mui/joy/Typography';
import FormControl from '@mui/joy/FormControl';
import FormLabel from '@mui/joy/FormLabel';
import Input from '@mui/joy/Input';
import Button from '@mui/joy/Button';


export default function Login({handleLogin, loaded}) {
	return (
		<form
			onSubmit={handleLogin}
		>
			<Card>


				<Typography level="h4" component="h1">
					Welcome!
				</Typography>
				<Typography level="body-sm">
					Sign in to access your wallet.
				</Typography>
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
				<Button sx={{ mt: 1 /* margin top */ }} type='submit' loading={loaded}>
					Sign in
				</Button>
			</Card>
		</form>
	);
}
