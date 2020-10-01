import React, { createContext , useState } from 'react';
import BoardCell from '../components/BoardCell'

export const GamePlayContext = createContext();

const GamePlayContextProvider = (props) => {
    //Create and use state for the board, boardpieces, cell to be moved etc
    const [gamePlayCells] = useState([1, 3, 5, 7, 8, 10, 12, 14, 17, 19, 21, 23, 24, 26, 28, 30, 33, 35, 37, 39, 40, 42, 44, 46, 49, 51, 53, 55, 56, 58, 60, 62])
    const [darkPieces, setDarkPiece] = useState([31, 30, 29, 28, 27, 26, 25, 24, 23, 22, 21, 20])
    const [lightPieces, setLightPiece] = useState([0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11])
    const [possibleCells, setPossibleCells] = useState([])
    const [toBeMoved, setToBeMoved] = useState()

    //a function to generate the board dynamically
    const createBoard = () => {
        let boardCells = [];
        let ids = 0;
        //loop through from 0 - 63 because the board has 64 cells
        for (let i = 0; i < 64; i++) {
            //check if the cell's id or number in the array is one in the gameplay state array, if so,create the cell and style it accordingly and give it an id
            if(gamePlayCells.includes(i) && !possibleCells.includes(gamePlayCells.indexOf(i) )) {
                boardCells[i] = <BoardCell key={i} id={ids++} cellType="gameplay-cell"/>
            }
            //check if one of the cells is one you want to move to
            else if(possibleCells.includes(gamePlayCells.indexOf(i))) {
                boardCells[i] = <BoardCell key={i} id={ids++} cellType="possible-cell" movePiece={movePiece}/>
            }
            //otherwise create a blank cell
            else {
                boardCells[i] = <BoardCell key={i} cellType="blank-cell"/>
            }
        }
        //return all the cells
        return boardCells;    
    }
    //this function displays the cell to which you want to move
    const displayMove = (id) => {
        //check the position of the cell as it differs for each element and give it the appropriate rules
        
        //MOVEMENT
        const edgeCells = [3, 4, 11, 12, 19, 20, 27, 28];
        const lightmidCells = [5, 6, 7, 13, 14, 15, 21, 22, 23, 29, 30, 31]
        const darkmidCells = [0, 1, 2, 8, 9, 10, 16, 17, 18, 24, 25, 26]

        //CAPTURING
        const LightNormalCapture = [1, 2, 5, 6, 9, 10, 13, 14, 17, 18, 21, 22]
        const DarkNormalCapture = [30, 29, 26, 25, 22, 21, 18, 17, 14, 13, 10, 9]
        const LightRightCapture = [0, 4, 8, 12, 16, 20]
        const DarkRightCapture = [28, 24, 20, 16, 12, 8]
        const LightLeftCapture = [3, 7, 11, 15, 19, 23]
        const DarkLeftCapture = [31, 27, 23, 19, 15, 11]

        //create options to move to
        let opt1, opt2, opt3, opt4;
        //check if its a dark piece
        if(darkPieces.includes(id)) {
            //---- MOVEMENT ----//
            //if it's a cell by the edge, then only give it one option
            if (edgeCells.includes(id)) {
                opt1 = id - 4
                opt2 = null
            }
            //check it's position and calculate the appropriate possible cells
            else if(darkmidCells.includes(id)) {
                opt1 = id - 3
                opt2 = id - 4
            }
            //give it it's two options
            else {
                opt1 = id - 4
                opt2 = id - 5
            }
            
            //CAPTURING
            if(DarkNormalCapture.includes(id)) {
                opt3 = id - 7
                opt4 = id - 9
            }
            else if(DarkRightCapture.includes(id)) {
                opt3 = id - 7
                opt4 = null
            }
            else if(DarkLeftCapture.includes(id)) {
                opt3 = null
                opt4 = id - 9
            }

        }
        //check if it's a light piece
        else if(lightPieces.includes(id)) {
            //---- MOVEMENT ----//
            //if it is an edge cell , give it only one option
            if(edgeCells.includes(id)) {
                opt1 = id + 4
                opt2 = null
            }
            //check it's position and calculate the appropriate possible cells
            else if(lightmidCells.includes(id)) {
                opt1 = id + 3
                opt2 = id + 4
            }
            //give it it's two options
            else {
                opt1 = id + 4
                opt2 = id + 5
            }

            //CAPTURING
            if(LightNormalCapture.includes(id)) {
                opt3 = id + 7
                opt4 = id + 9
            }
            else if(LightRightCapture.includes(id)) {
                opt3 = null
                opt4 = id + 9
            }
            else if(LightLeftCapture.includes(id)) {
                opt3 = id + 7
                opt4 = null
            }
        }
        //add the two possible cells to state
        //check the availability of possibile cells

        //check that both cells are blocked by other pieces
        if((lightPieces.includes(opt1) && lightPieces.includes(opt2)) || (darkPieces.includes(opt1) && darkPieces.includes(opt2))) {
            setPossibleCells([])
        }
        //check that cells are blocked by pieces of different colors
        else if((darkPieces.includes(opt1) && lightPieces.includes(opt2)) || (lightPieces.includes(opt1) && darkPieces.includes(opt2))) {
            setPossibleCells([])
        }
        //check that one cell is blocked by another piece
        else if((lightPieces.includes(opt1) && !lightPieces.includes(opt2)) || (darkPieces.includes(opt1) && !darkPieces.includes(opt2)) ) {
            setPossibleCells([opt2])
        }
        //check that one cell is blocked by another piece
        else if((lightPieces.includes(opt2) && !lightPieces.includes(opt1)) || (darkPieces.includes(opt2) && !darkPieces.includes(opt1)) ) {
            setPossibleCells([opt1])
        }
        //if not blocked
        else{
            setPossibleCells([opt1, opt2])
        }
        //add the id of the piece to be moved
        setToBeMoved(id)
    }


    //function for removing pieces
    const removePiece = id => {
        if(darkPieces.includes(id)){
            return darkPieces.filter(piece => piece !== id)
        }
        else if(lightPieces.includes(id)) {
            return lightPieces.filter(piece => piece !== id)
        }
    }
    const capturePiece = id => {
        
    }

    //function for moving pieces
    const movePiece = (newid) =>{
        if(darkPieces.includes(toBeMoved)) {
            //create a new array without the piece you want to move then add the new piece to the array and set to state
            const newDark = removePiece(toBeMoved)
            setDarkPiece([...newDark, newid])
        }else if(lightPieces.includes(toBeMoved)) {
            //create a new array without the piece you want to move then add the new piece to the array and set to state
            const newLight = removePiece(toBeMoved)
            setLightPiece([...newLight, newid])
        }
        //set state of possible options to normal which is none
        setPossibleCells([])
    }

    return (
        <GamePlayContext.Provider value={{createBoard, darkPieces, lightPieces, displayMove, movePiece}}>
            { props.children }
        </GamePlayContext.Provider>
    );
}
 
export default GamePlayContextProvider;