import React, { useState } from 'react';
import './App.css';
import LandingPage from './components/LandingPage';
import { SnackbarProvider } from 'notistack';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import { Paper } from '@material-ui/core';

function App() {
	// We keep the theme in app state
	const [ theme, setTheme ] = useState({
		palette: {
			type: 'dark'
		}
	});

	// we change the palette type of the theme in state
	const toggleDarkTheme = () => {
		let newPaletteType = theme.palette.type === 'light' ? 'dark' : 'light';
		setTheme({
			palette: {
				type: newPaletteType
			}
		});
	};

	// we generate a MUI-theme from state's theme object
	const muiTheme = createMuiTheme(theme);

	return (
		<MuiThemeProvider theme={muiTheme}>
			<SnackbarProvider maxSnack={3}>
				<Paper style={{ height: '100vh' }}>
					<LandingPage onToggleDark={toggleDarkTheme} />
				</Paper>
			</SnackbarProvider>
		</MuiThemeProvider>
	);
}

export default App;
