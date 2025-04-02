import React, { useRef, useEffect, useState } from 'react';
export const OTPBox = ({ length, callBack }) => {
	const totalBox = Array.from({ length }, (_, i) => i);
	const inputRef = useRef([]);
	const [allOTP, setAllOTP] = useState('');

	const handleInputChange = (value, index) => {
		const newValue = (value = value.trim(''));
		setAllOTP((prev) => prev + newValue);

		newValue.length > 0 && inputRef.current[index + 1]?.focus();
	};

	const handleKeyDown = (e, index) => {
		if (!e.target.value && e.key === 'Backspace') {
			inputRef.current[index - 1]?.focus();
		}
	};

	useEffect(() => {
		if (allOTP.length === length) {
			callBack(allOTP);
		}
		return () => {};
	}, [allOTP, length, callBack]);

	useEffect(() => {
		inputRef.current[0]?.focus();
	}, []);

	return (
		<div>
			{totalBox.map((item, index) => (
				<input
					style={styles.inputBox}
					name={item}
					key={index}
					type='text'
					inputMode='numeric'
					pattern='[0-9]{1}'
					maxLength='1'
					ref={(input) => {
						inputRef.current[index] = input;
					}}
					onChange={(e) => handleInputChange(e.target.value, index)}
					onKeyDown={(e) => handleKeyDown(e, index)}
				/>
			))}
		</div>
	);
};

export default OTPBox;

const styles = {
	inputBox: {
		width: '40pt',
		height: '30pt',
		marginRight: '3pt',
		textAlign: 'center',
	},
};
