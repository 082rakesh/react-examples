import './App.css';
import HomeScreen from './screen/HomeScreen';
import { Outlet } from 'react-router';
import { Provider } from 'react-redux';
import { store } from './redux/store';

function App() {
	return (
		<Provider store={store}>
			<Outlet />
		</Provider>
	);
}

export default App;
