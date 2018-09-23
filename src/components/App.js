import React, { Component } from 'react';
import Footer from './sections/Footer';
import Header from './sections/Header';
import Main from './sections/Main';

import '../assets/styles/styles.scss';
import ThemeContext from './ThemeContext';


export default class App extends Component {
	constructor() {
		super();

		// Function bindings
		this.toggleTheme = this.toggleTheme.bind(this);

		this.state = {
			theme: 'light',
			toggleTheme: this.toggleTheme
		};
	}

	toggleTheme() {
		const { theme } = this.state;
		this.setState({
			theme: (theme === 'light') ? 'dark' : 'light'
		});
	}

	render() {
		const { theme, toggleTheme } = this.state;
		return (
			<ThemeContext.Provider value={{ theme, toggleTheme }}>
				<div className={`app theme-${theme}`}>
					<Header />
					<Main />
					<Footer />
				</div>
			</ThemeContext.Provider>
		);
	}
}
