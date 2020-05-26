import React, { useState, useEffect, forwardRef } from 'react';
import axios from 'axios';

import MaterialTable from 'material-table';
import AddBox from '@material-ui/icons/AddBox';
import ArrowUpward from '@material-ui/icons/ArrowUpward';
import Check from '@material-ui/icons/Check';
import ChevronLeft from '@material-ui/icons/ChevronLeft';
import ChevronRight from '@material-ui/icons/ChevronRight';
import Clear from '@material-ui/icons/Clear';
import DeleteOutline from '@material-ui/icons/DeleteOutline';
import Edit from '@material-ui/icons/Edit';
import FilterList from '@material-ui/icons/FilterList';
import FirstPage from '@material-ui/icons/FirstPage';
import LastPage from '@material-ui/icons/LastPage';
import Remove from '@material-ui/icons/Remove';
import SaveAlt from '@material-ui/icons/SaveAlt';
import Search from '@material-ui/icons/Search';
import ViewColumn from '@material-ui/icons/ViewColumn';
const tableIcons = {
	Add: forwardRef((props, ref: React.Ref<SVGSVGElement>) => <AddBox {...props} ref={ref} />),
	Check: forwardRef((props, ref: React.Ref<SVGSVGElement>) => <Check {...props} ref={ref} />),
	Clear: forwardRef((props, ref: React.Ref<SVGSVGElement>) => <Clear {...props} ref={ref} />),
	Delete: forwardRef((props, ref: React.Ref<SVGSVGElement>) => <DeleteOutline {...props} ref={ref} />),
	DetailPanel: forwardRef((props, ref: React.Ref<SVGSVGElement>) => <ChevronRight {...props} ref={ref} />),
	Edit: forwardRef((props, ref: React.Ref<SVGSVGElement>) => <Edit {...props} ref={ref} />),
	Export: forwardRef((props, ref: React.Ref<SVGSVGElement>) => <SaveAlt {...props} ref={ref} />),
	Filter: forwardRef((props, ref: React.Ref<SVGSVGElement>) => <FilterList {...props} ref={ref} />),
	FirstPage: forwardRef((props, ref: React.Ref<SVGSVGElement>) => <FirstPage {...props} ref={ref} />),
	LastPage: forwardRef((props, ref: React.Ref<SVGSVGElement>) => <LastPage {...props} ref={ref} />),
	NextPage: forwardRef((props, ref: React.Ref<SVGSVGElement>) => <ChevronRight {...props} ref={ref} />),
	PreviousPage: forwardRef((props, ref: React.Ref<SVGSVGElement>) => <ChevronLeft {...props} ref={ref} />),
	ResetSearch: forwardRef((props, ref: React.Ref<SVGSVGElement>) => <Clear {...props} ref={ref} />),
	Search: forwardRef((props, ref: React.Ref<SVGSVGElement>) => <Search {...props} ref={ref} />),
	SortArrow: forwardRef((props, ref: React.Ref<SVGSVGElement>) => <ArrowUpward {...props} ref={ref} />),
	ThirdStateCheck: forwardRef((props, ref: React.Ref<SVGSVGElement>) => <Remove {...props} ref={ref} />),
	ViewColumn: forwardRef((props, ref: React.Ref<SVGSVGElement>) => <ViewColumn {...props} ref={ref} />)
};

export default function TodoTable() {
	const [ state, setState ] = useState([]);
	const [ helper, setHelper ] = useState(1);
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
	const columns = [
		{
			title: 'task',
			field: 'task',
			cellStyle: { width: '80%' }
		},

		{
			title: 'label',
			field: 'label',
			lookup: {
				PERSONAL: 'PERSONAL',
				WORK: 'WORK',
				SHOPPING: 'SHOPPING',
				OTHER: 'OTHER'
			},
			cellStyle: { width: '5%' }
		},
		{
			title: 'Importent',
			field: 'isImportant',
			lookup: {
				true: 'true',
				false: 'false'
			},
			cellStyle: { width: '5%' }
		},
		{
			title: 'priority',
			field: 'priority',
			type: 'numeric',
			lookup: { 1: 1, 2: 2, 3: 3, 4: 4, 5: 5 },
			cellStyle: { width: '5%' }
		},
		{
			title: '_id',
			field: '_id',
			hidden: true
		}
	];

	return (
		<MaterialTable
			title="ToDo"
			icons={tableIcons}
			columns={columns}
			data={state}
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
						}, 600);
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
								.then((res) => console.log(res))
								.catch((e) => console.log(e));

							// if (oldData) {
							// 	setState((prevState) => {
							// 		const data = [ ...prevState.data ];
							// 		data[data.indexOf(oldData)] = newData;
							// 		return { ...prevState, data };
							// 	});
							// }
						}, 600);
					}),
				onRowDelete: (oldData) =>
					new Promise((resolve) => {
						setTimeout(() => {
							resolve();
							axios
								.delete(`https://to-do-stackhack.herokuapp.com/api/v1/todo/${oldData._id}`)
								.then((data) => console.log(data))
								.catch((e) => console.log(e));
							// setState((prevState) => {
							// 	const data = [ ...prevState.data ];
							// 	data.splice(data.indexOf(oldData), 1);
							// 	return { ...prevState, data };
							// });
						}, 600);
					})
			}}
		/>
	);
}
