import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import '../scss/bootstrap.min.css'
import '../scss/style.scss'
import ThemeContextProvider from './contexts/ThemeContext';


ReactDOM.render(<ThemeContextProvider><App /></ThemeContextProvider> , document.getElementById('root'))