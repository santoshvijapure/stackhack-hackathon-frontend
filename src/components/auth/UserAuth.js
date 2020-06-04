import React, { useState } from 'react';

import axios from 'axios';
//material components
import { TextField, Button, Container, LinearProgress, Tabs, Tab, Paper } from '@material-ui/core';
//material Icons
import PersonAddIcon from '@material-ui/icons/PersonAdd';
import PersonIcon from '@material-ui/icons/Person';
// snackbar lib
import { useSnackbar } from 'notistack';
import TabPanel from './TabPanel';

import { useAuthStyles, useLoadingStyle } from '../helper/styles';

export default function IconLabelTabs({ setisLoggedIn }) {
	//styles
	const classes = useAuthStyles();
	const loaderClasses = useLoadingStyle();
	// to show the loader while loading
	const [ isLoading, setisLoading ] = useState(false);
	//to show the snackbar
	const { enqueueSnackbar } = useSnackbar();
	// to detect the change in tabs (signIn/Signup)
	const [ value, setValue ] = useState(0);
	//to store the email and password
	const [ state, setState ] = useState({
		email: '',
		password: ''
	});
	//change the tab from signup/signin to signin/signup
	const handleChange = (event, newValue) => {
		setValue(newValue);
	};
	//to store change in email id or password
	const handleChangeForm = (e) => {
		setState({ ...state, [e.target.name]: e.target.value });
	};
	//Handle sign in
	const signIn = (e) => {
		e.preventDefault();
		setisLoading(true);
		let url = 'https://to-do-stackhack.herokuapp.com/api/v1/auth/signin';
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
	//handle Sign Up
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
				enqueueSnackbar('User created successfully!', {
					variant: 'success'
				});
				setisLoading(false);
				setValue(0);
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
