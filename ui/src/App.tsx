import React, { useEffect, useState } from 'react';
import NavBar from './components/NavBar';
import SignIn from './components/Auth/SignIn';
import './App.css';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import User from './components/UserInterface';
import UserContext from './userContext';
import DisplayedPersonContext from './DisplayedPersonContext';
import SocketContext from './socketContext';
import dotenv from 'dotenv';
import DisplayedInfo from './components/DisplayedInfo';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import { makeStyles } from '@material-ui/core';
import { io, Socket } from 'socket.io-client';
dotenv.config();

const theme = createMuiTheme({
	direction: 'rtl',
});

const useStyles = makeStyles((theme) => ({
	appContainer: {
		display: 'flex',
		alignItems: 'baseline',
	},
}));
const newSocket = io(`http://${process.env.REACT_APP_HOST}`, {
	transports: ['websocket'],
	upgrade: false,
});

const App = () => {
	// const classes = useStyles();
	const [socket, setSocket] = useState<Socket>(newSocket);
	const [token, setToken] = useState<String>('');
	const [user, setUser] = useState<User | null>(null);
	const [displayedPerson, setDisplayedPerson] = useState<User | null>(null);

	useEffect(() => {
		const currentToken = sessionStorage.getItem('token');
		const currentUser = sessionStorage.getItem('user');
		if (currentToken != null && currentUser != null) {
			setToken(currentToken);
			setUser(JSON.parse(currentUser));
			setDisplayedPerson(JSON.parse(currentUser));
		} else {
			sessionStorage.removeItem('token');
			sessionStorage.removeItem('user');
			setToken('');
			setUser(null);
			setDisplayedPerson(null);
		}
	}, []);

	if (!token) {
		return (
			<ThemeProvider theme={theme}>
				<div dir="rtl">
					<SignIn
						setToken={setToken}
						setUser={setUser}
						setDisplayedPerson={setDisplayedPerson}
					></SignIn>
				</div>
			</ThemeProvider>
		);
	}
	return (
		<ThemeProvider theme={theme}>
			<div className="App">
				<UserContext.Provider value={{ user, setUser }}>
					<DisplayedPersonContext.Provider
						value={{ displayedPerson, setDisplayedPerson }}
					>
						<SocketContext.Provider value={{ socket, setSocket }}>
							<BrowserRouter>
								<Switch>
									<Route path="/">
										<NavBar></NavBar>
										<DisplayedInfo />
									</Route>
								</Switch>
							</BrowserRouter>
						</SocketContext.Provider>
					</DisplayedPersonContext.Provider>
				</UserContext.Provider>
				{/* <SocketTest /> */}
			</div>
		</ThemeProvider>
	);
};

export default App;
