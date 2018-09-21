import React, { Component } from 'react';
import PropTypes from 'prop-types';

import ListEntry from './ListEntry';


const propTypes = {
	list: PropTypes.arrayOf(PropTypes.object).isRequired,
	loadingState: PropTypes.oneOf(['loading', 'finished', 'error']).isRequired,
	filterFormat: PropTypes.object.isRequired,
	filterLicense: PropTypes.object.isRequired,
	filterPrice: PropTypes.object.isRequired,
	sortMethodActive: PropTypes.string.isRequired
};

export default class List extends Component {
	filterList(list) {
		const { filterFormat, filterLicense, filterPrice } = this.props;
		return list.filter((entry) => {
			// Format
			const allowedFormats = Object.entries(filterFormat)
				.filter(format => format[1] === true)
				.map(format => format[0]);

			// License
			const allowedLicenses = Object.entries(filterLicense)
				.filter(license => license[1] === true)
				.map(license => license[0]);

			// Price
			const allowedPrice = Object.entries(filterPrice)
				.filter(price => price[1] === true)
				.map(price => price[0]);

			const matchedFormats = allowedFormats.map(format => entry[format] === true);
			return matchedFormats.includes(true)
				&& allowedLicenses.includes(entry.license)
				&& allowedPrice.includes(entry.price);
		});
	}

	sortList(list) {
		const { sortMethodActive } = this.props;
		let property;
		if (sortMethodActive === 'Name') {
			property = 'name';
		} else if (sortMethodActive === 'Date added') {
			property = 'date';
		} else if (sortMethodActive === 'Popularity') {
			property = 'views';
		} else {
			throw Error(`Sort method "${sortMethodActive}" does not exist`);
		}
		return list.sort((a, b) => String(a[property]).localeCompare(String(b[property])));
	}

	render() {
		const { list, loadingState } = this.props;

		if (loadingState === 'loading') {
			return (
				<p>Loading...</p>
			);
		}
		if (loadingState === 'error') {
			return (
				<p>Error while loading icon sets</p>
			);
		}
		const filteredList = this.filterList(list);
		const sortedList = this.sortList(filteredList);
		if (sortedList.length === 0) {
			return <p>No matching icon sets found</p>;
		}
		return (
			<ul>
				{
					sortedList.map((iconSet) => {
						const {
							id: setId,
							name,
							url,
							font: hasFont,
							svg: hasSvg,
							png: hasPng,
							license,
							price
						} = iconSet;
						return (
							<ListEntry
								key={setId}
								setId={setId}
								name={name}
								url={url}
								hasFont={hasFont}
								hasSvg={hasSvg}
								hasPng={hasPng}
								license={license}
								price={price}
							/>
						);
					})
				}
			</ul>
		);
	}
}

List.propTypes = propTypes;
