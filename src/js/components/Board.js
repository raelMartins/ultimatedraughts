import React, { useContext } from 'react';
import { GamePlayContext } from '../contexts/GamePlayContext';

const Board = () => {

    const { createBoard } = useContext(GamePlayContext)
    return(
        <div className="left col-6">
            <div className="player-name">
                <h5>Player 1</h5>
            </div>
            <div className="board">
                { createBoard() }
            </div>
            <div className="player-name">
                <h5>Player 2</h5>
            </div>
            
        </div>
    )
}

export default Board;