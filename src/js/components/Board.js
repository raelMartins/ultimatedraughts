import React from 'react';
import BoardCell from './BoardCell';

const Board = () => {
    let boardCells = [];
    const gameplayCells = [1, 3, 5, 7, 8, 10, 12, 14, 17, 19, 21, 23, 24, 26, 28, 30, 33, 35, 37, 39, 40, 42, 44, 46, 49, 51, 53, 55, 56, 58, 60, 62]

    for (let i = 0; i < 64; i++) {
        if(gameplayCells.includes(i)) {
            boardCells[i] = <BoardCell key={i} id={i} cellType="gameplay-cell"/>
        }
        else {
            boardCells[i] = <BoardCell key={i} id={i} cellType="blank-cell"/>
        }
    }

    return(
        <>
            <div className="player-name">
                <h5>Player 1</h5>
            </div>
            <div className="board">
                { boardCells }
            </div>
            <div className="player-name">
                <h5>Player 2</h5>
            </div>
        </>
    )
}

export default Board;