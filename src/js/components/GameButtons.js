import React from 'react';
import NewGameButton from './NewGameButton'
import ChangeTheme from './ChangeTheme';

const GameButtons = () => {
    return(
        <div className="game-buttons col-md-2">
            <NewGameButton />
            <ChangeTheme />
        </div>
    )
}

export default GameButtons;