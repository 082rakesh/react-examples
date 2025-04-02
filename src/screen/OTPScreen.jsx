import React from 'react';
import OTPBox from '../components/otpBox';
export const OTPScreen = () => {
	const handleOTP = (value) => {
		console.log('handleOTP', value);
	};

	return (
		<>
			<div style={styles.container}>
				Enter OTP
				<OTPBox length={4} callBack={handleOTP} />
			</div>
		</>
	);
};

export default OTPScreen;

const styles = {
	container: {
		display: 'flex',
		flexDirection: 'column',
		width: '50vw',
		height: '300pt',
		backgroundColor: 'lightYellow',
		justifyContent: 'center',
		alignItems: 'center',
	},
};
