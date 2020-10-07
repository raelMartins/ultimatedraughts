import React, { useContext } from 'react';
import { GamePlayContext } from '../contexts/GamePlayContext';
import BoardPiece from './BoardPiece';

const Board = () => {

    const { createBoard, capturedDark, capturedLight, player, gamePlaying, winner } = useContext(GamePlayContext)
    const darkCaptured = () =>{
        let dark = [];
        for(let i = 0; i < capturedDark; i++) {
            dark[i] = <BoardPiece pieceColor = "dark" key={i}/>
        }
        return dark
    }
    const lightCaptured = () =>{
        let light = [];
        for(let i = 0; i < capturedLight; i++) {
            light[i] = <BoardPiece pieceColor = "light" key={i}/>
        }
        return light
    }

    return(
        <div className="col-md-5 right">
            <div className="player-name">
                <h5>Player 1 {winner === 'Player 1' ? " WINS!!!" : null}{ player === 'Player 1' && gamePlaying? <span className="active-player"></span> : null}</h5>
                <div className="captured-pieces">{darkCaptured()}</div>
            </div>
            <div className="board">
                { createBoard() }
            </div>
            <div className="player-name">
                <div className="captured-pieces">{lightCaptured()}</div>
                <h5>Player 2 {winner === 'Player 2' ? " WINS!!!" : null}{ player === 'Player 2' && gamePlaying ? <span className="active-player"></span> : null}</h5>
            </div>
            
        </div>
    )
}

export default Board;