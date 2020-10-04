import React, { useContext } from 'react';
import { GamePlayContext } from '../contexts/GamePlayContext';

const BoardPiece = props => {
    const { displayMove, player, lightPieces, darkPieces } = useContext(GamePlayContext);
    const display = () => {
        if(player === 'Player 1' && lightPieces.includes(props.id)) {
            displayMove(props.id)
        }
        else if(player === 'Player 2' && darkPieces.includes(props.id)) {
            displayMove(props.id)
        }
        else{
            return null
        }
    }
    return(
        <div className={`board-piece ${props.pieceColor}`} id={props.id} onClick={display}></div>
    )
}

export default BoardPiece;