import { useEffect, useState } from "react";
import HangmanDrawing from "./HangmanDrawing";
import HangmanWord from "./HangmanWord";
import Keyboard from "./Keyboard";
import Header from "./Header";
import Hint from "./Hint";
import { getRandomWord, useLocalStorage } from "./services";
import OnlinePredictionOutlinedIcon from "@mui/icons-material/OnlinePredictionOutlined";
import ReactConfetti from "react-confetti";
import toast, { Toaster } from "react-hot-toast";

export const words = [
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
  "woman",
  "husband",
  "root",
  "spiritual",
  "relevance",
  "material",
  "demand",
  "revenge",
  "quick",
  "president",
  "block",
  "operations",
];

function App() {
  // eslint-disable-next-line
  const [options, setOptions] = useLocalStorage("HangmanOptions", {});
  const [word, setWord] = useState(words[Math.floor(Math.random() * 26)]);
  const [guessedLetters, setGuessedLetters] = useState([]);
  const [pressedKey, setPressedKey] = useState("");
  const [theme, setTheme] = useLocalStorage("color-theme", "Light");
  const [wordHint, setWordHint] = useState(null);
  const [hintIsOpen, setHintIsOpen] = useState(false);

  const incorrectLetters = guessedLetters.filter(
    (letter) => !word.includes(letter)
  );
  const isLoser = incorrectLetters.length >= 6;
  const isWinner = word
    ?.split("")
    .every((letter) => guessedLetters.includes(letter));

  useEffect(() => {
    if (
      localStorage.getItem("color-theme") === '"Dark"' ||
      (!("color-theme" in localStorage) &&
        window.matchMedia("(prefers-color-scheme: dark)").matches)
    ) {
      document.body.style.background = "#1f2937";
      document.documentElement.classList.add("dark");
    } else {
      document.body.style.background = "#f1f6fe";
      document.documentElement.classList.remove("dark");
    }
  }, []);

  useEffect(() => {
    if (wordHint) return;
    setPressedKey("");
    if (options.Difficulty === "hard") {
      getRandomWord().then((randomWord) => setWord(randomWord));
    } else {
      setWord(words[Math.floor(Math.random() * 26)]);
    }
  }, [options, wordHint]);

  useEffect(() => {
    if (pressedKey === "Enter") {
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
    }
    if (isWinner) {
      toast.success("You Win!!.. Reload or press ENTER to play again", {
        duration: 9999999,
        icon: "👏",
        id: "result",
        className: "!bg-green-300",
      });
    }
    if (isLoser) {
      toast.error("Nice Try.. Reload or press ENTER to play again", {
        duration: 9999999,
        icon: "🙁",
        id: "result",
        className: "!bg-red-200",
      });
    }
    if (
      !pressedKey ||
      pressedKey === "Enter" ||
      guessedLetters.includes(pressedKey) ||
      isLoser ||
      isWinner
    )
      return;

    setGuessedLetters((prev) => [...prev, pressedKey]);

    // eslint-disable-next-line
  }, [pressedKey, isLoser, isWinner, options]);

  useEffect(() => {
    const handleKeyPress = (e) => {
      if (e.key === "Enter") {
        e.preventDefault();

        setPressedKey(e.key);
      }

      if (!/[a-z]/.test(e.key) || isLoser || isWinner) return;
      e.preventDefault();
      setPressedKey(e.key);
    };

    document.addEventListener("keypress", handleKeyPress);

    return () => document.removeEventListener("keypress", handleKeyPress);

    // eslint-disable-next-line
  }, []);

  return (
    <div>
      {(isLoser || isWinner) && <Toaster />}
      <Header
        theme={theme}
        setTheme={setTheme}
        setOptions={setOptions}
        options={options}
        setGuessedLetters={setGuessedLetters}
        setWordHint={setWordHint}
        wordHint={wordHint}
        setWord={setWord}
        setHintIsOpen={setHintIsOpen}
      />

      {isWinner && (
        <ReactConfetti
          width={window.width}
          height={window.height}
          // gravity={1}
          initialVelocityY={20}
        />
      )}

      <div
        style={{
          textAlign: "center",
          fontFamily:
            "Gill Sans, Gill Sans MT, Calibri, Trebuchet MS, sans-serif",
          display: "flex",

          flexDirection: "column",
          justifyItems: "space-around",
          alignItems: "center",
          gap: "25px",
          maxWidth: "800px",
          margin: "auto",
        }}
      >
        <div
          style={{
            height: "50px",

            marginTop: "20px",
            fontSize: "25px",
          }}
        ></div>
        <div className="flex flex-col justify-center sm:flex-row sm:h-[480px] gap-10 w-full ">
          <div>
            <div className="px-20  rounded-xl dark:bg-slate-600 bg-white py-5 shadow-lg">
              <HangmanDrawing incorrectLetters={incorrectLetters} />
            </div>
          </div>
          <div className="w-full dark:bg-slate-600 dark:text-gray-50 items-center pt-5 flex flex-col justify-start gap-10 rounded-xl bg-white shadow-lg ">
            <div className="flex justify-between dark:text-gray-50 text-gray-700/70 text-xl w-full p-5">
              Hint
              <OnlinePredictionOutlinedIcon />
            </div>
            <Hint
              word={word}
              options={options}
              wordHint={wordHint}
              setWordHint={setWordHint}
              incorrectLetters={incorrectLetters}
              setGuessedLetters={setGuessedLetters}
              hintIsOpen={hintIsOpen}
              setHintIsOpen={setHintIsOpen}
            />
          </div>
        </div>
        <div>
          <HangmanWord
            word={word}
            guessedLetters={guessedLetters}
            setGuessedLetters={setGuessedLetters}
            isLoser={isLoser}
            isWinner={isWinner}
          />
        </div>

        <Keyboard
          isLoser={isLoser}
          isWinner={isWinner}
          incorrectLetters={incorrectLetters}
          guessedLetters={guessedLetters}
          setPressedKey={setPressedKey}
        />
      </div>
    </div>
  );
}

export default App;
