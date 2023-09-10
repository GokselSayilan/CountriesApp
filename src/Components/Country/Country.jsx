import React from "react";
import "./country.css";
import { motion } from "framer-motion";

//context
import { useFilter } from "../../Context/FilterContext";
import { useTheme } from "../../Context/ThemeContext";

function Country({ value }) {
  const { alpha3Code, name, population, region, capital, flagImg } = value;

  const { setIsOpenDetailCountry, setSelectedCountry } = useFilter();
  const { selectedTheme } = useTheme();

  const handleOpenDetailCountry = (alpha3Code) => {
    setSelectedCountry(alpha3Code);
    setIsOpenDetailCountry(true);
  };

  return (
    <motion.div
      whileHover={{ scale: 1.2  }}
      whileTap={{ scale: 1.1 }}
      initial={{opacity:0}}
      animate={{opacity:1}}
      transition={{duration:1}}
      className={
        selectedTheme === "light"
          ? "country whiteBg blackText"
          : "country lightBlackBg whiteText"
      }
      onClick={() => handleOpenDetailCountry(alpha3Code)}
    >
      <div className="countryBox">
        <img src={flagImg} alt="flagImg" className="countryBoxImg" />
        <div className="countryBoxDetails ">
          <h3 className="countryBoxDetailsTitle mediumText ">{name}</h3>
          <div className="countryBoxDetail">
            <h4 className="countryBoxDetailTitle semiBoldWeight extraSmallText">
              Population:
            </h4>
            <p className="countryBoxDetailValue extraSmallText">
              {population.toLocaleString()}
            </p>
          </div>
          <div className="countryBoxDetail">
            <h4 className="countryBoxDetailTitle semiBoldWeight extraSmallText">
              Region:
            </h4>
            <p className="countryBoxDetailValue extraSmallText">{region}</p>
          </div>
          <div className="countryBoxDetail">
            <h4 className="countryBoxDetailTitle semiBoldWeight extraSmallText">
              Capital:
            </h4>
            <p className="countryBoxDetailValue extraSmallText">{capital}</p>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default Country;
