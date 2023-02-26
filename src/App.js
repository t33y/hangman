import { useEffect, useState } from 'react';
import HangmanDrawing from './HangmanDrawing';
import HangmanWord from './HangmanWord';
import Keyboard from './Keyboard';

function App() {
  const words = [
    "hangman",
   "relax",
    "sun", 
    "glasses", 
    "sport", 
    "tension", 
    "normal", 
    "move", 
    "share", 
    "friend", 
    "couple", 
    "audience", 
    "band", 
    "enough", 
    "woman"
  ]
// eslint-disable-next-line
  const [word, setWord] = useState(words[Math.floor(Math.random()* 15)])
  const [guessedLetters, setGuessedLetters] = useState([])
  const [pressedKey, setPressedKey] = useState("")

  const incorrectLetters = guessedLetters.filter(letter=> !word.includes(letter))
  const isLoser = incorrectLetters.length>= 6
  const isWinner = word.split("").every((letter)=> guessedLetters.includes(letter))
  

  
  useEffect(()=>{

    if(pressedKey==="Enter"){
      setWord(words[Math.floor(Math.random()* 15)])
      setGuessedLetters([])
    }

    if(!pressedKey || 
      pressedKey === "Enter" || 
      guessedLetters.includes(pressedKey) || 
      isLoser || 
      isWinner) return

    setGuessedLetters(prev=>[...prev, pressedKey])

// eslint-disable-next-line
  },[pressedKey, isLoser, isWinner])
  
  
  
  useEffect(()=>{
 
    const handleKeyPress = (e)=>{
      if(e.key==="Enter"){
        e.preventDefault()
        setPressedKey(e.key)
      }
      
      if(!/[a-z]/.test(e.key) || isLoser || isWinner) return
      e.preventDefault()
      setPressedKey(e.key)
    }

    document.addEventListener('keypress', handleKeyPress)
    
    return ()=> document.removeEventListener('keypress', handleKeyPress)

    // eslint-disable-next-line
}, [])

  return (
    <div 
      style={{
        textAlign:'center',
        fontFamily: 'Gill Sans, Gill Sans MT, Calibri, Trebuchet MS, sans-serif',
        display:'flex',
        flexDirection:'column',
        justifyItems:'space-around',
        alignItems:'center',
        gap:'20px',
        maxWidth:'800px',
        margin: 'auto'
      }}>

      <div style={{height:'50px', marginTop:"20px", fontSize:"25px"}}>
        {isWinner && "You Win!!.. Reload or press ENTER to play again"}
        {isLoser && "Nice Try.. Reload or press ENTER to play again"}
      </div>

     <HangmanDrawing incorrectLetters={incorrectLetters}/>

     <HangmanWord
      word={word} 
      guessedLetters={guessedLetters} 
      setGuessedLetters={setGuessedLetters} 
      isLoser={isLoser} isWinner={isWinner} />

     <Keyboard
      isLoser={isLoser} 
      isWinner={isWinner} 
      incorrectLetters={incorrectLetters} 
      guessedLetters={guessedLetters} 
      setPressedKey={setPressedKey}/>

    </div>
  );
}

export default App;
