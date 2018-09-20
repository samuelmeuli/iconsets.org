import React from 'react';
import SimpleSvg from 'react-simple-svg';

import logo from '../../assets/icons/logo.svg';


export default function Header() {
	const colorBlack = '#353535';
	return (
		<header>
			<SimpleSvg src={logo} className="logo" fill={colorBlack} />
		</header>
	);
}
