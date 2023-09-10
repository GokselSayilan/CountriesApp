import React from "react";
import "./header.css";
import {motion} from 'framer-motion'

//icons
import { BsSun, BsFillMoonFill } from "react-icons/bs";
import { useTheme } from "../../Context/ThemeContext";

function Header() {
  const { selectedTheme, setSelectedTheme } = useTheme();

  const handleTheme = () => {
    setSelectedTheme((prev) => (prev === "light" ? "dark" : "light"));
  };

  return (
    <motion.div
      animate={{y:[-100,0]}}
      transition={{duration:1}}
      className={
        selectedTheme === "light" ? "header whiteBg blackText" : "header whiteText lightBlackBg"
      }
    >
      <div className="headerWrapper">
        <h1 className="headerLogo largeText extraBoldWeight">
          Where in the world?
        </h1>
        <div className="pageTheme" onClick={handleTheme}>
          {selectedTheme === "light" ? <BsSun /> : <BsFillMoonFill color="white"/>}

          <p className="pageThemeTitle smallText semiBoldWeight ">
            {selectedTheme === "light" ? "Light Mode" : "Dark Mode"}
          </p>
        </div>
      </div>
    </motion.div>
  );
}

export default Header;
