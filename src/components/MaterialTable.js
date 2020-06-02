import React, { useState, useEffect } from 'react';
import axios from 'axios';
import MaterialTable from 'material-table';
import LinearProgress from '@material-ui/core/LinearProgress';
import { useLoadingStyle } from './helper/styles';
import columns from './helper/columns';
import { useSnackbar } from 'notistack';

export default function TodoTable() {
	const { enqueueSnackbar } = useSnackbar();
	const classes = useLoadingStyle();
	const [ state, setState ] = useState([]);
	const [ isLoading, setisLoading ] = useState(true);
	let token = window.localStorage.getItem('token');
	let user = window.localStorage.getItem('user');
	const config = {
		headers: { Authorization: `Bearer ${token}` }
	};
	useEffect(() => {
		axios
			.get('https://to-do-stackhack.herokuapp.com/api/v1/todo', config)
			.then((data) => {
				console.log(data.data.data);
				setState(data.data.data);
				setisLoading(false);
			})
			.catch((e) => {
				console.log(e);
			});
	}, []);

	const update = () => {
		// debugger;
		axios
			.get('https://to-do-stackhack.herokuapp.com/api/v1/todo/', config)
			.then((data) => {
				console.log(data.data.data);
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
									.post('https://to-do-stackhack.herokuapp.com/api/v1/todo/', newData, config)
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
										config
									)
									.then((res) => {
										console.log(res);
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
									.delete(`https://to-do-stackhack.herokuapp.com/api/v1/todo/${oldData._id}`, config)
									.then((data) => {
										console.log(data);
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
