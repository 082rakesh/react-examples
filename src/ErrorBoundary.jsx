import * as React from 'react';

class ErrorBoundary extends React.Component {
	constructor(props) {
		super(props);
		this.state = { hasError: false };
	}

	static getDerivedStateFromError(error) {
		// Update state so the next render will show the fallback UI.
		return { hasError: true };
	}

	componentDidCatch(error, info) {}

	render() {
		if (this.state.hasError) {
			// You can render any custom fallback UI
			return <div>oops! Something Went Wrong</div>;
		}

		return this.props.children;
	}
}

export default ErrorBoundary;
