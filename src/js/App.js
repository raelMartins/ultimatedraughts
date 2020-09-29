import React from 'react';
import Board from './components/Board';
import GameTitle from './components/GameTitle';
import Instructions from './components/Instructions';

const App = () => {
    return(
        <>
        <GameTitle />
        <Board />
        <Instructions />
        </>
    )
}

export default App;