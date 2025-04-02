import React, { useEffect, useState } from 'react';
export const ProgressBar = ({ duration, onComplete }) => {
	const [progress, setProgress] = useState(0);
	// const { duration, percentage } = props;

	useEffect(() => {
		setProgress(0);
		const interval = duration / 500; // 5000/500 100 steps for smooth transition
		const temp = (500 / duration) * 2;

		const timer = setInterval(() => {
			setProgress((prev) => {
				if (prev >= 500) {
					clearInterval(timer);
					onComplete();
				}
				return prev + temp;
			});
		}, interval);

		return () => clearInterval(timer);
	}, [duration, onComplete]);
	return (
		<div style={styles.container}>
			<div style={{ ...styles.bar, width: `${progress}%` }} />
		</div>
	);
};

const styles = {
	container: {
		width: '500px',
		height: '30px',
		backgroundColor: '#ddd',
		borderRadius: '5px',
		overflow: 'hidden',
		position: 'relative',
		marginTop: '2px',
	},
	bar: {
		height: '100%',
		backgroundColor: '#4caf50',
		transition: 'width 0.5s linear',
	},
};

export default ProgressBar;
