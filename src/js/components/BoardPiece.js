import React, { useContext } from 'react';
import { GamePlayContext } from '../contexts/GamePlayContext';

const BoardPiece = props => {
    const { displayMove } = useContext(GamePlayContext);
    // const {removeDarkPiece, removeLightPiece, darkPieces, lightPieces} = useContext(GamePlayContext);
    // const removePiece = () => {
    //     if(darkPieces.includes(props.id)) {
    //         removeDarkPiece(props.id)
    //     }else if (lightPieces.includes(props.id)) {
    //         removeLightPiece(props.id)
    //     }else {
    //         console.log('An error occurred')
    //     }
    // } 
    return(
        <div className={`board-piece ${props.pieceColor}`} id={props.id} onClick={() => displayMove(props.id)}></div>
    )
}

export default BoardPiece;