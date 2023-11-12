import React from "react";

const HangmanWord = ({
  word,
  guessedLetters,
  setGuessedLetters,
  isLoser,
  isWinner,
}) => {
  // const word = words[Math.floor(Math.random()* 11)]
  return (
    <div
      style={{
        textTransform: "uppercase",
        fontWeight: "bold",
        fontSize: "40px",
        display: "flex",
        flexDirection: "row",
        gap: "7px",
      }}
    >
      {word?.split("").map((letter, index) => {
        return (
          <div
            key={index}
            className="border-b-[10px] border-b-black dark:border-b-white"
            style={{ width: "50px" }}
          >
            <span
              className={
                guessedLetters.includes(letter)
                  ? "text-black dark:text-white"
                  : "text-red-700"
              }
              style={{
                visibility: guessedLetters.includes(letter)
                  ? "visible"
                  : isLoser || isWinner
                  ? "visible"
                  : "hidden",
                // color: guessedLetters.includes(letter) ? "black" : "red",
              }}
            >
              {letter}
            </span>
          </div>
        );
      })}
    </div>
  );
};

export default HangmanWord;
