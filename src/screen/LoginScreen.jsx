import React, { useEffect } from 'react';
import { useNavigate } from 'react-router';
import './LoginScreen.css';
import { SCREEN_EXAMPLE, SCREEN_OTP, SCREEN_SIGNUP } from '../route/route';
import { BASE_URL, LOGIN } from '../utils/urlConstant';
import apiHelper from '../networking/AxiosManager';
import useLoginActionState from '../hooks/useLoginActionState';
import { useSelector } from 'react-redux';

export const LoginScreen = () => {
	const navigate = useNavigate();
	const { token } = useSelector((state) => state.login);
	const [state, formAction, isPending] = useLoginActionState();

	useEffect(() => {
		if (token) {
			apiHelper.setAuthToken(token);
			// navigate(SCREEN_DASHBOARD, { replace: true });
			navigate(SCREEN_EXAMPLE, { replace: true });
		}
	}, [navigate, token]);

	const handleSignUp = () => {
		console.log('handle signup clicked');
		//window.open(`${window.location.origin}${SCREEN_SIGNUP}`, '_blank'); // open a new tab
		navigate(SCREEN_OTP, { replace: true });
	};

	return (
		<div className='mainContainer'>
			<form action={formAction} className='form'>
				<div className='inputContainer'>
					<label>Email</label>
					<input
						className='inputBox'
						type='email'
						name='email'
						placeholder='Enter you email'
						required
					></input>
				</div>
				<div className='inputContainer'>
					<label>Password</label>
					<input
						className='inputBox'
						type='password'
						name='password'
						placeholder='Enter you password'
						required
					></input>
				</div>
				<button className='loginButton'>Submit</button>

				{isPending ? (
					'Loading ..'
				) : (
					<div>
						<label style={{ color: 'red' }}>
							{state.message ?? state.error}
						</label>
					</div>
				)}
			</form>
			<div className='signupContainer'>
				<label>Are you a new user?</label>
				<button onClick={handleSignUp}>Signup</button>
			</div>
		</div>
	);
};

export default LoginScreen;
