import React, { useState } from "react";
import ThemeSwitch from "./ThemeSwitch";
import Nav from "./Nav";
import "./header.css";
import { AnimatePresence } from "framer-motion";
import { getRandomWord } from "./services";
import { words } from "./App";
import { Tooltip } from "@mui/material";

function Header({
  theme,
  setTheme,
  setOptions,
  options,
  setGuessedLetters,
  setWordHint,
  wordHint,
  setWord,
  setHintIsOpen,
}) {
  const [isActive, setIsActive] = useState(false);

  const startGame = () => {
    if (options.Difficulty === "hard") {
      getRandomWord().then((randomWord) => {
        console.log("random word", randomWord);
        setGuessedLetters([]);
        setWordHint("");
        setHintIsOpen(false);
        setWord(randomWord);
      });
      console.log("word on its own", word);
    } else {
      setWord(words[Math.floor(Math.random() * 26)]);
      setGuessedLetters([]);
      setWordHint("");
      setHintIsOpen(false);
    }
  };

  return (
    <div style={{ height: "50px" }}>
      <div
        className="shadow-md dark:shadow-gray-500 dark:bg-gray-800 bg-[#f1f6fe]"
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          maxWidth: "screen",
          padding: "10px",
          paddingRight: "30px",
          position: "fixed",
          top: "0px",
          right: "0px",
          left: "0px",

          zIndex: "1",
        }}
      >
        <Tooltip title="Start new game" arrow>
          <div
            onClick={startGame}
            className="text-gray-800/70 dark:text-gray-100 transition-all font-bold cursor-pointer hover:text-gray-800/80 px-20"
          >
            Hangman Game
          </div>
        </Tooltip>
        <div
          className={`text-gray-800/70 hover:text-gray-800/80 transition-all
            ${
              isActive
                ? "sm:-translate-x-48 z-20 transition-all duration-700 ease-in-out "
                : "translate-x-0 transition-all duration-700 ease-in-out delay-75"
            }
          `}
          style={{
            display: "flex",
            gap: "30px",
            alignItems: "center",
          }}
        >
          <ThemeSwitch theme={theme} setTheme={setTheme} />
          <div
            onClick={() => {
              setIsActive(!isActive);
            }}
            className="button w-[50px] h-[30px] rounded-[50%] cursor-pointer flex items-center justify-center group "
          >
            <div
              className={`w-[40%] h-[1px] dark:bg-white bg-black after:h-[1px] after:w-[60%] after:origin-center before:origin-center after:block before:block after:m-auto before:box-content after:bg-blue-700 dark:after:bg-blue-400 after:-top-[5px] after:relative after:transition-all before:h-[1px] before:w-[60%] before:top-[4px] before:m-auto before:bg-black dark:before:bg-white before:relative group-hover:after:w-full before:duration-300 after:duration-300 group-hover:before:w-full group-hover:after:-top-2 group-hover:before:top-2 transition-all duration-300 before:transition-all ${
                isActive
                  ? "after:!-top-[1px] after:w-full before:w-full group-hover:after:-top-[1px] group-hover:before:top-0 translate-y-[2px] !bg-[#f1f6fe] dark:!bg-gray-800  after:rotate-45  before:!top-[0px] before:-rotate-45  "
                  : ""
              }`}
            ></div>
          </div>
        </div>
      </div>
      <AnimatePresence>
        {isActive && (
          <Nav
            setGuessedLetters={setGuessedLetters}
            setWordHint={setWordHint}
            wordHint={wordHint}
            setOptions={setOptions}
            options={options}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
export default Header;
