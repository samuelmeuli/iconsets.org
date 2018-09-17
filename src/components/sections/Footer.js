import React from 'react';
import SimpleSvg from 'react-simple-svg';

import iconCode from '../../assets/icons/code.svg';
import iconFeather from '../../assets/icons/feather.svg';
import iconGithub from '../../assets/icons/github.svg';


export default function Footer() {
	const iconSize = 20;
	const urlFeather = 'https://feathericons.com';
	const urlGitHub = 'https://github.com/samuelmeuli/iconsets.org';
	const urlPortfolio = 'https://samuelmeuli.com';

	return (
		<footer>
			<div>
				<a href={urlPortfolio}>
					<SimpleSvg src={iconCode} title="Code" height={iconSize} width={iconSize} />
					<p>Created by Samuel Meuli</p>
				</a>
			</div>
			<div>
				<a href={urlGitHub}>
					<SimpleSvg src={iconGithub} title="GitHub" height={iconSize} width={iconSize} />
					<p>View on GitHub</p>
				</a>
			</div>
			<div>
				<a href={urlFeather}>
					<SimpleSvg src={iconFeather} title="Feather" height={iconSize} width={iconSize} />
					<p>Feather icons by Cole Bemis</p>
				</a>
			</div>
		</footer>
	);
}
