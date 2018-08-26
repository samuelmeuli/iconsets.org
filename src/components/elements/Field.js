import React from 'react';
import PropTypes from 'prop-types';

import imgCheckMark from '../../assets/icons/check-mark.svg';
import imgXMark from '../../assets/icons/x-mark.svg';


const iconSize = 30;

const propTypes = {
	label: PropTypes.string.isRequired,
	value: PropTypes.oneOfType([
		PropTypes.bool,
		PropTypes.number,
		PropTypes.string
	]).isRequired
};

export default function Field({ label, value }) {
	let valueOutput;
	if (typeof value === 'boolean') {
		valueOutput = (
			<img
				src={value ? imgCheckMark : imgXMark}
				alt={value ? 'Yes' : 'No'}
				height={iconSize}
				width={iconSize}
			/>
		);
	} else {
		valueOutput = value;
	}

	return (
		<div className="field">
			<p className="field-label">{label}</p>
			<p className="field-value">{valueOutput}</p>
		</div>
	);
}

Field.propTypes = propTypes;
