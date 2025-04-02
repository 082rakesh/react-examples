import axios from 'axios';
import { BASE_URL } from '../utils/urlConstant';

/**
 * Creates a configured axios instance with interceptors and helper methods
 */
const createApiService = (
	baseURL = '',
	defaultHeaders = {},
	timeout = 30000
) => {
	const axiosInstance = axios.create({
		baseURL,
		timeout,
		headers: {
			'Content-Type': 'application/json',
			...defaultHeaders,
		},
	});

	axiosInstance.interceptors.request.use(
		(config) => {
			const token = localStorage.getItem('authToken');
			if (token) {
				config.header.Authorization = `Bearer${token}`;
			}
			return config;
		},
		(error) => {
			// Handle request errors (optional)
			return Promise.reject(error);
		}
	);

	// Response interceptor
	axiosInstance.interceptors.response.use(
		(response) => response,
		(error) => {
			// Handle common errors
			if (error.response) {
				console.log('catch error in interceptor', error.response);
				// Server responded with an error status code
				const { status } = error.response;

				if (status === 401) {
					// Handle unauthorized - perhaps redirect to login
					handleUnauthorized();
				} else if (status === 403) {
					// Handle forbidden
					handleForbidden();
				} else if (status === 500) {
					// Handle server error
					handleServerError();
				}
			} else if (error.request) {
				// Request was made but no response received
				handleNoResponse();
			}

			return Promise.reject(error);
		}
	);

	// Error handlers
	const handleError = (error) => {
		console.error('API Error:', error);
		// You could dispatch to your state management here
		// e.g., dispatch({ type: 'API_ERROR', payload: error });
	};

	const handleUnauthorized = () => {
		// Clear auth data
		localStorage.removeItem('authToken');

		// Redirect to login page
		// Example: window.location.href = '/login';
		console.log('User unauthorized. Redirecting to login...');
	};

	const handleForbidden = () => {
		console.log('Access forbidden to this resource');
		// Redirect to access denied page or show notification
	};

	const handleServerError = () => {
		console.log('Server error occurred');
		// Show error notification
	};

	const handleNoResponse = () => {
		console.log('No response from server. Check your internet connection');
		// Show network error notification
	};

	// Set/remove auth token
	const setAuthToken = (token) => {
		if (token) {
			localStorage.setItem('authToken', token);
		} else {
			localStorage.removeItem('authToken');
		}
	};

	// HTTP method wrappers
	const get = async (url, params = {}, config = {}) => {
		try {
			const response = await axiosInstance.get(url, { params, ...config });
			return response.data;
		} catch (error) {
			handleError(error);
			throw error;
		}
	};

	const post = async (url, data = {}, config = {}) => {
		try {
			const response = await axiosInstance.post(url, data, config);
			console.log('print respone1233 ', response);
			if (response.status !== 200) {
				console.log('print respone when error ', response);
				throw new Error(
					`Error: ${response.status} - ${
						response.data?.error || 'Login failed'
					}`
				);
			}
			return response.data;
		} catch (error) {
			handleError(error);
			throw error;
		}
	};

	const put = async (url, data = {}, config = {}) => {
		try {
			const response = await axiosInstance.put(url, data, config);
			return response.data;
		} catch (error) {
			handleError(error);
			throw error;
		}
	};

	const patch = async (url, data = {}, config = {}) => {
		try {
			const response = await axiosInstance.patch(url, data, config);
			return response.data;
		} catch (error) {
			handleError(error);
			throw error;
		}
	};

	const del = async (url, config = {}) => {
		try {
			const response = await axiosInstance.delete(url, config);
			return response.data;
		} catch (error) {
			handleError(error);
			throw error;
		}
	};

	// File operations
	const uploadFile = async (url, formData, onProgress = null) => {
		try {
			const response = await axiosInstance.post(url, formData, {
				headers: {
					'Content-Type': 'multipart/form-data',
				},
				onUploadProgress: onProgress
					? (progressEvent) => {
							const percentCompleted = Math.round(
								(progressEvent.loaded * 100) / progressEvent.total
							);
							onProgress(percentCompleted);
					  }
					: undefined,
			});
			return response.data;
		} catch (error) {
			handleError(error);
			throw error;
		}
	};

	const downloadFile = async (url, params = {}, fileName = '') => {
		try {
			const response = await axiosInstance.get(url, {
				params,
				responseType: 'blob',
			});

			const blob = new Blob([response.data]);
			const downloadUrl = window.URL.createObjectURL(blob);
			const link = document.createElement('a');
			link.href = downloadUrl;
			link.setAttribute('download', fileName || 'download');

			document.body.appendChild(link);
			link.click();
			link.parentNode.removeChild(link);

			return true;
		} catch (error) {
			handleError(error);
			throw error;
		}
	};

	// Cancel requests
	const cancelTokens = {};

	const createCancelToken = (requestId) => {
		const source = axios.CancelToken.source();
		cancelTokens[requestId] = source;
		return source.token;
	};

	const cancelRequest = (requestId) => {
		if (cancelTokens[requestId]) {
			cancelTokens[requestId].cancel(`Request ${requestId} cancelled`);
			delete cancelTokens[requestId];
		}
	};

	// Return the API service object
	return {
		axiosInstance,
		setAuthToken,
		get,
		post,
		put,
		patch,
		delete: del, // Renamed to avoid conflict with JS keyword
		uploadFile,
		downloadFile,
		createCancelToken,
		cancelRequest,
	};
};

// Create and export a default instance
const apiHelper = createApiService(BASE_URL);
export default apiHelper;

export { createApiService };
