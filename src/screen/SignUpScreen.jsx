import React, { useState } from 'react';
import './SignupScreen.css';
import { userRegistration } from '../model/registration';
import { useDispatch } from 'react-redux';
import { submitForms } from '../redux/signupSlice';

export const SignUpScreen = () => {
	const [registration, setRegistration] = useState(userRegistration);
	const dispatch = useDispatch();

	const handleFormSubmit = (event) => {
		event.preventDefault();
		console.log('handleFormSubmit', registration);

		dispatch(submitForms(registration));
	};

	const handleChange = (e) => {
		setRegistration({
			...registration,
			[e.target.name]: e.target.value,
		});
		console.log('handleChange', e.target.name, e.target.value);
	};

	return (
		<div className='mainContainer'>
			<label>Please fill all mandatory field</label>
			<form onSubmit={(e) => handleFormSubmit(e)} className='signupForm'>
				<div className='fieldContainer'>
					<label>First Name *</label>
					<input
						className='inputType'
						name='firstName'
						type='text'
						onChange={handleChange}
						placeholder='Enter your firstName'
						required
					/>
				</div>
				<div className='fieldContainer'>
					<label>Middle Name</label>
					<input
						className='inputType'
						name='middleName'
						type='text'
						onChange={handleChange}
						placeholder='Enter your middleName'
					/>
				</div>
				<div className='fieldContainer'>
					<label>Last Name *</label>
					<input
						className='inputType'
						name='lastName'
						type='text'
						onChange={handleChange}
						placeholder='Enter your lastName'
						required
					/>
				</div>
				<div className='fieldContainer'>
					<label>Email *</label>
					<input
						className='inputType'
						name='email'
						type='email'
						onChange={handleChange}
						placeholder='Enter your email'
						required
					/>
				</div>
				<div className='fieldContainer'>
					<label>Password *</label>
					<input
						className='inputType'
						name='password'
						type='password'
						onChange={handleChange}
						placeholder='Set your password'
						required
					/>
				</div>
				<div className='fieldContainer'>
					<label>Date of Birth *</label>
					<input
						className='inputType'
						name='dob'
						type='date'
						onChange={handleChange}
						placeholder='Enter DOB'
						required
					/>
				</div>
				<div className='fieldContainer'>
					<label>Address</label>
					<input
						className='inputType'
						name='address1'
						type='text'
						placeholder='Enter Address'
						required
					/>
					<input
						className='inputType'
						style={{ marginTop: 10 }}
						name='address2'
						type='text'
						onChange={handleChange}
						placeholder='Enter Address2'
					/>
				</div>
				<div className='fieldContainer'>
					<label>Landmark</label>
					<input
						className='inputType'
						name='landmark'
						type='text'
						onChange={handleChange}
						placeholder='Enter landmark'
					/>
				</div>
				<div className='fieldContainer'>
					<label>City</label>
					<input
						className='inputType'
						name='city'
						type='text'
						onChange={handleChange}
						placeholder='Enter landmark'
					/>
				</div>
				<div className='fieldContainer'>
					<label>Pincode</label>
					<input
						className='inputType'
						name='pincode'
						type='text'
						inputMode='numeric'
						pattern='[0-9]{6}'
						placeholder='Enter landmark'
						maxLength='6'
						onChange={handleChange}
					/>
				</div>
				<button className='submitButton'>Submit</button>
			</form>
		</div>
	);
};

export default SignUpScreen;
