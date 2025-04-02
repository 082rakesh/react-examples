import { createAsyncThunk } from '@reduxjs/toolkit';
import apiHelper from '../networking/AxiosManager';
import { LOGIN } from '../utils/urlConstant';
import { FETCH_LOGIN } from './action';
const getLogin = async (email, password) => {
	const data = {
		email,
		password,
	};

	try {
		const response = await apiHelper.post(LOGIN, data);
		console.log('print respone ', response);
		return response;
	} catch (error) {
		console.log('error in API respo', error.response);
		return error.response || { message: 'Something went wrong' };
	}
};

export const fetchLogin = createAsyncThunk(FETCH_LOGIN, getLogin);
