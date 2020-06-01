import React from 'react';
import './App.css';
import LandingPage from './components/LandingPage';
import { SnackbarProvider } from 'notistack';

function App() {
	return (
		<SnackbarProvider maxSnack={3}>
			<LandingPage />
		</SnackbarProvider>
	);
}

export default App;
