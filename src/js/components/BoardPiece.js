import React from 'react';

const BoardPiece = props => {
    return(
        <div className={`board-piece ${props.pieceColor}`} ></div>
    )
}

export default BoardPiece;