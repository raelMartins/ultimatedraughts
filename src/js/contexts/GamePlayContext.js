import React, { createContext , useState } from 'react';
import BoardCell from '../components/BoardCell'

export const GamePlayContext = createContext();

const GamePlayContextProvider = (props) => {
    
    const [gamePlayCells] = useState([1, 3, 5, 7, 8, 10, 12, 14, 17, 19, 21, 23, 24, 26, 28, 30, 33, 35, 37, 39, 40, 42, 44, 46, 49, 51, 53, 55, 56, 58, 60, 62])
    const [darkPieces, setDarkPiece] = useState([31, 30, 29, 28, 27, 26, 25, 24, 23, 22, 21, 20])
    const [lightPieces, setLightPiece] = useState([0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11])

    const createBoard = () => {
        let boardCells = [];
        let ids = 0;
        for (let i = 0; i < 64; i++) {
            if(gamePlayCells.includes(i)) {
                boardCells[i] = <BoardCell key={i} id={ids++} cellType="gameplay-cell"/>
            }
            else {
                boardCells[i] = <BoardCell key={i} cellType="blank-cell"/>
            }
        }
        return boardCells;    
    }

    const removeDarkPiece = (id) => {
        setDarkPiece(darkPieces.filter(piece => piece !== id))
    }
    const removeLightPiece = (id) => {
        setLightPiece(lightPieces.filter(piece => piece !== id))
    }
    const displayMove = (id) => {
        if(a){}
    }
    const moveDarkPiece = (previd, newid) => {
        removeDarkPiece(previd)
        setDarkPiece([...darkPieces, newid])
    }
    const moveLightPiece = (previd, newid) => {
        removeLightPiece(previd)
        setLightPiece([...lightPieces, newid])
    }
    return (
        <GamePlayContext.Provider value={{createBoard, darkPieces, lightPieces, removeDarkPiece, removeLightPiece}}>
            { props.children }
        </GamePlayContext.Provider>
    );
}
 
export default GamePlayContextProvider;