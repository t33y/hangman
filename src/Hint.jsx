import React, { useState } from "react";
import { motion } from "framer-motion";
import { getHint } from "./services";

function Hint({
  word,
  options,
  wordHint,
  setWordHint,
  setGuessedLetters,
  hintIsOpen,
  setHintIsOpen,
}) {
  const [isLoadingHint, setIsLoadingHint] = useState(false);
  const handleHintbuttonClick = async () => {
    setHintIsOpen((prev) => !prev);
    if (!options.Hint) return;

    console.log("hint on top", !!wordHint);
    if (wordHint) {
      const noHintForOption = [
        "Sorry",
        "no",
        "for this word.",
        "Try another hint.",
      ].every((value) => wordHint[0].includes(value));
      if (!noHintForOption) {
        console.log(wordHint && !noHintForOption);
        console.log(!noHintForOption, "negate no hint");
        console.log(noHintForOption, "no hint normal");
        console.log(options.Hint);
        return;
      }
    }
    console.log(options);
    setIsLoadingHint(true);
    try {
      const hint = await getHint(options.Hint, word);
      if (hint.length === 0) {
        console.log(hint);
        setWordHint([
          ` Sorry no ${options.Hint} for this word. Try another hint.`,
        ]);
        setIsLoadingHint(false);
      } else {
        setWordHint(hint);
        setGuessedLetters((prev) => [...prev, "1", "2"]);
        setIsLoadingHint(false);
      }
    } catch (error) {
      console.log(error);
      setIsLoadingHint(false);
    }
  };

  const ulVariant = {
    first: {
      opacity: 0,
      y: 100,
    },
    second: {
      opacity: 1,
      y: 0,
    },
  };

  const itemVariants = {
    open: {
      opacity: 1,
      y: 0,
      transition: { type: "spring", stiffness: 300, damping: 24 },
    },
    closed: { opacity: 0, y: 20, transition: { duration: 0.2 } },
  };

  return (
    <motion.div
      className="w-[80%]"
      // variants={ulVariant}
      initial={false}
      animate={hintIsOpen ? "open" : "closed"}
    >
      <motion.button
        // variants={ulVariant}
        // initial="first"
        // transition={{ delay: 0.5 }}
        // viewport={{ once: true }}
        // whileInView="second"
        whileTap={{ scale: 0.95 }}
        onClick={() => handleHintbuttonClick()}
        className=" group font-semibold border transitin-opacity p-4 hover:text-gray-700/80 hovr:scale-105 rounded-xl gap-2 px-5 py-3 w-full flex items-center justify-center  border-blue-300   text-gray-700/60 hover:bg-[#f1f6fe] shadow-sm bg-white"
      >
        Show Hint
        <motion.div
          variants={{
            open: { rotate: 180 },
            closed: { rotate: 0 },
          }}
          transition={{ duration: 0.2 }}
          style={{ originY: 0.55 }}
        >
          <svg
            className="group-hover:fill-gray-700"
            width="15"
            fill="gray"
            height="15"
            viewBox="0 0 20 20"
          >
            <path d="M0 7 L 20 7 L 10 16 Z" />
          </svg>
        </motion.div>
      </motion.button>

      <motion.div
        variants={{
          closed: {
            clipPath: "inset(0% 0% 100% 0% round 10px)",
            transition: {
              type: "spring",
              bounce: 0,
              duration: 0.4,
            },
          },
          open: {
            clipPath: "inset(0% 0% 0% 0% round 10px)",
            transition: {
              type: "spring",
              bounce: 0,
              duration: 0.7,
              delayChildren: 0.3,
              staggerChildren: 0.05,
            },
          },
        }}
        className="flex mt-2 overflow-scroll h-[60%] rounded-none flex-col border-t border-t-blue-400  bg-white text-gray-600 px-5 scroll-auto pt-3 pb-5 "
      >
        <motion.div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            gap: "15px",
            textAlign: "center",
          }}
          variants={itemVariants}
          className="text-left py-3"
        >
          {!options.Hint && "Select Hint from Options Menu"}
          <p
            style={{
              textTransform: "capitalize",
            }}
          >
            {options.Hint}:
          </p>{" "}
          {isLoadingHint ? (
            <div className="animate-spin border-b-2 w-14 h-14 m-auto pt-14 border-blue-400 rounded-full"></div>
          ) : wordHint ? (
            wordHint[0]
          ) : (
            ""
          )}
        </motion.div>
      </motion.div>
    </motion.div>
  );
}

export default Hint;
