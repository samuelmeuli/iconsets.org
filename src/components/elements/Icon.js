import React from 'react';
import PropTypes from 'prop-types';


const iconSizeNormal = 25;
const iconSizeSmall = 18;

const propTypes = {
	src: PropTypes.string.isRequired,
	alt: PropTypes.string.isRequired,
	isSmall: PropTypes.bool
};

const defaultProps = {
	isSmall: false
};

export default function Icon(props) {
	const { src, alt, isSmall } = props;

	return (
		<img
			src={src}
			alt={alt}
			height={isSmall ? iconSizeSmall : iconSizeNormal}
			width={isSmall ? iconSizeSmall : iconSizeNormal}
		/>
	);
}

Icon.propTypes = propTypes;
Icon.defaultProps = defaultProps;
