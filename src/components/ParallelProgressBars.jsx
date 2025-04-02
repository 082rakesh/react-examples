import React, { useState } from 'react';
import ProgressBar from './ProgressBar';

const ParallelProgressBars = ({ totalBars = 10, parallelLimit = 3 }) => {
	const [completedBars, setCompletedBars] = useState(0);

	// Function to handle when a progress bar completes
	const handleComplete = () => {
		console.log('handleComplete', completedBars);
		if (completedBars <= totalBars) setCompletedBars((prev) => prev + 1);
	};

	return (
		<div style={{ padding: '20px' }}>
			<h2>Parallel Progress Bars</h2>

			{Array.from({ length: totalBars }).map(
				(_, index) =>
					index < completedBars + parallelLimit && ( // Restrict running bars
						<ProgressBar
							key={index}
							duration={2000}
							onComplete={handleComplete}
						/>
					)
			)}
		</div>
	);
};

export default ParallelProgressBars;
