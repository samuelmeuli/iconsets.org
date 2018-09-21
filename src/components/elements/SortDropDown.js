import React, { Component } from 'react';
import PropTypes from 'prop-types';


const propTypes = {
	className: PropTypes.string.isRequired,
	sortMethods: PropTypes.arrayOf(PropTypes.string).isRequired,
	sortMethodActive: PropTypes.string.isRequired,
	setSortMethodActive: PropTypes.func.isRequired
};

export default class SortDropDown extends Component {
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
		const { className } = this.props;
		const { expanded } = this.state;
		const dropDownElements = this.generateDropDownElements();
		return (
			<div className={`drop-down ${className}`}>
				<button className="button" type="button" onClick={this.toggleExpanded}>Sort</button>
				<ul className={expanded ? 'expanded' : 'collapsed'}>
					{dropDownElements}
				</ul>
			</div>
		);
	}
}

SortDropDown.propTypes = propTypes;
