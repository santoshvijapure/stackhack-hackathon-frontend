import React, { useState } from 'react';
import Paper from '@material-ui/core/Paper';

import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import TabPanel from './TabPanel';

import { TextField, Button, Container } from '@material-ui/core';
import PersonAddIcon from '@material-ui/icons/PersonAdd';
import PersonIcon from '@material-ui/icons/Person';

import LinearProgress from '@material-ui/core/LinearProgress';

import { useLoadingStyle } from '../helper/styles';
import { useAuthStyles } from '../helper/styles';

import { useSnackbar } from 'notistack';

import axios from 'axios';

export default function IconLabelTabs({ setisLoggedIn }) {
	const loaderClasses = useLoadingStyle();
	const [ isLoading, setisLoading ] = useState(false);

	const { enqueueSnackbar } = useSnackbar();

	const classes = useAuthStyles();

	const [ value, setValue ] = React.useState(0);

	const [ state, setState ] = useState({
		email: '',
		password: ''
	});

	const handleChange = (event, newValue) => {
		setValue(newValue);
	};
	const handleChangeForm = (e) => {
		setState({ ...state, [e.target.name]: e.target.value });
	};
	const signIn = (e) => {
		e.preventDefault();
		setisLoading(true);
		let url = 'https://to-do-stackhack.herokuapp.com/api/v1/auth/signin';
		console.log('initiated', state);
		axios
			.post(url, {
				email: state.email,
				password: state.password
			})
			.then(({ data }) => {
				window.localStorage.setItem('token', data.data.token);
				window.localStorage.setItem('user', data.data.user);
				setisLoading(false);
				enqueueSnackbar('User Logged in successfully!', {
					variant: 'success'
				});
				setisLoggedIn(true);
			})
			.catch((e) => {
				setisLoading(false);
				enqueueSnackbar('Email or password is wrong', {
					variant: 'error'
				});
			});
	};
	const signUp = (e) => {
		e.preventDefault();
		setisLoading(true);

		let url = 'https://to-do-stackhack.herokuapp.com/api/v1/auth/signup';
		axios
			.post(url, {
				email: state.email,
				password: state.password
			})
			.then((user) => {
				console.log(user);
				enqueueSnackbar('User created successfully!', {
					variant: 'success'
				});
				setisLoading(false);
				// setValue(0);
			})
			.catch((e) => {
				console.log(e);
				enqueueSnackbar('User already exists!!!', {
					variant: 'error'
				});
				setisLoading(false);
			});
	};

	return (
		<Container maxWidth="sm">
			<Paper square={false} className={classes.root}>
				<Tabs
					value={value}
					onChange={handleChange}
					variant="fullWidth"
					indicatorColor="secondary"
					textColor="secondary"
					aria-label="icon label tabs example"
				>
					<Tab icon={<PersonIcon />} label="SIGN IN" />
					<Tab icon={<PersonAddIcon />} label="SIGN UP" />
				</Tabs>

				<TabPanel value={value} index={0}>
					<form onSubmit={(e) => signIn(e)}>
						<TextField
							id="filled-secondary"
							name="email"
							label="Enter email"
							variant="filled"
							color="secondary"
							fullWidth={true}
							type="email"
							onChange={handleChangeForm}
							required={true}
						/>
						<br />
						<TextField
							id="filled-secondary"
							name="password"
							label="Enter Password"
							variant="filled"
							color="secondary"
							fullWidth={true}
							type="password"
							onChange={handleChangeForm}
							required={true}
						/>
						<Button variant="contained" type="submit" fullWidth={true} color="primary">
							Sign In
						</Button>
					</form>
				</TabPanel>
				<TabPanel value={value} index={1}>
					<form onSubmit={(e) => signUp(e)}>
						<TextField
							id="filled-secondary"
							name="email"
							label="Enter email"
							variant="filled"
							color="secondary"
							fullWidth={true}
							type="email"
							onChange={handleChangeForm}
							required={true}
						/>
						<br />
						<TextField
							id="filled-secondary"
							name="password"
							label="Choose Password"
							variant="filled"
							color="secondary"
							fullWidth={true}
							type="password"
							onChange={handleChangeForm}
							required={true}
						/>
						<Button variant="contained" type="submit" fullWidth={true} color="primary">
							Sign Up
						</Button>
					</form>
				</TabPanel>
				{/* progress bar */}
				<div className={loaderClasses.root}>{isLoading ? <LinearProgress color="secondary" /> : null}</div>
			</Paper>
		</Container>
	);
}
