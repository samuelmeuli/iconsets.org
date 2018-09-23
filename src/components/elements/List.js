import React, { Component } from 'react';
import PropTypes from 'prop-types';
import SimpleSvg from 'react-simple-svg';
import { forceCheck } from 'react-lazyload';

import imgAlertTriangle from '../../assets/icons/alert-triangle.svg';
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
	constructor() {
		super();
		this.iconSize = 20;
		this.colorRed = '#F44000';
	}

	componentDidUpdate() {
		// Re-check which lazy-load elements are inside viewport
		forceCheck();
	}

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
		let setList;

		if (loadingState === 'error') {
			// On error: Display error message
			setList = (
				<p className="error">
					<SimpleSvg
						src={imgAlertTriangle}
						title=""
						height={this.iconSize}
						width={this.iconSize}
						stroke={this.colorRed}
					/>
					Error while loading icon sets
				</p>
			);
		} else if (loadingState === 'loading') {
			// While loading: Display loading spinner
			setList = (
				<div className="spinner-container">
					<div className="spinner">
						<div className="dot1" />
						<div className="dot2" />
					</div>
				</div>
			);
		} else {
			// Display list
			const filteredList = this.filterList(list);
			const sortedList = this.sortList(filteredList);
			if (sortedList.length === 0) {
				setList = <p>No matching icon sets found</p>;
			} else {
				setList = (
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

		return (
			<div className="set-list">
				{setList}
			</div>
		);
	}
}

List.propTypes = propTypes;
