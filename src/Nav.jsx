import React from "react";
import { motion } from "framer-motion";
import { slide, menuSlide } from "./animation";
import Curve from "./Curve";

const navItems = [
  {
    title: "Difficulty",
    optionsArray: ["Easy", "Hard"],
  },
  {
    title: "Hint",
    optionsArray: ["Definition", "Synonyms", "Antonyms", "Sounds Like"],
  },
];

function Nav({
  setOptions,
  options,
  setGuessedLetters,
  wordHint,
  setWordHint,
}) {
  const handleSelectOption = (e) => {
    let selectedOption = e.target.name;
    let selectedOptionId = e.target.id.split(" ").join("").toLowerCase();

    if (
      wordHint &&
      wordHint[0] ===
        ` Sorry no ${options.Hint} for this word. Try another hint.` &&
      selectedOption === "Hint"
    ) {
      console.log(selectedOptionId);
      setOptions((option) => {
        return {
          ...option,
          [selectedOption]: selectedOptionId,
        };
      });
    } else {
      setGuessedLetters([]);
      setWordHint(null);
      console.log(selectedOptionId);
      setOptions((option) => {
        return {
          ...option,
          [selectedOption]: selectedOptionId,
        };
      });
    }
  };
  return (
    <motion.div
      variants={menuSlide}
      initial="initial"
      animate="enter"
      exit="exit"
      style={{
        // height: "100vh",
        position: "fixed",
        zIndex: "2",
        height: "100%",
        // width: "15%",
        // top: "0px",
        right: "0px",
        color: "black",
        border: "solid black 1px 2px",
        // boxShadow: " black 6px 10px 5px 5px ",
      }}
      className="bg-[#f1f6fe] dark:bg-gray-800 dark:border-l-2 top-[60px] w-[85%] sm:w-[15%] sm:top-0 dark:border-l-gray-50/10  drop-shadow-xl "
    >
      <div
        style={{
          boxSizing: "border-box",
          height: "100%",
          paddingTop: "30px",

          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
        }}
        className="body"
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "12px",
            marginTop: "80px",
          }}
          className="nav"
        >
          <div
            style={{
              fontSize: "0.8rem",
              borderBottom: "solid gray 1px",
              marginBottom: "40px",
              paddingLeft: "10px",
            }}
            className="header dark:text-gray-100"
          >
            <p>OPTIONS</p>
          </div>
          {navItems.map((data, index) => {
            return (
              <motion.div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  marginBottom: "25px",
                  gap: "6px",
                }}
                className="bg-white dark:bg-gray-600 dark:text-gray-50 py-2 shadow-lg"
                custom={index}
                variants={slide}
                initial="initial"
                animate="enter"
                exit="exit"
                key={index}
              >
                <div className="p-2 font-bold">{data.title}</div>
                {data.optionsArray.map((opt, i) => {
                  return (
                    <div
                      className=" group relative space-x-2 p-2 hover:before:w-full before:absolute before:bottom-0 before:transition-all before:duration-150 before:left-0 before:h-[3px] before:w-0 before:bg-gray-300 bg-blue-100/30"
                      key={i}
                    >
                      <input
                        onChange={(e) => handleSelectOption(e)}
                        type="radio"
                        name={data.title}
                        id={opt}
                        value={opt}
                        checked={
                          options[data.title] ===
                          opt.split(" ").join("").toLowerCase()
                        }
                      />
                      <label
                        className=" hover:scale-105 transition-all duration-300"
                        htmlFor={opt}
                      >
                        {opt}
                      </label>
                    </div>
                  );
                })}
              </motion.div>
            );
          })}
        </div>
      </div>
      <Curve />
    </motion.div>
  );
}

export default Nav;
