import React, { Component } from 'react';

import List from '../elements/List';
import Toolbar from '../elements/Toolbar';


export default class Main extends Component {
	static fetchList() {
		return window.fetch('/iconsets')
			.then((response) => {
				if (response.status !== 200) {
					throw new Error(`Unexpected server response: Error code ${response.status}`);
				}
				return response.json();
			});
	}

	constructor() {
		super();

		this.sortMethods = ['Date added', 'Name', 'Popularity'];

		this.state = {
			list: [],
			loadingState: 'loading', // 'loading' | 'finished' | 'error'
			filterFormat: {},
			filterLicense: {},
			filterPrice: {},
			sortMethodActive: 'Popularity'
		};

		// Function bindings
		this.setFilterFormat = this.setFilterFormat.bind(this);
		this.setFilterLicense = this.setFilterLicense.bind(this);
		this.setFilterPrice = this.setFilterPrice.bind(this);
		this.setSortMethodActive = this.setSortMethodActive.bind(this);
	}

	componentDidMount() {
		Main.fetchList()
			.then((list) => {
				const filterFormat = {
					svg: true,
					png: true,
					font: true
				};
				const filterLicense = {};
				Array.from(new Set(list.map(set => set.license)))
					.sort()
					.forEach((license) => {
						filterLicense[license] = true;
					});
				const filterPrice = {
					free: true,
					'partly free': true,
					paid: true
				};
				this.setState({
					filterFormat,
					filterLicense,
					filterPrice,
					list,
					loadingState: 'finished'
				});
			})
			.catch(() => {
				this.setState({
					loadingState: 'error'
				});
			});
	}

	setFilterFormat(filterFormat) {
		this.setState({
			filterFormat
		});
	}

	setFilterLicense(filterLicense) {
		this.setState({
			filterLicense
		});
	}

	setFilterPrice(filterPrice) {
		this.setState({
			filterPrice
		});
	}

	setSortMethodActive(sortMethodActive) {
		this.setState({
			sortMethodActive
		});
	}

	render() {
		const {
			list,
			loadingState,
			filterFormat,
			filterLicense,
			filterPrice,
			sortMethodActive
		} = this.state;

		return (
			<main>
				<Toolbar
					filterFormat={filterFormat}
					filterLicense={filterLicense}
					filterPrice={filterPrice}
					sortMethods={this.sortMethods}
					sortMethodActive={sortMethodActive}
					setFilterFormat={this.setFilterFormat}
					setFilterLicense={this.setFilterLicense}
					setFilterPrice={this.setFilterPrice}
					setSortMethodActive={this.setSortMethodActive}
				/>
				<List
					list={list}
					loadingState={loadingState}
					filterFormat={filterFormat}
					filterLicense={filterLicense}
					filterPrice={filterPrice}
					sortMethodActive={sortMethodActive}
				/>
			</main>
		);
	}
}
