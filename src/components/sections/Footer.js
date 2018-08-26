import React from 'react';

import Icon from '../elements/Icon';
import iconCode from '../../assets/icons/code.svg';
import iconFeather from '../../assets/icons/feather.svg';
import iconGithub from '../../assets/icons/github.svg';


export default function Footer() {
	const urlFeather = 'https://feathericons.com';
	const urlGitHub = 'https://github.com/samuelmeuli/iconsets.org';
	const urlPortfolio = 'https://samuelmeuli.com';

	return (
		<footer>
			<a href={urlPortfolio}>
				<Icon src={iconCode} alt="Code" isSmall />
				Created by Samuel Meuli
			</a>
			<a href={urlGitHub}>
				<Icon src={iconGithub} alt="GitHub" isSmall />
				View on GitHub
			</a>
			<a href={urlFeather}>
				<Icon src={iconFeather} alt="Feather" isSmall />
				Feather icons by Cole Bemis
			</a>
		</footer>
	);
}
