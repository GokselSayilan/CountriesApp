import CountriesApp from "./Components/CountriesApp/CountriesApp";
import { FilterProvider } from "./Context/FilterContext";
import { ThemeProvider } from "./Context/ThemeContext";

function App() {
  return (
    <ThemeProvider>
      <FilterProvider>
        <CountriesApp />
      </FilterProvider>
    </ThemeProvider>
  );
}

export default App;
