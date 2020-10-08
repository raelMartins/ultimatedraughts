import React, { useContext } from 'react';
import Board from './components/Board';
import GameButtons from './components/GameButtons';
import GameTitle from './components/GameTitle';
import Instructions from './components/Instructions';
import GamePlayContextProvider from './contexts/GamePlayContext';
import { ThemeContext } from './contexts/ThemeContext';

const App = () => {

    const { isDark } = useContext(ThemeContext)
    return(
            <div className={`content ${isDark ? "dark-content": ""}`} style={isDark ? {backgroundColor: 'black'} : {}}>
                <GameTitle />
                <div className="row">
                    <Instructions />
                    <GamePlayContextProvider>
                        <GameButtons />
                        <Board />
                    </GamePlayContextProvider>
                </div>
            </div>
    )
}

export default App;