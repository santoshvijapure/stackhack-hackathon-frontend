export const isLogged = () => {
	let token = window.localStorage.getItem('token');
	return token ? true : false;
};

export const handleLogOut = () => {
	localStorage.clear();
	return false;
};
