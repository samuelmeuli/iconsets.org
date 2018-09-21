import React from 'react';
import PropTypes from 'prop-types';

import FilterDropDown from './FilterDropDown';
import SortDropDown from './SortDropDown';


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
			<FilterDropDown
				className="dropdown-filter-format"
				label="Format"
				elements={filterFormat}
				setElements={setFilterFormat}
			/>
			<FilterDropDown
				className="dropdown-filter-license"
				label="License"
				elements={filterLicense}
				setElements={setFilterLicense}
			/>
			<FilterDropDown
				className="dropdown-filter-prices"
				label="Price"
				elements={filterPrice}
				setElements={setFilterPrice}
			/>
			<SortDropDown
				className="dropdown-sort"
				sortMethods={sortMethods}
				sortMethodActive={sortMethodActive}
				setSortMethodActive={setSortMethodActive}
			/>
		</div>
	);
}

Toolbar.propTypes = propTypes;
