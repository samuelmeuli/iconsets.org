import React from 'react';
import PropTypes from 'prop-types';

import Dropdown from './Dropdown';


const propTypes = {
	filterFormat: PropTypes.object.isRequired,
	filterLicense: PropTypes.object.isRequired,
	filterPrice: PropTypes.object.isRequired,
	sortMethods: PropTypes.arrayOf(PropTypes.string).isRequired,
	sortMethodActive: PropTypes.string.isRequired,
	setFilterFormat: PropTypes.func.isRequired,
	setFilterLicense: PropTypes.func.isRequired,
	setFilterPrice: PropTypes.func.isRequired,
	setSortMethodActive: PropTypes.func.isRequired
};

export default function Toolbar(props) {
	const {
		filterFormat,
		filterLicense,
		filterPrice,
		sortMethods,
		sortMethodActive,
		setFilterFormat,
		setFilterLicense,
		setFilterPrice,
		setSortMethodActive
	} = props;
	return (
		<div className="toolbar">
			<div>
				<Dropdown
					className="dropdown-filter-format"
					label="Format"
					filterElements={filterFormat}
					setFilterElements={setFilterFormat}
				/>
			</div>
			<div>
				<Dropdown
					className="dropdown-filter-license"
					label="License"
					filterElements={filterLicense}
					setFilterElements={setFilterLicense}
				/>
			</div>
			<div>
				<Dropdown
					className="dropdown-filter-prices"
					label="Price"
					filterElements={filterPrice}
					setFilterElements={setFilterPrice}
				/>
			</div>
			<div>
				<Dropdown
					className="dropdown-sort"
					label="Sort"
					sortMethods={sortMethods}
					sortMethodActive={sortMethodActive}
					setSortMethodActive={setSortMethodActive}
				/>
			</div>
		</div>
	);
}

Toolbar.propTypes = propTypes;
