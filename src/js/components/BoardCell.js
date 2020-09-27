import React from 'react';
import BoardPiece from './BoardPiece';

const BoardCell = props => {
    return (
        <div className={`board-cell ${props.cellType}`} id={props.id}>
            {props.cellType === "gameplay-cell" && props.id < 24 ? <BoardPiece pieceColor = "light light-king"/> : null}
            {props.cellType === "gameplay-cell" && props.id >= 40 ? <BoardPiece pieceColor = "dark dark-king"/> : null}
        </div>
    )
}

export default BoardCell;