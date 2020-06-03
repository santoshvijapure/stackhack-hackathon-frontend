// check if user is logged
export const isLogged = () => {
	let token = window.localStorage.getItem('token');
	return token ? true : false;
};

// handle logout and clear the localstorage
export const handleLogOut = () => {
	window.localStorage.removeItem('token');
	window.localStorage.removeItem('user');
	return false;
};
