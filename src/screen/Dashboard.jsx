import React, { useEffect, useState, useCallback } from 'react';
import { useNavigate } from 'react-router';
import { SCREEN_HOME, SCREEN_LOGIN } from '../route/route';
import { useDispatch } from 'react-redux';
import { logout } from '../redux/loginSlice';

export default function Dashboard() {
	const dispatch = useDispatch();
	const [todos, setTodos] = useState([]);

	const URL = 'https://jsonplaceholder.typicode.com/todos';

	const fetchToDos = useCallback(async () => {
		try {
			const response = await fetch(URL);
			const jsonRes = await response.json();
			console.log('print response => ', jsonRes);
			setTodos(jsonRes);
		} catch (error) {
			console.error('log error', error);
		}
	}, []);

	useEffect(() => {
		const fetchData = async () => {
			await fetchToDos();
		};
		fetchData();
	}, [fetchToDos]);

	const navigate = useNavigate();
	const handleLogout = () => {
		console.log('handle logout');
		dispatch(logout());
		localStorage.removeItem('authToken');
		navigate(SCREEN_HOME);
	};
	return (
		<div>
			<label>Welcome to dashboard</label>
			<button onClick={handleLogout}>Logout</button>
			<div>
				{todos.length > 0 ? (
					<ul>
						{todos.map((item, index) => (
							<li key={index}>{item.title}</li>
						))}
					</ul>
				) : (
					<div>No data</div>
				)}
			</div>
		</div>
	);
}
