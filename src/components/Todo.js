import React, { useState, useEffect } from 'react';
import TodoItem from './TodoItem';
import TodoInput from './TodoInput';
import axios from 'axios';
const Todo = () => {
	const [ todos, setTodos ] = useState([]);
	useEffect(() => {
		const fetcher = async () => {
			let result = await axios('https://to-do-stackhack.herokuapp.com/api/v1/todo/');
			console.log(result);
		};
		fetcher();
	}, []);
	console.log(todos);

	return (
		<div>
			<TodoInput />
			{todos.map((todo) => <TodoItem todo={todo} />)}
		</div>
	);
};

export default Todo;
