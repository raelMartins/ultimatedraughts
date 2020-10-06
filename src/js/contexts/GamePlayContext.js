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
            let captlight
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

        //create options to move to
        let opt1, opt2, opt3, opt4;
        //check if its a dark piece
        if(darkPieces.includes(id)) {
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
        else if(lightPieces.includes(id)) {
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
        
        //check the availability of possibile cells
        let possibilities ;
        //if it's a dark piece blocked by two dark pieces nothing happens
        if(darkPieces.includes(id) && darkPieces.includes(opt1) && darkPieces.includes(opt2)) {
            possibilities = []
        }
        //if it's a light piece blocked by two light pieces, nothing happens
        else if(lightPieces.includes(id) && lightPieces.includes(opt1) && lightPieces.includes(opt2)) {
            possibilities = []
        }
        //if it's a dark piece blocked by two light pieces, opportunity to capture, check whether possibilities are available
        else if(darkPieces.includes(id) && lightPieces.includes(opt1) && lightPieces.includes(opt2)) {
            //if the two capture options are blocked by either two white or two black, nothing happens
            if((lightPieces.includes(opt3) && lightPieces.includes(opt4)) || (darkPieces.includes(opt3) && darkPieces.includes(opt4))) {
                possibilities = []
            }
            //if a light piece or dark piece blocks one option, go for the other
            else if((!lightPieces.includes(opt3) && lightPieces.includes(opt4)) || (!darkPieces.includes(opt3) && darkPieces.includes(opt4))) {
                possibilities = [opt3]
            }
            //if a light piece or dark piece blocks one option, go for the other
            else if((!lightPieces.includes(opt4) && lightPieces.includes(opt3)) || (!darkPieces.includes(opt4) && darkPieces.includes(opt3))){
                possibilities = [opt4]
            }
            //if nothing blocks it, go for it
            else {
                possibilities = [opt3, opt4]
            }
        }
       //if it's a light piece blocked by two dark pieces, opportunity to capture, check whether possibilities are available
        else if(lightPieces.includes(id) && darkPieces.includes(opt1) && darkPieces.includes(opt2)) {
            //if the two capture options are blocked by either two white or two black, nothing happens
            if((lightPieces.includes(opt3) && lightPieces.includes(opt4)) || (darkPieces.includes(opt3) && darkPieces.includes(opt4))) {
                possibilities = []
            }
            //if a light piece or dark piece blocks one option, go for the other
            else if((!darkPieces.includes(opt3) && darkPieces.includes(opt4)) || (!lightPieces.includes(opt3) && lightPieces.includes(opt4))) {
                possibilities = [opt3]
            }
            //if a light piece or dark piece blocks one option, go for the other
            else if((!darkPieces.includes(opt4) && darkPieces.includes(opt3)) || (!lightPieces.includes(opt4) && lightPieces.includes(opt3))){
                possibilities = [opt4]
            }
            //if nothing blocks it, go for it
            else {
                possibilities = [opt3, opt4]
            }
        }

        //check that cells are blocked by pieces of different colors(black blocking first, white blocking second)

        //if it is a black cell blocking the first cell and a light blocking the second

        //if it is a darkpiece being moved...?
        else if(darkPieces.includes(id) && darkPieces.includes(opt1) && lightPieces.includes(opt2)) {
            //if behind the light piece is another black or white piece do nothing
            if(darkPieces.includes(opt4) || lightPieces.includes(opt4)) {
                possibilities = []
            }
            //otherwise, go for it
            else {
                possibilities = [opt4]
            }
        }
        //if it is a lightpiece being moved...?
        else if(lightPieces.includes(id) && darkPieces.includes(opt1) && lightPieces.includes(opt2)) {
            //if behind the dark cell there is a light or dark cell behind it do nothing
            if(darkPieces.includes(opt3) || lightPieces.includes(opt3)) {
                possibilities = []
            }
            //otherwise go for it
            else {
                possibilities = [opt3]
            }
        }

        //check that cells are blocked by pieces of different colors(white blocking first, black blocking second)
        
        //if it is a dark piece being moved
        else if(darkPieces.includes(id) && lightPieces.includes(opt1) && darkPieces.includes(opt2)){
            //if there is a piece behind the cell you want to capture, do nothing
            if(darkPieces.includes(opt3) || lightPieces.includes(opt3)) {
                possibilities = []
            }
            //otherwise do nothing
            else {
                possibilities = [opt3]
            }
        }
        //if it is a light piece you want to move,...?
        else if(lightPieces.includes(id) && lightPieces.includes(opt1) && darkPieces.includes(opt2)){
            //if there is a light or dark cell behid the cell you want to capture, do nothing
            if(darkPieces.includes(opt4) || lightPieces.includes(opt4)) {
                possibilities = []
            }
            //otherwise go for it
            else {
                possibilities = [opt4]
            }
        }

        //check that one cell is blocked by another piece

        //if it's a dark piece you're moving blocked by a light piece
        else if(darkPieces.includes(id) && lightPieces.includes(opt1) && !lightPieces.includes(opt2)) {
            //if the cell behind the cell you want to capture is blocked, only display other option
            if(lightPieces.includes(opt3) || darkPieces.includes(opt3)) {
                possibilities = [opt2]
            }

            //otherwise, choose to capture or move
            else {
                possibilities = [opt2, opt3]
            }
        }
        //if it's a light piece blocked by a light piece move to the open space
        else if(lightPieces.includes(id) && lightPieces.includes(opt1) && !lightPieces.includes(opt2)) {
            possibilities = [opt2]
        }

        //if it's a dark piece blocked by a dark piece move to the open space
        else if(darkPieces.includes(id) && darkPieces.includes(opt1) && !darkPieces.includes(opt2)) {
            possibilities = [opt2]
        }
        //if it's a light piece blocked by a dark piece
        else if(lightPieces.includes(id) &&  darkPieces.includes(opt1) && !darkPieces.includes(opt2)) {
            //if the cell behind the cell you want to capture is blocked, only display other option
            if(lightPieces.includes(opt3) || darkPieces.includes(opt3)) {
                possibilities = [opt2]
            }
            //otherwise, choose to capture or move
            else {
                possibilities = [opt2, opt3]
            }
        }

        //check that one cell is blocked by another piece

        //if dark piece is blocked by a light piece
        else if(darkPieces.includes(id) && lightPieces.includes(opt2) && !lightPieces.includes(opt1)) {
            //check that the cell behind the one you want to capture is free, if not display only the move action
            if(darkPieces.includes(opt4) || lightPieces.includes(opt4)) {
                possibilities = [opt1]
            }
            //otherwise, display both options
            else {
                possibilities = [opt1, opt4]
            }
        }
        //if lightpiece blocked by light piece, move to open slot
        else if(lightPieces.includes(id) && lightPieces.includes(opt2) && !lightPieces.includes(opt1)) {
            possibilities = [opt1]
        }

        //if dark piece blocked by dark piece, move to open slot
        else if(darkPieces.includes(id) && darkPieces.includes(opt2) && !darkPieces.includes(opt1)) {
            possibilities = [opt1]
        }
        //if light piece is piece being moved
        else if(lightPieces.includes(id) && darkPieces.includes(opt2) && !darkPieces.includes(opt1)) {
            //if the cell behind the piece you want to capture is blocked, do nothing except move to other slot
            if(darkPieces.includes(opt4) || lightPieces.includes(opt4)) {
                possibilities = [opt1]
            }

            //otherwise display both options
            else {
                possibilities = [opt1, opt4]
            }
        }
        //if not blocked
        else{
            possibilities = [opt1, opt2]
        }

        //add the possible cells to state
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