import { createSlice } from '@reduxjs/toolkit';
import { userRegistration } from '../model/registration';

const initialState = {
	userDetails: userRegistration,
};
const signupSlice = createSlice({
	name: 'signup',
	initialState,
	reducers: {
		submitForms: (state, action) => {
			state.userDetails = action.payload;
		},
	},
});
export const { submitForms } = signupSlice.actions;
export default signupSlice.reducer;
