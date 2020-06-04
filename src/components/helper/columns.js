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
		hidden: true,
		cellStyle: { width: '5%' }
	},
	{
		title: 'priority',
		field: 'priority',
		type: 'numeric',
		lookup: { 1: 1, 2: 2, 3: 3 },
		cellStyle: { width: '5%' }
	},
	{
		title: '_id',
		field: '_id',
		hidden: true
	}
];
export default columns;
