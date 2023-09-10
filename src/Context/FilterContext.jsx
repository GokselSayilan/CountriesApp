import { createContext, useContext, useState } from "react";

const FilterContext = createContext();

export const useFilter = () => {
  return useContext(FilterContext);
};

export const FilterProvider = ({ children }) => {
  const [selectedRegion, setSelectedRegion] = useState("filter by region");
  const [filterValue, setFilterValue] = useState("");
  const [selectedCountry, setSelectedCountry] = useState("");
  const [isOpenDetailCountry, setIsOpenDetailCountry] = useState(false);

  return (
    <FilterContext.Provider
      value={{
        selectedRegion,
        setSelectedRegion,
        filterValue,
        setFilterValue,
        selectedCountry,
        setSelectedCountry,
        isOpenDetailCountry,
        setIsOpenDetailCountry,
      }}
    >
      {children}
    </FilterContext.Provider>
  );
};
