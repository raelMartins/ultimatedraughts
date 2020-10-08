import React, { useContext } from 'react';
import { GamePlayContext } from '../contexts/GamePlayContext';
import { ThemeContext } from '../contexts/ThemeContext';

const NewGameButton = () => {
    const { newGame } = useContext(GamePlayContext)
    const { isDark } =useContext(ThemeContext)
    
    return(
        <button className={`new-game btn ${isDark ? 'dark-button' : ''}`} onClick={newGame}>
            New Game
        </button>
    )
}

export default NewGameButton;