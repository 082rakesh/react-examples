// import apiHelper from '../networking/AxiosManager';
import React, { useActionState } from 'react';
import { LOGIN } from '../utils/urlConstant';
import { useDispatch } from 'react-redux';
import { fetchLogin } from '../redux/loginService';

const useLoginActionState = () => {
	const dispatch = useDispatch();

	return useActionState(
		async (prevState, formData) => {
			const email = formData.get('email');
			const password = formData.get('password');

			console.log('formData', email, password);

			if (email.length < 4 || password.length < 4) {
				console.log('credential valid');

				return {
					success: false,
					message: 'Email and password must be at least 4 characters long.',
				};
			}

			try {
				await dispatch(fetchLogin(email, password)).unwrap();
				return { success: true };
			} catch (error) {
				console.log('error in catch');
				return {
					error:
						error.response?.data?.error ||
						'Login failed, Please enter valid credential',
				};
			}
		},
		{ success: null }
	);
};

export default useLoginActionState;

/*
	{
    "email": "eve.holt@reqres.in",
    "password": "cityslicka"
}
	*/
