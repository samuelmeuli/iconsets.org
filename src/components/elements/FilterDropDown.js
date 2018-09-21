import React, { Component } from 'react';
import PropTypes from 'prop-types';


const propTypes = {
	className: PropTypes.string.isRequired,
	label: PropTypes.string.isRequired,
	elements: PropTypes.object.isRequired,
	setElements: PropTypes.func.isRequired
};

export default class FilterDropDown extends Component {
	constructor() {
		super();

		this.state = {
			expanded: false
		};

		// Function bindings
		this.toggleExpanded = this.toggleExpanded.bind(this);
	}

	toggleExpanded() {
		const { expanded } = this.state;
		this.setState({
			expanded: !expanded
		});
	}

	generateDropDownElements() {
		const { label, elements, setElements } = this.props;
		return Object.keys(elements).map((entryLabel) => {
			const checked = elements[entryLabel];
			return (
				<li className="dropdown-item" key={entryLabel}>
					<label htmlFor={`checkbox-${label}-${entryLabel}`}>
						<input
							type="checkbox"
							id={`checkbox-${label}-${entryLabel}`}
							checked={checked}
							onChange={() => {
								const updatedElements = elements;
								updatedElements[entryLabel] = !updatedElements[entryLabel];
								setElements(updatedElements);
							}}
						/>
						{entryLabel}
					</label>
				</li>
			);
		});
	}

	render() {
		const { className, label } = this.props;
		const { expanded } = this.state;
		const dropDownElements = this.generateDropDownElements();
		return (
			<div className={`drop-down ${className}`}>
				<button className="button" type="button" onClick={this.toggleExpanded}>{label}</button>
				<ul className={expanded ? 'expanded' : 'collapsed'}>
					{dropDownElements}
				</ul>
			</div>
		);
	}
}

FilterDropDown.propTypes = propTypes;
