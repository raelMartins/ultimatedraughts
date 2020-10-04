import React from 'react';
import NewGameButton from './NewGameButton'
import PauseGame from './PauseGame';

const GameButtons = () => {
    return(
        <div className="game-buttons col-md-2">
            <NewGameButton />
            <PauseGame />
        </div>
    )
}

export default GameButtons;