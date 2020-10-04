import React, { useContext } from 'react';
import { GamePlayContext } from '../contexts/GamePlayContext';

const NewGameButton = () => {
    const { newGame } = useContext(GamePlayContext)
    return(
        <button className="new-game btn" onClick={newGame}>
            New Game
        </button>
    )
}

export default NewGameButton;