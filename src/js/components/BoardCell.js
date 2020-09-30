import React, { useContext, useEffect } from 'react';
import { GamePlayContext } from '../contexts/GamePlayContext';
import BoardPiece from './BoardPiece';

const BoardCell = props => {
    const { darkPieces, lightPieces } = useContext(GamePlayContext)
    // useEffect (() => {
    //     console.log('Something changed')
    // },[darkPieces, lightPieces])
    return (
        <div className={`board-cell ${props.cellType}`} id={props.id}>
            {darkPieces.includes(props.id) ? <BoardPiece pieceColor = "dark" id={props.id}/> : null}
            {lightPieces.includes(props.id) ? <BoardPiece pieceColor = "light" id={props.id}/>: null}
        </div>
    )
}

export default BoardCell;