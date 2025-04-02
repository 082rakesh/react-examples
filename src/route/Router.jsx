import { createBrowserRouter } from 'react-router';
import React, { lazy, Suspense } from 'react';
import App from '../App';
import ErrorBoundary from '../ErrorBoundary';
import {
	SCREEN_HOME,
	SCREEN_LOGIN,
	SCREEN_DASHBOARD,
	SCREEN_DETAILS,
	SCREEN_SIGNUP,
	SCREEN_OTP,
	SCREEN_EXAMPLE,
	SCREEN_PROGRESS,
} from './route';
import ProtectedRoute from './ProtectedRoute';
import SignUpScreen from '../screen/SignUpScreen';

const loginScreen = lazy(() => import('../screen/LoginScreen'));
const homeScreen = lazy(() => import('../screen/HomeScreen'));
const dashboard = lazy(() => import('../screen/Dashboard'));
const details = lazy(() => import('../screen/DetailsScreen'));
const signupScreen = lazy(() => import('../screen/SignUpScreen'));
const otpScreen = lazy(() => import('../screen/OTPScreen'));
const exampleScreen = lazy(() => import('../screen/Examples'));
const progressScreen = lazy(() => import('../screen/ProgressScreen'));

// Higher order function for Suspense
const withSuspense = (Component) => (
	<Suspense fallback={<div>Loading...</div>}>
		<Component />
	</Suspense>
);

const RouterPathChildren = [
	{
		path: SCREEN_HOME,
		element: withSuspense(homeScreen),
	},
	{
		path: SCREEN_LOGIN,
		element: withSuspense(loginScreen),
	},
	{
		path: SCREEN_SIGNUP,
		element: withSuspense(signupScreen),
	},
	{
		path: SCREEN_OTP,
		element: withSuspense(otpScreen),
	},
	{
		path: SCREEN_EXAMPLE,
		element: withSuspense(exampleScreen),
	},
	{
		path: SCREEN_PROGRESS,
		element: withSuspense(progressScreen),
	},
	{
		path: SCREEN_DASHBOARD,
		element: <ProtectedRoute />,
		children: [
			{
				path: SCREEN_DASHBOARD,
				element: withSuspense(dashboard),
			},
			{
				path: SCREEN_DETAILS,
				element: withSuspense(details),
			},
		],
	},
];

export const Router = createBrowserRouter([
	{
		path: '/',
		element: <App />,
		children: RouterPathChildren,
		errorElement: <ErrorBoundary />,
	},
]);
