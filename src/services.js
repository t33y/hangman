import { useEffect, useState } from "react";
import axios from "axios";

export const Urls = {
  definition: "https://api.api-ninjas.com/v1/dictionary?word=",
  synonyms: "https://api.api-ninjas.com/v1/thesaurus?word=",
  antonyms: "https://api.api-ninjas.com/v1/thesaurus?word=",
  soundslike: "https://api.api-ninjas.com/v1/rhyme?word=",
  word: "https://api.api-ninjas.com/v1/randomword",
};

export const getHint = async (hintOption, word) => {
  console.log(hintOption, "hintOption");
  let url = Urls[hintOption];
  console.log(url, "url");
  try {
    const hint = await axios.get(url + word, {
      headers: { "X-Api-Key": "rNeCJefPgGbq5GyqIITVDQ==JxJB9w3WPkAnfZDA" },
      contentType: "application/json",
      success: function (result) {
        console.log(result);
      },
    });
    if (hintOption === "soundslike") {
      return hint.data.slice(0, 6);
    } else if (hintOption === ("antonyms" || "synonyms")) {
      return hint.data[hintOption].slice(0, 6);
    } else {
      let re = new RegExp(word, "g");
      return hint.data.definition
        .replace(/\d+/g, 5)
        .replace(re, "_________")
        .split(5)
        .slice(0, 8)
        .filter((def) => {
          return def.trim().length > 5;
        });
    }
  } catch (error) {
    console.log(error);
  }
};

export const getRandomWord = async () => {
  let url = Urls.word;
  try {
    const res = await axios.get(url, {
      headers: { "X-Api-Key": "rNeCJefPgGbq5GyqIITVDQ==JxJB9w3WPkAnfZDA" },
      contentType: "application/json",
      success: function (result) {
        console.log(result);
      },
    });
    return res.data.word;
  } catch (error) {
    console.log(error);
  }
};

export const useLocalStorage = (key, initialValue) => {
  const [value, setValue] = useState(() => {
    let storedValue = localStorage.getItem(key);
    if (storedValue === null) {
      if (typeof initialValue === "function") {
        return initialValue();
      } else {
        return initialValue;
      }
    } else {
      return JSON.parse(storedValue);
    }
  });

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value));
  }, [value, key]);

  return [value, setValue];
};
