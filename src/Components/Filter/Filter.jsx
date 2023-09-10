import React, { useState } from "react";
import "./filter.css";
import { motion } from "framer-motion";

//context
import { useFilter } from "../../Context/FilterContext";
import { useTheme } from "../../Context/ThemeContext";

//icons
import { BsSearch } from "react-icons/bs";
import { AiOutlineDown, AiOutlineUp } from "react-icons/ai";

function Filter() {
  const { selectedRegion, setSelectedRegion, filterValue, setFilterValue } =
    useFilter();

  const { selectedTheme } = useTheme();

  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [typingTimeout, setTypingTimeout] = useState(0);
  const [tempValue, setTempValue] = useState("");

  const filterArr = [
    { id: "region-filter", name: "filter by region" },
    { id: "africa-filter", name: "africa" },
    { id: "america-filter", name: "americas" },
    { id: "asia-filter", name: "asia" },
    { id: "europe-filter", name: "europe" },
    { id: "ocenia-filter", name: "oceania" },
  ];

  const dropdownToggle = () => {
    setDropdownOpen((prev) => !prev);
  };

  const handleFilterValue = (event) => {
    const { value } = event.target;
    setTempValue(value);

    // Her karakter değişikliğinde mevcut gecikme süresini sıfırla
    clearTimeout(typingTimeout);

    // Yeni bir gecikme başlat
    const newTypingTimeout = setTimeout(() => {
      setFilterValue(value);
    }, 1000); // Örnek olarak 1 saniye (1000 milisaniye) bekleme süresi

    setTypingTimeout(newTypingTimeout);
  };

  // animation

  const variants = {
    open: {
      rotate: 180,
      opacity: 1,
    },
    closed: {
      rotate: 0,
      opacity: 0.5,
    },
  };

  return (
    <div className="filter">
      <div className="filterWrapper">
        <motion.div
          animate={{ x: [-200, 0] }}
          whileTap={{ scale: 1.2 }}
          transition={{
            type: "spring",
            stiffness: 80,
            damping: 10,
          }}
          className={
            selectedTheme === "light"
              ? "filterLeft whiteBg blackText"
              : "filterLeft lightBlackBg whiteText"
          }
        >
          <BsSearch />
          <input
            type="text"
            className={
              selectedTheme === "light"
                ? "filterLeftInput extraSmallText semiBoldWeight blackText"
                : "filterLeftInput extraSmallText semiBoldWeight whiteText"
            }
            value={tempValue}
            onChange={handleFilterValue}
            placeholder="Search for a country…"
          />
        </motion.div>
        <motion.div
          animate={{ x: [200, 0] }}
          transition={{ type: "spring", stiffness: 80, damping: 10 }}
          className={
            selectedTheme === "light"
              ? "filterRight blackText"
              : "filterRight whiteText"
          }
        >
          <motion.div
            whileTap={{ scale: 0.95 }}
            className="filterRightChoiceArea"
            onClick={dropdownToggle}
          >
            <div
              className={
                selectedTheme === "light"
                  ? "filterRightChoiceAreaMain whiteBg"
                  : "filterRightChoiceAreaMain lightBlackBg"
              }
            >
              <p className="filterRightChoiceAreaMainText extraSmallText">
                {selectedRegion}
              </p>
              <motion.div
                variants={variants}
                initial="closed"
                animate={dropdownOpen ? "open" : "closed"}
                transition={{ type: "spring", stiffness: 260, damping: 20 }}
              >
                <AiOutlineDown />
              </motion.div>
            </div>
            {dropdownOpen && (
              <motion.div
                animate={{ y: [-50, 0] }}
                transition={{
                  type: "spring",
                  stiffness: 260,
                  damping: 20,
                }}
                className={
                  selectedTheme === "light"
                    ? "filterRightChoiceAreaDropdown whiteBg"
                    : "filterRightChoiceAreaDropdown lightBlackBg"
                }
              >
                <motion.ul
                  className="filterRightChoiceAreaDropdownItems"
                >
                  {filterArr.map((item) => (
                    <motion.li
                      key={item.id}
                      className="filterRightChoiceAreaDropdownItem extraSmallText"
                      onClick={() => setSelectedRegion(item.name)}
                    >
                      {item.name}
                    </motion.li>
                  ))}
                </motion.ul>
              </motion.div>
            )}
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}

export default Filter;
