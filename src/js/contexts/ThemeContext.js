import React, { useState, createContext, useEffect } from 'react';

export const ThemeContext = createContext();

const ThemeContextProvider = (props) => {
    const [isDark, setIsDark] = useState(false)
    const [darkTheme] = useState({
        text: ' rgb(211, 208, 208)',
        cellColor: 'rgb(76, 69, 69)',
        inactiveCell: ' rgb(211, 208, 208)',
        boardBackground: 'rgb(17, 15, 15)',
        buttonColor: ' rgb(76, 69, 69)',
        activePlayer: 'green',
    })
    const changeTheme = () => {
        let newTheme = !isDark
        setIsDark(newTheme)
    }

    return (
        <ThemeContext.Provider value={{isDark, changeTheme, darkTheme}}>
            {props.children}
        </ThemeContext.Provider>
    );
}
 
export default ThemeContextProvider;