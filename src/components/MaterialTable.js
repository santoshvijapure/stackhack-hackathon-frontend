import React, { useState, useEffect } from 'react';
import MaterialTable from 'material-table';
import axios from 'axios';

export default function TodoTable() {
	const [ state, setstate ] = useState([]);
	useEffect(() => {
		axios
			.get('https://to-do-stackhack.herokuapp.com/api/v1/todo/')
			.then((data) => {
				console.log(data.data.data);
				setstate(data.data.data);
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
				11: 'PERSONAL',
				12: 'WORK',
				13: 'SHOPPING',
				14: 'OTHER'
			}
		},
		{
			title: 'priority',
			field: 'priority',
			type: 'numeric',
			lookup: { 1: 1, 2: 2, 3: 3, 4: 4, 5: 5 }
		}
	]);

	return (
		<MaterialTable
			title="Editable Example"
			columns={columns}
			data={state}
			// editable={{
			// 	onRowAdd: (newData) =>
			// 		new Promise((resolve) => {
			// 			setTimeout(() => {
			// 				resolve();
			// 				setState((prevState) => {
			// 					const data = [ ...prevState.data ];
			// 					data.push(newData);
			// 					return { ...prevState, data };
			// 				});
			// 			}, 600);
			// 		}),
			// 	onRowUpdate: (newData, oldData) =>
			// 		new Promise((resolve) => {
			// 			setTimeout(() => {
			// 				resolve();
			// 				if (oldData) {
			// 					setState((prevState) => {
			// 						const data = [ ...prevState.data ];
			// 						data[data.indexOf(oldData)] = newData;
			// 						return { ...prevState, data };
			// 					});
			// 				}
			// 			}, 600);
			// 		}),
			// 	onRowDelete: (oldData) =>
			// 		new Promise((resolve) => {
			// 			setTimeout(() => {
			// 				resolve();
			// 				setState((prevState) => {
			// 					const data = [ ...prevState.data ];
			// 					data.splice(data.indexOf(oldData), 1);
			// 					return { ...prevState, data };
			// 				});
			// 			}, 600);
			// 		})
			// }}
		/>
	);
}
