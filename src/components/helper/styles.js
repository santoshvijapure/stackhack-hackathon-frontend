import { makeStyles } from '@material-ui/core/styles';

export const useLandingStyles = makeStyles((theme) => ({
	root: {
		flexGrow: 1
	},
	title: {
		flexGrow: 1
	}
}));

export const useAuthStyles = makeStyles({
	root: {
		flexGrow: 1,
		maxWidth: 'auto',
		marginTop: '20%',
		padding: 10
	}
});

export const useLoadingStyle = makeStyles((theme) => ({
	root: {
		width: '100%',
		'& > * + *': {
			marginTop: theme.spacing(2)
		}
	}
}));

export const useBackDropStyles = makeStyles((theme) => ({
	backdrop: {
		zIndex: theme.zIndex.drawer + 1,
		color: '#fff'
	}
}));
