import React from "react";
import './keyboard.css'

const keys = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'

const Keyboard = ({incorrectLetters, setPressedKey, guessedLetters, isLoser, isWinner})=>{
    return(
        <div style={{display:"grid", gridTemplateColumns:"repeat(auto-fit, 75px)", alignSelf:"stretch" , gap:"5px"}}>
            {keys.split('').map((letter, index)=>{
                const IncorrectGuess = incorrectLetters.includes(letter.toLowerCase())
                const CorrectGuess = guessedLetters.includes(letter.toLocaleLowerCase()) && !incorrectLetters.includes(letter.toLocaleLowerCase())
                return <button 
                onClick={(e)=> setPressedKey(e.target.innerHTML.toLowerCase())} 
                className = {`btn ${IncorrectGuess? 'incorrectbtn': CorrectGuess? 'correctbtn':''}`}
                disabled = {IncorrectGuess || CorrectGuess || isLoser || isWinner }
                key={index}>{letter}</button>
            }
            )}
        </div>
    )
}

export default Keyboard;