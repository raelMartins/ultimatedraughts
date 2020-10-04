import React from 'react';
import Board from './components/Board';
import GameButtons from './components/GameButtons';
import GameTitle from './components/GameTitle';
import Instructions from './components/Instructions';
import GamePlayContextProvider from './contexts/GamePlayContext';

const App = () => {
    return(
        <>
        <GameTitle />
        <div className="row">
            <GamePlayContextProvider>
                <Instructions />
                <GameButtons />
                <Board />
            </GamePlayContextProvider>
        </div>
        </>
    )
}

export default App;