import React, { useState, useEffect } from 'react';

import axios from 'axios';
//material table
import MaterialTable from 'material-table';
import { LinearProgress } from '@material-ui/core';
import { useSnackbar } from 'notistack';
import { useLoadingStyle } from './helper/styles';
// column object for table columns
import columns from './helper/columns';
export default function TodoTable() {
	// styles
	const classes = useLoadingStyle();
	// snackbar
	const { enqueueSnackbar } = useSnackbar();
	// state to store table data i.e. Todos
	const [ state, setState ] = useState([]);
	// to set the loader animation if the data is being loaded
	const [ isLoading, setisLoading ] = useState(true);
	// token and user from localstorange for API calls
	let token = window.localStorage.getItem('token');
	let user = window.localStorage.getItem('user');
	const headerConfig = {
		headers: { Authorization: `Bearer ${token}` }
	};
	useEffect(() => {
		axios
			.get('https://to-do-stackhack.herokuapp.com/api/v1/todo', headerConfig)
			.then((data) => {
				setState(data.data.data);
				setisLoading(false);
			})
			.catch((e) => {
				console.log(e);
			});
	}, []);
	// update the changes to table
	const update = () => {
		// debugger;
		axios
			.get('https://to-do-stackhack.herokuapp.com/api/v1/todo/', headerConfig)
			.then((data) => {
				setState(data.data.data);
			})
			.catch((e) => {
				console.log(e);
			});
	};

	return (
		<div>
			<div className={classes.root}>{isLoading ? <LinearProgress color="secondary" /> : null}</div>

			<MaterialTable
				title=" "
				columns={columns}
				data={state}
				editable={{
					onRowAdd: (newData) =>
						new Promise((resolve) => {
							setTimeout(() => {
								newData = { ...newData, user: user };
								axios
									.post('https://to-do-stackhack.herokuapp.com/api/v1/todo/', newData, headerConfig)
									.then((res) => {
										update();
										enqueueSnackbar(`"${res.data.data.task}" added to todo list `, {
											variant: 'success'
										});

										resolve();
									})
									.catch((e) => {
										enqueueSnackbar('Task cannot be empty ', {
											variant: 'error'
										});
										console.log(e);
										resolve();
									});
							}, 1000);
						}),
					onRowUpdate: (newData, oldData) =>
						new Promise((resolve) => {
							setTimeout(() => {
								axios
									.patch(
										`https://to-do-stackhack.herokuapp.com/api/v1/todo/${oldData._id}`,
										{
											task: newData.task,
											label: newData.label,
											priority: newData.priority,
											isImportent: newData.isImportent
										},
										headerConfig
									)
									.then((res) => {
										update();
										enqueueSnackbar(' todo updated successfully!', {
											variant: 'info'
										});
										resolve();
									})
									.catch((e) => console.log(e));
							}, 1000);
						}),
					onRowDelete: (oldData) =>
						new Promise((resolve) => {
							setTimeout(() => {
								axios
									.delete(
										`https://to-do-stackhack.herokuapp.com/api/v1/todo/${oldData._id}`,
										headerConfig
									)
									.then((data) => {
										update();
										enqueueSnackbar(`"${data.data.data.task}" is deleted `, {
											variant: 'default'
										});
										resolve();
									})
									.catch((e) => console.log(e));
							}, 1000);
						})
				}}
			/>
		</div>
	);
}
