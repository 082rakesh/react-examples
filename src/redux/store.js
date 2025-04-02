import { configureStore } from '@reduxjs/toolkit';
import loginSlice from './loginSlice';
import signupSlice from './signupSlice';

export const store = configureStore({
	reducer: {
		login: loginSlice,
		signup: signupSlice,
	},
	middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
	devTools: true,
});
