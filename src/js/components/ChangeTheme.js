import React, { useContext } from 'react';
import { ThemeContext } from '../contexts/ThemeContext';

const ChangeTheme = () => {
    const { isDark, changeTheme }= useContext(ThemeContext)

    return(
        <button className={`change-theme btn ${isDark ? 'dark-button' : ''}`} onClick={() => changeTheme()}>
            Change Theme
        </button>
    )
}

export default ChangeTheme;