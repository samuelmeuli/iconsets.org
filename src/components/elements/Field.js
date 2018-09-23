import React from 'react';
import PropTypes from 'prop-types';
import SimpleSvg from 'react-simple-svg';

import imgCheckMark from '../../assets/icons/check.svg';
import imgXMark from '../../assets/icons/x.svg';


const propTypes = {
	label: PropTypes.string.isRequired,
	value: PropTypes.oneOfType([
		PropTypes.bool,
		PropTypes.number,
		PropTypes.string
	]).isRequired
};

export default function Field({ label, value }) {
	const colorGreen = '#51D765';
	const colorRed = '#F44000';
	const iconSize = 30;

	let valueOutput;
	if (typeof value === 'boolean') {
		valueOutput = (
			<SimpleSvg
				src={value ? imgCheckMark : imgXMark}
				title={value ? 'Yes' : 'No'}
				height={iconSize}
				width={iconSize}
				stroke={value ? colorGreen : colorRed}
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
