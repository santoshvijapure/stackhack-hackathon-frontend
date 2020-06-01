import React, { useState, useEffect } from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import TodoTable from './MaterialTable';
import UserAuth from './auth/UserAuth';
import { isLogged, handleLogOut } from './helper/auth';
import { useLandingStyles } from './helper/styles';
export default function ButtonAppBar() {
	const [ isLoggedIn, setisLoggedIn ] = useState(false);
	const classes = useLandingStyles();

	useEffect(() => {
		setisLoggedIn(isLogged);
	}, []);

	const handleClick = () => {
		if (isLoggedIn) {
			setisLoggedIn(handleLogOut());
		}
	};

	return (
		<div>
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
