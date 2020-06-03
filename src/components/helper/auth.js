// check if user is logged
export const isLogged = () => {
	let token = window.localStorage.getItem('token');
	return token ? true : false;
};

// handle logout and clear the localstorage
export const handleLogOut = () => {
	localStorage.clear();
	return false;
};
