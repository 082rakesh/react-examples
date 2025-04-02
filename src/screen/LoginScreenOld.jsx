import React, { useEffect, useState } from 'react';
import { isEmpty } from 'lodash';
import { useNavigate } from 'react-router';
import './LoginScreen.css';
import { SCREEN_DASHBOARD } from '../route/route';
import { BASE_URL, LOGIN } from '../utils/urlConstant';

export const LoginScreenOld = () => {

	const navigate = useNavigate();
	const isUserLoggenIn = localStorage.getItem('authToken');
	console.log('isUserLoggenIn respone ', isUserLoggenIn);

	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');

	const [isAuthenticated, setIsAuthenticated] = useState(true);

	useEffect(() => {
		if (!isEmpty(isUserLoggenIn)) {
			navigate(SCREEN_DASHBOARD, { replace: true });
		}
	}, [isUserLoggenIn, navigate]);

	const handleLogin = (event) => {
		event.preventDefault();
		if (email.length > 4 && password.length > 4) {
			setIsAuthenticated(true);
			localStorage.setItem('isAuthenticated', isAuthenticated);
			// call Asyn API
			navigate(SCREEN_DASHBOARD);
		} else {
			localStorage.setItem('isAuthenticated', isAuthenticated);
			setIsAuthenticated(false);
		}
		console.log('handle login pressed', email, password, isAuthenticated);
	};
	return (
		<div className='mainContainer'>
			<form onSubmit={handleLogin}>
				<div>
					<label>Email</label>
					<input
						type='email'
						name='email'
						value={email}
						onChange={(e) => setEmail(e.target.value)}
						placeholder='Enter you email'
						required
					></input>
				</div>
				<div>
					<label>Password</label>
					<input
						type='password'
						name='password'
						placeholder='Enter you password'
						onChange={(e) => setPassword(e.target.value)}
						required
					></input>
				</div>
				<button>Submit</button>

				{!isAuthenticated && (
					<div>
						<label> Please enter min 4 character long email and password</label>
					</div>
				)}
			</form>
		</div>
	);
};

export default LoginScreenOld;
