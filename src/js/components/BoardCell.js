import React, { useContext } from 'react';
import { GamePlayContext } from '../contexts/GamePlayContext';
import BoardPiece from './BoardPiece';

const BoardCell = props => {
    const { darkPieces, lightPieces } = useContext(GamePlayContext)
    return (
        <div className={`board-cell ${props.cellType}`} id={props.id} onClick={props.cellType === "possible-cell" ? () => props.movePiece(props.id) : null}>
            {darkPieces.includes(props.id) ? <BoardPiece pieceColor = "dark" id={props.id}/> : null}
            {lightPieces.includes(props.id) ? <BoardPiece pieceColor = "light" id={props.id}/>: null}
        </div>
    )
}

export default BoardCell;