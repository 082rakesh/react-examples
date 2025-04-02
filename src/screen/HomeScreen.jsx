import React, { useEffect } from 'react';
import { isEmpty } from 'lodash';
import './HomeScreen.css';
import { useNavigate } from 'react-router';
import { SCREEN_LOGIN, SCREEN_DASHBOARD, SCREEN_EXAMPLE } from '../route/route';
import ParallelProgressBars from '../components/ParallelProgressBars';

export const HomeScreen = () => {
	const navigate = useNavigate();
	const isAuthenticated = localStorage.getItem('authToken');

	useEffect(() => {
		if (!isEmpty(isAuthenticated)) {
			navigate(SCREEN_EXAMPLE, { replace: true });
		}
	}, [isAuthenticated, navigate]);

	const loginAction = () => {
		//e.preventDefault();
		console.log('loginAction', isAuthenticated);
		if (isAuthenticated) {
			navigate(SCREEN_EXAMPLE, { replace: true });
			// navigate(SCREEN_DASHBOARD, { replace: true });
		} else {
			navigate(SCREEN_LOGIN);
		}
	};

	return (
		<div style={{ backgroundColor: 'lightGray' }}>
			<h1>Welcome to react starter seed</h1>
			<div>
				<button className='loginButton' onClick={loginAction}>
					Proceed
				</button>
			</div>
		</div>
	);
};

export default HomeScreen;
