import React from 'react';
import { Paper, Typography, Avatar } from '@material-ui/core';
import GitHubIcon from '@material-ui/icons/GitHub';
function Footer() {
	return (
		<Paper elevation={3} className="footer">
			<div className="center">
				<Typography>
					Copyright © 2020 :{' '}
					<a href="https://github.com/santoshvijapure/stackhack-hackathon-frontend">
						TODO
						<GitHubIcon />
					</a>
				</Typography>
			</div>
			<hr />
			<div className="center">
				Made with ♥ by
				<a href="https://santoshvijapure.xyz">
					<Avatar alt="Santosh Vijapure" src="https://santoshvijapure.xyz/index/img/1.jpg" />
				</a>
				<a href="http://pprathameshmore.github.io/">
					<Avatar alt="Prathamesh More" src="https://avatars2.githubusercontent.com/u/17108186?s=460&v=4" />
				</a>
			</div>
		</Paper>
	);
}
export default Footer;
