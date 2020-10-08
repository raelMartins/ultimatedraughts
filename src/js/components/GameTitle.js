import React, { useContext } from "react";
import { ThemeContext } from "../contexts/ThemeContext";

const GameTitle = () => {
    const { isDark, darkTheme} = useContext(ThemeContext)
    return(
        <div className= "game-title" style={isDark ? {backgroundColor: darkTheme.cellColor} : {}}>
            <h4 className="title" style={isDark ? {color: darkTheme.text} : {}}>THE ULTIMATE DRAUGHTS/CHECKERS GAME</h4>
        </div>
    )
}

export default GameTitle;