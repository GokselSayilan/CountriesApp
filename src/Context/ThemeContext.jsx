import { createContext, useContext, useState } from "react";

const ThemeContext = createContext();

export const useTheme = () => useContext(ThemeContext);

export const ThemeProvider = ({ children }) => {
  const [selectedTheme, setSelectedTheme] = useState("light");

  return (
    <ThemeContext.Provider value={{ selectedTheme, setSelectedTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};
