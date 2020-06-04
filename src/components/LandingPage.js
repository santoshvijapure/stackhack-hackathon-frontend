import React, { useState, useEffect } from 'react';
//material components
import { AppBar, Toolbar, Typography, Button, Backdrop, CircularProgress, Tooltip } from '@material-ui/core';
import Brightness4Icon from '@material-ui/icons/Brightness4';
// Main todo table
import TodoTable from './MaterialTable';
//UserAuth Component
import UserAuth from './auth/UserAuth';
import { isLogged, handleLogOut } from './helper/auth';
//style
import { useLandingStyles, useBackDropStyles } from './helper/styles';
//snackbar Lib
import { useSnackbar } from 'notistack';

export default function ButtonAppBar({ onToggleDark }) {
	//styles
	const classes = useLandingStyles();
	const backDropClasses = useBackDropStyles();
	//userState
	const [ isLoggedIn, setisLoggedIn ] = useState(false);

	// to set BackDrop open or Close
	const [ open, setOpen ] = useState(true);
	//snackbar
	const { enqueueSnackbar } = useSnackbar();
	useEffect(() => {
		setisLoggedIn(isLogged);
		setTimeout(() => {
			setOpen(false);
		}, 1000);
	}, []);
	// handle LogOut
	const handleClick = () => {
		if (isLoggedIn) {
			setOpen(true);
			setisLoggedIn(handleLogOut());
			enqueueSnackbar('User Logged out successfully!', {
				variant: 'success'
			});
			setTimeout(() => {
				setOpen(false);
			}, 1000);
		}
	};

	return (
		<div className="landing">
			<Backdrop className={backDropClasses.backdrop} open={open}>
				<CircularProgress color="inherit" />
			</Backdrop>
			<div className={classes.root}>
				<AppBar position="static">
					<Toolbar>
						<Typography variant="h6" className={classes.title}>
							TO-DO
						</Typography>
						<Tooltip title="Toggle dark mode" arrow>
							<Button
								onClick={() => {
									onToggleDark();
								}}
							>
								<Brightness4Icon />
							</Button>
						</Tooltip>
						<Button
							onClick={() => {
								handleClick();
							}}
							color="inherit"
						>
							{isLoggedIn ? 'logOut' : ''}
						</Button>
					</Toolbar>
				</AppBar>
			</div>
			{isLoggedIn ? <TodoTable /> : <UserAuth setisLoggedIn={setisLoggedIn} />}
		</div>
	);
}
