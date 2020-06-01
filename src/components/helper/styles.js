import { makeStyles } from '@material-ui/core/styles';

export const useLandingStyles = makeStyles((theme) => ({
	root: {
		flexGrow: 1
	},
	menuButton: {
		marginRight: theme.spacing(2)
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
