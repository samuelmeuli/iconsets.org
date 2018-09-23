import React from 'react';
import PropTypes from 'prop-types';
import LazyLoad from 'react-lazyload';
import SimpleSvg from 'react-simple-svg';

import InfoField from './Field';
import ThemeContext from '../ThemeContext';


const propTypes = {
	name: PropTypes.string.isRequired,
	setId: PropTypes.string.isRequired,
	url: PropTypes.string.isRequired,
	hasFont: PropTypes.bool.isRequired,
	hasSvg: PropTypes.bool.isRequired,
	hasPng: PropTypes.bool.isRequired,
	license: PropTypes.string.isRequired,
	price: PropTypes.string.isRequired
};

export default function ListEntry({ setId, name, url, hasFont, hasSvg, hasPng, license, price }) {
	const colorTextLight = '#353535';
	const colorTextDark = '#D0D0D0';
	const iconSize = 45;

	const sampleIcons = [];
	for (let i = 1; i <= 6; i += 1) {
		sampleIcons.push(
			<li key={`sample-icon-${i}`}>
				<ThemeContext.Consumer>
					{
						({ theme }) => (
							<SimpleSvg
								src={`/sample-icons/${setId}/sample-icon-${i}.svg#icon`}
								className="sample-icon"
								height={iconSize}
								width={iconSize}
								fill={theme === 'light' ? colorTextLight : colorTextDark}
							/>
						)
					}
				</ThemeContext.Consumer>
			</li>
		);
	}

	return (
		<a href={url} className="list-entry" target="_blank" rel="noopener noreferrer">
			<LazyLoad height={140} offset={500} once>
				<ul className="sample-icons-container">
					{sampleIcons}
				</ul>
			</LazyLoad>
			<div className="info-container">
				<h2>{name}</h2>
				<div className="field-container">
					<InfoField label="SVG" value={hasSvg} />
					<InfoField label="PNG" value={hasPng} />
					<InfoField label="Font" value={hasFont} />
					<InfoField label="Price" value={price} />
					<InfoField label="License" value={license} />
				</div>
			</div>
		</a>
	);
}

ListEntry.propTypes = propTypes;
