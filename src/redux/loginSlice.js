import { createSlice } from '@reduxjs/toolkit';
import { fetchLogin } from './loginService';
const initialState = {
	token: '',
	error: null,
	isLoading: false,
};

const loginSlice = createSlice({
	name: 'login',
	initialState,
	reducers: {
		logout: (state) => {
			state.token = '';
		},
	},
	extraReducers: (builder) => {
		builder
			.addCase(fetchLogin.pending, (state) => {
				console.log('action.payload in pending');
				state.isLoading = true;
			})
			.addCase(fetchLogin.fulfilled, (state, action) => {
				console.log('action.payload in success', action.payload);
				state.isLoading = false;
				state.token = action.payload;
			})
			.addCase(fetchLogin.rejected, (state, action) => {
				console.log('action.payload in rejected', action.payload);
				state.isLoading = false;
				status.error = action?.payload;
			});
	},
});

export const { logout } = loginSlice.actions;
export default loginSlice.reducer;
