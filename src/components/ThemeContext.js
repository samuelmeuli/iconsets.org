import React from 'react';


const ThemeContext = React.createContext({
	theme: 'light', // default value: 'light' (alternative: 'dark')
	toggleTheme: () => {}
});

export default ThemeContext;
