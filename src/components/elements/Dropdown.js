import React, { Component } from 'react';
import PropTypes from 'prop-types';
import SimpleSvg from 'react-simple-svg';

import iconChevron from '../../assets/icons/chevron-down.svg';


const propTypes = {
	className: PropTypes.string.isRequired,
	label: PropTypes.string.isRequired,
	filterElements: PropTypes.object,
	sortMethods: PropTypes.arrayOf(PropTypes.string),
	sortMethodActive: PropTypes.string,
	setFilterElements: PropTypes.func,
	setSortMethodActive: PropTypes.func
};

const defaultProps = {
	filterElements: null,
	sortMethods: null,
	sortMethodActive: null,
	setFilterElements: null,
	setSortMethodActive: null
};

export default class Dropdown extends Component {
	constructor(props) {
		super(props);

		const { label } = props;
		this.dropdownClass = `dropdown-${label.toLowerCase()}`;

		this.state = {
			expanded: false
		};

		// Function bindings
		this.onClose = this.onClose.bind(this);
		this.toggleExpanded = this.toggleExpanded.bind(this);
	}

	onClose(e) {
		let targetElement = e.target; // clicked element

		do {
			if (targetElement === document.getElementsByClassName(this.dropdownClass)[0]) {
				// Click inside dropdown
				return;
			}
			// Move up the DOM
			targetElement = targetElement.parentNode;
		} while (targetElement);

		// Click outside dropdown
		this.toggleExpanded();
	}

	toggleExpanded() {
		const { expanded } = this.state;
		if (expanded) {
			this.setState({
				expanded: false
			});
			document.removeEventListener('click', this.onClose);
		} else {
			this.setState({
				expanded: true
			});
			document.addEventListener('click', this.onClose);
		}
	}

	generateFilterElements() {
		const { label, filterElements, setFilterElements } = this.props;
		return Object.keys(filterElements).map((entryLabel) => {
			const checked = filterElements[entryLabel];
			return (
				<li className="dropdown-item" key={entryLabel}>
					<label htmlFor={`checkbox-${label}-${entryLabel}`}>
						<input
							type="checkbox"
							id={`checkbox-${label}-${entryLabel}`}
							checked={checked}
							onChange={() => {
								const updatedElements = filterElements;
								updatedElements[entryLabel] = !updatedElements[entryLabel];
								setFilterElements(updatedElements);
							}}
						/>
						{entryLabel}
					</label>
				</li>
			);
		});
	}

	generateSortElements() {
		const { sortMethods, sortMethodActive, setSortMethodActive } = this.props;
		return sortMethods.map((method) => {
			const checked = method === sortMethodActive;
			return (
				<li className="dropdown-item" key={method}>
					<label htmlFor={`radio-sort-${method}`}>
						<input
							type="radio"
							id={`radio-sort-${method}`}
							checked={checked}
							onChange={() => {
								setSortMethodActive(method);
							}}
						/>
						{method}
					</label>
				</li>
			);
		});
	}

	render() {
		const { className, filterElements, label } = this.props;
		const { expanded } = this.state;
		let dropdownElements;
		if (filterElements) {
			dropdownElements = this.generateFilterElements();
		} else {
			dropdownElements = this.generateSortElements();
		}
		return (
			<div className={`dropdown ${this.dropdownClass} ${className}`}>
				<button
					className={`button ${expanded ? 'active' : ''}`}
					type="button"
					onClick={this.toggleExpanded}
				>
					<SimpleSvg src={iconChevron} title="Feather" height={10} width={20} />
					{label}
				</button>
				<ul className={expanded ? 'expanded' : 'collapsed'}>
					{dropdownElements}
				</ul>
			</div>
		);
	}
}

Dropdown.propTypes = propTypes;
Dropdown.defaultProps = defaultProps;
