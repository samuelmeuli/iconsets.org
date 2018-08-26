import React from 'react';
import PropTypes from 'prop-types';

import InfoField from './Field';


const propTypes = {
	name: PropTypes.string.isRequired,
	url: PropTypes.string.isRequired,
	hasFont: PropTypes.bool.isRequired,
	hasSvg: PropTypes.bool.isRequired,
	hasPng: PropTypes.bool.isRequired,
	license: PropTypes.string.isRequired,
	price: PropTypes.string.isRequired
};

export default function ListEntry({ name, url, hasFont, hasSvg, hasPng, license, price }) {
	return (
		<a href={url} className="list-entry">
			<p>TODO sample icons</p>
			<div className="info-container">
				<h2>{name}</h2>
				<div className="field-container">
					<InfoField label="SVG" value={hasSvg} />
					<InfoField label="Font" value={hasFont} />
					<InfoField label="PNG" value={hasPng} />
					<InfoField label="Price" value={price} />
					<InfoField label="License" value={license} />
				</div>
			</div>
		</a>
	);
}

ListEntry.propTypes = propTypes;
