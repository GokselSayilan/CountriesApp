import React, { useEffect, useState } from "react";
import "./detailCountry.css";
import { motion, useAnimation } from "framer-motion";

//icon
import { BiArrowBack } from "react-icons/bi";

//context
import { useFilter } from "../../Context/FilterContext";
import { useTheme } from "../../Context/ThemeContext";

//data
import Data from "../../data.json";

function DetailCountry() {
  const {
    setIsOpenDetailCountry,
    selectedCountry,
    setSelectedCountry,
    setSelectedRegion,
    setFilterValue,
  } = useFilter();

  const { selectedTheme } = useTheme();

  const [filteredData, setFilteredData] = useState("");

  const controls = useAnimation();

  useEffect(() => {
    controls.start({ opacity: 0 }).then(() => {
      controls.start({ opacity: 1 });
    });

    const tempFilteredData = Data.filter(
      (country) =>
        country.alpha3Code.toLowerCase() === selectedCountry.toLowerCase()
    );
    setFilteredData(tempFilteredData[0]);
  }, [selectedCountry]);

  const handleOpenDetailCountry = () => {
    setSelectedRegion("filter by region");
    setFilterValue("");
    setIsOpenDetailCountry(false);
  };

  const handleSelectedCountry = (border) => {
    setSelectedCountry(border);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={controls}
      transition={{ duration: 0.3 }}
      className="detailCountry"
    >
      <div
        className={
          selectedTheme === "light"
            ? "detailCountryBack whiteBg blackText"
            : "detailCountryBack lightBlackBg whiteText"
        }
        onClick={handleOpenDetailCountry}
      >
        <BiArrowBack />
        <p className="detailCountryBackText smallText">Back</p>
      </div>
      <div className="detailCountryWrapper">
        <div className="detailCountryLeft">
          <img
            src={filteredData.flags && filteredData.flags.png}
            alt="flag"
            className="detailCountryLeftImg"
          />
        </div>
        <div
          className={
            selectedTheme === "light"
              ? "detailCountryRight blackText"
              : "detailCountryRight whiteText"
          }
        >
          <h2 className="detailCountryRightTitle extraLargeText">{filteredData.name}</h2>
          <div className="detailCountryRightDesc">
            <div className="detailCountryRightDescLeft">
              <div className="detailCountryRightDescLeftItem">
                <h6 className="detailCountryRightDescLeftTitle semiBoldWeight smallText">
                  Native Name:
                </h6>
                <p className="detailCountryRightDescLeftValue smallText">
                  {filteredData.nativeName}
                </p>
              </div>
              <div className="detailCountryRightDescLeftItem">
                <h6 className="detailCountryRightDescLeftTitle semiBoldWeight smallText">
                  Population:
                </h6>
                <p className="detailCountryRightDescLeftValue smallText">
                  {filteredData.population &&
                    filteredData.population.toLocaleString()}
                </p>
              </div>
              <div className="detailCountryRightDescLeftItem">
                <h6 className="detailCountryRightDescLeftTitle semiBoldWeight smallText">
                  Region:
                </h6>
                <p className="detailCountryRightDescLeftValue smallText">
                  {filteredData.region}
                </p>
              </div>
              <div className="detailCountryRightDescLeftItem">
                <h6 className="detailCountryRightDescLeftTitle semiBoldWeight smallText">
                  Sub Region:
                </h6>
                <p className="detailCountryRightDescLeftValue smallText">
                  {filteredData.subregion}
                </p>
              </div>
              <div className="detailCountryRightDescLeftItem">
                <h6 className="detailCountryRightDescLeftTitle semiBoldWeight smallText">
                  Capital:
                </h6>
                <p className="detailCountryRightDescLeftValue smallText">
                  {filteredData.capital}
                </p>
              </div>
            </div>
            <div className="detailCountryRightDescRight">
              <div className="detailCountryRightDescRightItem">
                <h6 className="detailCountryRightDescRightTitle semiBoldWeight smallText">
                  Top Level Domain:
                </h6>
                <p className="detailCountryRightDescRightValue smallText">
                  {filteredData.topLevelDomain}
                </p>
              </div>
              <div className="detailCountryRightDescRightItem">
                <h6 className="detailCountryRightDescRightTitle semiBoldWeight smallText">
                  Currencies:
                </h6>
                <p className="detailCountryRightDescRightValue smallText">
                  {filteredData.currencies && filteredData.currencies.length > 0
                    ? filteredData.currencies[0].name
                    : "N/A"}
                </p>
              </div>
              <div className="detailCountryRightDescRightItem">
                <h6 className="detailCountryRightDescRightTitle semiBoldWeight smallText">
                  Languages:
                </h6>
                <p className="detailCountryRightDescRightValue smallText">
                  {filteredData.languages && filteredData.languages.length > 0
                    ? filteredData.languages[0].name
                    : "N/A"}
                </p>
              </div>
            </div>
          </div>
          <div className="detailCountryRightBorderCountries">
            <h6 className="detailCountryRightBorderCountriesTitle semiBoldWeight smallText">
              Border Countries:
            </h6>
            {filteredData.borders &&
              filteredData.borders.map((border, index) => (
                <p
                  onClick={() => handleSelectedCountry(border)}
                  key={index}
                  className={
                    selectedTheme === "light"
                      ? "detailCountryRightBorderCountriesItem extraSmallText"
                      : "detailCountryRightBorderCountriesItem extraSmallText lightBlackBg"
                  }
                >
                  {border}
                </p>
              ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default DetailCountry;
