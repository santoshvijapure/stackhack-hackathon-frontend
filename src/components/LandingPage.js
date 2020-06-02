import React, { useState, useEffect } from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import TodoTable from './MaterialTable';
import UserAuth from './auth/UserAuth';
import { isLogged, handleLogOut } from './helper/auth';
import { useLandingStyles, useBackDropStyles } from './helper/styles';
import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';

export default function ButtonAppBar() {
	const [ isLoggedIn, setisLoggedIn ] = useState(false);
	const classes = useLandingStyles();
	const backDropClasses = useBackDropStyles();
	const [ open, setOpen ] = React.useState(true);

	useEffect(() => {
		setisLoggedIn(isLogged);
		setTimeout(() => {
			setOpen(false);
		}, 1000);
	}, []);

	const handleClick = () => {
		if (isLoggedIn) {
			setOpen(true)
			setisLoggedIn(handleLogOut());
			setTimeout(() => {
				setOpen(false);
			}, 1000);
		}
	};

	return (
		<div>
			<Backdrop className={backDropClasses.backdrop} open={open}>
				<CircularProgress color="inherit" />
			</Backdrop>
			<div className={classes.root}>
				<AppBar position="static">
					<Toolbar>
						<Typography variant="h6" className={classes.title}>
							TO-DO
						</Typography>
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
