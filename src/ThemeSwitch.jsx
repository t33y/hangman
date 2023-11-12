import React from "react";

import LightModeIcon from "@mui/icons-material/LightMode";
import NightlightRoundIcon from "@mui/icons-material/NightlightRound";
import { Tooltip } from "@mui/material";

function ThemeSwitch({ theme, setTheme }) {
  return (
    <Tooltip
      title={theme === "Light" ? "Switch to Dark Mode" : "Switch to Light Mode"}
      arrow
      placement="bottom"
    >
      <div
        className="text-gray-800/70 hover:text-gray-800/80 dark:text-gray-100 dark:hover:text-white transition-colors cursor-pointer"
        onClick={() => {
          if (theme === "Dark") {
            document.body.style.background = "#f1f6fe";
            document.documentElement.classList.remove("dark");
            setTheme("Light");
          } else {
            document.documentElement.classList.add("dark");
            document.body.style.background = "#1f2937";
            setTheme("Dark");
          }
        }}
      >
        {theme === "Light" ? <NightlightRoundIcon /> : <LightModeIcon />}
      </div>
    </Tooltip>
  );
}

export default ThemeSwitch;
