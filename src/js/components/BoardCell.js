import React, { useContext } from 'react';
import { GamePlayContext } from '../contexts/GamePlayContext';
import { ThemeContext } from '../contexts/ThemeContext';
import BoardPiece from './BoardPiece';

const BoardCell = props => {
    const { darkPieces, lightPieces, darkKings, lightKings} = useContext(GamePlayContext)
    const { isDark, darkTheme } = useContext(ThemeContext)

    let cellStyle;
        if(props.cellType === 'blank-cell'){
            cellStyle = {backgroundColor: darkTheme.inactiveCell}
        }
        else if(props.cellType === 'gameplay-cell'){
            cellStyle = {backgroundColor: darkTheme.cellColor}
        }
        else {cellStyle = {}}
    return (
        <div 
            className={`board-cell ${props.cellType}`} 
            id={props.id} 
            onClick={props.cellType === "possible-cell" ? () => {props.movePiece(props.id)} : null}
            style={isDark ? cellStyle : {}}
        >
            {darkPieces.includes(props.id) ? <BoardPiece pieceColor = "dark" id={props.id}/> : null}
            {lightPieces.includes(props.id) ? <BoardPiece pieceColor = "light" id={props.id}/>: null}
            {darkKings.includes(props.id) ? <BoardPiece pieceColor = "dark dark-king" id={props.id}/> : null}
            {lightKings.includes(props.id) ? <BoardPiece pieceColor = "light light-king" id={props.id}/>: null}
        </div>
    )
}

export default BoardCell;