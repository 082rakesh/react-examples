// import React, {  } from 'react';
import { Outlet, Navigate } from 'react-router';
import { isEmpty } from 'lodash';
// import { useNavigate } from 'react-router';
// import { SCREEN_LOGIN } from './route';

// import { Navigate } from 'react-router-dom';

/*
export const ProtectedRoute = ({ children }) => {
	const navigate = useNavigate();
	const isAuthenticated = localStorage.getItem('authToken');
	console.log('ProtectedRoute => ', isAuthenticated);
	console.log('ProtectedRoute 456 => ', children);

	useEffect(() => {
		console.log('ProtectedRoute 789 => ', children);
		if (
			isAuthenticated === null ||
			isAuthenticated === false ||
			isAuthenticated === undefined
		) {
			console.log('ProtectedRoute123 => ', isAuthenticated);
			navigate(SCREEN_LOGIN, { replace: true });
			return null;
		} else {
			return <Outlet />;
		}
	}, [children, isAuthenticated, navigate]);

	return null;
};
*/

const ProtectedRoute = () => {
	const authToken = localStorage.getItem('authToken'); // ✅ Ensure it's boolean
	if (isEmpty(authToken)) {
		return <Navigate to='/login' replace />;
	}

	return <Outlet />;
};

export default ProtectedRoute;
