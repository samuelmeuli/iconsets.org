import React from 'react';
import Footer from './sections/Footer';
import Header from './sections/Header';
import Main from './sections/Main';

import '../assets/styles/styles.scss';


export default function App() {
	return (
		<div className="app">
			<Header />
			<Main />
			<Footer />
		</div>
	);
}
