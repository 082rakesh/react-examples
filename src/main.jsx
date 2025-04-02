import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { RouterProvider } from 'react-router';
import './index.css';
import App from './App.jsx';
import Error from './Error';
import { Router } from './route/Router';
import ErrorBoundary from './ErrorBoundary';

createRoot(document.getElementById('root')).render(
	<StrictMode>
		<RouterProvider router={Router}>
			<ErrorBoundary>
				<App />
			</ErrorBoundary>
		</RouterProvider>
	</StrictMode>
);
