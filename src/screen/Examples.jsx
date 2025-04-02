import { SCREEN_DASHBOARD, SCREEN_OTP, SCREEN_PROGRESS } from '../route/route';
import { Link } from 'react-router';
export const Examples = () => {
	return (
		<div>
			<ui style={styles.container}>
				<li>
					<Link to={SCREEN_PROGRESS}>Loader Progress </Link>
				</li>
				<li>
					<Link to={SCREEN_DASHBOARD}>Async Data </Link>
				</li>
				<li>
					<Link to={SCREEN_OTP}>OTP</Link>
				</li>
			</ui>
		</div>
	);
};

export default Examples;

const styles = {
	container: {
		textAlign: 'left',
		listStylePosition: 'inside',
	},
};
