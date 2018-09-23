import React from 'react';
import SimpleSvg from 'react-simple-svg';

import logo from '../../assets/icons/logo.svg';


export default function Header() {
	return (
		<header>
			<SimpleSvg src={logo} className="logo" />
		</header>
	);
}
