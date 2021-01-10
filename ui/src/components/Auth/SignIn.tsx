import React, { useState } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Swal from 'sweetalert2';
import Axios from 'axios';
import User from '../UserInterface';

const useStyles = makeStyles((theme) => ({
	paper: {
		marginTop: theme.spacing(8),
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center',
	},
	avatar: {
		margin: theme.spacing(1),
		backgroundColor: theme.palette.secondary.main,
	},
	form: {
		width: '100%',
		marginTop: theme.spacing(1),
	},
	submit: {
		margin: theme.spacing(3, 0, 2),
	},
}));

interface SignInProps {
	setToken: (token: String) => void;
	setUser: (user: User) => void;
	setDisplayedPerson: (user: User) => void;
}

const SignIn: React.FC<SignInProps> = ({
	setToken,
	setUser,
	setDisplayedPerson,
}) => {
	const classes = useStyles();
	const [email, changeEmail] = useState('');
	const [password, changePassword] = useState('');

	const validateEmail = (): boolean | undefined => {
		let re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
		return re.test(email);
	};

	const handleLogin = (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		Axios.post(`http://${process.env.REACT_APP_HOST}/api/users/login`, {
			email: email,
			password: password,
		})
			.then((res) => res.data)
			.then(({ token, user }) => {
				setToken(token);
				setUser(user);
				setDisplayedPerson(user);
				sessionStorage.setItem('token', JSON.stringify(token));
				sessionStorage.setItem('user', JSON.stringify(user));
			})
			.catch((error) => Swal.fire('אופס!', 'סיסמה שגויה!', 'error'));
	};

	return (
		<Container component="main" maxWidth="xs" dir="rtl">
			<CssBaseline />
			<div className={classes.paper}>
				<Avatar className={classes.avatar}>
					<LockOutlinedIcon />
				</Avatar>
				<Typography component="h1" variant="h5">
					כניסה
				</Typography>
				<form className={classes.form} onSubmit={handleLogin}>
					<TextField
						variant="outlined"
						margin="normal"
						required
						fullWidth
						id="email"
						label="אימייל"
						name="email"
						autoComplete="email"
						autoFocus
						onChange={(e) => changeEmail(e.target.value)}
						error={!validateEmail() && email !== ''}
					/>
					<TextField
						variant="outlined"
						margin="normal"
						required
						fullWidth
						name="password"
						label="סיסמה"
						type="password"
						id="password"
						autoComplete="current-password"
						onChange={(e) => changePassword(e.target.value)}
					/>
					<Button
						type="submit"
						fullWidth
						variant="contained"
						color="primary"
						className={classes.submit}
					>
						התחבר
					</Button>
				</form>
			</div>
		</Container>
	);
};

export default SignIn;
