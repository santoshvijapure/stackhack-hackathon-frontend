import React, { useState, useEffect } from 'react';
import axios from 'axios';
import MaterialTable from 'material-table';
import columns from './helper/columns';
// import tableIcons from './helper/tableIcons';
export default function TodoTable() {
	const [ state, setState ] = useState([]);
	useEffect(() => {
		axios
			.get('https://to-do-stackhack.herokuapp.com/api/v1/todo/')
			.then((data) => {
				console.log(data.data.data);
				setState(data.data.data);
			})
			.catch((e) => {
				console.log(e);
			});
	}, []);

	const update = () => {
		// debugger;
		axios
			.get('https://to-do-stackhack.herokuapp.com/api/v1/todo/')
			.then((data) => {
				console.log(data.data.data);
				setState(data.data.data);
			})
			.catch((e) => {
				console.log(e);
			});
	};

	return (
		<MaterialTable
			title="ToDo"
			// icons={tableIcons}
			columns={columns}
			data={state}
			// options={{ actionsColumnIndex: -1 }}
			editable={{
				onRowAdd: (newData) =>
					new Promise((resolve) => {
						setTimeout(() => {
							axios
								.post('https://to-do-stackhack.herokuapp.com/api/v1/todo/', newData)
								.then((res) => {
									console.log(res);
									update();
								})
								.catch((e) => console.log(e));
							resolve();
						}, 1000);
					}),
				onRowUpdate: (newData, oldData) =>
					new Promise((resolve) => {
						setTimeout(() => {
							resolve();
							console.log(oldData);
							console.log(newData);
							axios
								.patch(`https://to-do-stackhack.herokuapp.com/api/v1/todo/${oldData._id}`, {
									task: newData.task,
									label: newData.label,
									priority: newData.priority,
									isImportent: newData.isImportent
								})
								.then((res) => {
									console.log(res);
									update();
								})
								.catch((e) => console.log(e));
						}, 1000);
					}),
				onRowDelete: (oldData) =>
					new Promise((resolve) => {
						setTimeout(() => {
							resolve();
							axios
								.delete(`https://to-do-stackhack.herokuapp.com/api/v1/todo/${oldData._id}`)
								.then((data) => {
									console.log(data);
									update();
								})
								.catch((e) => console.log(e));
						}, 1000);
					})
			}}
		/>
	);
}
