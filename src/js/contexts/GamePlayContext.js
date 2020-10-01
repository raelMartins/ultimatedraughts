import React, { createContext , useState } from 'react';
import BoardCell from '../components/BoardCell'

export const GamePlayContext = createContext();

const GamePlayContextProvider = (props) => {
    
    const [gamePlayCells] = useState([1, 3, 5, 7, 8, 10, 12, 14, 17, 19, 21, 23, 24, 26, 28, 30, 33, 35, 37, 39, 40, 42, 44, 46, 49, 51, 53, 55, 56, 58, 60, 62])
    const [darkPieces, setDarkPiece] = useState([31, 30, 29, 28, 27, 26, 25, 24, 23, 22, 21, 20])
    const [lightPieces, setLightPiece] = useState([0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11])
    const [possibleCells, setPossibleCells] = useState([])
    const [toBeMoved, setToBeMoved] = useState()

    const createBoard = () => {
        let boardCells = [];
        let ids = 0;
        for (let i = 0; i < 64; i++) {
            if(gamePlayCells.includes(i) && !possibleCells.includes(gamePlayCells.indexOf(i) )) {
                boardCells[i] = <BoardCell key={i} id={ids++} cellType="gameplay-cell"/>
            }else if(possibleCells.includes(gamePlayCells.indexOf(i))) {
                boardCells[i] = <BoardCell key={i} id={ids++} cellType="possible-cell" movePiece={movePiece}/>
            } else {
                boardCells[i] = <BoardCell key={i} cellType="blank-cell"/>
            }
        }
        return boardCells;    
    }
    const displayMove = (id) => {
        const edgeCells = [3, 4, 11, 12, 19, 20, 27, 28];
        const lightmidCells = [5, 6, 7, 13, 14, 15, 21, 22, 23, 29, 30, 31]
        const darkmidCells = [0, 1, 2, 8, 9, 10, 16, 17, 18, 24, 25, 26]

        let opt1, opt2;
        if(darkPieces.includes(id)) {
            if (edgeCells.includes(id)) {
                opt1 = id - 4
                opt2 = null
            }else if(darkmidCells.includes(id)) {
                opt1 = id - 3
                opt2 = id - 4
            }else {
                opt1 = id - 4
                opt2 = id - 5
            }
        }else if(lightPieces.includes(id)) {
            if(edgeCells.includes(id)) {
                opt1 = id + 4
                opt2 = null
            }else if(lightmidCells.includes(id)) {
                opt1 = id + 3
                opt2 = id + 4
            }else {
                opt1 = id + 4
                opt2 = id + 5
            }
        }
        setPossibleCells([opt1, opt2])
        setToBeMoved(id)
    }

    const removeDarkPiece = (id) => {
        return darkPieces.filter(piece => piece !== id)
    }
    const removeLightPiece = (id) => {
        return lightPieces.filter(piece => piece !== id)
    }
    const moveDarkPiece = (previd, newid) => {
        const newDark = removeDarkPiece(previd)
        setDarkPiece([...newDark, newid])
    }
    const moveLightPiece = (previd, newid) => {
        const newLight = removeLightPiece(previd)
        setLightPiece([...newLight, newid])
    }
    const movePiece = (newid) =>{
        if(darkPieces.includes(toBeMoved)) {
            moveDarkPiece(toBeMoved, newid)
        }else if(lightPieces.includes(toBeMoved)) {
            moveLightPiece(toBeMoved, newid)
        }
        setPossibleCells([])
    }

    return (
        <GamePlayContext.Provider value={{createBoard, darkPieces, lightPieces, displayMove, movePiece}}>
            { props.children }
        </GamePlayContext.Provider>
    );
}
 
export default GamePlayContextProvider;