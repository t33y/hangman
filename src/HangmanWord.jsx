import React from 'react'

const HangmanWord = ({word, guessedLetters, setGuessedLetters, isLoser, isWinner}) =>{
    // const word = words[Math.floor(Math.random()* 11)]
    return(
        <div style={{textTransform:"uppercase", fontWeight:"bold", fontSize:"40px", display:"flex", flexDirection:"row", gap:"7px"  }}>
      {console.log(guessedLetters, "running11")}
            {word?.split("").map((letter,index)=>{
             return  <div key={index} style={{borderBottom:"10px black solid", width:"50px"}}>
                 <span style={
                        {visibility: guessedLetters.includes(letter)? "visible"
                        :isLoser || isWinner ? "visible":"hidden",
                        color: guessedLetters.includes(letter)? "black":"red"
                        }}>
                        {letter}</span>
             </div>
               })}
        </div>
    )
} 

export default HangmanWord;