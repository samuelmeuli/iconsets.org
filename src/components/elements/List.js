import React, { Component } from 'react';

import ListEntry from './ListEntry';


export default class List extends Component {
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

		this.state = {
			list: [],
			loadingState: 'loading' // possible states: 'loading', 'finished', 'error'
		};

		List.fetchList()
			.then((list) => {
				this.setState({
					list,
					loadingState: 'finished'
				});
			})
			.catch((err) => {
				console.error(err);
				this.setState({
					loadingState: 'error'
				});
			});
	}

	render() {
		const { list, loadingState } = this.state;

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
		return (
			<ul>
				{
					list.map((iconSet) => {
						const { id: setId, name, url, hasFont, hasSvg, hasPng, license, price } = iconSet;
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
