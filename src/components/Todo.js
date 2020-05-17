import React, { useState, useEffect } from 'react';
import TodoItem from './TodoItem';
import TodoInput from './TodoInput';
import axios from 'axios';
const Todo = () => {
	useEffect(() => {
		axios
			.get('https://to-do-stackhack.herokuapp.com/api/v1/todo/')
			.then((response) => {
				setTodos(response.data.data);
				// console.log(response.data.data);
				console.log(todos);
			})
			.catch((e) => console.log(e));
	}, []);
	const [ todos, setTodos ] = useState([]);
	return (
		<div>
			<TodoInput />
			{todos.map((title) => <TodoItem todos={todos} />)}
		</div>
	);
};

export default Todo;
