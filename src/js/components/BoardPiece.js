import React, { useContext } from 'react';
import { GamePlayContext } from '../contexts/GamePlayContext';

const BoardPiece = props => {
    const { displayMove } = useContext(GamePlayContext);
    return(
        <div className={`board-piece ${props.pieceColor}`} id={props.id} onClick={() => displayMove(props.id)}></div>
    )
}

export default BoardPiece;