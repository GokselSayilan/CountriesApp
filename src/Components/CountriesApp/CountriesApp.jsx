import React, { useEffect, useState } from "react";
import "./countriesApp.css";
import { motion, useAnimation } from "framer-motion";

//components

import Header from "../Header/Header.jsx";
import Filter from "../Filter/Filter";
import Countries from "../Countries/Countries";
import DetailCountry from "../DetailCountry/DetailCountry";

//context
import { useFilter } from "../../Context/FilterContext";
import { useTheme } from "../../Context/ThemeContext";

function CountriesApp() {
  const { isOpenDetailCountry } = useFilter();
  const { selectedTheme } = useTheme();

  const controls = useAnimation();

  const [hasLoadPage, setHasLoadPage] = useState(false);

  useEffect(() => {
    if (hasLoadPage) {
      controls.start({ opacity: 0 }).then(() => {
        controls.start({ opacity: 1 });
      });
    } else setHasLoadPage(true);
  }, [selectedTheme]);

  return (
    <motion.div
      initial={false}
      animate={controls}
      transition={{ type: "crossFade", duration: 0.5 }}
      className={
        selectedTheme === "light"
          ? "countriesApp extraLightGrayBg"
          : "countriesApp darkBlackBg"
      }
    >
      <Header />
      {isOpenDetailCountry ? (
        <DetailCountry />
      ) : (
        <>
          <Filter />
          <Countries />
        </>
      )}
    </motion.div>
  );
}

export default CountriesApp;
