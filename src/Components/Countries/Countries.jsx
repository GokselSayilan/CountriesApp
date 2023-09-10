import React, { useEffect, useState } from "react";
import "./countries.css";
import { motion } from "framer-motion";

//data
import Data from "../../data.json";

import Country from "../Country/Country";

//context
import { useFilter } from "../../Context/FilterContext";

function Countries() {
  const { selectedRegion, setSelectedRegion, filterValue, setFilterValue } =
    useFilter();

  const [dataCeil, setDataCeil] = useState(0);
  const [displayData, setDisplayData] = useState("");

  useEffect(() => {
    handleLoadMore();
  }, []);

  useEffect(() => {
    const tempDisplay = Data.filter(
      (country) =>
        country.name.toLowerCase().includes(filterValue.toLowerCase()) &&
        (country.region.toLowerCase() === selectedRegion.toLowerCase() ||
          selectedRegion.toLowerCase() === "filter by region")
    );
    setDisplayData(tempDisplay.slice(0, dataCeil));
  }, [filterValue, dataCeil, selectedRegion]);

  useEffect(() => {
    if (
      filterValue === "" &&
      selectedRegion.toLowerCase() === "filter by region"
    ) {
      let tempData = Data.slice(0, dataCeil);
      setDisplayData(tempData);
    }
  }, [dataCeil]);

  const handleLoadMore = () => {
    setDataCeil((prev) => prev + 8);
  };

  return (
    <div className="countries">
      <div className="countriesWrapper">
        <div className="countriesItems">
          {displayData.length === 0 && <p>No Match Data</p>}
          {displayData !== "" &&
            displayData.map((country) => (
              <Country
                key={country.name + country.population}
                value={{
                  alpha3Code: country.alpha3Code,
                  name: country.name,
                  population: country.population,
                  region: country.region,
                  capital: country.capital,
                  flagImg: country.flags.png,
                }}
              />
            ))}
        </div>
        <div className="countriesLoadMoreContainer">
          {displayData.length >= dataCeil - 8 && (
            <motion.button
              whileHover={{ scale: 1.2 }} // x ve y değerleri sıfır olacak şekilde ayarlayın
              whileTap={{ scale: 1.1 }}
              className="countriesLoadMore whiteBg"
              onClick={handleLoadMore}
            >
              +
            </motion.button>
          )}
        </div>
      </div>
    </div>
  );
}

export default Countries;
