import React from 'react';

const Instructions = () => {
    return(
        <div className="left col-md-5">
            <div className="instructions">
                <h5>RULES</h5>
                <p className="instructions-text">
                    The rules of the game are simple. Each player takes it in turn to move a piece.<br /><br />
                    The pieces can only move diagonally forward one step unless it is a king. Each king can move backwards and forwards by one step.<br /><br />
                    If the possible movement of a piece is blocked by a piece from the opponents team, and there is a free space (ie a cell not already occupied) behind the piece, the player can then capture it by jumping over it and taking the previously non occupied cell behind it. <br /><br />
                    <b>NOTE- </b> In this version of the game you can only take one opponent piece at a time(mostly cos i was too lazy to write all the extra code needed to accomplish multiple capturing)<br /><br />
                    The king can also capture a piece behind as well as in front<br /><br />
                    Goodluck and may the best man... or woman... win!!
                </p>
            </div>
        </div>
    )
}

export default Instructions;