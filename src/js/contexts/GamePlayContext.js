import React, { createContext , useState } from 'react';
import BoardCell from '../components/BoardCell'

export const GamePlayContext = createContext();

const GamePlayContextProvider = (props) => {
    //Create and use state for the board, boardpieces, cell to be moved etc
    const [gamePlayCells] = useState([1, 3, 5, 7, 8, 10, 12, 14, 17, 19, 21, 23, 24, 26, 28, 30, 33, 35, 37, 39, 40, 42, 44, 46, 49, 51, 53, 55, 56, 58, 60, 62])
    const [darkPieces, setDarkPiece] = useState([31, 30, 29, 28, 27, 26, 25, 24, 23, 22, 21, 20])
    const [lightPieces, setLightPiece] = useState([0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11])
    const [darkKings, setDarkKings] = useState([])
    const [lightKings, setLightKings] = useState([])
    const [possibleCells, setPossibleCells] = useState([])
    const [toBeMoved, setToBeMoved] = useState()
    const [player, setPlayer] = useState('Player 1')
    const [gamePlaying, setGamePlaying] = useState(true)
    const [capturedLight, setCapturedLight] = useState(0)
    const [capturedDark, setCapturedDark] = useState(0)
    //a function to start a new game
    const newGame = () => {
        setPlayer('Player 1')
        setLightPiece([0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11])
        setDarkPiece([31, 30, 29, 28, 27, 26, 25, 24, 23, 22, 21, 20])
        setPossibleCells([])
        setCapturedDark(0)
        setCapturedLight(0)
        setToBeMoved()
    }

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

    //function for capturing pieces
    const movePiece = id => {

        const lightmidCells = [5, 6, 7, 13, 14, 15, 21, 22, 23, 29, 30, 31]
        const darkmidCells = [0, 1, 2, 8, 9, 10, 16, 17, 18, 24, 25, 26]
        const leftEdgeCells = [4, 12, 20, 28];
        const rightEdgeCells = [3, 11, 19, 27];


        //SCENARIOS
        const DarkSelected = darkPieces.includes(toBeMoved) ? true : false;
        const LightSelected = lightPieces.includes(toBeMoved) ? true : false;

        let newlight, newdark;

        //if the piece you want to move is a dark piece
        if(DarkSelected) {
            //remove it and add a it's new piece/poition to te dark pieces array
            changePiecePosition(id)
            
            //then check if the difference between the piece you were moving and the place you moved is 7
            if(toBeMoved - id === 7) {
                if(darkmidCells.includes(toBeMoved) && lightPieces.includes(toBeMoved - 3)) {
                    newlight = lightPieces.filter(el => el !== toBeMoved - 3)
                }
                else if(!darkmidCells.includes(toBeMoved) && lightPieces.includes(toBeMoved - 4)) {
                    newlight = lightPieces.filter(el => el !== toBeMoved - 4)
                }
            }
            else if(toBeMoved - id === 9) {
                if(darkmidCells.includes(toBeMoved) && lightPieces.includes(toBeMoved - 4)) {
                    newlight = lightPieces.filter(el => el !== toBeMoved - 4)
                }
                else if(rightEdgeCells.includes(toBeMoved) && lightPieces.includes(toBeMoved - 4)) {
                    newlight = lightPieces.filter(el => el !== toBeMoved - 4)
                }
                else if(!darkmidCells.includes(toBeMoved) && lightPieces.includes(toBeMoved - 5)) {
                    newlight = lightPieces.filter(el => el !== toBeMoved - 5)
                }

            }
            newlight !== undefined && setLightPiece([...newlight])
            newlight !== undefined && setCapturedLight(12 - newlight.length)
            
        }else if (LightSelected) {
            //remove it and add a it's new piece/poition to te dark pieces array
            changePiecePosition(id)
            
            if(id - toBeMoved === 7) {
                if(lightmidCells.includes(toBeMoved) && darkPieces.includes(toBeMoved + 3)) {
                    newdark = darkPieces.filter(el => el !== toBeMoved + 3)
                }
                else if(!lightmidCells.includes(toBeMoved) && darkPieces.includes(toBeMoved + 4)) {
                    newdark = darkPieces.filter(el => el !== toBeMoved + 4)
                }
            }
            else if(id - toBeMoved === 9) {
                if(lightmidCells.includes(toBeMoved) && darkPieces.includes(toBeMoved + 4)) {
                    newdark = darkPieces.filter(el => el !== toBeMoved + 4)
                }
                else if(leftEdgeCells.includes(toBeMoved) && darkPieces.includes(toBeMoved + 4)) {
                    newdark = darkPieces.filter(el => el !== toBeMoved + 4)
                }
                else if(!lightmidCells.includes(toBeMoved) && darkPieces.includes(toBeMoved + 5)) {
                    newdark = darkPieces.filter(el => el !== toBeMoved + 5)
                }
            }
            newdark !== undefined && setDarkPiece([...newdark])
            newdark !== undefined && setCapturedDark(12 - newdark.length)   
        }
        
    }

    // function for moving pieces
    const changePiecePosition = (newid) =>{
        if(darkPieces.includes(toBeMoved)) {
            //create a new array without the piece you want to move then add the new piece to the array and set to state
            const newDark = removePiece(toBeMoved)
            setDarkPiece([...newDark, newid])
            setPlayer('Player 1')
        }else if(lightPieces.includes(toBeMoved)) {
            //create a new array without the piece you want to move then add the new piece to the array and set to state
            const newLight = removePiece(toBeMoved)
            setLightPiece([...newLight, newid])
            setPlayer('Player 2')
        }
        //set state of possible options to normal which is none
        setPossibleCells([])
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

    //this function displays the cell to which you want to move
    const displayMove = (id) => {
        //check the position of the cell as it differs for each element and give it the appropriate rules
        
        //MOVEMENT
        const leftEdgeCells = [4, 12, 20, 28];
        const rightEdgeCells = [3, 11, 19, 27];
        const lightmidCells = [5, 6, 7, 13, 14, 15, 21, 22, 23, 29, 30, 31]
        const darkmidCells = [0, 1, 2, 8, 9, 10, 16, 17, 18, 24, 25, 26]

        //CAPTURING
        const LightNormalCapture = [1, 2, 5, 6, 9, 10, 13, 14, 17, 18, 21, 22]
        const DarkNormalCapture = [30, 29, 26, 25, 22, 21, 18, 17, 14, 13, 10, 9]
        const LightRightCapture = [0, 4, 8, 12, 16, 20]
        const DarkRightCapture = [28, 24, 20, 16, 12, 8]
        const LightLeftCapture = [3, 7, 11, 15, 19, 23]
        const DarkLeftCapture = [31, 27, 23, 19, 15, 11]

        const lightSelected = lightPieces.includes(id) ? true : false;
        const darkSelected = darkPieces.includes(id) ? true : false;

        //create options to move to
        let opt1, opt2, opt3, opt4;
        //check if its a dark piece
        if(darkSelected) {
            //---- MOVEMENT ----//
            //if it's a cell by the edge, then only give it one option
            if (leftEdgeCells.includes(id)) {
                opt1 = id - 4
                opt2 = null
            }
            else if(rightEdgeCells.includes(id)) {
                opt1 = null
                opt2 = id-4
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
        else if(lightSelected) {
            //---- MOVEMENT ----//
            //if it is an edge cell , give it only one option
            if(rightEdgeCells.includes(id)) {
                opt1 = id + 4
                opt2 = null
            }
            else if(leftEdgeCells.includes(id)) {
                opt1 = null
                opt2 = id + 4
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
        
        //SCENARIOS
        const darkOn1 = darkPieces.includes(opt1) || darkKings.includes(opt1) ? true : false;
        const darkOn2 = darkPieces.includes(opt2) || darkKings.includes(opt2) ? true : false;
        const darkNotOn1 = !darkPieces.includes(opt1) || !darkKings.includes(opt1) ? true : false;
        const darkNotOn2 = !darkPieces.includes(opt2) || !darkKings.includes(opt2) ? true : false;
        const lightOn1 = lightPieces.includes(opt1) || lightKings.includes(opt1) ? true : false;
        const lightOn2 = lightPieces.includes(opt2) || lightKings.includes(opt2) ? true : false;
        const lightNotOn1 = !lightPieces.includes(opt1) || !lightKings.includes(opt1) ? true : false;
        const lightNotOn2 = !lightPieces.includes(opt2) || !lightKings.includes(opt2) ? true : false;
        const pieceOn3 = darkPieces.includes(opt3) || darkKings.includes(opt3) || lightPieces.includes(opt3) || lightKings.includes(opt3) ? true : false;
        const pieceOn4 = darkPieces.includes(opt4) || darkKings.includes(opt4) || lightPieces.includes(opt4) || lightKings.includes(opt4) ? true : false;
        const noPieceOn3 = !darkPieces.includes(opt3) || !darkKings.includes(opt3) || !lightPieces.includes(opt3) || !lightKings.includes(opt3) ? true : false;
        const noPieceOn4 = !darkPieces.includes(opt4) || !darkKings.includes(opt4) || !lightPieces.includes(opt4) || !lightKings.includes(opt4) ? true : false;

        //HERE WE WILL CHECK POSSIBLE DRAUGHTS SCENARIOS. 
        //USE THE VARIABLE NAMES IN THE IF PARAMETERS TO UNDERSTAND WHAT WAS CHECKED

        let possibilities;
        if(darkSelected) {
            if(darkOn1 && darkOn2) {possibilities = []}
            else if(lightOn1 && lightOn2) {
                if(pieceOn3 && pieceOn4) {possibilities = []}
                else if(noPieceOn3 && pieceOn4) {possibilities = [opt3]}
                else if(noPieceOn4 && pieceOn3){possibilities = [opt4]}
                else {possibilities = [opt3, opt4]}
            }
            else if(darkOn1 && lightOn2) {
                if(pieceOn4) {possibilities = []}
                else {possibilities = [opt4]}
            }
            else if(lightOn1 && darkOn2){
                if(pieceOn3) {possibilities = []}
                else {possibilities = [opt3]}
            }
            else if(lightOn1 && lightNotOn2) {
                if(pieceOn3) {possibilities = [opt2]}
                else {possibilities = [opt2, opt3]}
            }
            else if(lightOn2 && lightNotOn1) {
                if(pieceOn4) {possibilities = [opt1]}
                else {possibilities = [opt1, opt4]}
            }
            else if(darkOn1 && darkNotOn2) {possibilities = [opt2]}
            else if(darkOn2 && darkNotOn1) {possibilities = [opt1]}
            else{possibilities = [opt1, opt2]}
        }
        else if(lightSelected) {
            if(lightOn1 && lightOn2) {possibilities = []}
            else if(darkOn1 && darkOn2) {
                if(pieceOn3 && pieceOn4) {possibilities = []}
                else if(noPieceOn3 && pieceOn4) {possibilities = [opt3]}
                else if(noPieceOn4 && pieceOn3){possibilities = [opt4]}
                else {possibilities = [opt3, opt4]}
            }
            else if(darkOn1 && lightOn2) {
                if(pieceOn3) {possibilities = []}
                else {possibilities = [opt3]}
            }
            else if(lightOn1 && darkOn2){
                if(pieceOn4) {possibilities = []}
                else {possibilities = [opt4]}
            }
            else if(darkOn1 && darkNotOn2) {
                if(pieceOn3) {possibilities = [opt2]}
                else {possibilities = [opt2, opt3]}
            }
            else if(darkOn2 && darkNotOn1) {
                if(pieceOn4) {possibilities = [opt1]}
                else {possibilities = [opt1, opt4]}
            }
            else if(lightOn1 && lightNotOn2) {possibilities = [opt2]}
            else if(lightOn2 && lightNotOn1) {possibilities = [opt1]}
            else{possibilities = [opt1, opt2]}
        }
        setPossibleCells(possibilities)
        //add the id of the piece to be moved
        setToBeMoved(id)
    }

    return (
        <GamePlayContext.Provider value={{createBoard, darkPieces, lightPieces, displayMove, movePiece, player, capturedDark, capturedLight, newGame}}>
            { props.children }
        </GamePlayContext.Provider>
    );
}
 
export default GamePlayContextProvider;