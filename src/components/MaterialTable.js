import React, { useState, useEffect } from 'react';
import Table from '@material-ui/core/Table';
import MaterialTable from 'material-table';

import axios from 'axios';

export default function TodoTable() {
	var [ state, setState ] = useState([]);
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

	const [ columns, setColumns ] = useState([
		{
			title: 'task',
			field: 'task'
		},
		{
			title: 'label',
			field: 'label',
			lookup: {
				PERSONAL: 'PERSONAL',
				WORK: 'WORK',
				SHOPPING: 'SHOPPING',
				OTHER: 'OTHER'
			}
		},
		{
			title: 'Importent',
			field: 'isImportant',
			lookup: {
				true: true,
				false: false
			}
		},
		{
			title: 'priority',
			field: 'priority',
			type: 'numeric',
			lookup: { 1: 1, 2: 2, 3: 3, 4: 4, 5: 5 },
			cellStyle: {}
		}
	]);

	return (
		<MaterialTable
			title="ToDo"
			columns={columns}
			data={state}
			editable={{
				onRowAdd: (newData) =>
					new Promise((resolve) => {
						setTimeout(() => {
							resolve();
							setState((prevState) => {
								console.log(prevState);
								const data = [ ...prevState ];
								data.push(newData);
								return { ...prevState, data };
							});
						}, 600);
					}),
				onRowUpdate: (newData, oldData) =>
					new Promise((resolve) => {
						setTimeout(() => {
							resolve();
							if (oldData) {
								setState((prevState) => {
									const data = [ ...prevState.data ];
									data[data.indexOf(oldData)] = newData;
									return { ...prevState, data };
								});
							}
						}, 600);
					}),
				onRowDelete: (oldData) =>
					new Promise((resolve) => {
						setTimeout(() => {
							resolve();
							setState((prevState) => {
								const data = [ ...prevState.data ];
								data.splice(data.indexOf(oldData), 1);
								return { ...prevState, data };
							});
						}, 600);
					})
			}}
		/>
	);
}
